import { clearQueue as _clearQueue, queue as _queue } from './../../queue/queue.js';

/**
 * QuerySet Queue
 */

/**
 * Clear the queue of each node.
 * @param {object} [options] The options for clearing the queue.
 * @param {string} [options.queueName=default] The name of the queue to clear.
 * @return {QuerySet} The QuerySet object.
 */
export function clearQueue({ queueName = 'default' } = {}) {
    _clearQueue(this, { queueName });

    return this;
};

/**
 * Delay execution of subsequent items in the queue for each node.
 * @param {number} duration The number of milliseconds to delay execution by.
 * @param {object} [options] The options for clearing the queue.
 * @param {string} [options.queueName=default] The name of the queue to use.
 * @return {QuerySet} The QuerySet object.
 */
export function delay(duration, { queueName = 'default' } = {}) {
    return this.queue((_) =>
        new Promise((resolve) =>
            setTimeout(resolve, duration),
        ),
    { queueName },
    );
};

/**
 * Queue a callback on each node.
 * @param {DOM~queueCallback} callback The callback to queue.
 * @param {object} [options] The options for clearing the queue.
 * @param {string} [options.queueName=default] The name of the queue to use.
 * @return {QuerySet} The QuerySet object.
 */
export function queue(callback, { queueName = 'default' } = {}) {
    _queue(this, callback, { queueName });

    return this;
};
