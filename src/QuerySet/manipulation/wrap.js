/**
 * QuerySet Wrap
 */

Object.assign(QuerySet.prototype, {

    /**
     * Unwrap each node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {QuerySet} The QuerySet object.
     */
    unwrap(filter) {
        this._dom.unwrap(this, filter);

        return this;
    },

    /**
     * Wrap each nodes with other nodes.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     * @returns {QuerySet} The QuerySet object.
     */
    wrap(others) {
        this._dom.wrap(this, others);

        return this;
    },

    /**
     * Wrap all nodes with other nodes.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     * @returns {QuerySet} The QuerySet object.
     */
    wrapAll(others) {
        this._dom.wrapAll(this, others);

        return this;
    },

    /**
     * Wrap the contents of each node with other nodes.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     * @returns {QuerySet} The QuerySet object.
     */
    wrapInner(others) {
        this._dom.wrapInner(this, others);

        return this;
    }

});
