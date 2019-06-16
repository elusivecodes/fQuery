/**
 * DOM (Static) Filters
 */

Object.assign(DOM, {

    /**
     * Return a function for filtering nodes.
     * @param {object} [options] The options for filtering.
     * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
     * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
     * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
     * @param {Boolean} [options.document=false] Whether to allow Document.
     * @param {Boolean} [options.window=false] Whether to allow Window.
     * @returns {DOM~nodeCallback} The node filter function.
     */
    parseNodesFactory(options) {
        return options ?
            node =>
                (options.node ? Core.isNode(node) : Core.isElement(node)) ||
                (options.fragment && Core.isFragment(node)) ||
                (options.shadow && Core.isShadow(node)) ||
                (options.document && Core.isDocument(node)) ||
                (options.window && Core.isWindow(node)) :
            Core.isElement;
    }

});
