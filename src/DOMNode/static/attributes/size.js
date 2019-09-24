/**
 * DOMNode (Static) Size
 */

Object.assign(DOMNode, {

    /**
     * Get the client height of a single node.
     * @param {HTMLElement} node The input node.
     * @returns {number} The height.
     */
    height(node) {
        return node.clientHeight;
    },

    /**
     * Get the height of a Window.
     * @param {Window} node The input node.
     * @param {Boolean} [outer] Whether to use the outer height.
     * @returns {number} The height.
     */
    heightWindow(node, outer) {
        return outer ?
            node.outerHeight :
            node.innerHeight;
    },

    /**
     * Get the client width of a single node.
     * @param {HTMLElement} node The input node.
     * @returns {number} The width.
     */
    width(node) {
        return node.clientWidth;
    },

    /**
     * Get the width of a Window.
     * @param {Window} node The input node.
     * @param {Boolean} [outer] Whether to use the outer width.
     * @returns {number} The width.
     */
    widthWindow(node, outer) {
        return outer ?
            node.outerWidth :
            node.innerWidth;
    }

});
