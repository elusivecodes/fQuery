/**
 * DOM (Static) Nodes
 */

Object.assign(DOM, {

    /**
     * Returns true if the value is a Document.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is a Document, otherwise FALSE.
     */
    isDocument(node) {
        return Core.isObject(node) &&
            'nodeType' in node &&
            node.nodeType === Node.DOCUMENT_NODE;
    },

    /**
     * Returns true if the value is a HTMLElement.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is a HTMLElement, otherwise FALSE.
     */
    isElement(node) {
        return Core.isObject(node) &&
            'nodeType' in node &&
            node.nodeType === Node.ELEMENT_NODE;
    },

    /**
     * Returns true if the value is a Node.
     * @param {*} value The value to test.
     * @returns {Boolean} TRUE if the value is a Node, otherwise FALSE.
     */
    isNode(node) {
        return Core.isObject(node) &&
            'nodeType' in node &&
            (
                node.nodeType === Node.ELEMENT_NODE ||
                node.nodeType === Node.TEXT_NODE ||
                node.nodeType === Node.COMMENT_NODE
            );
    },

    _compareNodes(a, b) {
        if (DOM._isSame(a, b)) {
            return 0;
        }

        const pos = a.compareDocumentPosition(b);

        if (pos & Node.DOCUMENT_POSITION_FOLLOWING ||
            pos & Node.DOCUMENT_POSITION_CONTAINED_BY) {
            return -1;
        }

        if (pos & Node.DOCUMENT_POSITION_PRECEDING ||
            pos & Node.DOCUMENT_POSITION_CONTAINS) {
            return 1;
        }

        return 0;
    },

    /**
     * Returns true if a single node has another node as a descendent.
     * @param {HTMLElement} node The input node.
     * @param {Node} node The other node.
     * @returns {Boolean} TRUE if the node has the other node as a descendent, otherwise FALSE.
     */
    _has(node, other) {
        return node.contains(other);
    },

    /**
     * Returns true if a single node has child elements.
     * @param {HTMLElement} node The input node.
     * @returns {Boolean} TRUE if the node has child elements, otherwise FALSE.
     */
    _hasChildren(node) {
        return !!node.childElementCount;
    },

    /**
     * Returns true if a single node matches a query selector.
     * @param {HTMLElement} node The input node.
     * @param {string} selector The query selector.
     * @returns {Boolean} TRUE if the node matches the selector, otherwise FALSE.
     */
    _is(node, selector) {
        return node.matches(selector);
    },

    /**
     * Returns true if a single node is connected to the DOM.
     * @param {Node} node The input node.
     * @returns {Boolean} TRUE if the node is connected to the DOM, otherwise FALSE.
     */
    _isConnected(node) {
        return node.isConnected;
    },

    /**
     * Returns true if a single node is equal to another node.
     * @param {Node} node The input node.
     * @param {Node} node The other node.
     * @returns {Boolean} TRUE if the node is equal to the other node, otherwise FALSE.
     */
    _isEqual(node, other) {
        return node.isEqualNode(other);
    },

    /**
     * Returns true if a single node is the same as another node.
     * @param {Node} node The input node.
     * @param {Node} node The other node.
     * @returns {Boolean} TRUE if the node is the same as the other node, otherwise FALSE.
     */
    _isSame(node, other) {
        return node.isSameNode(other);
    },

    /**
     * Returns true if a single node is visible.
     * @param {HTMLElement|Document|Window} node The input node.
     * @returns {Boolean} TRUE if the node is visible, otherwise FALSE.
     */
    _isVisible(node) {
        if (Core.isWindow(node)) {
            return dom.context.visibilityState === 'visible';
        }

        if (DOM.isDocument(node)) {
            return node.visibilityState === 'visible';
        }

        return !!node.offsetParent;
    },

    /**
     * Normalize a single node (remove empty Text nodes, and join neighbouring Text nodes).
     * @param {HTMLElement} node The input node.
     */
    _normalize(node) {
        node.normalize();
    }

});
