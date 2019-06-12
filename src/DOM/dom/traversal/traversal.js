/**
 * DOM Traversal
 */

Object.assign(DOM.prototype, {

    /**
     * Return the first child of each node (optionally matching a filter).
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
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
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @param {Boolean} [elementsOnly=false] Whether to only return element nodes.
     * @returns {array} The matching nodes.
     */
    children(nodes, filter, first = false, elementsOnly = true) {
        filter = this._parseFilter(filter);

        if (Core.isElement(nodes) || Core.isDocument(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return this._children(nodes, filter, first, elementsOnly);
        }

        nodes = this._nodeFilter(nodes, { fragment: true, shadow: true, document: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                this._children(node, filter, first, elementsOnly)
            )
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return the closest ancestor to each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
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
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
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
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
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
     * Return the DocumentFragment of the first node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @returns {DocumentFragment} The DocumentFragment.
     */
    fragment(nodes) {
        const node = this._nodeFind(nodes);

        if (!node) {
            return;
        }

        return DOM._fragment(node);
    },

    /**
     * Return the next sibling for each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {array} The matching nodes.
     */
    next(nodes, filter) {
        filter = this._parseFilter(filter);

        if (Core.isNode(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return this._next(nodes, filter);
        }

        nodes = this._nodeFilter(nodes, { node: true, fragment: true, shadow: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                this._next(node, filter)
            )
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return all next siblings for each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {array} The matching nodes.
     */
    nextAll(nodes, filter, limit, first = false) {
        filter = this._parseFilter(filter);
        limit = this._parseFilter(limit);

        if (Core.isNode(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return this._nextAll(nodes, filter, limit, first);
        }

        nodes = this._nodeFilter(nodes, { node: true, fragment: true, shadow: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                this._nextAll(node, filter, limit, first)
            )
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return the offset parent (relatively positioned) of the first node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
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
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {array} The matching nodes.
     */
    parent(nodes, filter) {
        filter = this._parseFilter(filter);

        if (Core.isNode(nodes)) {
            return this._parent(nodes, filter);
        }

        // DocumentFragment and ShadowRoot nodes have no parent
        nodes = this._nodeFilter(nodes, { node: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                this._parent(node, filter)
            )
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return all parents of each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {array} The matching nodes.
     */
    parents(nodes, filter, limit, first = false) {
        filter = this._parseFilter(filter);
        limit = this._parseFilter(limit);

        if (Core.isNode(nodes)) {
            return this._parents(nodes, filter, limit, first);
        }

        // DocumentFragment and ShadowRoot nodes have no parent
        nodes = this._nodeFilter(nodes, { node: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                this._parents(node, filter, limit, first)
            )
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return the previous sibling for each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {array} The matching nodes.
     */
    prev(nodes, filter) {
        filter = this._parseFilter(filter);

        if (Core.isNode(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return this._prev(nodes, filter);
        }

        nodes = this._nodeFilter(nodes, { node: true, fragment: true, shadow: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                this._prev(node, filter)
            )
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return all previous siblings for each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {array} The matching nodes.
     */
    prevAll(nodes, filter, limit, first = false) {
        filter = this._parseFilter(filter);
        limit = this._parseFilter(limit);

        if (Core.isNode(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return this._prevAll(nodes, filter, limit, first);
        }

        nodes = this._nodeFilter(nodes, { node: true, fragment: true, shadow: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                this._prevAll(node, filter, limit, first)
            )
        }

        return nodes.length > 1 && results.length ?
            Core.unique(results) :
            results;
    },

    /**
     * Return the ShadowRoot of the first node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @returns {ShadowRoot} The ShadowRoot.
     */
    shadow(nodes) {
        const node = this._nodeFind(nodes);

        if (!node) {
            return;
        }

        return DOM._shadow(node);
    },

    /**
     * Return all siblings for each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
     * @returns {array} The matching nodes.
     */
    siblings(nodes, filter, elementsOnly = true) {
        filter = this._parseFilter(filter);

        if (Core.isNode(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return this._siblings(nodes, filter, elementsOnly);
        }

        nodes = this._nodeFilter(nodes, { node: true, fragment: true, shadow: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                this._siblings(node, filter, elementsOnly)
            )
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return all children of a single node (optionally matching a filter).
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @param {Boolean} [elementsOnly=false] Whether to only return element nodes.
     * @returns {array} The matching nodes.
     */
    _children(node, filter, first = false, elementsOnly = false) {
        const children = elementsOnly ?
            DOM._children(node) :
            DOM._childNodes(node),
            results = [];

        let child;
        for (child of children) {
            if (filter && !filter(child)) {
                continue;
            }

            results.push(child);
            if (first) {
                break;
            }
        }

        return results;
    },

    /**
     * Return the deepest child node for a single node.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @returns {HTMLElement} The deepest node.
     */
    _deepest(node) {
        return Core.merge(
            [],
            DOM._findBySelector('*', node)
        ).find(node =>
            !DOM._hasChildren(node)
        ) || node;
    },

    /**
     * Return the next sibling for a single node (optionally matching a filter).
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @returns {array} The matching nodes.
     */
    _next(node, filter) {
        const results = [];

        node = DOM._next(node);

        if (!node) {
            return results;
        }

        if (filter && !filter(node)) {
            return results;
        }

        results.push(node);

        return results;
    },

    /**
     * Return all next siblings for a single node (optionally matching a filter, and before a limit).
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {DOM~filterCallback} [limit] The limit function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {array} The matching nodes.
     */
    _nextAll(node, filter, limit, first = false) {
        const results = [];

        while (node = DOM._next(node)) {
            if (limit && limit(node)) {
                break;
            }

            if (filter && !filter(node)) {
                continue;
            }

            results.push(node);

            if (first) {
                break;
            }
        }

        return results;
    },

    /**
     * Return the parent of a single node (optionally matching a filter).
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @returns {array} The matching nodes.
     */
    _parent(node, filter) {
        const results = [];

        const parent = DOM._parent(node);

        if (!parent) {
            return results;
        }

        if (filter && !filter(parent)) {
            return results;
        }

        results.push(parent);

        return results;
    },

    /**
     * Return all parents of a single node (optionally matching a filter, and before a limit).
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {DOM~filterCallback} [limit] The limit function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {array} The matching nodes.
     */
    _parents(node, filter, limit, first = false) {
        const results = [];

        while (node = DOM._parent(node)) {
            if (Core.isDocument(node)) {
                break;
            }

            if (limit && limit(node)) {
                break;
            }

            if (filter && !filter(node)) {
                continue;
            }

            results.push(node);

            if (first) {
                break;
            }
        }

        return results;
    },

    /**
     * Return the previous sibling for a single node (optionally matching a filter).
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @returns {array} The matching nodes.
     */
    _prev(node, filter) {
        const results = [];

        node = DOM._prev(node);

        if (!node) {
            return results;
        }

        if (filter && !filter(node)) {
            return results;
        }

        results.push(node);

        return results;
    },

    /**
     * Return all previous siblings for a single node (optionally matching a filter, and before a limit).
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {DOM~filterCallback} [limit] The limit function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {array} The matching nodes.
     */
    _prevAll(node, filter, limit, first = false) {
        const results = [];

        while (node = DOM._prev(node)) {
            if (limit && limit(node)) {
                break;
            }

            if (filter && !filter(node)) {
                continue;
            }

            results.push(node);

            if (first) {
                break;
            }
        }

        return results;
    },

    /**
     * Return all siblings for a single node (optionally matching a filter).
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
     * @returns {array} The matching nodes.
     */
    _siblings(node, filter, elementsOnly = true) {
        const results = [];

        const parent = DOM._parent(node);

        if (!parent) {
            return results;
        }

        const siblings = elementsOnly ?
            parent.children :
            parent.childNodes;

        let sibling;
        for (sibling of siblings) {
            if (DOM._isSame(node, sibling)) {
                continue;
            }

            if (filter && !filter(sibling)) {
                continue;
            }

            results.push(sibling);
        }

        return results;
    }

});
