/**
 * DOM Size
 */

Object.assign(DOM.prototype, {

    /**
     * Get the computed height of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} [innerOuter] Whether to include padding, border and margin heights.
     * @returns {number} The height.
     */
    height(nodes, innerOuter) {
        const node = this.parseNode(nodes, { document: true, window: true });

        if (!node) {
            return;
        }

        if (Core.isWindow(node)) {
            return innerOuter ?
                node.outerHeight :
                node.innerHeight;
        }

        if (Core.isUndefined(innerOuter)) {
            innerOuter = 1;
        }

        return this.constructor._height(node, innerOuter);
    },

    /**
     * Get the scroll height of the first node.
     * @param {string|array|HTMLElement|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {number} The scroll height.
     */
    scrollHeight(nodes) {
        const node = this.parseNode(nodes, { document: true });

        if (!node) {
            return;
        }

        return this.constructor._scrollHeight(node);
    },

    /**
     * Get the scroll width of the first node.
     * @param {string|array|HTMLElement|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {number} The scroll width.
     */
    scrollWidth(nodes) {
        const node = this.parseNode(nodes, { document: true });

        if (!node) {
            return;
        }

        return this.constructor._scrollWidth(node);
    },

    /**
     * Get the computed width of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} [innerOuter] Whether to include padding, border and margin widths.
     * @returns {number} The width.
     */
    width(nodes, innerOuter) {
        const node = this.parseNode(nodes, { document: true, window: true });

        if (!node) {
            return;
        }

        if (Core.isWindow(node)) {
            return innerOuter ?
                node.outerWidth :
                node.innerWidth;
        }

        if (Core.isUndefined(innerOuter)) {
            innerOuter = 1;
        }

        return this.constructor._width(node, innerOuter);
    }

});
