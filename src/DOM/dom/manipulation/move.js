/**
 * DOM Move
 */

Object.assign(DOM.prototype, {

    /**
     * Insert each other node after the first node.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector or HTML string.
     */
    after(nodes, others) {
        const node = this._nodeFind(nodes, DOM.isNode);

        if (!node) {
            return;
        }

        DOM._after(
            node,
            this._parseQuery(others, DOM.isNode)
        );
    },

    /**
     * Insert each node after the selection.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     */
    afterSelection(nodes) {
        const selection = window.getSelection();

        if (!selection.rangeCount) {
            return;
        }

        nodes = this._parseQuery(nodes);

        const range = selection.getRangeAt(0);

        selection.removeAllRanges();

        range.collapse();

        nodes.forEach(node =>
            range.insertNode(node)
        );
    },

    /**
     * Append each other node to the first node.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector or HTML string.
     */
    append(nodes, others) {
        const node = this._nodeFind(nodes);

        if (!node) {
            return;
        }

        DOM._append(
            node,
            this._parseQuery(others, DOM.isNode)
        );
    },

    /**
     * Append each node to the first other node.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector or HTML string.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The other node(s), or a query selector string.
     */
    appendTo(nodes, others) {
        this.append(others, nodes);
    },

    /**
     * Insert each other node before the first node.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector or HTML string.
     */
    before(nodes, others) {
        const node = this._nodeFind(nodes, DOM.isNode);

        if (!node) {
            return;
        }

        DOM._before(
            node,
            this._parseQuery(others, DOM.isNode)
        );
    },

    /**
     * Insert each node before the selection.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     */
    beforeSelection(nodes) {
        const selection = window.getSelection();

        if (!selection.rangeCount) {
            return;
        }

        nodes = this._parseQuery(nodes);

        const range = selection.getRangeAt(0);

        selection.removeAllRanges();

        nodes.forEach(node =>
            range.insertNode(node)
        );
    },

    /**
     * Insert each node after the first other node.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector or HTML string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector string.
     */
    insertAfter(nodes, others) {
        this.after(others, nodes);
    },

    /**
     * Insert each node before the first other node.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector or HTML string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector string.
     */
    insertBefore(nodes, others) {
        this.before(others, nodes);
    },

    /**
     * Prepend each other node to the first node.
     * @param {string|HTMLElement|HTMLElement|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector or HTML string.
     */
    prepend(nodes, others) {
        const node = this._nodeFind(nodes);

        if (!node) {
            return;
        }

        DOM._prepend(
            node,
            this._parseQuery(others, DOM.isNode)
        );
    },

    /**
     * Prepend each node to the first other node.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector or HTML string.
     * @param {string|HTMLElement|HTMLElement|HTMLElement[]} others The other node(s), or a query selector string.
     */
    prependTo(nodes, others) {
        this.prepend(others, nodes);
    }

});
