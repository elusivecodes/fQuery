/**
 * DOM Filter
 */

Object.assign(DOM.prototype, {

    /**
     * Return all nodes matching a filter.
     * @param {string|array|Node|HTMLElement|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {array} The filtered nodes.
     */
    filter(nodes, filter) {
        filter = this._parseFilter(filter);

        return this._nodeFilter(nodes, { node: true, shadow: true })
            .filter((node, index) => !filter || filter(node, index));
    },

    /**
     * Return the first node matching a filter.
     * @param {string|array|Node|HTMLElement|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {Node|HTMLElement|ShadowRoot} The filtered node.
     */
    filterOne(nodes, filter) {
        filter = this._parseFilter(filter);

        return this._nodeFilter(nodes, { node: true, shadow: true })
            .find((node, index) => !filter || filter(node, index)) || null;
    },

    /**
     * Return all nodes with a descendent matching a filter.
     * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {array} The filtered nodes.
     */
    has(nodes, filter) {
        filter = this._parseFilterContains(filter);

        return this._nodeFilter(nodes, { shadow: true, document: true })
            .filter((node, index) => !filter || filter(node, index));
    },

    /**
     * Return the first node with a descendent matching a filter.
     * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {HTMLElement|ShadowRoot|Document} The filtered node.
     */
    hasOne(nodes, filter) {
        filter = this._parseFilterContains(filter);

        return this._nodeFilter(nodes, { shadow: true, document: true })
            .find((node, index) => !filter || filter(node, index)) || null;
    },

    /**
     * Return all hidden nodes.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection} nodes The input node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    hidden(nodes) {
        return this._nodeFilter(nodes, { shadow: true, document: true, window: true })
            .filter(node => DOM._isHidden(node));
    },

    /**
     * Return the first hidden node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection} nodes The input node(s), or a query selector string.
     * @returns {HTMLElement|ShadowRoot|Document|Window} The filtered node.
     */
    hiddenOne(nodes) {
        return this._nodeFilter(nodes, { shadow: true, document: true, window: true })
            .find(node => DOM._isHidden(node)) || null;
    },

    /**
     * Return all nodes not matching a filter.
     * @param {string|array|Node|HTMLElement|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {array} The filtered nodes.
     */
    not(nodes, filter) {
        filter = this._parseFilter(filter);

        if (!filter) {
            return [];
        }

        return this._nodeFilter(nodes, { node: true, shadow: true })
            .filter((node, index) => !filter(node, index));
    },

    /**
     * Return the first node not matching a filter.
     * @param {string|array|Node|HTMLElement|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {HTMLElement|ShadowRoot|Document} The filtered node.
     */
    notOne(nodes, filter) {
        filter = this._parseFilter(filter);

        if (!filter) {
            return null;
        }

        return this._nodeFilter(nodes, { node: true, shadow: true })
            .find((node, index) => !filter(node, index)) || null;
    },

    /**
     * Return all visible nodes.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection} nodes The input node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    visible(nodes) {
        return this._nodeFilter(nodes, { shadow: true, document: true, window: true })
            .filter(node => DOM._isVisible(node));
    },

    /**
     * Return the first visible node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection} nodes The input node(s), or a query selector string.
     * @returns {HTMLElement|ShadowRoot|Document|Window} The filtered node.
     */
    visibleOne(nodes) {
        return this._nodeFilter(nodes, { shadow: true, document: true, window: true })
            .find(node => DOM._isVisible(node)) || null;
    }

});
