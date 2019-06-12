/**
 * DOM (Static) Manipulation
 */

Object.assign(DOM, {

    /**
     * Detach a single node from the DOM.
     * @param {Node|HTMLElement|ShadowRoot} node The input node.
     */
    _detach(node) {
        const parent = DOM._parent(node);

        if (parent) {
            return;
        }

        this._removeChild(parent, node);
    },

    _removeChild(node, child) {
        node.removeChild(child);
    }

});
