/**
 * DOM Nodes
 */

Object.assign(DOM.prototype, {

    /**
     * Normalize nodes (remove empty text nodes, and join neighbouring text nodes).
     * @param {string|Node|NodeList|HTMLCollection|Document|Node[]} nodes The input node(s), or a query selector string.
     */
    normalize(nodes) {
        for (const node of this._nodeFilter(nodes, DOM.isNode)) {
            DOM._normalize(node);
        }
    },

    /**
     * Sorts nodes by their position in the document
     * @param {string|Node|NodeList|HTMLCollection|Document|Node[]} nodes The input node(s), or a query selector string.
     * @returns {Node[]} The sorted array of nodes.
     */
    sortNodes(nodes) {
        return this._nodeFilter(nodes, DOM.isNode)
            .sort(DOM._compareNodes);
    },

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
