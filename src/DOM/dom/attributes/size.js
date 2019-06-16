/**
 * DOM Size
 */

Object.assign(DOM.prototype, {

    /**
     * Get the computed height of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {Boolean} [padding=true] Whether to include padding height.
     * @param {Boolean} [border] Whether to include border height.
     * @param {Boolean} [margin] Whether to include margin height.
     * @returns {number} The height.
     */
    height(nodes, padding = true, border, margin) {
        const node = this.parseNode(nodes, { document: true, window: true });

        if (!node) {
            return;
        }

        if (Core.isWindow(node)) {
            return DOMNode.heightWindow(node, padding);
        }

        if (Core.isDocument(node)) {
            return DOM._height(
                DOMNode.documentElement(node),
                padding,
                border,
                margin
            );
        }

        return DOM._height(node, padding, border, margin);
    },

    /**
     * Get the computed width of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {Boolean} [padding=true] Whether to include padding width.
     * @param {Boolean} [border] Whether to include border width.
     * @param {Boolean} [margin] Whether to include margin width.
     * @returns {number} The width.
     */
    width(nodes, padding = true, border, margin) {
        const node = this.parseNode(nodes, { document: true, window: true });

        if (!node) {
            return;
        }

        if (Core.isWindow(node)) {
            return DOMNode.widthWindow(node, padding);
        }

        if (Core.isDocument(node)) {
            return DOM._width(
                DOMNode.documentElement(node),
                padding,
                border,
                margin
            );
        }

        return DOM._width(node, padding, border, margin);
    }

});
