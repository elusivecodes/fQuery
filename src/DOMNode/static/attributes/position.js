/**
 * DOMNode (Static) Position
 */

Object.assign(DOMNode, {

    /**
     * Get the left offset of a single node.
     * @param {HTMLElement} node The input node.
     * @returns {number} The left offset of the node (in pixels).
     */
    offsetLeft(node) {
        return node.offsetLeft;
    },

    /**
     * Get the top offset of a single node.
     * @param {HTMLElement} node The input node.
     * @returns {number} The top offset of the node (in pixels).
     */
    offsetTop(node) {
        return node.offsetTop;
    },

    /**
     * Get the computed bounding rectangle of a single node.
     * @param {HTMLElement} node The input node.
     * @returns {DOMRect} The computed bounding rectangle.
     */
    rect(node) {
        return node.getBoundingClientRect();
    }

});
