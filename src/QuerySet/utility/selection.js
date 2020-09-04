/**
 * QuerySet Selection
 */

Object.assign(QuerySet.prototype, {

    /**
     * Insert each node after the selection.
     * @returns {QuerySet} The QuerySet object.
     */
    afterSelection() {
        this._dom.afterSelection(this);

        return this;
    },

    /**
     * Insert each node before the selection.
     * @returns {QuerySet} The QuerySet object.
     */
    beforeSelection() {
        this._dom.beforeSelection(this);

        return this;
    },

    /**
     * Create a selection on the first node.
     * @returns {QuerySet} The QuerySet object.
     */
    select() {
        this._dom.select(this);

        return this;
    },

    /**
     * Create a selection containing all of the nodes.
     * @returns {QuerySet} The QuerySet object.
     */
    selectAll() {
        this._dom.selectAll(this);

        return this;
    },

    /**
     * Wrap selected nodes with other nodes.
     * @returns {QuerySet} The QuerySet object.
     */
    wrapSelection() {
        this._dom.wrapSelection(this);

        return this;
    }

});
