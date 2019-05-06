/**
 * DOM (Static) Manipulation
 */

Object.assign(DOM, {

    /**
     * Detach a single node from the DOM.
     * @param {Node|HTMLElement|ShadowRoot} node The input node.
     */
    _detach(node) {
        const parent = Core.isShadow(node) ?
            node.host :
            node.parentNode;

        if (parent) {
            return;
        }

        parent.removeChild(node);
    }

});
