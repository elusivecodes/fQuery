/**
 * DOM Move
 */

Object.assign(DOM.prototype, {

    /**
     * Insert each other node after the first node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection} others The other node(s), or a query selector or HTML string.
     */
    after(nodes, others) {

        // DocumentFragment and ShadowRoot nodes can not have siblings
        const node = this.parseNode(nodes, { node: true });

        if (!node) {
            return;
        }

        const parent = DOMNode.parent(node);

        if (!parent) {
            return;
        }

        // ShadowRoot nodes can not be moved
        others = this.parseNodes(others, { node: true, fragment: true, html: true });

        for (const other of others.reverse()) {
            DOMNode.insertBefore(parent, other, DOMNode.next(node));
        }
    },

    /**
     * Append each other node to the first node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection} others The other node(s), or a query selector or HTML string.
     */
    append(nodes, others) {
        const node = this.parseNode(nodes, { fragment: true, shadow: true, document: true });

        if (!node) {
            return;
        }

        // ShadowRoot nodes can not be moved
        others = this.parseNodes(others, { node: true, fragment: true, html: true });

        for (const other of others) {
            DOMNode.insertBefore(node, other);
        }
    },

    /**
     * Append each node to the first other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection} others The other node(s), or a query selector string.
     */
    appendTo(nodes, others) {
        this.append(others, nodes);
    },

    /**
     * Insert each other node before the first node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection} others The other node(s), or a query selector or HTML string.
     */
    before(nodes, others) {

        // DocumentFragment and ShadowRoot nodes can not have siblings
        const node = this.parseNode(nodes, { node: true });

        if (!node) {
            return;
        }

        const parent = DOMNode.parent(node);

        if (!parent) {
            return;
        }

        // ShadowRoot nodes can not be moved
        others = this.parseNodes(others, { node: true, fragment: true, html: true });

        for (const other of others) {
            DOMNode.insertBefore(parent, other, node);
        }
    },

    /**
     * Insert each node after the first other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection} others The other node(s), or a query selector string.
     */
    insertAfter(nodes, others) {
        this.after(others, nodes);
    },

    /**
     * Insert each node before the first other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection} others The other node(s), or a query selector string.
     */
    insertBefore(nodes, others) {
        this.before(others, nodes);
    },

    /**
     * Prepend each other node to the first node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection} others The other node(s), or a query selector or HTML string.
     */
    prepend(nodes, others) {
        const node = this.parseNode(nodes, { fragment: true, shadow: true, document: true });

        if (!node) {
            return;
        }

        const firstChild = DOMNode.firstChild(node);

        // ShadowRoot nodes can not be moved
        others = this.parseNodes(others, { node: true, fragment: true, html: true });

        for (const other of others.reverse()) {
            DOMNode.insertBefore(node, other, firstChild);
        }
    },

    /**
     * Prepend each node to the first other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection} others The other node(s), or a query selector string.
     */
    prependTo(nodes, others) {
        this.prepend(others, nodes);
    }

});
