/**
 * DOMNode (Static) Manipulation
 */

Object.assign(DOMNode, {

    /**
     * Create a clone of a node.
     * @param {Node} node The input node.
     * @param {Boolean} deep Whether to deep clone the node.
     * @returns {Node} The cloned node.
     */
    clone(node, deep) {
        return node.cloneNode(deep);
    },

    /**
     * Remove a child node from a parent node in the DOM.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The parent node.
     * @param {Node} child The child node to remove.
     */
    removeChild(node, child) {
        node.removeChild(child);
    }

});
