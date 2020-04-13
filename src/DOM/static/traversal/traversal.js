/**
 * DOM (Static) Traversal
 */

Object.assign(DOM, {

    /**
     * Return all children of a single node (optionally matching a filter).
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @param {Boolean} [elementsOnly=false] Whether to only return element nodes.
     * @returns {array} The matching nodes.
     */
    _children(node, filter, first = false, elementsOnly = false) {
        const children = Core.wrap(
            elementsOnly ?
                DOMNode.children(node) :
                DOMNode.childNodes(node)
        );
        const results = [];

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
        return Core.wrap(
            DOMNode.findBySelector('*', node)
        ).find(node =>
            !DOMNode.hasChildren(node)
        ) || node;
    },

    /**
     * Return the next sibling for a single node (optionally matching a filter).
     * @param {Node|HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @returns {array} The matching nodes.
     */
    _next(node, filter) {
        const results = [];

        node = DOMNode.next(node);

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
     * @param {Node|HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {DOM~filterCallback} [limit] The limit function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {array} The matching nodes.
     */
    _nextAll(node, filter, limit, first = false) {
        const results = [];

        while (node = DOMNode.next(node)) {
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
     * @param {Node|HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @returns {array} The matching nodes.
     */
    _parent(node, filter) {
        const results = [];

        const parent = DOMNode.parent(node);

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
     * @param {Node|HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {DOM~filterCallback} [limit] The limit function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {array} The matching nodes.
     */
    _parents(node, filter, limit, first = false) {
        const results = [];

        while (node = DOMNode.parent(node)) {
            if (Core.isDocument(node)) {
                break;
            }

            if (limit && limit(node)) {
                break;
            }

            if (filter && !filter(node)) {
                continue;
            }

            results.unshift(node);

            if (first) {
                break;
            }
        }

        return results;
    },

    /**
     * Return the previous sibling for a single node (optionally matching a filter).
     * @param {Node|HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @returns {array} The matching nodes.
     */
    _prev(node, filter) {
        const results = [];

        node = DOMNode.prev(node);

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
     * @param {Node|HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {DOM~filterCallback} [limit] The limit function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {array} The matching nodes.
     */
    _prevAll(node, filter, limit, first = false) {
        const results = [];

        while (node = DOMNode.prev(node)) {
            if (limit && limit(node)) {
                break;
            }

            if (filter && !filter(node)) {
                continue;
            }

            results.unshift(node);

            if (first) {
                break;
            }
        }

        return results;
    },

    /**
     * Return all siblings for a single node (optionally matching a filter).
     * @param {Node|HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
     * @returns {array} The matching nodes.
     */
    _siblings(node, filter, elementsOnly = true) {
        const results = [];

        const parent = DOMNode.parent(node);

        if (!parent) {
            return results;
        }

        const siblings = elementsOnly ?
            parent.children :
            parent.childNodes;

        let sibling;
        for (sibling of siblings) {
            if (DOMNode.isSame(node, sibling)) {
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
