/**
 * DOM Queue
 */

Object.assign(DOM.prototype, {

    /**
     * Clear the queue of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    clearQueue(nodes) {
        nodes = this.parseNodes(nodes);

        for (const node of nodes) {
            this.constructor._clearQueue(node);
        }
    },

    /**
     * Queue a callback on each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {DOM~queueCallback} callback The callback to queue.
     */
    queue(nodes, callback) {
        nodes = this.parseNodes(nodes);

        for (const node of nodes) {
            this.constructor._queue(node, callback);
        }
    }

});
