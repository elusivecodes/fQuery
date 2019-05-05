/**
 * DOM (Static) Tests
 */

Object.assign(DOM, {

    /**
     * Returns true if a single node has another node as a descendent.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The other node.
     * @returns {Boolean} TRUE if the node has the other node as a descendent, otherwise FALSE.
     */
    _contains(node, other) {
        return node.contains(other);
    },

    /**
     * Returns true if a single node has a specified attribute.
     * @param {HTMLElement} node The input node.
     * @param {string} attribute The attribute name.
     * @returns {Boolean} TRUE if the node has the attribute, otherwise FALSE.
     */
    _hasAttribute(node, attribute) {
        return node.hasAttribute(attribute);
    },

    /**
     * Returns true if a single node has child elements.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @returns {Boolean} TRUE if the node has child elements, otherwise FALSE.
     */
    _hasChildren(node) {
        return !!node.childElementCount;
    },

    /**
     * Returns true if a single node has any of the specified classes.
     * @param {HTMLElement} node The input node.
     * @param {string[]} classes The classes.
     * @returns {Boolean} TRUE if the node has any of the classes, otherwise FALSE.
     */
    _hasClass(node, classes) {
        return classes.some(className =>
            node.classList.contains(className)
        );
    },

    /**
     * Returns true if a single node has a specified property.
     * @param {HTMLElement} node The input node.
     * @param {string} property The property name.
     * @returns {Boolean} TRUE if the node has the property, otherwise FALSE.
     */
    _hasProperty(node, property) {
        return node.hasOwnProperty(property);
    },

    /**
     * Returns true if a single node matches a query selector.
     * @param {HTMLElement} node The input node.
     * @param {string} selector The query selector.
     * @returns {Boolean} TRUE if the node matches the selector, otherwise FALSE.
     */
    _is(node, selector) {
        return Core.isElement(node) && node.matches(selector);
    },

    /**
     * Returns true if a single node is connected to the DOM.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     * @returns {Boolean} TRUE if the node is connected to the DOM, otherwise FALSE.
     */
    _isConnected(node) {
        return node.isConnected;
    },

    /**
     * Returns true if a single node is equal to another node.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The other node.
     * @returns {Boolean} TRUE if the node is equal to the other node, otherwise FALSE.
     */
    _isEqual(node, other) {
        return node.isEqualNode(other);
    },

    /**
     * Returns true if a single node is the same as another node.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The other node.
     * @returns {Boolean} TRUE if the node is the same as the other node, otherwise FALSE.
     */
    _isSame(node, other) {
        return node.isSameNode(other);
    },

    /**
     * Returns true if a single node is visible.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
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
