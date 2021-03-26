/**
 * DOM (Static) Manipulation
 */

Object.assign(DOM, {

    /**
     * Clone a single node.
     * @param {Node|HTMLElement|DocumentFragment} node The input node.
     * @param {object} options Options for cloning the node.
     * @param {Boolean} [options.deep] Whether to also clone all descendent nodes.
     * @param {Boolean} [options.events] Whether to also clone events.
     * @param {Boolean} [options.data] Whether to also clone custom data.
     * @param {Boolean} [options.animations] Whether to also clone animations.
     * @returns {Node|HTMLElement|DocumentFragment} The cloned node.
     */
    _clone(node, options) {
        const clone = node.cloneNode(options.deep);

        if (options.events) {
            this._cloneEvents(node, clone);
        }

        if (options.data) {
            this._cloneData(node, clone);
        }

        if (options.animations) {
            Animation.clone(node, clone);
        }

        if (options.deep) {
            this._deepClone(node, clone, options);
        }

        return clone;
    },

    /**
     * Deep clone a node.
     * @param {Node|HTMLElement|DocumentFragment} node The input node.
     * @param {Node|HTMLElement|DocumentFragment} clone The cloned node.
     * @param {object} options Options for cloning the node.
     * @param {Boolean} [options.events] Whether to also clone events.
     * @param {Boolean} [options.data] Whether to also clone custom data.
     * @param {Boolean} [options.animations] Whether to also clone animations.
     */
    _deepClone(node, clone, options) {
        for (let i = 0; i < node.childNodes.length; i++) {
            const child = node.childNodes.item(i);
            const childClone = clone.childNodes.item(i);

            if (options.events) {
                this._cloneEvents(child, childClone);
            }

            if (options.data) {
                this._cloneData(child, childClone);
            }

            if (options.animations) {
                Animation.clone(child, childClone);
            }

            this._deepClone(child, childClone, options);
        }
    },

    /**
     * Remove all children of a single node from the DOM.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @param {Boolean} [detach=true] Whether to detach elements from the DOM.
     */
    _empty(node, detach = true) {
        // Remove descendent elements
        const children = Core.wrap(node.childNodes);

        for (const child of children) {
            this._remove(child);

            if (detach) {
                child.remove();
            }
        }

        // Remove ShadowRoot
        if (node.shadowRoot) {
            this._remove(node.shadowRoot);
        }

        // Remove DocumentFragment
        if (node.content) {
            this._remove(node.content);
        }
    },

    /**
     * Remove a single node from the DOM.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     */
    _remove(node) {
        this._triggerEvent(node, 'remove', {
            bubbles: false,
            cancelable: false
        });

        this._empty(node, false);

        if (Core.isElement(node)) {
            this._clearQueue(node);
            Animation.stop(node);

            if (this._styles.has(node)) {
                this._styles.delete(node);
            }
        }

        this._removeEvent(node);
        this._removeData(node);
    }

});
