/**
 * QuerySet Size
 */

Object.assign(QuerySet.prototype, {

    /**
     * Get the computed height of the first node.
     * @param {number} [innerOuter] Whether to include padding, border and margin heights.
     * @returns {number} The height.
     */
    height(innerOuter) {
        return this._dom.height(this, innerOuter);
    },

    /**
     * Get the scroll height of the first node.
     * @returns {number} The scroll height.
     */
    scrollHeight() {
        return this._dom.scrollHeight(this);
    },

    /**
     * Get the scroll width of the first node.
     * @returns {number} The scroll width.
     */
    scrollWidth() {
        return this._dom.scrollWidth(this);
    },

    /**
     * Get the computed width of the first node.
     * @param {number} [innerOuter] Whether to include padding, border and margin heights.
     * @returns {number} The width.
     */
    width(innerOuter) {
        return this._dom.width(this, innerOuter);
    }

});
