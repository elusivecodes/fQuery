/**
 * DOM (Static) Position
 */

Object.assign(DOM, {

    /**
     * Constrain a single node to a container box.
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
     * Get the position of the a single node relative to the Window or Document.
     * @param {HTMLElement} node The input node.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {object} An object with the X and Y co-ordinates.
     */
    _position(node, offset) {
        return this._forceShow(
            node,
            node => {
                const result = {
                    x: DOMNode.offsetLeft(node),
                    y: DOMNode.offsetTop(node)
                };

                if (offset) {
                    let offsetParent = node;

                    while (offsetParent = DOMNode.offsetParent(offsetParent)) {
                        result.x += DOMNode.offsetLeft(offsetParent);
                        result.y += DOMNode.offsetTop(offsetParent);
                    }
                }

                return result;
            }
        );
    },

    /**
     * Get the computed bounding rectangle of a single node.
     * @param {HTMLElement} node The input node.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {DOMRect} The computed bounding rectangle.
     */
    _rect(node, offset) {
        return this._forceShow(
            node,
            node => {
                const result = DOMNode.rect(node);

                if (offset) {
                    result.x += DOMNode.getScrollX(window);
                    result.y += DOMNode.getScrollY(window);
                }

                return result;
            }
        );
    }

});
