/**
 * DOM (Static) Scroll
 */

Object.assign(DOM, {

    /**
     * Get the scroll X position of a single node.
     * @param {HTMLElement} node The input node.
     * @returns {number} The scroll X position.
     */
    _getScrollX(node) {
        return node.scrollLeft;
    },

    /**
     * Get the scroll X position of a Window.
     * @param {Window} node The input node.
     * @returns {number} The scroll X position.
     */
    _getScrollXWindow(node) {
        return node.scrollX;
    },

    /**
     * Get the scroll Y position of a single node.
     * @param {HTMLElement} node The input node.
     * @returns {number} The scroll Y position.
     */
    _getScrollY(node) {
        return node.scrollTop;
    },

    /**
     * Get the scroll Y position of a Window.
     * @param {Document} node The input node.
     * @returns {number} The scroll Y position.
     */
    _getScrollYWindow(node) {
        return node.scrollY;
    },

    /**
     * Scroll a Window to an X,Y position.
     * @param {Window} node The input node.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     */
    _setScrollWindow(node, x, y) {
        return node.scroll(x, y);
    },

    /**
     * Scroll a single node to an X position.
     * @param {HTMLElement} node The input node.
     * @param {number} x The scroll X position.
     */
    _setScrollX(node, x) {
        node.scrollLeft = x;
    },

    /**
     * Scroll a single node to a Y position.
     * @param {HTMLElement|Document|Window} node The input node.
     * @param {number} y The scroll Y position.
     */
    _setScrollY(node, y) {
        node.scrollTop = y;
    }

});
