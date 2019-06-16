/**
 * DOMNode (Static) Manipulation
 */

Object.assign(DOMNode, {

    /**
     * Remove a child node from a parent node in the DOM.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The parent node.
     * @param {Node} child The child node to remove.
     */
    removeChild(node, child) {
        node.removeChild(child);
    }

});
