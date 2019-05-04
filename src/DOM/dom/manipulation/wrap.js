/**
 * DOM Wrap
 */

Object.assign(DOM.prototype, {

    /**
     * Unwrap each node.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     */
    unwrap(nodes, filter) {
        nodes = this._nodeFilter(nodes, { node: true, shadow: true });

        for (const node of nodes) {
            this._unwrap(node, filter);
        }
    },

    /**
     * Wrap each nodes with other nodes.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|HTMLElement|HTMLCollection|ShadowRoot|HTMLElement[]} others The other node(s), or a query selector or HTML string.
     */
    wrap(nodes, others) {
        nodes = this._nodeFilter(nodes, { node: true, shadow: true });

        others = this._nodeFilter(others, { shadow: true, html: true });

        for (const node of nodes) {
            this._wrap(node, others);
        }
    },

    /**
     * Wrap all nodes with other nodes.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|HTMLElement|HTMLCollection|ShadowRoot|HTMLElement[]} others The other node(s), or a query selector or HTML string.
     */
    wrapAll(nodes, others) {
        nodes = this._nodeFilter(nodes, { node: true, shadow: true });

        others = this._nodeFilter(others, { shadow: true, html: true });

        const clone = this.clone(others, true);

        DOM._before(nodes, clone);

        const first = clone.shift(),
            deepest = Core.merge(
                [],
                DOM._findBySelector('*', first)
            ).find(node =>
                !DOM._hasChildren(node)
            ) || first;

        DOM._append(deepest, nodes);
    },

    /**
     * Wrap the contents of each node with other nodes.
     * @param {string|HTMLElement|HTMLCollection|ShadowRoot|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|HTMLElement|HTMLCollection|ShadowRoot|HTMLElement[]} others The other node(s), or a query selector or HTML string.
     */
    wrapInner(nodes, others) {
        nodes = this._nodeFilter(nodes, { node: true, shadow: true });

        others = this._nodeFilter(others, { shadow: true, html: true });

        for (const node of nodes) {
            this._wrapInner(node, others);
        }
    },

    /**
     * Unwrap a single node.
     * @param {Node} node The input node.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     */
    _unwrap(node, filter) {
        const parent = DOM._parent(node, filter).shift();

        if (!parent) {
            return;
        }

        const children = DOM._children(parent, false, false, false);

        DOM._before(parent, children);

        this._remove(parent);
    },

    /**
     * Wrap a single node with other nodes.
     * @param {Node} node The input node.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The other node(s), or a query selector or HTML string.
     */
    _wrap(node, others) {
        const clone = this.clone(others, true);
        DOM._before(node, clone);

        const first = clone.shift(),
            deepest = Core.merge(
                [],
                DOM._findBySelector('*', first)
            ).find(node =>
                !DOM._hasChildren(node)
            ) || first;

        DOM._append(deepest, [node]);
    },

    /**
     * Wrap the contents of a single node with other nodes.
     * @param {HTMLElement} node The input node.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The other node(s), or a query selector or HTML string.
     */
    _wrapInner(node, others) {
        const children = DOM._children(node, false, false, false),
            clone = this.clone(others, true);
        DOM._append(node, clone);

        const first = clone.shift(),
            deepest = Core.merge(
                [],
                DOM._findBySelector('*', first)
            ).find(node =>
                !DOM._hasChildren(node)
            ) || first;

        DOM._append(deepest, children);
    }

});
