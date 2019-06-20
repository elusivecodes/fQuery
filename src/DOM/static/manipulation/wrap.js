/**
 * DOM (Static) Wrap
 */

Object.assign(DOM, {

    /**
     * Unwrap a single node.
     * @param {Node|HTMLElement} node The input node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     */
    _unwrap(node, filter) {
        const parent = DOMNode.parent(node, filter);

        if (!parent) {
            return;
        }

        const outerParent = DOMNode.parent(parent);

        if (!parent) {
            return;
        }

        const children = Core.wrap(DOMNode.childNodes(parent));

        for (const child of children) {
            DOMNode.insertBefore(outerParent, child, parent);
        }

        this._remove(parent);
    },

    /**
     * Wrap a single node with other nodes.
     * @param {Node|HTMLElement} node The input node.
     * @param {string|array|HTMLElement|DocumentFragment|HTMLCollection} others The other node(s), or a query selector or HTML string.
     */
    _wrap(node, others) {
        const parent = DOMNode.parent(node);

        if (!parent) {
            return;
        }

        const clones = others.map(other =>
            this._clone(other, true)
        );

        for (const clone of clones) {
            DOMNode.insertBefore(parent, clone, node);
        }

        const deepest = this._deepest(clones.shift());

        DOMNode.insertBefore(deepest, node);
    },

    /**
     * Wrap the contents of a single node with other nodes.
     * @param {HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     * @param {string|array|HTMLElement|DocumentFragment|HTMLCollection} others The other node(s), or a query selector or HTML string.
     */
    _wrapInner(node, others) {
        const children = Core.wrap(DOMNode.childNodes(node));

        const clones = others.map(other =>
            this._clone(other, true)
        );

        for (const clone of clones) {
            DOMNode.insertBefore(node, clone);
        }

        const deepest = this._deepest(clones.shift());

        for (const child of children) {
            DOMNode.insertBefore(deepest, child);
        }
    }

});
