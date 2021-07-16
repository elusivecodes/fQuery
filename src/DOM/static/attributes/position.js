/**
 * DOM (Static) Position
 */

Object.assign(DOM, {

    /**
     * Get the computed bounding rectangle of a single node.
     * @param {HTMLElement} node The input node.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {DOMRect} The computed bounding rectangle.
     */
    _rect(node, offset) {
        const result = node.getBoundingClientRect();

        if (offset) {
            result.x += window.scrollX;
            result.y += window.scrollY;
        }

        return result;
    }

});
