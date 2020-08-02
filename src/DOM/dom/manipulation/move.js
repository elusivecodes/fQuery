/**
 * DOM Move
 */

Object.assign(DOM.prototype, {

    /**
     * Insert each other node after each node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     */
    after(nodes, others) {

        // DocumentFragment and ShadowRoot nodes can not have siblings
        nodes = this.parseNodes(nodes, { node: true });

        // ShadowRoot nodes can not be moved
        others = this.parseNodes(others, { node: true, fragment: true, html: true }).reverse();

        const lastNode = nodes[nodes.length - 1];

        for (const node of nodes) {
            const parent = DOMNode.parent(node);

            if (!parent) {
                continue;
            }

            for (const other of others) {
                DOMNode.insertBefore(
                    parent,
                    DOMNode.isSame(node, lastNode) ?
                        other :
                        this.constructor._clone(other, {
                            deep: true,
                            events: true,
                            data: true,
                            animations: true
                        }),
                    DOMNode.next(node)
                );
            }
        }
    },

    /**
     * Append each other node to each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     */
    append(nodes, others) {
        nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

        // ShadowRoot nodes can not be moved
        others = this.parseNodes(others, { node: true, fragment: true, html: true });

        const lastNode = nodes[nodes.length - 1];

        for (const node of nodes) {
            for (const other of others) {
                DOMNode.insertBefore(
                    node,
                    DOMNode.isSame(node, lastNode) ?
                        other :
                        this.constructor._clone(other, {
                            deep: true,
                            events: true,
                            data: true,
                            animations: true
                        })
                );
            }
        }
    },

    /**
     * Append each node to each other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     */
    appendTo(nodes, others) {
        this.append(others, nodes);
    },

    /**
     * Insert each other node before each node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     */
    before(nodes, others) {

        // DocumentFragment and ShadowRoot nodes can not have siblings
        nodes = this.parseNodes(nodes, { node: true });

        // ShadowRoot nodes can not be moved
        others = this.parseNodes(others, { node: true, fragment: true, html: true });

        const lastNode = nodes[nodes.length - 1];

        for (const node of nodes) {
            const parent = DOMNode.parent(node);

            if (!parent) {
                continue;
            }

            for (const other of others) {
                DOMNode.insertBefore(
                    parent,
                    DOMNode.isSame(node, lastNode) ?
                        other :
                        this.constructor._clone(other, {
                            deep: true,
                            events: true,
                            data: true,
                            animations: true
                        }),
                    node
                );
            }
        }
    },

    /**
     * Insert each node after each other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     */
    insertAfter(nodes, others) {
        this.after(others, nodes);
    },

    /**
     * Insert each node before each other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     */
    insertBefore(nodes, others) {
        this.before(others, nodes);
    },

    /**
     * Prepend each other node to each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection} others The other node(s), or a query selector or HTML string.
     */
    prepend(nodes, others) {
        nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

        // ShadowRoot nodes can not be moved
        others = this.parseNodes(others, { node: true, fragment: true, html: true });

        const lastNode = nodes[nodes.length - 1];

        for (const node of nodes) {
            const firstChild = DOMNode.firstChild(node);

            for (const other of others) {
                DOMNode.insertBefore(
                    node,
                    DOMNode.isSame(node, lastNode) ?
                        other :
                        this.constructor._clone(other, {
                            deep: true,
                            events: true,
                            data: true,
                            animations: true
                        }),
                    firstChild
                );
            }
        }
    },

    /**
     * Prepend each node to each other node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     */
    prependTo(nodes, others) {
        this.prepend(others, nodes);
    }

});
