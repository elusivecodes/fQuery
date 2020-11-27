/**
 * DOM (Static) Queue
 */

Object.assign(DOM, {

    /**
     * Clear the queue of a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} queueName The name of the queue to clear.
     */
    _clearQueue(node, queueName) {
        const queue = this._queues.get(node);

        if (!queue || (queueName && !(queueName in queue))) {
            return;
        }

        for (const key in queue) {
            if (!queueName || key === queueName) {
                delete queue[key];
            }
        }

        if (Object.keys(queue).length) {
            return;
        }

        this._queues.delete(node);
    },

    /**
     * Run the next callback for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} queueName The name of the queue to use.
     */
    _dequeue(node, queueName) {
        const queue = this._queues.get(node);

        if (!queue || !(queueName in queue)) {
            return;
        }

        const next = queue[queueName].shift();

        if (!next) {
            return this._clearQueue(node, queueName);
        }

        Promise.resolve(next(node))
            .then(_ =>
                this._dequeue(node, queueName)
            ).catch(_ =>
                this._clearQueue(node, queueName)
            );
    },

    /**
     * Queue a callback on a single node.
     * @param {HTMLElement} node The input node.
     * @param {DOM~queueCallback} callback The callback to queue.
     * @param {string} queueName The name of the queue to use.
     */
    _queue(node, callback, queueName) {
        if (!this._queues.has(node)) {
            this._queues.set(node, {});
        }

        const queue = this._queues.get(node);
        const runningQueue = queueName in queue;

        if (!runningQueue) {
            queue[queueName] = [
                _ => new Promise(
                    resolve => setTimeout(resolve, 0)
                )
            ];
        }

        queue[queueName].push(callback);

        if (!runningQueue) {
            this._dequeue(node, queueName);
        }
    }

});
