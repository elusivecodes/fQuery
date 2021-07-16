/**
 * DOM (Static) Size
 */

Object.assign(DOM, {

    /**
     * Get the computed height of a single node.
     * @param {HTMLElement} node The input node.
     * @param {number} [boxSize=1] The box sizing to calculate.
     * @returns {number} The height.
     */
    _height(node, boxSize = 1) {
        if (Core.isDocument(node)) {
            node = node.documentElement;
        }

        if (boxSize === this.SCROLL_BOX) {
            return node.scrollHeight;
        }

        let result = node.clientHeight;

        if (boxSize === this.CONTENT_BOX) {
            result -= parseInt(this._css(node, 'padding-top'))
                + parseInt(this._css(node, 'padding-bottom'));
        }

        if (boxSize >= this.BORDER_BOX) {
            result += parseInt(this._css(node, 'border-top-width'))
                + parseInt(this._css(node, 'border-bottom-width'));
        }

        if (boxSize === this.MARGIN_BOX) {
            result += parseInt(this._css(node, 'margin-top'))
                + parseInt(this._css(node, 'margin-bottom'));
        }

        return result;
    },

    /**
     * Get the computed width of a single node.
     * @param {HTMLElement} node The input node.
     * @param {number} [boxSize=1] The box sizing to calculate.
     * @returns {number} The width.
     */
    _width(node, boxSize = 1) {
        if (Core.isDocument(node)) {
            node = node.documentElement;
        }

        if (boxSize === this.SCROLL_BOX) {
            return node.scrollWidth;
        }

        let result = node.clientWidth;

        if (boxSize === this.CONTENT_BOX) {
            result -= parseInt(this._css(node, 'padding-left'))
                + parseInt(this._css(node, 'padding-right'));
        }

        if (boxSize >= this.BORDER_BOX) {
            result += parseInt(this._css(node, 'border-left-width'))
                + parseInt(this._css(node, 'border-right-width'));
        }

        if (boxSize === this.MARGIN_BOX) {
            result += parseInt(this._css(node, 'margin-left'))
                + parseInt(this._css(node, 'margin-right'));
        }

        return result;
    }

});
