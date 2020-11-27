/**
 * DOM Queue
 */

Object.assign(DOM.prototype, {

    /**
     * Clear the queue of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [queueName=default] The name of the queue to use.
     */
    clearQueue(nodes, queueName = 'default') {
        nodes = this.parseNodes(nodes);

        for (const node of nodes) {
            this.constructor._clearQueue(node, queueName);
        }
    },

    /**
     * Queue a callback on each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {DOM~queueCallback} callback The callback to queue.
     * @param {string} [queueName=default] The name of the queue to use.
     */
    queue(nodes, callback, queueName = 'default') {
        nodes = this.parseNodes(nodes);

        for (const node of nodes) {
            this.constructor._queue(node, callback, queueName);
        }
    }

});
