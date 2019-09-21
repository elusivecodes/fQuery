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
            // Remove descendent elements
            const children = Core.wrap(DOMNode.childNodes(node));

            // Remove ShadowRoot
            if (DOM._hasShadow(node)) {
                const shadow = DOMNode.shadow(node);
                children.push(shadow);
            }

            // Remove DocumentFragment
            if (DOM._hasFragment(node)) {
                const fragment = DOMNode.fragment(node);
                children.push(fragment);
            }

            this.remove(children, true);
        }
    },

    /**
     * Remove each node from the DOM.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    remove(nodes) {
        nodes = this.parseNodes(nodes, { node: true, fragment: true, shadow: true });

        this.empty(nodes);

        for (const node of nodes) {
            DOMNode.triggerEvent(node, 'remove');

            if (Core.isElement(node)) {
                DOM._clearQueue(node);
                DOM._stop(node);

                if (DOM._styles.has(node)) {
                    DOM._styles.delete(node);
                }
            }

            this.removeEvent(node);
            DOM._removeData(node);

            // DocumentFragment and ShadowRoot nodes can not be removed
            if (Core.isNode(node)) {
                const parent = DOMNode.parent(node);

                if (!parent) {
                    continue;
                }

                DOMNode.removeChild(parent, node);
            }
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
            const parent = DOMNode.parent(node);

            if (!parent) {
                return;
            }

            for (const other of others) {
                const clone = DOM._clone(other, true);
                DOMNode.insertBefore(parent, clone, node);
            }

            this.remove(node);
        }
    }

});
