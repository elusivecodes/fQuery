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
        return this._forceShow(
            node,
            node => {
                if (Core.isDocument(node)) {
                    node = DOMNode.documentElement(node);
                }

                let result = DOMNode.height(node);

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
            }
        );
    },

    /**
     * Get the scroll height of a single node.
     * @param {HTMLElement} node The input node.
     * @returns {number} The scroll height.
     */
    _scrollHeight(node) {
        return this._forceShow(
            node,
            node => {
                if (Core.isDocument(node)) {
                    node = DOMNode.documentElement(node);
                }

                return DOMNode.scrollHeight(node);
            }
        );
    },

    /**
     * Get the scroll width of a single node.
     * @param {HTMLElement} node The input node.
     * @returns {number} The scroll width.
     */
    _scrollWidth(node) {
        return this._forceShow(
            node,
            node => {
                if (Core.isDocument(node)) {
                    node = DOMNode.documentElement(node);
                }

                return DOMNode.scrollWidth(node);
            }
        );
    },

    /**
     * Get the computed width of a single node.
     * @param {HTMLElement} node The input node.
     * @param {number} [innerOuter] Whether to include padding, border and margin widths.
     * @returns {number} The width.
     */
    _width(node, innerOuter = 1) {
        return this._forceShow(
            node,
            node => {
                if (Core.isDocument(node)) {
                    node = DOMNode.documentElement(node);
                }

                let result = DOMNode.width(node);

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
            }
        );
    }

});
