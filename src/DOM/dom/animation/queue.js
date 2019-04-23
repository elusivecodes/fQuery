/**
 * DOM Queue
 */

Object.assign(DOM.prototype, {

    /**
     * @callback DOM~queueCallback
     * @param {HTMLElement} node The input node.
     */

    /**
     * Queue a callback on each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {DOM~queueCallback} callback The callback to queue.
     */
    queue(nodes, callback) {
        this._nodeFilter(nodes)
            .forEach(node => this._queue(node, callback));
    },

    /**
     * Clear the queue of each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     */
    clearQueue(nodes) {
        this._nodeFilter(nodes)
            .forEach(node => this._clearQueue(node));
    },

    /**
     * Clear the queue of a single element.
     * @param {HTMLElement} node The input node.
     */
    _clearQueue(node) {
        if (!this.queues.has(node)) {
            return;
        }

        this.queues.delete(node);
    },

    /**
     * Run the next callback for a single element.
     * @param {HTMLElement} node The input node.
     */
    _dequeueNode(node) {
        if (!this.queues.has(node)) {
            return;
        }

        const next = this.queues.get(node).shift();

        if (!next) {
            this.queues.delete(node);
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
        const newQueue = !this.queues.has(node);

        let queue;
        if (newQueue) {
            queue = [];
            this.queues.set(node, queue);
        } else {
            queue = this.queues.get(node);
        }

        queue.push(callback);

        if (newQueue) {
            this._dequeueNode(node);
        }
    }

});
