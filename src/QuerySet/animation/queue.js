/**
 * QuerySet Queue
 */

Object.assign(QuerySet.prototype, {

    /**
     * Clear the queue of each node.
     * @param {string} [queueName=default] The name of the queue to clear.
     * @returns {QuerySet} The QuerySet object.
     */
    clearQueue(queueName = 'default') {
        this._dom.clearQueue(this, queueName);

        return this;
    },

    /**
     * Delay execution of subsequent items in the queue for each node.
     * @param {number} duration The number of milliseconds to delay execution by.
     * @param {string} [queueName=default] The name of the queue to use.
     * @returns {QuerySet} The QuerySet object.
     */
    delay(duration, queueName = 'default') {
        return this.queue(_ =>
            new Promise(resolve =>
                setTimeout(
                    resolve,
                    duration
                )
            ),
            queueName
        );
    },

    /**
     * Queue a callback on each node.
     * @param {DOM~queueCallback} callback The callback to queue.
     * @param {string} [queueName=default] The name of the queue to use.
     * @returns {QuerySet} The QuerySet object.
     */
    queue(callback, queueName = 'default') {
        this._dom.queue(this, callback, queueName);

        return this;
    }

});
