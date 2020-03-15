/**
 * DOM Position
 */

Object.assign(DOM.prototype, {

    /**
     * Get the X,Y co-ordinates for the center of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
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
     * Contrain each node to a container node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} container The container node, or a query selector string.
     */
    constrain(nodes, container) {
        const containerBox = this.rect(container);

        if (!containerBox) {
            return;
        }

        nodes = this.parseNodes(nodes);

        for (const node of nodes) {
            this.constructor._constrain(node, containerBox);
        }
    },

    /**
     * Get the distance of a node to an X,Y position in the Window.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
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
     * Get the distance between two nodes.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} others The node to compare, or a query selector string.
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
     * Get the nearest node to an X,Y position in the Window.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {HTMLElement} The nearest node.
     */
    nearestTo(nodes, x, y, offset) {
        let closest = null,
            closestDistance = Number.MAX_VALUE;

        nodes = this.parseNodes(nodes);

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
     * Get the nearest node to another node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} others The node to compare, or a query selector string.
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
     * Get the percentage of an X co-ordinate relative to a node's width.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} x The X co-ordinate.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @param {Boolean} [clamp=true] Whether to clamp the percent between 0 and 100.
     * @returns {number} The percent.
     */
    percentX(nodes, x, offset, clamp = true) {
        const nodeBox = this.rect(nodes, offset);

        if (!nodeBox) {
            return;
        }

        const percent = (x - nodeBox.left)
            / nodeBox.width
            * 100;

        return clamp ?
            Core.clampPercent(percent) :
            percent;
    },

    /**
     * Get the percentage of a Y co-ordinate relative to a node's height.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} y The Y co-ordinate.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @param {Boolean} [clamp=true] Whether to clamp the percent between 0 and 100.
     * @returns {number} The percent.
     */
    percentY(nodes, y, offset) {
        const nodeBox = this.rect(nodes, offset);

        if (!nodeBox) {
            return;
        }

        const percent = (y - nodeBox.top)
            / nodeBox.height
            * 100;

        return clamp ?
            Core.clampPercent(percent) :
            percent;
    },

    /**
     * Get the position of the first node relative to the Window or Document.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {object} An object with the X and Y co-ordinates.
     */
    position(nodes, offset) {
        const node = this.parseNode(nodes);

        if (!node) {
            return;
        }

        return this.constructor._position(node, offset);
    },

    /**
     * Get the computed bounding rectangle of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {DOMRect} The computed bounding rectangle.
     */
    rect(nodes, offset) {
        const node = this.parseNode(nodes);

        if (!node) {
            return;
        }

        return this.constructor._rect(node, offset);
    }

});
