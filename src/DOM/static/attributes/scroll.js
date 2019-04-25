/**
 * DOM (Static) Scroll
 */

Object.assign(DOM, {

    /**
     * Get the scroll X position of a single element.
     * @param {HTMLElement|Document|Window} node The input node.
     * @returns {number} The scroll X position.
     */
    _getScrollX(node) {
        if (Core.isWindow(node)) {
            return node.scrollX;
        }

        if (Core.isDocument(node)) {
            return node.scrollingElement.scrollLeft;
        }

        return node.scrollLeft;
    },

    /**
     * Get the scroll Y position of a single element.
     * @param {HTMLElement|Document|Window} node The input node.
     * @returns {number} The scroll Y position.
     */
    _getScrollY(node) {
        if (Core.isWindow(node)) {
            return node.scrollY;
        }

        if (Core.isDocument(node)) {
            return node.scrollingElement.scrollTop;
        }

        return node.scrollTop;
    },

    /**
     * Scroll a single element to an X,Y position.
     * @param {HTMLElement|Document|Window} node The input node.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     */
    _setScroll(node, x, y) {
        if (Core.isWindow(node)) {
            return node.scroll(x, y);
        }

        if (Core.isDocument(node)) {
            node.scrollingElement.scrollLeft = x;
            node.scrollingElement.scrollTop = y;
            return;
        }

        node.scrollLeft = x;
        node.scrollTop = y;
    },

    /**
     * Scroll a single element to an X position.
     * @param {HTMLElement|Document|Window} node The input node.
     * @param {number} x The scroll X position.
     */
    _setScrollX(node, x) {
        if (Core.isWindow(node)) {
            return node.scroll(x, node.scrollY);
        }

        if (Core.isDocument(node)) {
            node.scrollingElement.scrollLeft = x;
            return;
        }

        node.scrollLeft = x;
    },

    /**
     * Scroll a single element to a Y position.
     * @param {HTMLElement|Document|Window} node The input node.
     * @param {number} y The scroll Y position.
     */
    _setScrollY(node, y) {
        if (Core.isWindow(node)) {
            return node.scroll(node.scrollX, y);
        }

        if (Core.isDocument(node)) {
            node.scrollingElement.scrollTop = y;
            return;
        }

        node.scrollTop = y;
    }

});
