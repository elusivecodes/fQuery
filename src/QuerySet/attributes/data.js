/**
 * QuerySet Data
 */

Object.assign(QuerySet.prototype, {

    /**
     * Clone custom data from each node to each other node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     * @returns {QuerySet} The QuerySet object.
     */
    cloneData(others) {
        this._dom.cloneData(this, others);

        return this;
    },

    /**
     * Get custom data for the first node.
     * @param {string} [key] The data key.
     * @returns {*} The data value.
     */
    getData(key) {
        return this._dom.getData(this, key);
    },

    /**
     * Remove custom data from each node.
     * @param {string} [key] The data key.
     * @returns {QuerySet} The QuerySet object.
     */
    removeData(key) {
        this._dom.removeData(this, key);

        return this;
    },

    /**
     * Set custom data for each node.
     * @param {string|object} key The data key, or an object containing data.
     * @param {*} [value] The data value.
     * @returns {QuerySet} The QuerySet object.
     */
    setData(key, value) {
        this._dom.setData(this, key, value);

        return this;
    }

});
