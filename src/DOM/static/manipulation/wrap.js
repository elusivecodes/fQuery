/**
 * DOM (Static) Wrap
 */

Object.assign(DOM, {

    /**
     * Unwrap a single node.
     * @param {Node|HTMLElement} parent The input node.
     */
    _unwrap(parent) {
        const outerParent = parent.parentNode;

        if (!outerParent) {
            return;
        }

        const children = Core.wrap(parent.childNodes);

        for (const child of children) {
            outerParent.insertBefore(child, parent);
        }

        this._remove(parent);
        outerParent.removeChild(parent);
    },

    /**
     * Wrap a single node with other nodes.
     * @param {Node|HTMLElement} node The input node.
     * @param {array} others The other node(s).
     */
    _wrap(node, others) {
        const parent = node.parentNode;

        if (!parent) {
            return;
        }

        const clones = others.map(other =>
            this._clone(other, {
                deep: true,
                events: true,
                data: true,
                animations: true
            })
        );

        const firstClone = clones.slice().shift();

        const deepest = this._deepest(
            Core.isFragment(firstClone) ?
                firstClone.firstChild :
                firstClone
        );

        for (const clone of clones) {
            parent.insertBefore(clone, node);
        }

        deepest.insertBefore(node, null);
    },

    /**
     * Wrap all nodes with other nodes.
     * @param {array} nodes The input node(s).
     * @param {array} others The other node(s).
     */
    _wrapAll(nodes, others) {
        const firstNode = nodes[0];

        if (!firstNode) {
            return;
        }

        const parent = firstNode.parentNode;

        if (!parent) {
            return;
        }

        const firstOther = others[0];

        const deepest = this._deepest(
            Core.isFragment(firstOther) ?
                firstOther.firstChild :
                firstOther
        );

        for (const other of others) {
            parent.insertBefore(other, firstNode);
        }

        for (const node of nodes) {
            deepest.insertBefore(node, null);
        }
    },

    /**
     * Wrap the contents of a single node with other nodes.
     * @param {HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     * @param {array} others The other node(s).
     */
    _wrapInner(node, others) {
        const children = Core.wrap(node.childNodes);

        const clones = others.map(other =>
            this._clone(other, {
                deep: true,
                events: true,
                data: true,
                animatinos: true
            })
        );

        const firstClone = clones.slice().shift();

        const deepest = this._deepest(
            Core.isFragment(firstClone) ?
                firstClone.firstChild :
                firstClone
        );

        for (const clone of clones) {
            node.insertBefore(clone, null);
        }

        for (const child of children) {
            deepest.insertBefore(child, null);
        }
    }

});
