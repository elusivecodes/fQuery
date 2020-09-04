/**
 * QuerySet Class
 * @class
 */
class QuerySet {

    /**
     * New DOM constructor.
     * @param {array} nodes The input nodes.
     * @param {DOM} [context=dom] The DOM context.
     * @returns {QuerySet} A new QuerySet object.
     */
    constructor(nodes, context = dom) {
        this._dom = context;
        this._nodes = nodes;
    }

    get length() {
        return this._nodes.length;
    }

    /**
     * Push a single node to the stack.
     * @param {Node|DocumentFragment|ShadowRoot|Document|Window} [node] The node to push.
     * @returns {QuerySet} The QuerySet object.
     */
    pushNode(node) {
        return this.pushStack(
            [node].filter(v => v)
        );
    }

    /**
     * Push a new set of nodes to the stack.
     * @param {array} nodes The nodes to push.
     * @returns {QuerySet} The QuerySet object.
     */
    pushStack(nodes) {
        this._nodes = nodes;

        return this;
    }

}
