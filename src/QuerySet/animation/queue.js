/**
 * QuerySet Queue
 */

Object.assign(QuerySet.prototype, {

    /**
     * Clear the queue of each node.
     * @returns {QuerySet} The QuerySet object.
     */
    clearQueue() {
        this._dom.clearQueue(this);

        return this;
    },

    /**
     * Delay execution of subsequent items in the queue for each node.
     * @param {number} duration The number of milliseconds to delay execution by.
     * @returns {QuerySet} The QuerySet object.
     */
    delay(duration) {
        return this.queue(_ =>
            new Promise(resolve =>
                setTimeout(
                    resolve,
                    duration
                )
            )
        );
    },

    /**
     * Queue a callback on each node.
     * @param {DOM~queueCallback} callback The callback to queue.
     * @returns {QuerySet} The QuerySet object.
     */
    queue(callback) {
        this._dom.queue(this, callback);

        return this;
    }

});
