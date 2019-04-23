/**
 * DOM Styles
 */

Object.assign(DOM.prototype, {

    /**
     * Add classes to each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    addClass(nodes, ...classes) {
        classes = DOM._parseClasses(classes);

        if (!classes.length) {
            return;
        }

        this._nodeFilter(nodes)
            .forEach(node => DOM._addClass(node, classes));
    },

    /**
     * Remove classes from each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    removeClass(nodes, ...classes) {
        classes = DOM._parseClasses(classes);

        if (!classes.length) {
            return;
        }

        this._nodeFilter(nodes)
            .forEach(node => DOM._removeClass(node, classes));
    },

    /**
     * Toggle classes for each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    toggleClass(nodes, ...classes) {
        classes = DOM._parseClasses(classes);

        if (!classes.length) {
            return;
        }

        this._nodeFilter(nodes)
            .forEach(node => DOM._toggleClass(node, classes));
    },

    /**
     * Get a style property for the first element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} style The style name.
     * @returns {string} The style value.
     */
    getStyle(nodes, style) {
        // camelize style property
        style = Core.snakeCase(style);

        const node = this._nodeFind(nodes);

        if (!node) {
            return;
        }

        return DOM._getStyle(node, style);
    },

    /**
     * Set style properties for each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|object} style The style name, or an object containing styles.
     * @param {string} [value] The style value.
     * @param {Boolean} [important] Whether the style should be !important.
     */
    setStyle(nodes, style, value, important) {
        const styles = DOM._parseData(style, value),
            realStyles = {};

        Object.keys(styles)
            .forEach(key => {
                let value = '' + styles[key];
                key = Core.snakeCase(key);

                // if value is numeric and not a number property, add px
                if (value && Core.isNumeric(value) && !DOM.cssNumberProperties.includes(key)) {
                    value = value + 'px';
                }

                realStyles[key] = value;
            });

        this._nodeFilter(nodes)
            .forEach(node => DOM._setStyle(node, realStyles, important));
    },

    /**
     * Get a computed CSS style value for the first element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} style The CSS style name.
     * @returns {string} The CSS style value.
     */
    css(nodes, style) {
        const node = this._nodeFind(nodes);

        if (!node) {
            return;
        }

        return this._css(node, style);
    },

    /**
     * Hide each element from display.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     */
    hide(nodes) {
        this.setStyle(
            nodes,
            'display',
            'none'
        );
    },

    /**
     * Display each hidden element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     */
    show(nodes) {
        this.setStyle(
            nodes,
            'display',
            ''
        );
    },

    /**
     * Toggle the visibility of each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     */
    toggle(nodes) {
        this._nodeFilter(nodes)
            .forEach(node => DOM._toggle(node));
    },

    /**
     * Get a computed CSS style value for a single element.
     * @param {HTMLElement} node The input node.
     * @param {string} style The CSS style name.
     * @returns {string} The CSS style value.
     */
    _css(node, style) {
        if (!this.nodeStyles.has(node)) {
            this.nodeStyles.set(
                node,
                window.getComputedStyle(node)
            );
        }

        return this.nodeStyles.get(node)
            .getPropertyValue(style);
    }

});
