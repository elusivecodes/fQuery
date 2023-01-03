/**
 * QuerySet Class
 * @class
 */
export default class QuerySet {
    #nodes = [];

    /**
     * New DOM constructor.
     * @param {array} nodes The input nodes.
     */
    constructor(nodes = []) {
        this.#nodes = nodes;
    }

    /**
     * Get the number of nodes.
     * @return {number} The number of nodes.
     */
    get length() {
        return this.#nodes.length;
    }

    /**
     * Execute a function for each node in the set.
     * @param {function} callback The callback to execute
     * @return {QuerySet} The QuerySet object.
     */
    each(callback) {
        this.#nodes.forEach(
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
            return this.#nodes;
        }

        return index < 0 ?
            this.#nodes[index + this.#nodes.length] :
            this.#nodes[index];
    }

    /**
     * Execute a function for each node in the set.
     * @param {function} callback The callback to execute
     * @return {QuerySet} A new QuerySet object.
     */
    map(callback) {
        const nodes = this.#nodes.map(callback);

        return new QuerySet(nodes);
    }

    /**
     * Reduce the set of matched nodes to a subset specified by a range of indices.
     * @param {number} [begin] The index to slice from.
     * @param {number} [end]  The index to slice to.
     * @return {QuerySet} A new QuerySet object.
     */
    slice(begin, end) {
        const nodes = this.#nodes.slice(begin, end);

        return new QuerySet(nodes);
    }

    /**
     * Return an iterable from the nodes.
     * @return {ArrayIterator} The iterator object.
     */
    [Symbol.iterator]() {
        return this.#nodes.values();
    }
}
