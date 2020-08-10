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
            return node.scrollX;
        }

        if (Core.isDocument(node)) {
            return this.constructor._getScrollXDocument(node);
        }

        return node.scrollLeft;
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
            return node.scrollY;
        }

        if (Core.isDocument(node)) {
            return this.constructor._getScrollYDocument(node);
        }

        return node.scrollTop;
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
                node.scroll(x, y);
            } else if (Core.isDocument(node)) {
                this.constructor._setScrollDocument(node, x, y);
            } else {
                this.constructor._setScroll(node, x, y);
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
                this.constructor._setScrollXWindow(node, x);
            } else if (Core.isDocument(node)) {
                this.constructor._setScrollXDocument(node, x);
            } else {
                node.scrollLeft = x;
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
                this.constructor._setScrollYWindow(node, y);
            } else if (Core.isDocument(node)) {
                this.constructor._setScrollYDocument(node, y);
            } else {
                node.scrollTop = y;
            }
        }
    }

});
