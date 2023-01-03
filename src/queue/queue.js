import { parseNodes } from './../filters.js';
import { queues } from './../vars.js';

/**
 * DOM Queue
 */

/**
 * Clear the queue of each node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {object} [options] The options for clearing the queue.
 * @param {string} [options.queueName] The name of the queue to use.
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
 * Run the next callback for a single node.
 * @param {HTMLElement} node The input node.
 * @param {object} [options] The options for clearing the queue.
 * @param {string} [options.queueName=default] The name of the queue to use.
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
 * Queue a callback on each node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {DOM~queueCallback} callback The callback to queue.
 * @param {object} [options] The options for clearing the queue.
 * @param {string} [options.queueName=default] The name of the queue to use.
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
