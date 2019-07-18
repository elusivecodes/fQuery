/**
 * DOM (Static) Styles
 */

Object.assign(DOM, {

    /**
     * Get computed CSS style value(s) for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} [style] The CSS style name.
     * @returns {string|object} The CSS style value, or an object containing the computed CSS style properties.
     */
    _css(node, style) {
        if (!this._styles.has(node)) {
            this._styles.set(
                node,
                DOMNode.css(node)
            );
        }

        if (!style) {
            return {
                ...this._styles.get(node)
            };
        }

        return this._styles.get(node)
            .getPropertyValue(style);
    },

    /**
     * Get style properties for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} [style] The style name.
     * @returns {string|object} The style value, or an object containing the style properties.
     */
    _getStyle(node, style) {
        if (style) {
            style = Core.snakeCase(style);

            return DOMNode.getStyle(node, style);
        }

        const nodeStyles = DOMNode.style(node),
            styles = {};

        for (const style of nodeStyles) {
            styles[style] = DOMNode.getStyle(node, style);
        }

        return styles;
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
