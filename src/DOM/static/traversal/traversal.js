/**
 * DOM Traversal
 */

Object.assign(DOM, {

    /**
     * Return all child nodes for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {NodeList} The child nodes.
     */
    _childNodes(node) {
        return node.childNodes;
    },

    /**
     * Return all child elements for a single node.
     * @param {ParentNode} node The input node.
     * @returns {HTMLCollection} The child elements.
     */
    _children(node) {
        return node.children;
    },

    /**
     * Get the document element from a Document.
     * @param {Document} node The input node.
     * @returns {HTMLElement} The document element.
     */
    _documentElement(node) {
        return node.documentElement;
    },

    /**
     * Return the DocumentFragment for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {DocumentFragment} The DocumentFragment.
     */
    _fragment(node) {
        return node.content;
    },

    /**
     * Return the next sibling node of a single node.
     * @param {Node} node The input node.
     * @returns {Node} The next sibling node.
     */
    _next(node) {
        return node.nextSibling;
    },

    /**
     * Return the parent node of a single node.
     * @param {Node} node The input node.
     * @returns {HTMLElement|DocumentFragment|ShadowRoot|Document} The parent node.
     */
    _parent(node) {
        return node.parentNode;
    },

    /**
     * Return the previous sibling node of a single node.
     * @param {Node} node The input node.
     * @returns {Node} The previous sibling node.
     */
    _prev(node) {
        return node.previousSibling;
    },

    /**
     * Get the scrolling element from a Document.
     * @param {Document} node The input node.
     * @returns {HTMLElement} The scrolling element.
     */
    _scrollingElement(node) {
        return node.scrollingElement;
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
