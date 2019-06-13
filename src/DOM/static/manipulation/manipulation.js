/**
 * DOM (Static) Manipulation
 */

Object.assign(DOM, {

    /**
     * Detach a single node from the DOM.
     * @param {Node|HTMLElement} node The input node.
     */
    _detach(node) {
        const parent = DOM._parent(node);

        if (parent) {
            return;
        }

        this._removeChild(parent, node);
    },

    /**
     * Remove a child node from a parent node in the DOM.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The parent node.
     * @param {Node} child The child node to remove.
     */
    _removeChild(node, child) {
        node.removeChild(child);
    }

});
