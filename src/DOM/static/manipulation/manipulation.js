/**
 * DOM (Static) Manipulation
 */

Object.assign(DOM, {

    /**
     * Clone a single node.
     * @param {Node|HTMLElement|DocumentFragment} node The input node.
     * @param {Boolean} [deep=true] Whether to also clone all descendent nodes.
     * @param {Boolean} [cloneEvents=false] Whether to also clone events.
     * @param {Boolean} [cloneData=false] Whether to also clone custom data.
     * @returns {Node|HTMLElement|DocumentFragment} The cloned node.
     */
    _clone(node, deep = true, cloneEvents = false, cloneData = false) {
        const clone = DOMNode.clone(node, deep);

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
        const children = Core.wrap(DOMNode.childNodes(node));
        const cloneChildren = Core.wrap(DOMNode.childNodes(clone));

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
     * Detach a single node from the DOM.
     * @param {Node|HTMLElement} node The input node.
     */
    _detach(node) {
        const parent = DOMNode.parent(node);

        if (parent) {
            return;
        }

        DOMNode.removeChild(parent, node);
    },

    /**
     * Remove all children of a single node from the DOM.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     */
    _empty(node) {
        // Remove descendent elements
        const children = Core.wrap(DOMNode.childNodes(node));

        for (const child of children) {
            this._remove(child);
            DOMNode.removeChild(node, child);
        }

        // Remove ShadowRoot
        if (this._hasShadow(node)) {
            const shadow = DOMNode.shadow(node);
            this._remove(shadow);
        }

        // Remove DocumentFragment
        if (this._hasFragment(node)) {
            const fragment = DOMNode.fragment(node);
            this._remove(fragment);
        }
    },

    /**
     * Remove a single node from the DOM.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     */
    _remove(node) {
        DOMNode.triggerEvent(node, 'remove');

        this._empty(node);

        if (Core.isElement(node)) {
            this._clearQueue(node);
            this._stop(node);

            if (this._styles.has(node)) {
                this._styles.delete(node);
            }
        }

        this._removeEvent(node);
        this._removeData(node);
    },

    /**
     * Replace a single node with other nodes.
     * @param {Node|HTMLElement} node The input node.
     * @param {array} others The other node(s).
     */
    _replaceWith(node, others) {
        const parent = DOMNode.parent(node);

        if (!parent) {
            return;
        }

        for (const other of others) {
            const clone = this._clone(other, true);
            DOMNode.insertBefore(parent, clone, node);
        }

        this._remove(node);
        DOMNode.removeChild(parent, node);
    }

});
