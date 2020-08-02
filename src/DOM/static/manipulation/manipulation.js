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
        const clone = DOMNode.clone(node, options.deep);

        if (options.events) {
            this._cloneEvents(node, clone);
        }

        if (options.data) {
            this._cloneData(node, clone);
        }

        if (options.animations) {
            this._cloneAnimations(node, clone);
        }

        if (options.deep) {
            this._deepClone(node, clone, options);
        }

        return clone;
    },

    /**
     * Clone animations for a single node.
     * @param {Node|HTMLElement|DocumentFragment} node The input node.
     * @param {Node|HTMLElement|DocumentFragment} clone The cloned node.
     */
    _cloneAnimations(node, clone) {
        if (!this._hasAnimation(node)) {
            return;
        }

        const animations = Animation._animations.get(node)
            .map(animation =>
                new Animation(clone, animation._callback, animation._options)
            );

        Animation._animations.set(clone, animations);
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
        const children = Core.wrap(DOMNode.childNodes(node));
        const cloneChildren = Core.wrap(DOMNode.childNodes(clone));

        for (let i = 0; i < children.length; i++) {
            if (options.events) {
                this._cloneEvents(children[i], cloneChildren[i]);
            }

            if (options.data) {
                this._cloneData(children[i], cloneChildren[i]);
            }

            if (options.animations) {
                this._cloneAnimations(node, clone);
            }

            this._deepClone(children[i], cloneChildren[i], options);
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
            Animation.stop(node);

            if (this._styles.has(node)) {
                this._styles.delete(node);
            }
        }

        this._removeEvent(node);
        this._removeData(node);
    }

});
