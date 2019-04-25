/**
 * DOM Filters
 */

Object.assign(DOM.prototype, {

    /**
     * Return a filtered array of nodes.
     * @param {string|Node|NodeList|HTMLCollection|Document|Node[]} nodes The input node(s), or a query selector string.
     * @param {DOM~filterCallback} [filter=DOM.isElement] The filter callback.
     * @returns {Node[]} The filtered array of nodes.
     */
    _nodeFilter(nodes, filter = DOM.isElement) {
        if (Core.isString(nodes)) {
            return this.find(nodes)
                .filter(filter);
        }

        if (filter(nodes)) {
            return [nodes];
        }

        return Core.wrap(nodes)
            .filter(filter);
    },

    /**
     * Return the first node matching a filter.
     * @param {string|Node|NodeList|HTMLCollection|Document|Node[]} nodes The input node(s), or a query selector string.
     * @param {DOM~filterCallback} [filter=DOM.isElement] The filter callback.
     * @returns {Node} The matching node.
     */
    _nodeFind(nodes, filter = DOM.isElement) {
        if (Core.isString(nodes)) {
            const node = this.findOne(nodes);
            if (filter(node)) {
                return node;
            }

            return null;
        }

        const node = Core.wrap(nodes).shift();

        if (filter(node)) {
            return node;
        }

        return null;
    },

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
    },

    /**
     * Return a filtered array of nodes from a query.
     * @param {string|Node|NodeList|HTMLCollection|Document|Node[]} nodes The input node(s), or a query selector or HTML string.
     * @param {DOM~filterCallback} [filter=DOM.isElement] The filter callback.
     * @returns {Node[]} The filtered array of nodes.
     */
    _parseQuery(query = '*', filter = DOM.isElement) {
        if (Core.isString(query) && query.trim().charAt(0) === '<') {
            return this.parseHTML(query);
        }

        return this._nodeFilter(query, filter);
    }

});
