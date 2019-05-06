/**
 * DOM Manipulation
 */

Object.assign(DOM.prototype, {

    /**
     * Clone each node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {Boolean} [deep=true] Whether to also clone all descendent nodes.
     * @param {Boolean} [cloneEvents=false] Whether to also clone events.
     * @param {Boolean} [cloneData=false] Whether to also clone custom data.
     * @returns {array} The cloned nodes.
     */
    clone(nodes, deep = true, cloneEvents = false, cloneData = false) {

        // ShadowRoot nodes can not be cloned
        nodes = this._nodeFilter(nodes, { node: true, fragment: true });

        return nodes.map(node =>
            this._clone(node, deep, cloneEvents, cloneData)
        );
    },

    /**
     * Detach each node from the DOM.
     * @param {string|array|Node|HTMLElement|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     */
    detach(nodes) {

        // DocumentFragment nodes can not be detached
        nodes = this._nodeFilter(nodes, { node: true, shadow: true });

        for (const node of nodes) {
            DOM._detach(node);
        }
    },

    /**
     * Remove all children of each node from the DOM.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|HTMLCollection} nodes The input node(s), or a query selector string.
     */
    empty(nodes) {
        nodes = this._nodeFilter(nodes, { fragment: true, shadow: true, document: true });

        for (const node of nodes) {
            this._empty(node);
        }
    },

    /**
     * Remove each node from the DOM.
     * @param {string|array|Node|HTMLElement|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     */
    remove(nodes) {

        // DocumentFragment nodes can not be removed
        nodes = this._nodeFilter(nodes, { node: true, shadow: true });

        for (const node of nodes) {
            this._empty(node);
            this._remove(node);
        }
    },

    /**
     * Replace each other node with nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|Node|HTMLElement|ShadowRoot|NodeList|HTMLCollection} others The input node(s), or a query selector string.
     */
    replaceAll(nodes, others) {
        this.replaceWith(others, nodes);
    },

    /**
     * Replace each node with other nodes.
     * @param {string|array|Node|HTMLElement|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection} others The input node(s), or a query selector or HTML string.
     */
    replaceWith(nodes, others) {

        // DocumentFragment nodes can not be replaced
        nodes = this._nodeFilter(nodes, { node: true, shadow: true });

        // ShadowRoot nodes can not be cloned
        others = this._nodeFilter(others, { node: true, fragment: true, html: true });

        for (const node of nodes) {
            this._replaceWith(node, others);
        }
    },

    /**
     * Clone a single node.
     * @param {Node|HTMLElement|DocumentFragment} node The input node.
     * @param {Boolean} [deep=true] Whether to also clone all descendent nodes.
     * @param {Boolean} [cloneEvents=false] Whether to also clone events.
     * @param {Boolean} [cloneData=false] Whether to also clone custom data.
     * @returns {Node|HTMLElement|DocumentFragment} The cloned node.
     */
    _clone(node, deep = true, cloneEvents = false, cloneData = false) {
        const clone = DOM._clone(node, deep);

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
     * @param {Node|HTMLElement|DocumentFragment} node The input node.
     * @param {Node|HTMLElement|DocumentFragment} clone The cloned node.
     * @param {Boolean} [cloneEvents=false] Whether to also clone events.
     * @param {Boolean} [cloneData=false] Whether to also clone custom data.
     */
    _deepClone(node, clone, cloneEvents = false, cloneData = false) {
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
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     */
    _empty(node) {
        // Remove descendent elements
        const children = DOM._findBySelector('*', node);

        for (const child of children) {
            this._remove(child);
        }

        // Remove ShadowRoot
        if (DOM._hasShadow(node)) {
            const shadow = DOM._shadow(node);
            this._remove(shadow);
        }

        // Remove DocumentFragment
        if (DOM._hasFragment(node)) {
            const fragment = DOM._fragment(node);
            this._remove(fragment);
            node.removeChild(fragment);
        }
    },

    /**
     * Remove a single node from the DOM.
     * @param {HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     */
    _remove(node) {
        DOM._triggerEvent(node, 'remove');

        if (Core.isElement(node)) {
            this._clearQueue(node);
            this._stop(node);

            if (this._styles.has(node)) {
                this._styles.delete(node);
            }
        }

        this._removeEvent(node);
        this._removeData(node);

        // Remove ShadowRoot
        if (DOM._hasShadow(node)) {
            const shadow = DOM._shadow(node);
            this._remove(shadow);
        }

        // Remove DocumentFragment
        if (DOM._hasFragment(node)) {
            const fragment = DOM._fragment(node);
            this._remove(fragment);
            node.removeChild(fragment);
        }

        // DocumentFragment can not be detached
        if (!Core.isFragment(node)) {
            DOM._detach(node);
        }
    },

    /**
     * Replace a single node with other nodes.
     * @param {Node|HTMLElement|ShadowRoot} node The input node.
     * @param {array} others The other node(s).
     */
    _replaceWith(node, others) {
        DOM._before(
            node,
            this.clone(others, true)
        );
        this._remove(node);
    }

});
