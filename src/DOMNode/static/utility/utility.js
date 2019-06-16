/**
 * DOMNode (Static) Utility
 */

Object.assign(DOMNode, {

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
     * Normalize a single node (remove empty text nodes, and join neighbouring text nodes).
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     */
    normalize(node) {
        node.normalize();
    }

});
