/**
 * DOM (Static) Queue
 */

Object.assign(DOM, {

    /**
     * Clear the queue of a single node.
     * @param {HTMLElement} node The input node.
     */
    _clearQueue(node) {
        if (!this._queues.has(node)) {
            return;
        }

        this._queues.delete(node);
    },

    /**
     * Run the next callback for a single node.
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
            .then(_ =>
                this._dequeueNode(node)
            ).catch(_ =>
                this._clearQueue(node)
            );
    },

    /**
     * Queue a callback on a single node.
     * @param {HTMLElement} node The input node.
     * @param {DOM~queueCallback} callback The callback to queue.
     */
    _queue(node, callback) {
        const newQueue = !this._queues.has(node);

        if (newQueue) {
            this._queues.set(node, [
                _ => new Promise(
                    resolve => setTimeout(resolve, 0)
                )
            ]);
        }

        this._queues.get(node).push(callback);

        if (newQueue) {
            this._dequeueNode(node);
        }
    }

});
