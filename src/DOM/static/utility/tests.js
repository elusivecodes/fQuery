/**
 * DOM (Static) Tests
 */

Object.assign(DOM, {

    /**
     * Returns true if a single node has a CSS animation.
     * @param {HTMLElement} node The input node.
     * @returns {Boolean} TRUE if the node has a CSS animation, otherwise FALSE.
     */
    _hasCSSAnimation(node) {
        return !!parseFloat(
            this._css(node, 'animation-duration')
        );
    },

    /**
     * Returns true if a single node has a CSS transition.
     * @param {HTMLElement} node The input node.
     * @returns {Boolean} TRUE if the node has a CSS transition, otherwise FALSE.
     */
    _hasCSSTransition(node) {
        return !!parseFloat(
            this._css(node, 'transition-duration')
        );
    },

    /**
     * Returns true if a single node has custom data.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
     * @param {string} [key] The data key.
     * @returns {Boolean} TRUE if the node has custom data, otherwise FALSE.
     */
    _hasData(node, key) {
        return this._data.has(node) &&
            (
                !key ||
                this._data.get(node)
                    .hasOwnProperty(key)
            );
    },

    /**
     * Returns true if a single node is visible.
     * @param {HTMLElement|Document|Window} node The input node.
     * @returns {Boolean} TRUE if the node is visible, otherwise FALSE.
     */
    _isVisible(node) {
        if (Core.isWindow(node)) {
            return node.document.visibilityState === 'visible';
        }

        if (Core.isDocument(node)) {
            return node.visibilityState === 'visible';
        }

        return !!node.offsetParent;
    }

});
