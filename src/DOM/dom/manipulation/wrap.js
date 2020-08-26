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
        nodes = this.parseNodes(nodes, {
            node: true
        });

        filter = this.parseFilter(filter);

        const parents = [];

        for (const node of nodes) {
            const parent = node.parentNode;

            if (!parent) {
                continue;
            }

            if (parents.includes(parent)) {
                continue;
            }

            if (filter && !filter(parent)) {
                continue;
            }

            parents.push(parent);
        }

        for (const parent of parents) {
            const outerParent = parent.parentNode;

            if (!outerParent) {
                continue;
            }

            const children = Core.wrap(parent.childNodes);

            for (const child of children) {
                outerParent.insertBefore(child, parent);
            }

            this.constructor._remove(parent);
            outerParent.removeChild(parent);
        }
    },

    /**
     * Wrap each nodes with other nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     */
    wrap(nodes, others) {

        // DocumentFragment and ShadowRoot nodes can not be wrapped
        nodes = this.parseNodes(nodes, {
            node: true
        });

        // ShadowRoot nodes can not be cloned
        others = this.parseNodes(others, {
            fragment: true,
            html: true
        });

        for (const node of nodes) {
            const parent = node.parentNode;

            if (!parent) {
                continue;
            }

            const clones = others.map(other =>
                this.constructor._clone(other, {
                    deep: true,
                    events: true,
                    data: true,
                    animations: true
                })
            );

            const firstClone = clones.slice().shift();

            const deepest = this.constructor._deepest(
                Core.isFragment(firstClone) ?
                    firstClone.firstChild :
                    firstClone
            );

            for (const clone of clones) {
                parent.insertBefore(clone, node);
            }

            deepest.insertBefore(node, null);
        }
    },

    /**
     * Wrap all nodes with other nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     */
    wrapAll(nodes, others) {

        // DocumentFragment and ShadowRoot nodes can not be wrapped
        nodes = this.parseNodes(nodes, {
            node: true
        });

        // ShadowRoot nodes can not be cloned
        others = this.parseNodes(others, {
            fragment: true,
            html: true
        });

        const clones = this.clone(others, {
            events: true,
            data: true,
            animations: true
        });

        const firstNode = nodes[0];

        if (!firstNode) {
            return;
        }

        const parent = firstNode.parentNode;

        if (!parent) {
            return;
        }

        const firstClone = clones[0];

        const deepest = this.constructor._deepest(
            Core.isFragment(firstClone) ?
                firstClone.firstChild :
                firstClone
        );

        for (const clone of clones) {
            parent.insertBefore(clone, firstNode);
        }

        for (const node of nodes) {
            deepest.insertBefore(node, null);
        }
    },

    /**
     * Wrap the contents of each node with other nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     */
    wrapInner(nodes, others) {
        nodes = this.parseNodes(nodes, {
            node: true,
            fragment: true,
            shadow: true
        });

        // ShadowRoot nodes can not be cloned
        others = this.parseNodes(others, {
            fragment: true,
            html: true
        });

        for (const node of nodes) {
            const children = Core.wrap(node.childNodes);

            const clones = others.map(other =>
                this.constructor._clone(other, {
                    deep: true,
                    events: true,
                    data: true,
                    animatinos: true
                })
            );

            const firstClone = clones.slice().shift();

            const deepest = this.constructor._deepest(
                Core.isFragment(firstClone) ?
                    firstClone.firstChild :
                    firstClone
            );

            for (const clone of clones) {
                node.insertBefore(clone, null);
            }

            for (const child of children) {
                deepest.insertBefore(child, null);
            }
        }
    }

});
