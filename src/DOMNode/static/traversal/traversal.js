/**
 * DOMNode Traversal
 */

Object.assign(DOMNode, {

    /**
     * Return all child nodes for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {NodeList} The child nodes.
     */
    childNodes(node) {
        return node.childNodes;
    },

    /**
     * Return all child elements for a single node.
     * @param {ParentNode} node The input node.
     * @returns {HTMLCollection} The child elements.
     */
    children(node) {
        return node.children;
    },

    /**
     * Get the Document from a Window.
     * @param {Window} node The input node.
     * @returns {Document} The Document.
     */
    document(node) {
        return node.document;
    },

    /**
     * Get the document element from a Document.
     * @param {Document} node The input node.
     * @returns {HTMLElement} The document element.
     */
    documentElement(node) {
        return node.documentElement;
    },

    /**
     * Return the first child for a single node.
     * @param {Node} node The input node.
     * @returns {Node} The first child.
     */
    firstChild(node) {
        return node.firstChild;
    },

    /**
     * Return the DocumentFragment for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {DocumentFragment} The DocumentFragment.
     */
    fragment(node) {
        return node.content;
    },

    /**
     * Return the next sibling node of a single node.
     * @param {Node} node The input node.
     * @returns {Node} The next sibling node.
     */
    next(node) {
        return node.nextSibling;
    },

    /**
     * Return the offset parent node of a single node.
     * @param {Node} node The input node.
     * @returns {HTMLElement|DocumentFragment|ShadowRoot|Document} The offset parent node.
     */
    offsetParent(node) {
        return node.offsetParent;
    },

    /**
     * Return the parent node of a single node.
     * @param {Node} node The input node.
     * @returns {HTMLElement|DocumentFragment|ShadowRoot|Document} The parent node.
     */
    parent(node) {
        return node.parentNode;
    },

    /**
     * Return the previous sibling node of a single node.
     * @param {Node} node The input node.
     * @returns {Node} The previous sibling node.
     */
    prev(node) {
        return node.previousSibling;
    },

    /**
     * Get the scrolling element from a Document.
     * @param {Document} node The input node.
     * @returns {HTMLElement} The scrolling element.
     */
    scrollingElement(node) {
        return node.scrollingElement;
    },

    /**
     * Return the ShadowRoot for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {ShadowRoot} The ShadowRoot.
     */
    shadow(node) {
        return node.shadowRoot;
    }

});
