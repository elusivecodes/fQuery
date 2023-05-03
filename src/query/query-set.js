/**
 * QuerySet Class
 * @class
 */
export default class QuerySet {
    /**
     * New DOM constructor.
     * @param {array} nodes The input nodes.
     */
    constructor(nodes = []) {
        this._nodes = nodes;
    }

    /**
     * Get the number of nodes.
     * @return {number} The number of nodes.
     */
    get length() {
        return this._nodes.length;
    }

    /**
     * Execute a function for each node in the set.
     * @param {function} callback The callback to execute
     * @return {QuerySet} The QuerySet object.
     */
    each(callback) {
        this._nodes.forEach(
            (v, i) => callback(v, i),
        );

        return this;
    }

    /**
     * Retrieve the DOM node(s) contained in the QuerySet.
     * @param {number} [index=null] The index of the node.
     * @return {array|Node|Document|Window} The node(s).
     */
    get(index = null) {
        if (index === null) {
            return this._nodes;
        }

        return index < 0 ?
            this._nodes[index + this._nodes.length] :
            this._nodes[index];
    }

    /**
     * Execute a function for each node in the set.
     * @param {function} callback The callback to execute
     * @return {QuerySet} A new QuerySet object.
     */
    map(callback) {
        const nodes = this._nodes.map(callback);

        return new QuerySet(nodes);
    }

    /**
     * Reduce the set of matched nodes to a subset specified by a range of indices.
     * @param {number} [begin] The index to slice from.
     * @param {number} [end]  The index to slice to.
     * @return {QuerySet} A new QuerySet object.
     */
    slice(begin, end) {
        const nodes = this._nodes.slice(begin, end);

        return new QuerySet(nodes);
    }

    /**
     * Return an iterable from the nodes.
     * @return {ArrayIterator} The iterator object.
     */
    [Symbol.iterator]() {
        return this._nodes.values();
    }
}
