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
            const oldLeft = this._css(node, 'left');
            const trueLeft = oldLeft && oldLeft !== 'auto' ? parseFloat(oldLeft) : 0;
            style.left = `${trueLeft - leftOffset}px`;
        }

        let topOffset;
        if (nodeBox.top - containerBox.top < 0) {
            topOffset = nodeBox.top - containerBox.top;
        } else if (nodeBox.bottom - containerBox.bottom > 0) {
            topOffset = nodeBox.bottom - containerBox.bottom;
        }

        if (topOffset) {
            const oldTop = this._css(node, 'top');
            const trueTop = oldTop && oldTop !== 'auto' ? parseFloat(oldTop) : 0;
            style.top = `${trueTop - topOffset}px`;
        }

        if (this._css(node, 'position') === 'static') {
            style.position = 'relative';
        }

        this._setStyle(node, style);
    },

    /**
     * Get the position of the a single node relative to the Window or Document.
     * @param {HTMLElement} node The input node.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {object} An object with the X and Y co-ordinates.
     */
    _position(node, offset) {
        return this._forceShow(node, node => {
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
        });
    },

    /**
     * Get the computed bounding rectangle of a single node.
     * @param {HTMLElement} node The input node.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {DOMRect} The computed bounding rectangle.
     */
    _rect(node, offset) {
        return this._forceShow(node, node => {
            const result = node.getBoundingClientRect();

            if (offset) {
                result.x += window.scrollX;
                result.y += window.scrollY;
            }

            return result;
        });
    }

});
