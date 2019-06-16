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
        return DOMNode.getScrollX(
            DOMNode.scrollingElement(node)
        );
    },

    /**
     * Get the scroll Y position of a Document.
     * @param {Document} node The input node.
     * @returns {number} The scroll Y position.
     */
    _getScrollYDocument(node) {
        return DOMNode.getScrollY(
            DOMNode.scrollingElement(node)
        );
    },

    /**
     * Scroll a single node to an X,Y position.
     * @param {HTMLElement} node The input node.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     */
    _setScroll(node, x, y) {
        DOMNode.setScrollX(node, x);
        DOMNode.setScrollY(node, y);
    },

    /**
     * Scroll a Document to an X,Y position.
     * @param {Document} node The input node.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     */
    _setScrollDocument(node, x, y) {
        return this._setScroll(
            DOMNode.scrollingElement(node),
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
        return DOMNode.setScrollX(
            DOMNode.scrollingElement(node),
            x
        );
    },

    /**
     * Scroll a Window to an X position.
     * @param {Window} node The input node.
     * @param {number} x The scroll X position.
     */
    _setScrollXWindow(node, x) {
        return DOMNode.setScrollWindow(
            node,
            x,
            DOMNode.getScrollYWindow(node)
        );
    },

    /**
     * Scroll a single node to a Y position.
     * @param {Document} node The input node.
     * @param {number} y The scroll Y position.
     */
    _setScrollYDocument(node, y) {
        return DOMNode.setScrollY(
            DOMNode.scrollingElement(node),
            y
        );
    },

    /**
     * Scroll a Window to a Y position.
     * @param {Window} node The input node.
     * @param {number} y The scroll Y position.
     */
    _setScrollYWindow(node, y) {
        return DOMNode.setScrollWindow(
            node,
            DOMNode.getScrollXWindow(node),
            y
        );
    }

});
