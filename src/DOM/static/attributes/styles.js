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
                window.getComputedStyle(node)
            );
        }

        if (!style) {
            return {
                ...this._styles.get(node)
            };
        }

        style = Core.kebabCase(style);

        return this._styles.get(node)
            .getPropertyValue(style);
    },

    /**
     * Set style properties for a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} styles An object containing styles.
     * @param {Boolean} [important] Whether the style should be !important.
     */
    _setStyles(node, styles, important) {
        for (let style in styles) {
            let value = styles[style];
            style = Core.kebabCase(style);

            // if value is numeric and not a number property, add px
            if (value && Core.isNumeric(value) && !this.cssNumberProperties.includes(style)) {
                value += 'px';
            }

            node.style.setProperty(
                style,
                value,
                important ?
                    'important' :
                    ''
            );
        }
    }

});
