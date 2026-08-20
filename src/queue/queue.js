import { parseNodes } from './../filters.js';
import { queues } from './../vars.js';

/** @typedef {import('../helpers.js').ElementInput} ElementInput */

/**
 * @callback QueueCallback
 * @param {Element} node The queued element.
 * @returns {*|Promise<*>} The callback result.
 */

/**
 * @typedef {object} QueueOptions
 * @property {string} [queueName='default'] The queue name.
 */

/**
 * @typedef {object} ClearQueueOptions
 * @property {string|null} [queueName=null] The queue name. Null addresses every queue.
 */

/**
 * Clears the queue of each node.
 * @param {ElementInput} selector The input node(s), or a query selector string.
 * @param {ClearQueueOptions} [options] The queue clearing options.
 */
export function clearQueue(selector, { queueName = null } = {}) {
    const nodes = parseNodes(selector);

    for (const node of nodes) {
        if (!queues.has(node)) {
            continue;
        }

        const queue = queues.get(node);

        if (queueName) {
            delete queue[queueName];
        }

        if (!queueName || !Object.keys(queue).length) {
            queues.delete(node);
        }
    }
};

/**
 * Runs the next callback for a single node.
 * @param {Element} node The input node.
 * @param {QueueOptions} [options] The queue options.
 */
function dequeue(node, { queueName = 'default' } = {}) {
    const queue = queues.get(node);

    if (!queue || !(queueName in queue)) {
        return;
    }

    const next = queue[queueName].shift();

    if (!next) {
        queues.delete(node);
        return;
    }

    Promise.resolve(next(node))
        .then((_) => {
            dequeue(node, { queueName });
        }).catch((_) => {
            queues.delete(node);
        });
};

/**
 * Queues a callback on each node.
 * @param {ElementInput} selector The input node(s), or a query selector string.
 * @param {QueueCallback} callback The callback to queue.
 * @param {QueueOptions} [options] The queue options.
 */
export function queue(selector, callback, { queueName = 'default' } = {}) {
    const nodes = parseNodes(selector);

    for (const node of nodes) {
        if (!queues.has(node)) {
            queues.set(node, {});
        }

        const queue = queues.get(node);
        const runningQueue = queueName in queue;

        if (!runningQueue) {
            queue[queueName] = [
                (_) => new Promise((resolve) => {
                    setTimeout(resolve, 1);
                }),
            ];
        }

        queue[queueName].push(callback);

        if (!runningQueue) {
            dequeue(node, { queueName });
        }
    }
};
