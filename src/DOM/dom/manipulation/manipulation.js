/**
 * DOM Manipulation
 */

Object.assign(DOM.prototype, {

    /**
     * Clone each node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {object} options Options for cloning the node.
     * @param {Boolean} [options.deep=true] Whether to also clone all descendent nodes.
     * @param {Boolean} [options.events] Whether to also clone events.
     * @param {Boolean} [options.data] Whether to also clone custom data.
     * @param {Boolean} [options.animations] Whether to also clone animations.
     * @returns {array} The cloned nodes.
     */
    clone(nodes, options) {
        options = {
            deep: true,
            ...options
        };

        // ShadowRoot nodes can not be cloned
        nodes = this.parseNodes(nodes, { node: true, fragment: true });

        return nodes.map(node =>
            this.constructor._clone(node, options)
        );
    },

    /**
     * Detach each node from the DOM.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @return {array} The detached nodes.
     */
    detach(nodes) {

        // DocumentFragment and ShadowRoot nodes can not be detached
        nodes = this.parseNodes(nodes, { node: true });

        for (const node of nodes) {
            const parent = DOMNode.parent(node);

            if (!parent) {
                continue;
            }

            DOMNode.removeChild(parent, node);
        }

        return nodes;
    },

    /**
     * Remove all children of each node from the DOM.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    empty(nodes) {
        nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

        for (const node of nodes) {
            this.constructor._empty(node);
        }
    },

    /**
     * Remove each node from the DOM.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    remove(nodes) {

        // DocumentFragment and ShadowRoot nodes can not be removed
        nodes = this.parseNodes(nodes, { node: true });

        for (const node of nodes) {
            const parent = DOMNode.parent(node);

            if (!parent) {
                continue;
            }

            this.constructor._remove(node);
            DOMNode.removeChild(parent, node);
        }
    },

    /**
     * Replace each other node with nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The input node(s), or a query selector string.
     */
    replaceAll(nodes, others) {
        this.replaceWith(others, nodes);
    },

    /**
     * Replace each node with other nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The input node(s), or a query selector or HTML string.
     */
    replaceWith(nodes, others) {

        // DocumentFragment and ShadowRoot nodes can not be removed
        nodes = this.parseNodes(nodes, { node: true });

        // ShadowRoot nodes can not be cloned
        others = this.parseNodes(others, { node: true, fragment: true, html: true });

        // Move nodes to a fragment so they don't get removed
        const fragment = this.createFragment();

        for (const other of others) {
            DOMNode.insertBefore(fragment, other);
        }

        others = Core.wrap(DOMNode.childNodes(fragment));

        nodes = nodes.filter(node =>
            !others.includes(node) &&
            !nodes.some(other =>
                !DOMNode.isSame(other, node) &&
                DOMNode.contains(other, node)
            )
        );

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

        for (const node of nodes) {
            const parent = DOMNode.parent(node);

            if (!parent) {
                continue;
            }

            this.constructor._remove(node);
            DOMNode.removeChild(parent, node);
        }
    }

});
