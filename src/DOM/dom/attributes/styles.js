/**
 * DOM Styles
 */

Object.assign(DOM.prototype, {

    /**
     * Add classes to each node.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    addClass(nodes, ...classes) {
        nodes = this._nodeFilter(nodes);

        classes = DOM._parseClasses(classes);

        if (!classes.length) {
            return;
        }

        for (const node of nodes) {
            DOM._addClass(node, classes);
        }
    },

    /**
     * Get a computed CSS style value for the first node.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
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
     * Get a style property for the first node.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} style The style name.
     * @returns {string} The style value.
     */
    getStyle(nodes, style) {
        const node = this._nodeFind(nodes);

        if (!node) {
            return;
        }

        return DOM._getStyle(node, style);
    },

    /**
     * Hide each node from display.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     */
    hide(nodes) {
        this.setStyle(
            nodes,
            'display',
            'none'
        );
    },

    /**
     * Remove classes from each node.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    removeClass(nodes, ...classes) {
        nodes = this._nodeFilter(nodes);

        classes = DOM._parseClasses(classes);

        if (!classes.length) {
            return;
        }

        for (const node of nodes) {
            DOM._removeClass(node, classes);
        }
    },

    /**
     * Set style properties for each node.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|object} style The style name, or an object containing styles.
     * @param {string} [value] The style value.
     * @param {Boolean} [important] Whether the style should be !important.
     */
    setStyle(nodes, style, value, important) {
        nodes = this._nodeFilter(nodes);

        const styles = DOM._parseData(style, value);

        for (const node of nodes) {
            DOM._setStyle(node, styles, important);
        }
    },

    /**
     * Display each hidden node.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     */
    show(nodes) {
        this.setStyle(
            nodes,
            'display',
            ''
        );
    },

    /**
     * Toggle the visibility of each node.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     */
    toggle(nodes) {
        nodes = this._nodeFilter(nodes);

        for (const node of nodes) {
            DOM._toggle(node);
        }
    },

    /**
     * Toggle classes for each node.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    toggleClass(nodes, ...classes) {
        nodes = this._nodeFilter(nodes);

        classes = DOM._parseClasses(classes);

        if (!classes.length) {
            return;
        }

        for (const node of nodes) {
            DOM._toggleClass(node, classes);
        }
    },

    /**
     * Get a computed CSS style value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} style The CSS style name.
     * @returns {string} The CSS style value.
     */
    _css(node, style) {
        if (!this._styles.has(node)) {
            this._styles.set(
                node,
                window.getComputedStyle(node)
            );
        }

        return this._styles.get(node)
            .getPropertyValue(style);
    }

});
