/**
 * DOM Scroll
 */

Object.assign(DOM.prototype, {

    /**
     * Get the scroll X position of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {number} The scroll X position.
     */
    getScrollX(nodes) {
        const node = this.parseNode(nodes, { document: true, window: true });

        if (!node) {
            return;
        }

        if (Core.isWindow(node)) {
            return DOMNode.getScrollXWindow(node);
        }

        if (Core.isDocument(node)) {
            return DOM._getScrollXDocument(node);
        }

        return DOMNode.getScrollX(node);
    },

    /**
     * Get the scroll Y position of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {number} The scroll Y position.
     */
    getScrollY(nodes) {
        const node = this.parseNode(nodes, { document: true, window: true });

        if (!node) {
            return;
        }

        if (Core.isWindow(node)) {
            return DOMNode.getScrollYWindow(node);
        }

        if (Core.isDocument(node)) {
            return DOM._getScrollYDocument(node);
        }

        return DOMNode.getScrollY(node);
    },

    /**
     * Scroll each node to an X,Y position.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     */
    setScroll(nodes, x, y) {
        nodes = this.parseNodes(nodes, { document: true, window: true });

        for (const node of nodes) {
            if (Core.isWindow(node)) {
                DOMNode.setScrollWindow(node, x, y);
            } else if (Core.isDocument(node)) {
                DOM._setScrollDocument(node, x, y);
            } else {
                DOM._setScroll(node, x, y);
            }
        }
    },

    /**
     * Scroll each node to an X position.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} x The scroll X position.
     */
    setScrollX(nodes, x) {
        nodes = this.parseNodes(nodes, { document: true, window: true });

        for (const node of nodes) {
            if (Core.isWindow(node)) {
                DOM._setScrollXWindow(node, x);
            } else if (Core.isDocument(node)) {
                DOM._setScrollXDocument(node, x);
            } else {
                DOMNode.setScrollX(node, x);
            }
        }
    },

    /**
     * Scroll each node to a Y position.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} y The scroll Y position.
     */
    setScrollY(nodes, y) {
        nodes = this.parseNodes(nodes, { document: true, window: true });

        for (const node of nodes) {
            if (Core.isWindow(node)) {
                DOM._setScrollYWindow(node, y);
            } else if (Core.isDocument(node)) {
                DOM._setScrollYDocument(node, y);
            } else {
                DOMNode.setScrollY(node, y);
            }
        }
    }

});
