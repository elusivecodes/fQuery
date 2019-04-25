/**
 * DOM Manipulation
 */

Object.assign(DOM.prototype, {

    /**
     * Detach each node from the DOM.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     */
    detach(nodes) {
        for (const node of this._nodeFilter(nodes, DOM.isNode)) {
            DOM._detach(node);
        }
    },

    /**
     * Remove all children of each node from the DOM.
     * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} nodes The input node(s), or a query selector string.
     */
    empty(nodes) {
        for (const node of this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node))) {
            this._empty(node);
        }
    },

    /**
     * Remove each node from the DOM.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     */
    remove(nodes) {
        for (const node of this._nodeFilter(nodes, DOM.isNode)) {
            this._remove(node);
        }
    },

    /**
     * Replace each other node with nodes.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector or HTML string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector string.
     */
    replaceAll(nodes, others) {
        this.replaceWith(others, nodes);
    },

    /**
     * Replace each node with other nodes.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector or HTML string.
     */
    replaceWith(nodes, others) {
        others = this._parseQuery(others, DOM.isNode);

        for (const node of this._nodeFilter(nodes, DOM.isNode)) {
            this._replaceWith(node, others);
        }
    },

    /**
     * Remove all children of a single node from the DOM.
     * @param {HTMLElement} node The input node.
     */
    _empty(node) {
        for (const child of DOM._children(node, false, false, false)) {
            this._remove(child);
        }
    },

    /**
     * Remove a single node from the DOM.
     * @param {Node} node The input node.
     */
    _remove(node) {
        if (DOM.isElement(node)) {
            this._empty(node);
        }

        this._clearQueue(node);
        this._stop(node);

        if (this._styles.has(node)) {
            this._styles.delete(node);
        }

        DOM._detach(node);
        DOM._triggerEvent(node, 'remove');

        this._removeEvent(node);
        this._removeData(node);
    },

    /**
     * Replace a single node with other nodes.
     * @param {Node} node The input node.
     * @param {Node[]} others The other node(s).
     */
    _replaceWith(node, others) {
        DOM._before(
            node,
            this.clone(others, true)
        );
        this._remove(node);
    }

});
