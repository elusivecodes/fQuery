/**
 * DOM (Static) Size
 */

Object.assign(DOM, {

    /**
     * Get the computed height of a single node.
     * @param {HTMLElement} node The input node.
     * @param {number} [innerOuter=1] Whether to include padding, border and margin heights.
     * @returns {number} The height.
     */
    _height(node, innerOuter = 1) {
        return this._forceShow(node, node => {
            if (Core.isDocument(node)) {
                node = node.documentElement;
            }

            let result = node.clientHeight;

            if (innerOuter === this.INNER) {
                result -= parseInt(this._css(node, 'padding-top'))
                    + parseInt(this._css(node, 'padding-bottom'));
            }

            if (innerOuter >= this.OUTER) {
                result += parseInt(this._css(node, 'border-top-width'))
                    + parseInt(this._css(node, 'border-bottom-width'));
            }

            if (innerOuter === this.OUTER_MARGIN) {
                result += parseInt(this._css(node, 'margin-top'))
                    + parseInt(this._css(node, 'margin-bottom'));
            }

            return result;
        });
    },

    /**
     * Get the computed width of a single node.
     * @param {HTMLElement} node The input node.
     * @param {number} [innerOuter] Whether to include padding, border and margin widths.
     * @returns {number} The width.
     */
    _width(node, innerOuter = 1) {
        return this._forceShow(node, node => {
            if (Core.isDocument(node)) {
                node = node.documentElement;
            }

            let result = node.clientWidth;

            if (innerOuter === this.INNER) {
                result -= parseInt(this._css(node, 'padding-left'))
                    + parseInt(this._css(node, 'padding-right'));
            }

            if (innerOuter >= this.OUTER) {
                result += parseInt(this._css(node, 'border-left-width'))
                    + parseInt(this._css(node, 'border-right-width'));
            }

            if (innerOuter === this.OUTER_MARGIN) {
                result += parseInt(this._css(node, 'margin-left'))
                    + parseInt(this._css(node, 'margin-right'));
            }

            return result;
        });
    }

});
