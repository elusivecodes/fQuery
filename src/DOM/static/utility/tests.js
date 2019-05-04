/**
 * DOM (Static) Filter
 */

Object.assign(DOM, {

    /**
     * Returns true if a single node has another node as a descendent.
     * @param {HTMLElement|ShadowRoot|Document} node The input node.
     * @param {Node|HTMLElement|ShadowRoot|Document} node The other node.
     * @returns {Boolean} TRUE if the node has the other node as a descendent, otherwise FALSE.
     */
    _has(node, other) {
        return node.contains(other);
    },

    /**
     * Returns true if a single node has child elements.
     * @param {HTMLElement|ShadowRoot|Document} node The input node.
     * @returns {Boolean} TRUE if the node has child elements, otherwise FALSE.
     */
    _hasChildren(node) {
        return !!node.childElementCount;
    },

    /**
     * Returns true if a single node matches a query selector.
     * @param {HTMLElement} node The input node.
     * @param {string} selector The query selector.
     * @returns {Boolean} TRUE if the node matches the selector, otherwise FALSE.
     */
    _is(node, selector) {
        return node.matches(selector);
    },

    /**
     * Returns true if a single node is connected to the DOM.
     * @param {Node|HTMLElement|ShadowRoot} node The input node.
     * @returns {Boolean} TRUE if the node is connected to the DOM, otherwise FALSE.
     */
    _isConnected(node) {
        return node.isConnected;
    },

    /**
     * Returns true if a single node is equal to another node.
     * @param {Node|HTMLElement|ShadowRoot|Document} node The input node.
     * @param {Node|HTMLElement|ShadowRoot|Document} node The other node.
     * @returns {Boolean} TRUE if the node is equal to the other node, otherwise FALSE.
     */
    _isEqual(node, other) {
        return node.isEqualNode(other);
    },

    /**
     * Returns true if a single node is the same as another node.
     * @param {Node|HTMLElement|ShadowRoot|Document} node The input node.
     * @param {Node|HTMLElement|ShadowRoot|Document} node The other node.
     * @returns {Boolean} TRUE if the node is the same as the other node, otherwise FALSE.
     */
    _isSame(node, other) {
        return node.isSameNode(other);
    },

    /**
     * Returns true if a single node is visible.
     * @param {HTMLElement|ShadowRoot|Document|Window} node The input node.
     * @returns {Boolean} TRUE if the node is visible, otherwise FALSE.
     */
    _isVisible(node) {
        if (Core.isWindow(node)) {
            node = node.document;
        }

        if (Core.isDocument(node)) {
            return node.visibilityState === 'visible';
        }

        if (Core.isShadow(node)) {
            node = node.host;
        }

        return !!node.offsetParent;
    }

});
