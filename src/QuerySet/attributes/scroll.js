/**
 * QuerySet Scroll
 */

Object.assign(QuerySet.prototype, {

    /**
     * Get the scroll X position of the first node.
     * @returns {number} The scroll X position.
     */
    getScrollX() {
        return this._dom.getScrollX(this);
    },

    /**
     * Get the scroll Y position of the first node.
     * @returns {number} The scroll Y position.
     */
    getScrollY() {
        return this._dom.getScrollY(this);
    },

    /**
     * Scroll each node to an X,Y position.
     * @param {number} x The scroll X position.
     * @param {number} y The scroll Y position.
     * @returns {QuerySet} The QuerySet object.
     */
    setScroll(x, y) {
        this._dom.setScroll(this, x, y);

        return this;
    },

    /**
     * Scroll each node to an X position.
     * @param {number} x The scroll X position.
     * @returns {QuerySet} The QuerySet object.
     */
    setScrollX(x) {
        this._dom.setScrollX(this, x);

        return this;
    },
    /**
     * Scroll each node to a Y position.
     * @param {number} y The scroll Y position.
     * @returns {QuerySet} The QuerySet object.
     */
    setScrollY(y) {
        this._dom.setScrollY(this, y);

        return this;
    }

});
