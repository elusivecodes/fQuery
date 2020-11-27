/**
 * DOM Size
 */

Object.assign(DOM.prototype, {

    /**
     * Get the computed height of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} [boxSize=1] The box sizing to calculate.
     * @returns {number} The height.
     */
    height(nodes, boxSize) {
        const node = this.parseNode(nodes, {
            document: true,
            window: true
        });

        if (!node) {
            return;
        }

        if (Core.isWindow(node)) {
            return boxSize ?
                node.outerHeight :
                node.innerHeight;
        }

        if (Core.isUndefined(boxSize)) {
            boxSize = this.constructor.PADDING_BOX;
        }

        return this.constructor._height(node, boxSize);
    },

    /**
     * Get the computed width of the first node.
     * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {number} [boxSize=1] The box sizing to calculate.
     * @returns {number} The width.
     */
    width(nodes, boxSize) {
        const node = this.parseNode(nodes, {
            document: true,
            window: true
        });

        if (!node) {
            return;
        }

        if (Core.isWindow(node)) {
            return boxSize ?
                node.outerWidth :
                node.innerWidth;
        }

        if (Core.isUndefined(boxSize)) {
            boxSize = this.constructor.PADDING_BOX;
        }

        return this.constructor._width(node, boxSize);
    }

});
