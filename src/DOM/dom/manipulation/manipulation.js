/**
 * DOM Manipulation
 */

Object.assign(DOM.prototype, {

    /**
     * Clone each node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {Boolean} [deep=true] Whether to also clone all descendent nodes.
     * @param {Boolean} [cloneEvents=false] Whether to also clone events.
     * @param {Boolean} [cloneData=false] Whether to also clone custom data.
     * @returns {array} The cloned nodes.
     */
    clone(nodes, deep = true, cloneEvents = false, cloneData = false) {

        // ShadowRoot nodes can not be cloned
        nodes = this.parseNodes(nodes, { node: true, fragment: true });

        return nodes.map(node =>
            DOM._clone(node, deep, cloneEvents, cloneData)
        );
    },

    /**
     * Detach each node from the DOM.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
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
    },

    /**
     * Remove all children of each node from the DOM.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    empty(nodes) {
        nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

        for (const node of nodes) {
            DOM._empty(node);
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

            DOM._remove(node);
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

        for (const node of nodes) {
            DOM._replaceWith(node, others);
        }
    }

});
