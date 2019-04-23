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
        this._nodeFilter(nodes, DOM.isNode)
            .forEach(node =>
                this._unwrap(node, filter)
            );
    },

    /**
     * Wrap each nodes with other nodes.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The other node(s), or a query selector or HTML string.
     */
    wrap(nodes, others) {
        others = this._parseQuery(others);

        this._nodeFilter(nodes, DOM.isNode)
            .forEach(node =>
                this._wrap(node, others)
            );
    },

    /**
     * Wrap all nodes with other nodes.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The other node(s), or a query selector or HTML string.
     */
    wrapAll(nodes, others) {
        others = this._parseQuery(others);

        const clone = this.clone(others, true);

        DOM._before(nodes, clone);
        const first = clone.shift();

        DOM._append(
            Core.merge(
                [],
                DOM._findBySelector('*', first)
            ).find(node =>
                !DOM._hasChildren(node)
            ) || first,
            nodes
        );
    },

    /**
     * Wrap the contents of each node with other nodes.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The other node(s), or a query selector or HTML string.
     */
    wrapInner(nodes, others) {
        others = this._parseQuery(others);

        this._nodeFilter(nodes, DOM.isNode)
            .forEach(node =>
                this._wrapInner(node, others)
            );
    },

    /**
     * Wrap selected nodes with other nodes.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     */
    wrapSelection(nodes) {
        const selection = window.getSelection();

        if (!selection.rangeCount) {
            return;
        }

        nodes = this._parseQuery(nodes);

        const range = selection.getRangeAt(0);

        selection.removeAllRanges();

        const first = nodes.slice().shift();
        DOM._append(
            Core.merge(
                [],
                DOM._findBySelector('*', first)
            ).find(node =>
                !DOM._hasChildren(node)
            ) || first,
            Core.merge(
                [],
                range.extractContents().childNodes
            )
        );

        nodes.forEach(node =>
            range.insertNode(node)
        );
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

        DOM._before(
            parent,
            DOM._children(parent, false, false, false)
        );

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

        const first = clone.shift();
        DOM._append(
            Core.merge(
                [],
                DOM._findBySelector('*', first)
            ).find(node =>
                !DOM._hasChildren(node)
            ) || first,
            [node]
        );
    },

    /**
     * Wrap the contents of a single node with other nodes.
     * @param {HTMLElement} node The input node.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The other node(s), or a query selector or HTML string.
     */
    _wrapInner(node, others) {
        const clone = this.clone(others, true);
        const children = DOM._children(node, false, false, false);
        DOM._append(node, clone);

        const first = clone.shift();
        DOM._append(
            Core.merge(
                [],
                DOM._findBySelector('*', first)
            ).find(node =>
                !DOM._hasChildren(node)
            ) || first,
            children
        );
    }

});
