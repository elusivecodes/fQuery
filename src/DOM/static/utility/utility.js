/**
 * DOM (Static) Utility
 */

Object.assign(DOM, {

    /**
     * Compare the position of two nodes in the DOM.
     * @param {Node} node The input node.
     * @param {Node} other The other node.
     * @returns {number} -1 if node is before other, 1 if other is before node, otherwise 0.
     */
    _compareNodes(node, other) {
        if (this._isSame(node, other)) {
            return 0;
        }

        const pos = node.compareDocumentPosition(other);

        if (pos & Node.DOCUMENT_POSITION_FOLLOWING ||
            pos & Node.DOCUMENT_POSITION_CONTAINED_BY) {
            return -1;
        }

        if (pos & Node.DOCUMENT_POSITION_PRECEDING ||
            pos & Node.DOCUMENT_POSITION_CONTAINS) {
            return 1;
        }

        return 0;
    },

    /**
     * Normalize a single node (remove empty text nodes, and join neighbouring text nodes).
     * @param {HTMLElement} node The input node.
     */
    _normalize(node) {
        node.normalize();
    }

});
