/**
 * QuerySet Styles
 */

Object.assign(QuerySet.prototype, {

    /**
     * Add classes to each node.
     * @param {...string|string[]} classes The classes.
     * @returns {QuerySet} The QuerySet object.
     */
    addClass(...classes) {
        this._dom.addClass(this, ...classes);

        return this;
    },

    /**
     * Get computed CSS style values for the first node.
     * @param {string} [style] The CSS style name.
     * @returns {string|object} The CSS style value, or an object containing the computed CSS style properties.
     */
    css(style) {
        return this._dom.css(this, style);
    },

    /**
     * Get style properties for the first node.
     * @param {string} [style] The style name.
     * @returns {string|object} The style value, or an object containing the style properties.
     */
    getStyle(style) {
        return this._dom.getStyle(this, style);
    },

    /**
     * Hide each node from display.
     * @returns {QuerySet} The QuerySet object.
     */
    hide() {
        this._dom.hide(this);

        return this;
    },

    /**
     * Remove classes from each node.
     * @param {...string|string[]} classes The classes.
     * @returns {QuerySet} The QuerySet object.
     */
    removeClass(...classes) {
        this._dom.removeClass(this, ...classes);

        return this;
    },
    /**
     * Set style properties for each node.
     * @param {string|object} style The style name, or an object containing styles.
     * @param {string} [value] The style value.
     * @param {Boolean} [important] Whether the style should be !important.
     * @returns {QuerySet} The QuerySet object.
     */
    setStyle(style, value, important) {
        this._dom.setStyle(this, style, value, important);

        return this;
    },

    /**
     * Display each hidden node.
     * @returns {QuerySet} The QuerySet object.
     */
    show() {
        this._dom.show(this);

        return this;
    },

    /**
     * Toggle the visibility of each node.
     * @returns {QuerySet} The QuerySet object.
     */
    toggle() {
        this._dom.toggle(this);

        return this;
    },
    /**
     * Toggle classes for each node.
     * @param {...string|string[]} classes The classes.
     * @returns {QuerySet} The QuerySet object.
     */
    toggleClass(...classes) {
        this._dom.toggleClass(this, ...classes);

        return this;
    }

});
