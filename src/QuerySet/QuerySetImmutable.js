/**
 * QuerySetImmutable Class
 * @class
 */
class QuerySetImmutable extends QuerySet {

    /**
     * Push a new set of nodes to the stack.
     * @param {array} nodes The nodes to push.
     * @returns {QuerySet} The QuerySet object.
     */
    pushStack(nodes) {
        return new QuerySetImmutable(nodes);
    }

}
