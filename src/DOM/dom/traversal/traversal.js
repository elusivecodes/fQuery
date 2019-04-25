/**
 * DOM Traversal
 */

Object.assign(DOM.prototype, {

    /**
     * Return the first child of each element (optionally matching a filter).
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {HTMLElement[]} The matching nodes.
     */
    child(nodes, filter) {
        return this.children(
            nodes,
            filter,
            true
        );
    },

    /**
     * Return all children of each element (optionally matching a filter).
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @param {Boolean} [elementsOnly=false] Whether to only return element nodes.
     * @returns {Node[]} The matching nodes.
     */
    children(nodes, filter, first = false, elementsOnly = true) {
        filter = this._parseFilter(filter);

        if (Core.isElement(nodes)) {
            return DOM._children(nodes, filter, first, elementsOnly);
        }

        nodes = this._nodeFilter(nodes);

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
     * Return the closest ancestor to each element (optionally matching a filter, and before a limit).
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @returns {HTMLElement[]} The matching nodes.
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
     * Return the common ancestor of all elements.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {HTMLElement} The common ancestor.
     */
    commonAncestor(nodes) {
        nodes = this.sort(nodes);

        if (!nodes.length) {
            return;
        }

        const range = this.context.createRange();

        if (nodes.length == 1) {
            range.selectNode(nodes.shift());
        } else {
            range.setStartBefore(nodes.shift());
            range.setEndAfter(nodes.pop());
        }

        return range.commonAncestorContainer;
    },

    /**
     * Return all children of each element (including text and comment nodes).
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {Node[]} The matching nodes.
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
     * Return the parent of each element (optionally matching a filter).
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {HTMLElement[]} The matching nodes.
     */
    parent(nodes, filter) {
        filter = this._parseFilter(filter);

        if (Core.isNode(nodes)) {
            return DOM._parent(nodes, filter);
        }

        nodes = this._nodeFilter(nodes, Core.isNode);

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
     * Return all parents of each element (optionally matching a filter, and before a limit).
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Array|Node|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|Array|Node|NodeList|HTMLCollection|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {HTMLElement[]} The matching nodes.
     */
    parents(nodes, filter, limit, first = false) {
        filter = this._parseFilter(filter);
        limit = this._parseFilter(limit);

        if (Core.isNode(nodes)) {
            return DOM._parent(nodes, filter, limit, first);
        }

        nodes = this._nodeFilter(nodes, Core.isNode);

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
     * Return the offset parent (relatively positioned) of the first element.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {HTMLElement} The offset parent.
     */
    offsetParent(nodes) {
        return this.forceShow(
            nodes,
            node => node.offsetParent
        );
    },

    /**
     * Return the next sibling for each element (optionally matching a filter).
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {Node[]} The matching nodes.
     */
    next(nodes, filter) {
        filter = this._parseFilter(filter);

        if (Core.isElement(nodes)) {
            return DOM._next(nodes, filter);
        }

        nodes = this._nodeFilter(nodes);

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
     * Return all next siblings for each element (optionally matching a filter, and before a limit).
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {Node[]} The matching nodes.
     */
    nextAll(nodes, filter, limit, first = false) {
        filter = this._parseFilter(filter);
        limit = this._parseFilter(limit);

        if (Core.isElement(nodes)) {
            return DOM._nextAll(nodes, filter, limit, first);
        }

        nodes = this._nodeFilter(nodes);

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
     * Return the previous sibling for each element (optionally matching a filter).
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {Node[]} The matching nodes.
     */
    prev(nodes, filter) {
        filter = this._parseFilter(filter);

        if (Core.isElement(nodes)) {
            return DOM._prev(nodes, filter);
        }

        nodes = this._nodeFilter(nodes);

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
     * Return all previous siblings for each element (optionally matching a filter, and before a limit).
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {Node[]} The matching nodes.
     */
    prevAll(nodes, filter, limit, first = false) {
        filter = this._parseFilter(filter);
        limit = this._parseFilter(limit);

        if (Core.isElement(nodes)) {
            return DOM._prevAll(nodes, filter, limit, first);
        }

        nodes = this._nodeFilter(nodes);

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
     * Return all siblings for each element (optionally matching a filter).
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
     * @returns {Node[]} The matching nodes.
     */
    siblings(nodes, filter, elementsOnly = true) {
        filter = this._parseFilter(filter);

        if (Core.isElement(nodes)) {
            return DOM._siblings(nodes, filter, elementsOnly);
        }

        nodes = this._nodeFilter(nodes);

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                DOM._siblings(node, filter, elementsOnlyt)
            )
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

});
