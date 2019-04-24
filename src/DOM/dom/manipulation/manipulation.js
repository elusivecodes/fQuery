/**
 * DOM Manipulation
 */

Object.assign(DOM.prototype, {

    /**
     * Clone each node.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {Boolean} [deep=true] Whether to also clone all descendent nodes.
     * @param {Boolean} [cloneEvents=false] Whether to also clone events.
     * @param {Boolean} [cloneData=false] Whether to also clone custom data.
     * @returns {Node[]} The cloned nodes.
     */
    clone(nodes, deep = true, cloneEvents = false, cloneData = false) {
        return this._nodeFilter(nodes, DOM.isNode)
            .map(node =>
                this._clone(node, deep, cloneEvents, cloneData)
            );
    },

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
     * Extract selected nodes from the DOM.
     * @returns {Node[]} The selected nodes.
     */
    extractSelection() {
        const selection = window.getSelection();

        if (!selection.rangeCount) {
            return [];
        }

        const range = selection.getRangeAt(0);

        selection.removeAllRanges();

        return Core.merge([], range.extractContents().childNodes);
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
     * Clone a single node.
     * @param {Node} node The input node.
     * @param {Boolean} [deep=true] Whether to also clone all descendent nodes.
     * @param {Boolean} [cloneEvents=false] Whether to also clone events.
     * @param {Boolean} [cloneData=false] Whether to also clone custom data.
     * @returns {Node} The cloned node.
     */
    _clone(node, deep, cloneEvents, cloneData) {
        const clone = node.cloneNode(deep);

        if (!cloneEvents && !cloneData) {
            return clone;
        }

        if (cloneEvents) {
            this._cloneEvents(node, clone);
        }

        if (cloneData) {
            this._cloneData(node, clone);
        }

        if (deep) {
            this._deepClone(node, clone, cloneEvents, cloneData);
        }

        return clone;
    },

    /**
     * Deep clone a node.
     * @param {Node} node The input node.
     * @param {Node} clone The cloned node.
     * @param {Boolean} [cloneEvents=false] Whether to also clone events.
     * @param {Boolean} [cloneData=false] Whether to also clone custom data.
     */
    _deepClone(node, clone, cloneEvents, cloneData) {
        const children = DOM._children(node, false, false, false);
        const cloneChildren = DOM._children(clone, false, false, false);

        for (let i = 0; i < children.length; i++) {
            if (cloneEvents) {
                this._cloneEvents(children[i], cloneChildren[i]);
            }

            if (cloneData) {
                this._cloneData(children[i], cloneChildren[i]);
            }

            this._deepClone(children[i], cloneChildren[i]);
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
