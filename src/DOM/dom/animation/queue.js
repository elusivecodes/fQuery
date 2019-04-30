/**
 * DOM Queue
 */

Object.assign(DOM.prototype, {

    /**
     * @callback DOM~queueCallback
     * @param {HTMLElement} node The input node.
     */

    /**
     * Clear the queue of each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     */
    clearQueue(nodes) {
        nodes = this._nodeFilter(nodes);

        for (const node of nodes) {
            this._clearQueue(node);
        }
    },

    /**
     * Queue a callback on each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {DOM~queueCallback} callback The callback to queue.
     */
    queue(nodes, callback) {
        nodes = this._nodeFilter(nodes);

        for (const node of nodes) {
            this._queue(node, callback);
        }
    },

    /**
     * Clear the queue of a single element.
     * @param {HTMLElement} node The input node.
     */
    _clearQueue(node) {
        if (!this._queues.has(node)) {
            return;
        }

        this._queues.delete(node);
    },

    /**
     * Run the next callback for a single element.
     * @param {HTMLElement} node The input node.
     */
    _dequeueNode(node) {
        if (!this._queues.has(node)) {
            return;
        }

        const next = this._queues.get(node).shift();

        if (!next) {
            this._queues.delete(node);
            return;
        }

        Promise.resolve(next(node))
            .finally(_ =>
                this._dequeueNode(node)
            );
    },

    /**
     * Queue a callback on a single element.
     * @param {HTMLElement} node The input node.
     * @param {DOM~queueCallback} callback The callback to queue.
     */
    _queue(node, callback) {
        const newQueue = !this._queues.has(node);

        if (newQueue) {
            this._queues.set(node, []);
        }

        this._queues.get(node).push(callback);

        if (newQueue) {
            this._dequeueNode(node);
        }
    }

});
