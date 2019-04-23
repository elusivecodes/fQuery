/**
 * DOM Size
 */

Object.assign(DOM.prototype, {

    /**
     * Get the computed height of the first element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {Boolean} [padding=true] Whether to include padding height.
     * @param {Boolean} [border] Whether to include border height.
     * @param {Boolean} [margin] Whether to include margin height.
     * @returns {number} The height.
     */
    height(nodes, padding = true, border, margin) {
        const node = this._nodeFind(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node));

        if (!node) {
            return;
        }

        return this._height(node, padding, border, margin);
    },

    /**
     * Get the computed width of the first element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {Boolean} [padding=true] Whether to include padding width.
     * @param {Boolean} [border] Whether to include border width.
     * @param {Boolean} [margin] Whether to include margin width.
     * @returns {number} The width.
     */
    width(nodes, padding = true, border, margin) {
        const node = this._nodeFind(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node));

        if (!node) {
            return;
        }

        return this._width(node, padding, border, margin);
    },

    /**
     * Get the computed height of a single element.
     * @param {HTMLElement|Document|Window} node The input node.
     * @param {Boolean} [padding=true] Whether to include padding height.
     * @param {Boolean} [border] Whether to include border height.
     * @param {Boolean} [margin] Whether to include margin height.
     * @returns {number} The height.
     */
    _height(node, padding = true, border, margin) {
        if (Core.isWindow(node)) {
            return padding ?
                node.outerHeight :
                node.innerHeight;
        }

        if (DOM.isDocument(node)) {
            node = node.documentElement;
        }

        return this.forceShow(
            node,
            node => {
                let result = node.clientHeight;

                if (!padding) {
                    result -= parseInt(this._css(node, 'padding-top'))
                        + parseInt(this._css(node, 'padding-bottom'));
                }

                if (border) {
                    result += parseInt(this._css(node, 'border-top-width'))
                        + parseInt(this._css(node, 'border-bottom-width'));
                }

                if (margin) {
                    result += parseInt(this._css(node, 'margin-top'))
                        + parseInt(this._css(node, 'margin-bottom'));
                }

                return result;
            }
        );
    },

    /**
     * Get the computed width of a single element.
     * @param {HTMLElement|Document|Window} node The input node.
     * @param {Boolean} [padding=true] Whether to include padding width.
     * @param {Boolean} [border] Whether to include border width.
     * @param {Boolean} [margin] Whether to include margin width.
     * @returns {number} The width.
     */
    _width(node, padding = true, border, margin) {
        if (Core.isWindow(node)) {
            return padding ?
                node.outerWidth :
                node.innerWidth;
        }

        if (DOM.isDocument(node)) {
            node = node.documentElement;
        }

        return this.forceShow(
            node,
            node => {
                let result = node.clientWidth;

                if (!padding) {
                    result -= parseInt(this._css(node, 'padding-left'))
                        + parseInt(this._css(node, 'padding-right'));
                }

                if (border) {
                    result += parseInt(this._css(node, 'border-left-width'))
                        + parseInt(this._css(node, 'border-right-width'));
                }

                if (margin) {
                    result += parseInt(this._css(node, 'margin-left'))
                        + parseInt(this._css(node, 'margin-right'));
                }

                return result;
            }
        );
    }

});
