/**
 * DOM (Static) Scroll
 */

Object.assign(DOM, {

    /**
     * Get the scroll X position of a Document.
     * @param {Document} node The input node.
     * @returns {number} The scroll X position.
     */
    _getScrollXDocument(node) {
        return node.scrollingElement.scrollLeft;
    },

    /**
     * Get the scroll Y position of a Document.
     * @param {Document} node The input node.
     * @returns {number} The scroll Y position.
     */
    _getScrollYDocument(node) {
        return node.scrollingElement.scrollTop;
    },

    /**
     * Scroll a single node to an X,Y position.
     * @param {HTMLElement} node The input node.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     */
    _setScroll(node, x, y) {
        node.scrollLeft = x;
        node.scrollTop = y;
    },

    /**
     * Scroll a Document to an X,Y position.
     * @param {Document} node The input node.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     */
    _setScrollDocument(node, x, y) {
        this._setScroll(
            node.scrollingElement,
            x,
            y
        );
    },

    /**
     * Scroll a Document to an X position.
     * @param {Document} node The input node.
     * @param {number} x The scroll X position.
     */
    _setScrollXDocument(node, x) {
        node.scrollingElement.scrollLeft = x;
    },

    /**
     * Scroll a Window to an X position.
     * @param {Window} node The input node.
     * @param {number} x The scroll X position.
     */
    _setScrollXWindow(node, x) {
        return node.scroll(x, node.scrollY);
    },

    /**
     * Scroll a single node to a Y position.
     * @param {Document} node The input node.
     * @param {number} y The scroll Y position.
     */
    _setScrollYDocument(node, y) {
        node.scrollingElement.scrollTop = y;
    },

    /**
     * Scroll a Window to a Y position.
     * @param {Window} node The input node.
     * @param {number} y The scroll Y position.
     */
    _setScrollYWindow(node, y) {
        return node.scroll(node.scrollX, y);
    }

});
