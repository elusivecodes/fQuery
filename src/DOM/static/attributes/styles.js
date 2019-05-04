/**
 * DOM (Static) Styles
 */

Object.assign(DOM, {

    /**
     * Add classes to a single node.
     * @param {HTMLElement} node The input node.
     * @param {...string} classes The classes.
     */
    _addClass(node, classes) {
        node.classList.add(...classes)
    },

    /**
     * Remove classes from a single node.
     * @param {HTMLElement} node The input node.
     * @param {...string} classes The classes.
     */
    _removeClass(node, classes) {
        node.classList.remove(...classes)
    },

    /**
     * Toggle classes for a single node.
     * @param {HTMLElement} node The input node.
     * @param {...string} classes The classes.
     */
    _toggleClass(node, classes) {
        node.classList.toggle(...classes)
    },

    /**
     * Get a style property for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} style The style name.
     * @returns {string} The style value.
     */
    _getStyle(node, style) {
        style = Core.snakeCase(style);

        return node.style[style];
    },

    /**
     * Set style properties for a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} styles An object containing styles.
     * @param {Boolean} [important] Whether the style should be !important.
     */
    _setStyle(node, styles, important = '') {
        for (let style in styles) {
            let value = styles[style];
            style = Core.snakeCase(style);

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
    },

    /**
     * Toggle the visibility of a single node.
     * @param {HTMLElement} node The input node.
     */
    _toggle(node) {
        this._getStyle(node, 'display') === 'none' ?
            this._setStyle(node, { display: '' }) :
            this._setStyle(node, { display: 'none' });
    }

});
