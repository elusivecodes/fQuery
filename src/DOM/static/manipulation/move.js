/**
 * DOM (Static) Move
 */

Object.assign(DOM, {

    /**
     * Insert each other node after the first node.
     * @param {Node} node The input node.
     * @param {Node[]} others The other node(s).
     */
    _after(node, others) {
        if (!node.parentNode) {
            return;
        }

        for (const other of others.reverse()) {
            node.parentNode.insertBefore(
                other,
                node.nextSibling
            );
        }
    },

    /**
     * Append each other node to a single node.
     * @param {Node} node The input node.
     * @param {Node[]} others The other node(s).
     */
    _append(node, others) {
        for (const other of others) {
            node.insertBefore(other, null);
        }
    },

    /**
     * Insert each other node before a single node.
     * @param {Node} node The input node.
     * @param {Node[]} others The other node(s).
     */
    _before(node, others) {
        if (!node.parentNode) {
            return;
        }

        for (const other of others) {
            node.parentNode.insertBefore(
                other,
                node
            );
        }
    },

    /**
     * Prepend each other node to a single node.
     * @param {Node} node The input node.
     * @param {Node[]} others The other node(s).
     */
    _prepend(node, others) {
        for (const other of others.reverse()) {
            node.insertBefore(other, node.firstChild);
        }
    }

});
