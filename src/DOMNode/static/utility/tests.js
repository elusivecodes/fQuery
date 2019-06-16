/**
 * DOMNode (Static) Tests
 */

Object.assign(DOMNode, {

    /**
     * Returns true if a single node has another node as a descendent.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The other node.
     * @returns {Boolean} TRUE if the node has the other node as a descendent, otherwise FALSE.
     */
    contains(node, other) {
        return node.contains(other);
    },

    /**
     * Returns true if a single node has a specified attribute.
     * @param {HTMLElement} node The input node.
     * @param {string} attribute The attribute name.
     * @returns {Boolean} TRUE if the node has the attribute, otherwise FALSE.
     */
    hasAttribute(node, attribute) {
        return node.hasAttribute(attribute);
    },

    /**
     * Returns true if a single node has child elements.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @returns {Boolean} TRUE if the node has child elements, otherwise FALSE.
     */
    hasChildren(node) {
        return !!node.childElementCount;
    },

    /**
     * Returns true if a single node has any a specified class.
     * @param {HTMLElement} node The input node.
     * @param {string} className The class name.
     * @returns {Boolean} TRUE if the node has any of the classes, otherwise FALSE.
     */
    hasClass(node, className) {
        return node.classList.contains(className);
    },

    /**
     * Returns true if a single node has a specified property.
     * @param {HTMLElement} node The input node.
     * @param {string} property The property name.
     * @returns {Boolean} TRUE if the node has the property, otherwise FALSE.
     */
    hasProperty(node, property) {
        return node.hasOwnProperty(property);
    },

    /**
     * Returns true if a single node matches a query selector.
     * @param {HTMLElement} node The input node.
     * @param {string} selector The query selector.
     * @returns {Boolean} TRUE if the node matches the selector, otherwise FALSE.
     */
    is(node, selector) {
        return Core.isElement(node) &&
            node.matches(selector);
    },

    /**
     * Returns true if a single node is connected to the DOM.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     * @returns {Boolean} TRUE if the node is connected to the DOM, otherwise FALSE.
     */
    isConnected(node) {
        return node.isConnected;
    },

    /**
     * Returns true if a single node is equal to another node.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The other node.
     * @returns {Boolean} TRUE if the node is equal to the other node, otherwise FALSE.
     */
    isEqual(node, other) {
        return node.isEqualNode(other);
    },

    /**
     * Returns true if a single node is the same as another node.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The other node.
     * @returns {Boolean} TRUE if the node is the same as the other node, otherwise FALSE.
     */
    isSame(node, other) {
        return node.isSameNode(other);
    },

    /**
     * Returns true if a Document is visible.
     * @param {Document} node The input node.
     * @returns {Boolean} TRUE if the node is visible, otherwise FALSE.
     */
    isVisibleDocument(node) {
        return node.visibilityState === 'visible';
    }

});
