/**
 * DOM (Static) Utility
 */

Object.assign(DOM, {

    /**
     * Compare the position of two nodes in a Document.
     * @param {Node} node The input node.
     * @param {Node} other The node to compare against.
     * @returns {number} The bitmask representing the relationship of the nodes.
     */
    _comparePosition(node, other) {
        return node.compareDocumentPosition(other);
    },

    /**
     * Normalize a single node (remove empty text nodes, and join neighbouring text nodes).
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     */
    _normalize(node) {
        node.normalize();
    }

});
