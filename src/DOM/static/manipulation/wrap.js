/**
 * DOM (Static) Wrap
 */

Object.assign(DOM, {

    /**
     * Unwrap a single node.
     * @param {Node|HTMLElement} node The input node.
     * @param {DOM~filterCallback} [filter] The filter function.
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
        DOMNode.removeChild(outerParent, parent);
    },

    /**
     * Wrap a single node with other nodes.
     * @param {Node|HTMLElement} node The input node.
     * @param {array} others The other node(s).
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
     * Wrap all nodes with other nodes.
     * @param {array} nodes The input node(s).
     * @param {array} others The other node(s).
     */
    _wrapAll(nodes, others) {
        const firstNode = nodes.slice().shift();

        if (!firstNode) {
            return;
        }

        const parent = DOMNode.parent(firstNode);

        if (!parent) {
            return;
        }

        for (const other of others) {
            DOMNode.insertBefore(parent, other, firstNode);
        }

        const deepest = DOM._deepest(others.shift());

        for (const node of nodes) {
            DOMNode.insertBefore(deepest, node);
        }
    },

    /**
     * Wrap the contents of a single node with other nodes.
     * @param {HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     * @param {array} others The other node(s).
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
