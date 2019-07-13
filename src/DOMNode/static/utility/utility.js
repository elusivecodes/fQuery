/**
 * DOMNode (Static) Utility
 */

Object.assign(DOMNode, {

    /**
     * Get attribute values for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {NamedNodeMap} The dataset value.
     */
    attributes(node) {
        return node.attributes;
    },

    /**
     * Compare the position of two nodes in a Document.
     * @param {Node} node The input node.
     * @param {Node} other The node to compare against.
     * @returns {number} The bitmask representing the relationship of the nodes.
     */
    comparePosition(node, other) {
        return node.compareDocumentPosition(other);
    },

    /**
     * Get dataset values for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {DOMStringMap} The dataset value.
     */
    dataset(node) {
        return node.dataset;
    },

    /**
     * Normalize a single node (remove empty text nodes, and join neighbouring text nodes).
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     */
    normalize(node) {
        node.normalize();
    },

    /**
     * Get style properties for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {CSSStyleDeclaration} The style value.
     */
    style(node) {
        return node.style;
    }

});
