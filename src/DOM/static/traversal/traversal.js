/**
 * DOM Traversal
 */

Object.assign(DOM, {

    /**
     * Return all children of a single element (optionally matching a filter).
     * @param {HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @param {Boolean} [elementsOnly=false] Whether to only return element nodes.
     * @returns {Node[]} The matching nodes.
     */
    _children(node, filter, first = false, elementsOnly = false) {
        const children = elementsOnly ?
            node.children :
            node.childNodes,
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
     * Return the parent of a single element (optionally matching a filter).
     * @param {HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @returns {HTMLElement[]} The matching nodes.
     */
    _parent(node, filter) {
        const results = [];

        if (!node.parentNode) {
            return results;
        }

        if (filter && !filter(node.parentNode)) {
            return results;
        }

        results.push(node.parentNode);

        return results;
    },

    /**
     * Return all parents of a single element (optionally matching a filter, and before a limit).
     * @param {HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {DOM~filterCallback} [limit] The limit function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {HTMLElement[]} The matching nodes.
     */
    _parents(node, filter, limit, closest = false) {
        const results = [];

        while (node = node.parentNode) {
            if (limit && limit(node)) {
                break;
            }

            if (filter && !filter(node)) {
                continue;
            }

            results.push(node);

            if (closest) {
                break;
            }
        }

        return results;
    },

    /**
     * Return the next sibling for a single element (optionally matching a filter).
     * @param {HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @returns {Node[]} The matching nodes.
     */
    _next(node, filter) {
        const results = [];

        while (node = node.nextSibling) {
            if (this.isElement(node)) {
                break;
            }
        }

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
     * Return all next siblings for a single element (optionally matching a filter, and before a limit).
     * @param {HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {DOM~filterCallback} [limit] The limit function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {Node[]} The matching nodes.
     */
    _nextAll(node, filter, limit, first = false) {
        const results = [];

        while (node = node.nextSibling) {
            if (!this.isElement(node)) {
                continue;
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
     * Return the previous sibling for a single element (optionally matching a filter).
     * @param {HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @returns {Node[]} The matching nodes.
     */
    _prev(node, filter) {
        const results = [];

        while (node = node.previousSibling) {
            if (this.isElement(node)) {
                break;
            }
        }

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
     * Return all previous siblings for a single element (optionally matching a filter, and before a limit).
     * @param {HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {DOM~filterCallback} [limit] The limit function.
     * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
     * @returns {Node[]} The matching nodes.
     */
    _prevAll(node, filter, limit, first = false) {
        const results = [];

        while (node = node.previousSibling) {
            if (!this.isElement(node)) {
                continue;
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
     * Return all siblings for a single element (optionally matching a filter).
     * @param {HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
     * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
     * @returns {Node[]} The matching nodes.
     */
    _siblings(node, filter, elementsOnly = true) {
        const results = [];

        if (!node.parentNode) {
            return results;
        }

        const siblings = elementsOnly ?
            node.parentNode.children :
            node.parentNode.childNodes;

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
