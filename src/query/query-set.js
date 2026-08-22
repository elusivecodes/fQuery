/**
 * Represents an ordered, chainable collection of DOM nodes.
 */
export default class QuerySet {
    #nodes;

    /**
     * Creates a QuerySet.
     * @param {Array<Node|Window>} [nodes=[]] The input nodes.
     */
    constructor(nodes = []) {
        this.#nodes = nodes;
    }

    /**
     * Gets the number of nodes.
     * @returns {number} The number of nodes.
     */
    get length() {
        return this.#nodes.length;
    }

    /**
     * Executes a function for each node in the set.
     * @param {((node: Node|Window, index: number) => void)} callback The callback to execute.
     * @returns {this} The current QuerySet.
     */
    each(callback) {
        this.#nodes.forEach(
            (v, i) => callback(v, i),
        );

        return this;
    }

    /**
     * Retrieves the DOM node(s) contained in the QuerySet.
     * @param {number} [index=null] The index of the node.
     * @returns {Array<Node|Window>|Node|Window|undefined} The nodes, or the node at the specified index.
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
     * Executes a function for each node in the set.
     * @param {((node: Node|Window, index: number) => (Node|Window))} callback The callback to execute.
     * @returns {QuerySet} A new QuerySet object.
     */
    map(callback) {
        const nodes = this.#nodes.map(callback);

        return new QuerySet(nodes);
    }

    /**
     * Reduces the set of matched nodes to a subset specified by a range of indices.
     * @param {number} [begin] The index to slice from.
     * @param {number} [end]  The index to slice to.
     * @returns {QuerySet} A new QuerySet object.
     */
    slice(begin, end) {
        const nodes = this.#nodes.slice(begin, end);

        return new QuerySet(nodes);
    }

    /**
     * Returns an iterable from the nodes.
     * @returns {IterableIterator<Node|Window>} The node iterator.
     */
    [Symbol.iterator]() {
        return this.#nodes.values();
    }
}
