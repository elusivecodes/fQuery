/**
 * QuerySet Utility
 */

Object.assign(QuerySet.prototype, {

    /**
     * Push new nodes to the stack and sort the results.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} query The input query.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
     * @returns {QuerySet} The QuerySet object.
     */
    add(query, context = null) {
        return this.pushStack(
            Core.unique(
                Core.merge(
                    [],
                    this._nodes,
                    this._dom.query(query, context).get()
                )
            )
        ).sort();
    },

    /**
     * Execute a function for each node in the set.
     * @param {function} callback The callback to execute
     * @returns {QuerySet} The QuerySet object.
     */
    each(callback) {
        this._nodes.forEach(
            (v, i) => callback(v, i)
        );

        return this;
    },

    /**
     * Reduce the set of nodes to the one at the specified index.
     * @param {number} index The index of the node.
     * @returns {QuerySet} The QuerySet object.
     */
    eq(index) {
        return this.pushNode(
            this.get(index)
        );
    },

    /**
     * Reduce the set of nodes to the first.
     * @returns {QuerySet} The QuerySet object.
     */
    first() {
        return this.eq(0);
    },

    /**
     * Retrieve the DOM node(s) contained in the QuerySet.
     * @param {number} [index=null] The index of the node.
     * @returns {array|Node|Document|Window} The node(s).
     */
    get(index = null) {
        if (index === null) {
            return this._nodes;
        }

        return index < 0 ?
            this._nodes[index + this._nodes.length] :
            this._nodes[index];
    },

    /**
     * Get the index of the first node relative to it's parent node.
     * @returns {number} The index.
     */
    index() {
        return this._dom.index(this);
    },

    /**
     * Get the index of the first node matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {number} The index.
     */
    indexOf(filter) {
        return this._dom.indexOf(this, filter);
    },

    /**
     * Reduce the set of nodes to the last.
     * @returns {QuerySet} The QuerySet object.
     */
    last() {
        return this.eq(-1);
    },

    /**
     * Execute a function for each node in the set.
     * @param {function} callback The callback to execute
     * @returns {QuerySet} A new QuerySet object.
     */
    map(callback) {
        return new this.constructor(
            this._nodes.map(
                (v, i) => callback(v, i)
            )
        );
    },

    /**
     * Normalize nodes (remove empty text nodes, and join adjacent text nodes).
     * @returns {QuerySet} The QuerySet object.
     */
    normalize() {
        this._dom.normalize(this);

        return this;
    },

    /**
     * Return a serialized string containing names and values of all form nodes.
     * @returns {string} The serialized string.
     */
    serialize() {
        return this._dom.serialize(this);
    },

    /**
     * Return a serialized array containing names and values of all form nodes.
     * @returns {array} The serialized array.
     */
    serializeArray() {
        return this._dom.serializeArray(this);
    },

    /**
     * Reduce the set of matched nodes to a subset specified by a range of indices.
     * @param {number} [begin] The index to slice from.
     * @param {number} [end]  The index to slice to.
     * @returns {QuerySet} A new QuerySet object.
     */
    slice(begin, end) {
        return new this.constructor(
            this._nodes.slice(begin, end)
        );
    },

    /**
     * Sort nodes by their position in the document.
     * @returns {QuerySet} The QuerySet object.
     */
    sort() {
        return this.pushStack(
            this._dom.sort(this)
        );
    },

    /**
     * Return the tag name (lowercase) of the first node.
     * @returns {string} The nodes tag name (lowercase).
     */
    tagName() {
        return this._dom.tagName(this);
    },

    /**
     * Return an iterable from the nodes.
     * @returns {Array Iterator} The iterator object.
     */
    [Symbol.iterator]() {
        return this._nodes.values();
    }

});
