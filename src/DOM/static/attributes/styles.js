/**
 * DOM (Static) Styles
 */

Object.assign(DOM, {

    /**
     * Add classes to a single element.
     * @param {HTMLElement} node The input node.
     * @param {...string} classes The classes.
     */
    _addClass(node, classes) {
        node.classList.add(...classes)
    },

    /**
     * Remove classes from a single element.
     * @param {HTMLElement} node The input node.
     * @param {...string} classes The classes.
     */
    _removeClass(node, classes) {
        node.classList.remove(...classes)
    },

    /**
     * Toggle classes for a single element.
     * @param {HTMLElement} node The input node.
     * @param {...string} classes The classes.
     */
    _toggleClass(node, classes) {
        node.classList.toggle(...classes)
    },

    /**
     * Get a style property for a single element.
     * @param {HTMLElement} node The input node.
     * @param {string} style The style name.
     * @returns {string} The style value.
     */
    _getStyle(node, style) {
        return node.style[style];
    },

    /**
     * Set style properties for a single element.
     * @param {HTMLElement} node The input node.
     * @param {object} styles An object containing styles.
     * @param {Boolean} [important] Whether the style should be !important.
     */
    _setStyle(node, styles, important = '') {
        for (const style in styles) {
            node.style.setProperty(
                style,
                styles[style],
                important ?
                    'important' :
                    ''
            );
        }
    },

    /**
     * Toggle the visibility of a single element.
     * @param {HTMLElement} node The input node.
     */
    _toggle(node) {
        this._getStyle(node, 'display') === 'none' ?
            this._setStyle(node, { display: '' }) :
            this._setStyle(node, { display: 'none' });
    }

});
