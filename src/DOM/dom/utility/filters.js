/**
 * DOM Filters
 */

Object.assign(DOM.prototype, {

    /**
     * Return an element filter callback.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
     * @returns {DOM~filterCallback} The element filter callback.
     */
    _parseFilter(filter) {
        if (!filter) {
            return false;
        }

        if (Core.isFunction(filter)) {
            return filter;
        }

        if (Core.isString(filter)) {
            return node =>
                DOM.isElement(node) &&
                DOM._is(node, filter);
        }

        if (DOM.isNode(filter)) {
            return node => DOM._isSame(node, filter);
        }

        filter = this._nodeFilter(filter);
        if (filter.length) {
            return node => filter.includes(node);
        }

        return false;
    },

    /**
     * Return an element contains filter callback.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
     * @returns {DOM~filterCallback} The element contains filter callback.
     */
    _parseFilterContains(filter) {
        if (!filter) {
            return false;
        }

        if (Core.isFunction(filter)) {
            return filter;
        }

        if (Core.isString(filter)) {
            return node => !!this.findOne(filter, node);
        }

        if (DOM.isElement(filter)) {
            return node => DOM._has(node, filter);
        }

        filter = this._nodeFilter(filter);
        if (filter.length) {
            return node => !!filter.find(other => DOM._has(node, other));
        }

        return false;
    }

});
