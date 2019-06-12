/**
 * DOM (Static) Utility
 */

Object.assign(DOM, {

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
