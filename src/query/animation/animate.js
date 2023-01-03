import { animate as _animate, stop as _stop } from './../../animation/animate.js';

/**
 * QuerySet Animate
 */

/**
 * Add an animation to the queue for each node.
 * @param {DOM~animationCallback} callback The animation callback.
 * @param {object} [options] The options to use for animating.
 * @param {string} [options.queueName=default] The name of the queue to use.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {QuerySet} The QuerySet object.
 */
export function animate(callback, { queueName = 'default', ...options } = {}) {
    return this.queue((node) =>
        _animate(node, callback, options),
    { queueName },
    );
};

/**
 * Stop all animations and clear the queue of each node.
 * @param {object} [options] The options for stopping the animation.
 * @param {Boolean} [options.finish=true] Whether to complete all current animations.
 * @return {QuerySet} The QuerySet object.
 */
export function stop({ finish = true } = {}) {
    this.clearQueue();
    _stop(this, { finish });

    return this;
};
