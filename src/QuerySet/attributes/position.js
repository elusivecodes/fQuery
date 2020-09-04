/**
 * QuerySet Position
 */

Object.assign(QuerySet.prototype, {

    /**
     * Get the X,Y co-ordinates for the center of the first node.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {object} An object with the x and y co-ordinates.
     */
    center(offset) {
        return this._dom.center(this, offset);
    },

    /**
     * Contrain each node to a container node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} container The container node, or a query selector string.
     * @returns {QuerySet} The QuerySet object.
     */
    constrain(container) {
        this._dom.constrain(this, container);

        return this;
    },

    /**
     * Get the distance of a node to an X,Y position in the Window.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {number} The distance to the node.
     */
    distTo(x, y, offset) {
        return this._dom.distTo(this, x, y, offset);
    },

    /**
     * Get the distance between two nodes.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} others The node to compare, or a query selector string.
     * @returns {number} The distance between the nodes.
     */
    distToNode(others) {
        return this._dom.distToNode(this, others);
    },

    /**
     * Get the nearest node to an X,Y position in the Window.
     * @param {number} x The X co-ordinate.
     * @param {number} y The Y co-ordinate.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {QuerySet} A new QuerySet object.
     */
    nearestTo(x, y, offset) {
        const node = this._dom.nearestTo(this, x, y, offset);
        return new this.constructor(
            [node].filter(v => v)
        );
    },

    /**
     * Get the nearest node to another node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} others The node to compare, or a query selector string.
     * @returns {QuerySet} A new QuerySet object.
     */
    nearestToNode(others) {
        const node = this._dom.nearestToNode(this, others);
        return new this.constructor(
            [node].filter(v => v)
        );
    },
    /**
     * Get the percentage of an X co-ordinate relative to a node's width.
     * @param {number} x The X co-ordinate.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @param {Boolean} [clamp=true] Whether to clamp the percent between 0 and 100.
     * @returns {number} The percent.
     */
    percentX(x, offset, clamp = true) {
        return this._dom.percentX(this, x, offset, clamp);
    },

    /**
     * Get the percentage of a Y co-ordinate relative to a node's height.
     * @param {number} y The Y co-ordinate.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @param {Boolean} [clamp=true] Whether to clamp the percent between 0 and 100.
     * @returns {number} The percent.
     */
    percentY(y, offset, clamp = true) {
        return this._dom.percentY(this, y, offset, clamp);
    },

    /**
     * Get the position of the first node relative to the Window or Document.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {object} An object with the x and y co-ordinates.
     */
    position(offset) {
        return this._dom.position(this, offset);
    },

    /**
     * Get the computed bounding rectangle of the first node.
     * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
     * @returns {DOMRect} The computed bounding rectangle.
     */
    rect(offset) {
        return this._dom.rect(this, offset);
    }

});
