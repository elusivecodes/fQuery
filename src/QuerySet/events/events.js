/**
 * QuerySet Events
 */

Object.assign(QuerySet.prototype, {

    /**
     * Trigger a blur event on the first node.
     * @returns {QuerySet} The QuerySet object.
     */
    blur() {
        this._dom.blur(this);

        return this;
    },

    /**
     * Trigger a click event on the first node.
     * @returns {QuerySet} The QuerySet object.
     */
    click() {
        this._dom.click(this);

        return this;
    },

    /**
     * Trigger a focus event on the first node.
     * @returns {QuerySet} The QuerySet object.
     */
    focus() {
        this._dom.focus(this);

        return this;
    }

});
