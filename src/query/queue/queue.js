import { getWindow } from './../../config.js';
import { clearQueue as _clearQueue, queue as _queue } from './../../queue/queue.js';

/**
 * @typedef {import('../../queue/queue.js').QueueCallback} QueueCallback
 * @typedef {import('../../queue/queue.js').QueueOptions} QueueOptions
 * @typedef {import('../query-set.js').default} QuerySet
 */

/**
 * Clears the queue of each node.
 * @param {QueueOptions} [options] The queue options.
 * @returns {QuerySet} The QuerySet object.
 */
export function clearQueue({ queueName = 'default' } = {}) {
    _clearQueue(this, { queueName });

    return this;
};

/**
 * Delays execution of subsequent items in the queue for each node.
 * @param {number} duration The number of milliseconds to delay execution by.
 * @param {QueueOptions} [options] The queue options.
 * @returns {QuerySet} The QuerySet object.
 */
export function delay(duration, { queueName = 'default' } = {}) {
    const { setTimeout } = getWindow();

    return this.queue((_) =>
        new Promise((resolve) =>
            setTimeout(resolve, duration),
        ),
    { queueName },
    );
};

/**
 * Queues a callback on each node.
 * @param {QueueCallback} callback The callback to queue.
 * @param {QueueOptions} [options] The queue options.
 * @returns {QuerySet} The QuerySet object.
 */
export function queue(callback, { queueName = 'default' } = {}) {
    _queue(this, callback, { queueName });

    return this;
};
