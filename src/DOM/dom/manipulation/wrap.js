/**
 * DOM Wrap
 */

Object.assign(DOM.prototype, {

    /**
     * Unwrap each node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     */
    unwrap(nodes, filter) {

        // DocumentFragment and ShadowRoot nodes can not be unwrapped
        nodes = this._nodeFilter(nodes, { node: true });

        filter = this._parseFilter(filter);

        for (const node of nodes) {
            this._unwrap(node, filter);
        }
    },

    /**
     * Wrap each nodes with other nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection} others The other node(s), or a query selector or HTML string.
     */
    wrap(nodes, others) {

        // DocumentFragment and ShadowRoot nodes can not be wrapped
        nodes = this._nodeFilter(nodes, { node: true });

        // ShadowRoot nodes can not be cloned
        others = this._nodeFilter(others, { fragment: true, html: true });

        for (const node of nodes) {
            this._wrap(node, others);
        }
    },

    /**
     * Wrap all nodes with other nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection} others The other node(s), or a query selector or HTML string.
     */
    wrapAll(nodes, others) {

        // DocumentFragment and ShadowRoot nodes can not be wrapped
        nodes = this._nodeFilter(nodes, { node: true });

        const firstNode = nodes.slice().shift();

        if (!firstNode) {
            return;
        }

        const parent = DOM._parent(firstNode);

        if (!parent) {
            return;
        }

        // ShadowRoot nodes can not be cloned
        others = this._nodeFilter(others, { fragment: true, html: true });

        const clones = this.clone(others, true);

        for (const clone of clones) {
            DOM._insertBefore(parent, clone, firstNode);
        }

        const deepest = this._deepest(clones.shift());

        for (const node of nodes) {
            DOM._insertBefore(deepest, node);
        }
    },

    /**
     * Wrap the contents of each node with other nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection} others The other node(s), or a query selector or HTML string.
     */
    wrapInner(nodes, others) {
        nodes = this._nodeFilter(nodes, { node: true, fragment: true, shadow: true });

        // ShadowRoot nodes can not be cloned
        others = this._nodeFilter(others, { fragment: true, html: true });

        for (const node of nodes) {
            this._wrapInner(node, others);
        }
    },

    /**
     * Unwrap a single node.
     * @param {Node|HTMLElement} node The input node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     */
    _unwrap(node, filter) {
        const parent = DOM._parent(node, filter);

        if (!parent) {
            return;
        }

        const outerParent = DOM._parent(parent);

        if (!parent) {
            return;
        }

        const children = DOM._childNodes(parent);
        for (const child of children) {
            DOM._insertBefore(outerParent, child, parent);
        }
        this._remove(parent);
    },

    /**
     * Wrap a single node with other nodes.
     * @param {Node|HTMLElement} node The input node.
     * @param {string|array|HTMLElement|DocumentFragment|HTMLCollection} others The other node(s), or a query selector or HTML string.
     */
    _wrap(node, others) {
        const parent = DOM._parent(node);

        if (!parent) {
            return;
        }

        const clones = this.clone(others, true);

        for (const clone of clones) {
            DOM._insertBefore(parent, clone, node);
        }

        const deepest = this._deepest(clones.shift());

        DOM._insertBefore(deepest, node);
    },

    /**
     * Wrap the contents of a single node with other nodes.
     * @param {HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     * @param {string|array|HTMLElement|DocumentFragment|HTMLCollection} others The other node(s), or a query selector or HTML string.
     */
    _wrapInner(node, others) {
        const children = DOM._childNodes(node),
            clones = this.clone(others, true);

        for (const clone of clones) {
            DOM._insertBefore(node, clone);
        }

        const deepest = this._deepest(clones.shift());

        for (const child of children) {
            DOM._insertBefore(deepest, child);
        }
    }

});
