/**
 * DOM Traversal
 */

Object.assign(DOM.prototype, {

    /**
     * Return the first child of each node (optionally matching a filter).
     * @param {string|array|HTMLElement|HTMLCollection|ShadowRoot|Document} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {array} The matching nodes.
     */
    child(nodes, filter) {
        return this.children(
            nodes,
            filter,
            true
        );
    },

    /**
     * Return all children of each node (optionally matching a filter).
     * @param {string|array|HTMLElement|HTMLCollection|ShadowRoot|Document} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @param {Boolean} [elementsOnly=false] Whether to only return element nodes.
     * @returns {array} The matching nodes.
     */
    children(nodes, filter, first = false, elementsOnly = true) {
        filter = this._parseFilter(filter);

        if (Core.isElement(nodes) || Core.isDocument(nodes) || Core.isShadow(nodes)) {
            return DOM._children(nodes, filter, first, elementsOnly);
        }

        nodes = this._nodeFilter(nodes, { shadow: true, document: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                DOM._children(node, filter, first, elementsOnly)
            )
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return the closest ancestor to each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @returns {array} The matching nodes.
     */
    closest(nodes, filter, limit) {
        return this.parents(
            nodes,
            filter,
            limit,
            true
        );
    },

    /**
     * Return the common ancestor of all nodes.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot} nodes The input node(s), or a query selector string.
     * @returns {HTMLElement} The common ancestor.
     */
    commonAncestor(nodes) {
        nodes = this.sort(nodes);

        if (!nodes.length) {
            return;
        }

        const range = this.createRange();

        if (nodes.length === 1) {
            DOM._select(range, nodes.shift());
        } else {
            DOM._setStartBefore(range, nodes.shift());
            DOM._setEndAfter(range, nodes.pop());
        }

        return range.commonAncestorContainer;
    },

    /**
     * Return all children of each node (including text and comment nodes).
     * @param {string|array|HTMLElement|HTMLCollection|ShadowRoot|Document} nodes The input node(s), or a query selector string.
     * @returns {array} The matching nodes.
     */
    contents(nodes) {
        return this.children(
            nodes,
            false,
            false,
            false
        );
    },

    /**
     * Return the next sibling for each node (optionally matching a filter).
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {array} The matching nodes.
     */
    next(nodes, filter) {
        filter = this._parseFilter(filter);

        if (Core.isNode(nodes) || Core.isShadow(nodes)) {
            return DOM._next(nodes, filter);
        }

        nodes = this._nodeFilter(nodes, { node: true, shadow: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                DOM._next(node, filter)
            )
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return all next siblings for each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {array} The matching nodes.
     */
    nextAll(nodes, filter, limit, first = false) {
        filter = this._parseFilter(filter);
        limit = this._parseFilter(limit);

        if (Core.isNode(nodes) || Core.isShadow(nodes)) {
            return DOM._nextAll(nodes, filter, limit, first);
        }

        nodes = this._nodeFilter(nodes, { node: true, shadow: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                DOM._nextAll(node, filter, limit, first)
            )
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return the offset parent (relatively positioned) of the first node.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot} nodes The input node(s), or a query selector string.
     * @returns {HTMLElement} The offset parent.
     */
    offsetParent(nodes) {
        return this.forceShow(
            nodes,
            node => node.offsetParent
        );
    },

    /**
     * Return the parent of each node (optionally matching a filter).
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {array} The matching nodes.
     */
    parent(nodes, filter) {
        filter = this._parseFilter(filter);

        if (Core.isNode(nodes) || Core.isShadow(nodes)) {
            return DOM._parent(nodes, filter);
        }

        nodes = this._nodeFilter(nodes, { node: true, shadow: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                DOM._parent(node, filter)
            )
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return all parents of each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {array} The matching nodes.
     */
    parents(nodes, filter, limit, first = false) {
        filter = this._parseFilter(filter);
        limit = this._parseFilter(limit);

        if (Core.isNode(nodes) || Core.isShadow(nodes)) {
            return DOM._parents(nodes, filter, limit, first);
        }

        nodes = this._nodeFilter(nodes, { node: true, shadow: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                DOM._parents(node, filter, limit, first)
            )
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return the previous sibling for each node (optionally matching a filter).
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {array} The matching nodes.
     */
    prev(nodes, filter) {
        filter = this._parseFilter(filter);

        if (Core.isNode(nodes) || Core.isShadow(nodes)) {
            return DOM._prev(nodes, filter);
        }

        nodes = this._nodeFilter(nodes, { node: true, shadow: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                DOM._prev(node, filter)
            )
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return all previous siblings for each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {array} The matching nodes.
     */
    prevAll(nodes, filter, limit, first = false) {
        filter = this._parseFilter(filter);
        limit = this._parseFilter(limit);

        if (Core.isNode(nodes) || Core.isShadow(nodes)) {
            return DOM._prevAll(nodes, filter, limit, first);
        }

        nodes = this._nodeFilter(nodes, { node: true, shadow: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                DOM._prevAll(node, filter, limit, first)
            )
        }

        return nodes.length > 1 && results.length ?
            Core.unique(results) :
            results;
    },

    /**
     * Return all siblings for each node (optionally matching a filter).
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
     * @returns {array} The matching nodes.
     */
    siblings(nodes, filter, elementsOnly = true) {
        filter = this._parseFilter(filter);

        if (Core.isNode(nodes) || Core.isShadow(nodes)) {
            return DOM._siblings(nodes, filter, elementsOnly);
        }

        nodes = this._nodeFilter(nodes, { node: true, shadow: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                DOM._siblings(node, filter, elementsOnly)
            )
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    }

});
