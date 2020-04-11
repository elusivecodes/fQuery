/**
 * DOMNode (Static) Create
 */

Object.assign(DOMNode, {

    /**
     * Attach a shadow DOM tree to a single node.
     * @param {HTMLElement} node The input node.
     * @param {Boolean} [open=true] Whether the elements are accessible from JavaScript outside the root.
     * @returns {ShadowRoot} The new ShadowRoot.
     */
    attachShadow(node, open = true) {
        return node.attachShadow({
            mode: open ?
                'open' :
                'closed'
        });
    },

    /**
     * Create a new DOM element.
     * @param {Document} context The document context.
     * @param {string} tagName The type of HTML element to create.
     * @returns {HTMLElement} The new element.
     */
    create(context, tagName) {
        return context.createElement(tagName);
    },

    /**
     * Create a new comment node.
     * @param {Document} context The document context.
     * @param {string} comment The comment contents.
     * @returns {Node} The new comment node.
     */
    createComment(context, comment) {
        return context.createCommentNode(comment);
    },

    /**
     * Create a new document fragment.
     * @param {Document} context The document context.
     * @returns {DocumentFragment} The new DocumentFragment.
     */
    createFragment(context) {
        return context.createDocumentFragment();
    },

    /**
     * Create a new range object.
     * @param {Document} context The document context.
     * @returns {Range} The new range.
     */
    createRange(context) {
        return context.createRange();
    },

    /**
     * Create a new text node.
     * @param {Document} context The document context.
     * @param {string} text The text contents.
     * @returns {Node} The new text node.
     */
    createText(context, text) {
        return context.createTextNode(text);
    }

});
