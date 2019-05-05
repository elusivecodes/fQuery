/**
 * DOM (Static) Manipulation
 */

Object.assign(DOM, {

    /**
     * Detach a single node from the DOM.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The input node.
     */
    _detach(node) {
        if (!node.parentNode) {
            return;
        }

        node.parentNode.removeChild(node);
    }

});
