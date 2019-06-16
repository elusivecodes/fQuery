/**
 * DOMNode (Static) Move
 */

Object.assign(DOMNode, {

    /**
     * Insert a new node into a parent node (optionally before a reference node).
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} parentNode The parent node.
     * @param {Node} newNode The new node to insert.
     * @param {Node} [referenceNode] The node to insert the new node before.
     */
    insertBefore(parentNode, newNode, referenceNode = null) {
        parentNode.insertBefore(newNode, referenceNode);
    }

});
