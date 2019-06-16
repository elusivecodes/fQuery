/**
 * DOM (Static) Styles
 */

Object.assign(DOM, {

    /**
     * Get a computed CSS style value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} [style] The CSS style name.
     * @returns {string|CSSStyleDeclaration} The CSS style value.
     */
    _css(node, style) {
        if (!this._styles.has(node)) {
            this._styles.set(
                node,
                DOMNode.css(node)
            );
        }

        if (!style) {
            return this._styles.get(node);
        }

        return this._styles.get(node)
            .getPropertyValue(style);
    },

    /**
     * Set style properties for a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} styles An object containing styles.
     * @param {Boolean} [important] Whether the style should be !important.
     */
    _setStyle(node, styles, important) {
        for (let style in styles) {
            let value = styles[style];
            style = Core.snakeCase(style);

            // if value is numeric and not a number property, add px
            if (value && Core.isNumeric(value) && !this.cssNumberProperties.includes(style)) {
                value += 'px';
            }

            DOMNode.setStyle(node, style, value, important);
        }
    }

});
