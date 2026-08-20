import { animate as _animate, stop as _stop } from './../../animation/animate.js';

/**
 * @typedef {import('../../animation/animation.js').AnimationCallback} AnimationCallback
 * @typedef {import('../../animation/animation.js').QueuedAnimationOptions} QueuedAnimationOptions
 * @typedef {import('../../animation/animation.js').StopAnimationOptions} StopAnimationOptions
 * @typedef {import('../query-set.js').default} QuerySet
 */

/**
 * Adds an animation to the queue for each node.
 * @param {AnimationCallback} callback The animation callback.
 * @param {QueuedAnimationOptions} [options] The queued animation options.
 * @returns {QuerySet} The QuerySet object.
 */
export function animate(callback, { queueName = 'default', ...options } = {}) {
    return this.queue((node) =>
        _animate(node, callback, options),
    { queueName },
    );
};

/**
 * Stops all animations and clears the queue of each node.
 * @param {StopAnimationOptions} [options] The stopping options.
 * @returns {QuerySet} The QuerySet object.
 */
export function stop({ finish = true } = {}) {
    this.clearQueue();
    _stop(this, { finish });

    return this;
};
