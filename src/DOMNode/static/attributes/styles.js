/**
 * DOMNode (Static) Styles
 */

Object.assign(DOMNode, {

    /**
     * Add classes to a single node.
     * @param {HTMLElement} node The input node.
     * @param {...string} classes The classes.
     */
    addClass(node, ...classes) {
        node.classList.add(...classes)
    },

    /**
     * Get a CSSStyleDeclaration for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {CSSStyleDeclaration} The CSSStyleDeclaration.
     */
    css(node) {
        return window.getComputedStyle(node);
    },

    /**
     * Get a style property for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} [style] The style name.
     * @returns {string} The style value.
     */
    getStyle(node, style) {
        return this.style(node)[style];
    },

    /**
     * Remove classes from a single node.
     * @param {HTMLElement} node The input node.
     * @param {...string} classes The classes.
     */
    removeClass(node, ...classes) {
        node.classList.remove(...classes)
    },

    /**
     * Set style properties for a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} styles An object containing styles.
     * @param {Boolean} [important] Whether the style should be !important.
     */
    setStyle(node, style, value, important) {
        node.style.setProperty(
            style,
            value,
            important ?
                'important' :
                ''
        );
    },

    /**
     * Get style properties for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {CSSStyleDeclaration} The style value.
     */
    style(node) {
        return node.style;
    },

    /**
     * Toggle classes for a single node.
     * @param {HTMLElement} node The input node.
     * @param {...string} classes The classes.
     */
    toggleClass(node, ...classes) {
        node.classList.toggle(...classes)
    }

});
