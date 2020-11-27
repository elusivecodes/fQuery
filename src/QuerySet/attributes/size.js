/**
 * QuerySet Size
 */

Object.assign(QuerySet.prototype, {

    /**
     * Get the computed height of the first node.
     * @param {number} [boxSize=1] The box sizing to calculate.
     * @returns {number} The height.
     */
    height(boxSize) {
        return this._dom.height(this, boxSize);
    },

    /**
     * Get the computed width of the first node.
     * @param {number} [boxSize=1] The box sizing to calculate.
     * @returns {number} The width.
     */
    width(boxSize) {
        return this._dom.width(this, boxSize);
    }

});
