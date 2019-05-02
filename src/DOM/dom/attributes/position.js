/**
 * DOM Position
 */

Object.assign(DOM.prototype, {

    /**
     * Get the X,Y co-ordinates for the center of the first element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {object} An object with the x and y co-ordinates.
     */
    center(nodes, offset) {
        const nodeBox = this.rect(nodes, offset);

        if (!nodeBox) {
            return;
        }

        return {
            x: nodeBox.left + nodeBox.width / 2,
            y: nodeBox.top + nodeBox.height / 2
        };
    },

    /**
     * Contrain each element to a container element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} container The container node, or a query selector string.
     */
    constrain(nodes, container) {
        const containerBox = this.rect(container);

        if (!containerBox) {
            return;
        }

        nodes = this._nodeFilter(nodes);

        for (const node of nodes) {
            this._constrain(node, containerBox);
        }
    },

    /**
     * Get the distance of an element to an X,Y position in the Window.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {number} The distance to the element.
     */
    distTo(nodes, x, y, offset) {
        const nodeCenter = this.center(nodes, offset);

        if (!nodeCenter) {
            return;
        }

        return Core.dist(
            nodeCenter.x,
            nodeCenter.y,
            x,
            y
        );
    },

    /**
     * Get the distance between two elements.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The node to compare, or a query selector string.
     * @returns {number} The distance between the nodes.
     */
    distToNode(nodes, others) {
        const otherCenter = this.center(others);

        if (!otherCenter) {
            return;
        }

        return this.distTo(
            nodes,
            otherCenter.x,
            otherCenter.y
        );
    },

    /**
     * Get the nearest element to an X,Y position in the Window.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {HTMLElement} The nearest node.
     */
    nearestTo(nodes, x, y, offset) {
        let closest = null,
            closestDistance = Number.MAX_VALUE;

        nodes = this._nodeFilter(nodes);

        for (const node of nodes) {
            const dist = this.distTo(node, x, y, offset);
            if (dist && dist < closestDistance) {
                closestDistance = dist;
                closest = node;
            }
        }

        return closest;
    },

    /**
     * Get the nearest element to another element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The node to compare, or a query selector string.
     * @returns {HTMLElement} The nearest node.
     */
    nearestToNode(nodes, others) {
        const otherCenter = this.center(others);

        if (!otherCenter) {
            return;
        }

        return this.nearestTo(
            nodes,
            otherCenter.x,
            otherCenter.y
        );
    },

    /**
     * Get the percentage of an X co-ordinate relative to an element's width.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {number} x The X co-ordinate.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {number} The percent.
     */
    percentX(nodes, x, offset) {
        const nodeBox = this.rect(nodes, offset);

        if (!nodeBox) {
            return;
        }

        return Core.clampPercent(
            (x - nodeBox.left)
            / nodeBox.width
            * 100
        );
    },

    /**
     * Get the percentage of a Y co-ordinate relative to an element's height.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {number} y The Y co-ordinate.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {number} The percent.
     */
    percentY(nodes, y, offset) {
        const nodeBox = this.rect(nodes, offset);

        if (!nodeBox) {
            return;
        }

        return Core.clampPercent(
            (y - nodeBox.top)
            / nodeBox.height
            * 100
        );
    },

    /**
     * Get the position of the first element relative to the Window or Document.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {object} An object with the x and y co-ordinates.
     */
    position(nodes, offset) {
        const node = this._nodeFind(nodes);

        if (!node) {
            return;
        }

        return this._position(node, offset);
    },

    /**
     * Get the computed bounding rectangle of the first element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {DOMRect} The computed bounding rectangle.
     */
    rect(nodes, offset) {
        const node = this._nodeFind(nodes);

        if (!node) {
            return;
        }

        return this._rect(node, offset);
    },

    /**
     * Contrain a single element to a container box.
     * @param {HTMLElement} node The input node.
     * @param {DOMRect} containerBox The container box.
     */
    _constrain(node, containerBox) {
        const nodeBox = this._rect(node);

        const style = {};

        if (nodeBox.height > containerBox.height) {
            style.height = containerBox.height;
        }

        if (nodeBox.width > containerBox.width) {
            style.width = containerBox.width;
        }

        let leftOffset;
        if (nodeBox.left - containerBox.left < 0) {
            leftOffset = nodeBox.left - containerBox.left
        } else if (nodeBox.right - containerBox.right > 0) {
            leftOffset = nodeBox.right - containerBox.right;
        }

        if (leftOffset) {
            style.left = `${parseFloat(this._css(node, 'left')) - leftOffset}px`;
        }

        let topOffset;
        if (nodeBox.top - containerBox.top < 0) {
            topOffset = nodeBox.top - containerBox.top;
        } else if (nodeBox.bottom - containerBox.bottom > 0) {
            topOffset = nodeBox.bottom - containerBox.bottom;
        }

        if (topOffset) {
            style.top = `${parseFloat(this._css(node, 'top')) - topOffset}px`;
        }

        DOM._setStyle(node, style);
    },

    /**
     * Get the position of the a single element relative to the Window or Document.
     * @param {HTMLElement} node The input node.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {object} An object with the x and y co-ordinates.
     */
    _position(node, offset) {
        return this.forceShow(
            node,
            node => {
                const result = {
                    x: node.offsetLeft,
                    y: node.offsetTop
                };

                if (offset) {
                    let offsetParent = node;

                    while (offsetParent = offsetParent.offsetParent) {
                        result.x += offsetParent.offsetLeft;
                        result.y += offsetParent.offsetTop;
                    }
                }

                return result;
            }
        );
    },

    /**
     * Get the computed bounding rectangle of a single element.
     * @param {HTMLElement} node The input node.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {DOMRect} The computed bounding rectangle.
     */
    _rect(node, offset) {
        return this.forceShow(
            node,
            node => {
                const result = node.getBoundingClientRect();

                if (offset) {
                    result.x += DOM._getScrollX(window);
                    result.y += DOM._getScrollY(window);
                }

                return result;
            }
        );
    }

});
