/**
 * QuerySet Find
 */

Object.assign(QuerySet.prototype, {

    /**
     * Return all descendent nodes matching a selector.
     * @param {string} selector The query selector.
     * @returns {QuerySet} The QuerySet object.
     */
    find(selector) {
        return this.pushStack(
            this._dom.find(selector, this)
        );
    },

    /**
     * Return all descendent nodes with a specific class.
     * @param {string} className The class name.
     * @returns {QuerySet} The QuerySet object.
     */
    findByClass(className) {
        return this.pushStack(
            this._dom.findByClass(className, this)
        );
    },

    /**
     * Return all descendent nodes with a specific ID.
     * @param {string} id The id.
     * @returns {QuerySet} The QuerySet object.
     */
    findById(id) {
        return this.pushStack(
            this._dom.findById(id, this)
        );
    },

    /**
     * Return all descendent nodes with a specific tag.
     * @param {string} tagName The tag name.
     * @returns {QuerySet} The QuerySet object.
     */
    findByTag(tagName) {
        return this.pushStack(
            this._dom.findByTag(tagName, this)
        );
    },

    /**
     * Return a single descendent node matching a selector.
     * @param {string} selector The query selector.
     * @returns {QuerySet} The QuerySet object.
     */
    findOne(selector) {
        return this.pushNode(
            this._dom.findOne(selector, this)
        );
    },

    /**
     * Return a single descendent node with a specific class.
     * @param {string} className The class name.
     * @returns {QuerySet} The QuerySet object.
     */
    findOneByClass(className) {
        return this.pushNode(
            this._dom.findOneByClass(className, this)
        );
    },

    /**
     * Return a single descendent node with a specific ID.
     * @param {string} id The id.
     * @returns {QuerySet} The QuerySet object.
     */
    findOneById(id) {
        return this.pushNode(
            this._dom.findOneById(id, this)
        );
    },

    /**
     * Return a single descendent node with a specific tag.
     * @param {string} tagName The tag name.
     * @returns {QuerySet} The QuerySet object.
     */
    findOneByTag(tagName) {
        return this.pushNode(
            this._dom.findOneByTag(tagName, this)
        );
    }

});
