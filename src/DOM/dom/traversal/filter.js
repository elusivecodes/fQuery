/**
 * DOM Filter
 */

Object.assign(DOM.prototype, {

    /**
     * Return all elements matching a filter.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {HTMLElement[]} The filtered nodes.
     */
    filter(nodes, filter) {
        filter = this._parseFilter(filter);

        return this._nodeFilter(
            nodes,
            (node, index) => DOM.isElement(node) && (!filter || filter(node, index))
        );
    },

    /**
     * Return the first element matching a filter.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {HTMLElement} The filtered node.
     */
    filterOne(nodes, filter) {
        filter = this._parseFilter(filter);

        return this._nodeFind(
            nodes,
            (node, index) => DOM.isElement(node) && (!filter || filter(node, index))
        ) || null;
    },

    /**
     * Return all elements not matching a filter.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {HTMLElement[]} The filtered nodes.
     */
    not(nodes, filter) {
        filter = this._parseFilter(filter);

        if (!filter) {
            return [];
        }

        return this._nodeFilter(
            nodes,
            (node, index) => DOM.isElement(node) && !filter(node, index)
        );
    },

    /**
     * Return the first element not matching a filter.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {HTMLElement} The filtered node.
     */
    notOne(nodes, filter) {
        filter = this._parseFilter(filter);

        if (!filter) {
            return null;
        }

        return this._nodeFind(
            nodes,
            (node, index) => DOM.isElement(node) && !filter(node, index)
        ) || null;
    },

    /**
     * Return all elements with a descendent matching a filter.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {HTMLElement[]} The filtered nodes.
     */
    has(nodes, filter) {
        filter = this._parseFilterContains(filter);

        return this._nodeFilter(
            nodes,
            (node, index) => (DOM.isElement(node) || DOM.isDocument(node)) && (!filter || filter(node, index))
        );
    },

    /**
     * Return the first element with a descendent matching a filter.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {HTMLElement} The filtered node.
     */
    hasOne(nodes, filter) {
        filter = this._parseFilterContains(filter);

        return this._nodeFind(
            nodes,
            (node, index) => (DOM.isElement(node) || DOM.isDocument(node)) && (!filter || filter(node, index))
        ) || null;
    },

    /**
     * Return all hidden elements.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {HTMLElement[]} The filtered nodes.
     */
    hidden(nodes) {
        return this._nodeFilter(
            nodes,
            node => (DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node)) && this.isHidden(node)
        );
    },

    /**
     * Return the first hidden element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {HTMLElement} The filtered node.
     */
    hiddenOne(nodes) {
        return this._nodeFind(
            nodes,
            node => (DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node)) && this.isHidden(node)
        ) || null;
    },

    /**
     * Return all visible elements.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {HTMLElement[]} The filtered nodes.
     */
    visible(nodes) {
        return this._nodeFilter(
            nodes,
            node => (DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node)) && this.isVisible(node)
        );
    },

    /**
     * Return the first visible element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {HTMLElement} The filtered node.
     */
    visibleOne(nodes) {
        return this._nodeFind(
            nodes,
            node => (DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node)) && this.isVisible(node)
        ) || null;
    }

});
