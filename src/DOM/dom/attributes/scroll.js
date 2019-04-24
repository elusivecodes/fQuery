/**
 * DOM Scroll
 */

Object.assign(DOM.prototype, {

    /**
     * Get the scroll X position of the first element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {number} The scroll X position.
     */
    getScrollX(nodes) {
        const node = this._nodeFind(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node));

        if (!node) {
            return;
        }

        return DOM._getScrollX(node);
    },

    /**
     * Get the scroll Y position of the first element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {number} The scroll Y position.
     */
    getScrollY(nodes) {
        const node = this._nodeFind(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node));

        if (!node) {
            return;
        }

        return DOM._getScrollY(node);
    },

    /**
     * Scroll each element to an X,Y position.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     */
    setScroll(nodes, x, y) {
        for (const node of this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))) {
            DOM._setScroll(node, x, y);
        }
    },

    /**
     * Scroll each element to an X position.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {number} x The scroll X position.
     */
    setScrollX(nodes, x) {
        for (const node of this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))) {
            DOM._setScrollX(node, x);
        }
    },

    /**
     * Scroll each element to a Y position.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {number} y The scroll Y position.
     */
    setScrollY(nodes, y) {
        for (const node of this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))) {
            DOM._setScrollY(node, y);
        }
    }

});
