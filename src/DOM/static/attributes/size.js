/**
 * DOM (Static) Size
 */

Object.assign(DOM, {

    /**
     * Get the client height of a single node.
     * @param {HTMLElement} node The input node.
     * @returns {number} The height.
     */
    _height(node) {
        return node.clientHeight;
    },

    /**
     * Get the height of a Window.
     * @param {Window} node The input node.
     * @param {Boolean} [outer] Whether to use the outer height.
     * @returns {number} The height.
     */
    _heightWindow(node, outer) {
        return outer ?
            node.outerHeight :
            node.innerHeight;
    },

    /**
     * Get the client width of a single node.
     * @param {HTMLElement} node The input node.
     * @returns {number} The width.
     */
    _width(node) {
        return node.clientWidth;
    },

    /**
     * Get the width of a Window.
     * @param {Window} node The input node.
     * @param {Boolean} [outer] Whether to use the outer width.
     * @returns {number} The width.
     */
    _widthWindow(node, outer) {
        return outer ?
            node.outerWeight :
            node.innerWidth;
    }

});
