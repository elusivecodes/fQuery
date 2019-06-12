/**
 * DOM Traversal
 */

Object.assign(DOM, {

    _childNodes(node) {
        return node.childNodes;
    },

    _children(node) {
        return node.children;
    },

    /**
     * Return the DocumentFragment for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {DocumentFragment} The DocumentFragment.
     */
    _fragment(node) {
        return node.content;
    },

    _next(node) {
        return node.nextSibling;
    },

    _parent(node) {
        return node.parentNode;
    },

    _prev(node) {
        return node.previousSibling;
    },

    /**
     * Return the ShadowRoot for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {ShadowRoot} The ShadowRoot.
     */
    _shadow(node) {
        return node.shadowRoot;
    }

});
