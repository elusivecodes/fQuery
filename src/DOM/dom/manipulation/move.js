/**
 * DOM Move
 */

Object.assign(DOM.prototype, {

    /**
     * Insert each other node after the first node.
     * @param {string|array|Node|HTMLElement|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} others The other node(s), or a query selector or HTML string.
     */
    after(nodes, others) {

        // DocumentFragment nodes have no parent
        const node = this._nodeFind(nodes, { node: true, shadow: true });

        if (!node) {
            return;
        }

        const parent = DOM._parent(node);

        if (!parent) {
            return;
        }

        others = this._nodeFilter(others, { node: true, fragment: true, shadow: true, html: true });

        for (const other of others.reverse()) {
            DOM._insertBefore(parent, other, node.nextSibling);
        }
    },

    /**
     * Append each other node to the first node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} others The other node(s), or a query selector or HTML string.
     */
    append(nodes, others) {
        const node = this._nodeFind(nodes, { fragment: true, shadow: true, document: true });

        if (!node) {
            return;
        }

        others = this._nodeFilter(others, { node: true, fragment: true, shadow: true, html: true });

        for (const other of others) {
            DOM._insertBefore(node, other);
        }
    },

    /**
     * Append each node to the first other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection} others The other node(s), or a query selector string.
     */
    appendTo(nodes, others) {
        this.append(others, nodes);
    },

    /**
     * Insert each other node before the first node.
     * @param {string|array|Node|HTMLElement|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} others The other node(s), or a query selector or HTML string.
     */
    before(nodes, others) {

        // DocumentFragment nodes have no parent
        const node = this._nodeFind(nodes, { node: true, shadow: true });

        if (!node) {
            return;
        }

        const parent = DOM._parent(node);

        if (!parent) {
            return;
        }

        others = this._nodeFilter(others, { node: true, fragment: true, shadow: true, html: true });

        for (const other of others) {
            DOM._insertBefore(parent, other, node);
        }
    },

    /**
     * Insert each node after the first other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|Node|HTMLElement|ShadowRoot|NodeList|HTMLCollection} others The other node(s), or a query selector string.
     */
    insertAfter(nodes, others) {
        this.after(others, nodes);
    },

    /**
     * Insert each node before the first other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|Node|HTMLElement|ShadowRoot|NodeList|HTMLCollection} others The other node(s), or a query selector string.
     */
    insertBefore(nodes, others) {
        this.before(others, nodes);
    },

    /**
     * Prepend each other node to the first node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} others The other node(s), or a query selector or HTML string.
     */
    prepend(nodes, others) {
        const node = this._nodeFind(nodes, { fragment: true, shadow: true, document: true });

        if (!node) {
            return;
        }

        others = this._nodeFilter(others, { node: true, fragment: true, shadow: true, html: true });

        for (const other of others.reverse()) {
            DOM._insertBefore(node, other, node.firstChild);
        }
    },

    /**
     * Prepend each node to the first other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection} others The other node(s), or a query selector string.
     */
    prependTo(nodes, others) {
        this.prepend(others, nodes);
    }

});
