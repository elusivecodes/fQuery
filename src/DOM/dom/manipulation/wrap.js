/**
 * DOM Wrap
 */

Object.assign(DOM.prototype, {

    /**
     * Unwrap each node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     */
    unwrap(nodes, filter) {

        // DocumentFragment and ShadowRoot nodes can not be unwrapped
        nodes = this.parseNodes(nodes, { node: true });

        filter = this.parseFilter(filter);

        for (const node of nodes) {
            this.constructor._unwrap(node, filter);
        }
    },

    /**
     * Wrap each nodes with other nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     */
    wrap(nodes, others) {

        // DocumentFragment and ShadowRoot nodes can not be wrapped
        nodes = this.parseNodes(nodes, { node: true });

        // ShadowRoot nodes can not be cloned
        others = this.parseNodes(others, { fragment: true, html: true });

        for (const node of nodes) {
            this.constructor._wrap(node, others);
        }
    },

    /**
     * Wrap all nodes with other nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     */
    wrapAll(nodes, others) {

        // DocumentFragment and ShadowRoot nodes can not be wrapped
        nodes = this.parseNodes(nodes, { node: true });

        // ShadowRoot nodes can not be cloned
        others = this.parseNodes(others, { fragment: true, html: true });

        const clones = this.clone(others, true);

        this.constructor._wrapAll(nodes, clones);
    },

    /**
     * Wrap the contents of each node with other nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     */
    wrapInner(nodes, others) {
        nodes = this.parseNodes(nodes, { node: true, fragment: true, shadow: true });

        // ShadowRoot nodes can not be cloned
        others = this.parseNodes(others, { fragment: true, html: true });

        for (const node of nodes) {
            this.constructor._wrapInner(node, others);
        }
    }

});
