/**
 * DOM Scroll
 */

Object.assign(DOM.prototype, {

    /**
     * Get the scroll X position of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @returns {number} The scroll X position.
     */
    getScrollX(nodes) {
        const node = this._nodeFind(nodes, { document: true, window: true });

        if (!node) {
            return;
        }

        if (Core.isWindow(node)) {
            return DOM._getScrollXWindow(node);
        }

        if (Core.isDocument(node)) {
            return this._getScrollXDocument(node);
        }

        return DOM._getScrollX(node);
    },

    /**
     * Get the scroll Y position of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @returns {number} The scroll Y position.
     */
    getScrollY(nodes) {
        const node = this._nodeFind(nodes, { document: true, window: true });

        if (!node) {
            return;
        }

        if (Core.isWindow(node)) {
            return DOM._getScrollYWindow(node);
        }

        if (Core.isDocument(node)) {
            return this._getScrollYDocument(node);
        }

        return DOM._getScrollY(node);
    },

    /**
     * Scroll each node to an X,Y position.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     */
    setScroll(nodes, x, y) {
        nodes = this._nodeFilter(nodes, { document: true, window: true });

        for (const node of nodes) {
            if (Core.isWindow(node)) {
                DOM._setScrollWindow(node, x, y);
            } else if (Core.isDocument(node)) {
                this._setScrollDocument(node, x, y);
            } else {
                this._setScroll(node, x, y);
            }
        }
    },

    /**
     * Scroll each node to an X position.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {number} x The scroll X position.
     */
    setScrollX(nodes, x) {
        nodes = this._nodeFilter(nodes, { document: true, window: true });

        for (const node of nodes) {
            if (Core.isWindow(node)) {
                this._setScrollXWindow(node, x);
            } else if (Core.isDocument(node)) {
                this._setScrollXDocument(node, x);
            } else {
                DOM._setScrollX(node, x);
            }
        }
    },

    /**
     * Scroll each node to a Y position.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {number} y The scroll Y position.
     */
    setScrollY(nodes, y) {
        nodes = this._nodeFilter(nodes, { document: true, window: true });

        for (const node of nodes) {
            if (Core.isWindow(node)) {
                this._setScrollYWindow(node, y);
            } else if (Core.isDocument(node)) {
                this._setScrollYDocument(node, y);
            } else {
                DOM._setScrollY(node, y);
            }
        }
    },

    /**
     * Get the scroll X position of a Document.
     * @param {Document} node The input node.
     * @returns {number} The scroll X position.
     */
    _getScrollXDocument(node) {
        return DOM._getScrollX(DOM._scrollingElement(node));
    },

    /**
     * Get the scroll Y position of a Document.
     * @param {Document} node The input node.
     * @returns {number} The scroll Y position.
     */
    _getScrollYDocument(node) {
        return DOM._getScrollY(DOM._scrollingElement(node));
    },

    /**
     * Scroll a single node to an X,Y position.
     * @param {HTMLElement} node The input node.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     */
    _setScroll(node, x, y) {
        DOM._setScrollX(node, x);
        DOM._setScrollY(node, y);
    },

    /**
     * Scroll a Document to an X,Y position.
     * @param {Document} node The input node.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     */
    _setScrollDocument(node, x, y) {
        return this._setScroll(
            DOM._scrollingElement(node),
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
        return DOM._setScrollX(
            DOM._scrollingElement(node),
            x
        );
    },

    /**
     * Scroll a Window to an X position.
     * @param {Window} node The input node.
     * @param {number} x The scroll X position.
     */
    _setScrollXWindow(node, x) {
        return DOM._setScrollWindow(
            node,
            x,
            DOM._getScrollYWindow(node)
        );
    },

    /**
     * Scroll a single node to a Y position.
     * @param {Document} node The input node.
     * @param {number} y The scroll Y position.
     */
    _setScrollYDocument(node, y) {
        return DOM._setScrollY(
            DOM._scrollingElement(node),
            y
        );
    },

    /**
     * Scroll a Window to a Y position.
     * @param {Window} node The input node.
     * @param {number} y The scroll Y position.
     */
    _setScrollYWindow(node, y) {
        return DOM._setScrollWindow(
            node,
            DOM._getScrollXWindow(node),
            y
        );
    }


});
