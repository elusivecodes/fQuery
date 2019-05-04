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
        const node = this._nodeFind(nodes, { node: true, shadow: true });

        if (!node) {
            return;
        }

        others = this._nodeFilter(others, { node: true, shadow: true, html: true });

        DOM._after(node, others);
    },

    /**
     * Append each other node to the first node.
     * @param {string|HTMLElement|HTMLCollection|ShadowRoot|Document|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector or HTML string.
     */
    append(nodes, others) {
        const node = this._nodeFind(nodes, { shadow: true, document: true });

        if (!node) {
            return;
        }

        others = this._nodeFilter(others, { node: true, shadow: true, html: true });

        DOM._append(node, others);
    },

    /**
     * Append each node to the first other node.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector or HTML string.
     * @param {string|HTMLElement|HTMLCollection|ShadowRoot|Document|HTMLElement[]} others The other node(s), or a query selector string.
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
        const node = this._nodeFind(nodes, { node: true, shadow: true });

        if (!node) {
            return;
        }

        others = this._nodeFilter(others, { node: true, shadow: true, html: true });

        DOM._before(node, others);
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
     * @param {string|HTMLElement|HTMLElement|ShadowRoot|Document|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector or HTML string.
     */
    prepend(nodes, others) {
        const node = this._nodeFind(nodes, { shadow: true, document: true });

        if (!node) {
            return;
        }

        others = this._nodeFilter(others, { node: true, shadow: true, html: true });

        DOM._prepend(node, others);
    },

    /**
     * Prepend each node to the first other node.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector or HTML string.
     * @param {string|HTMLElement|HTMLElement|ShadowRoot|Document|HTMLElement[]} others The other node(s), or a query selector string.
     */
    prependTo(nodes, others) {
        this.prepend(others, nodes);
    }

});
