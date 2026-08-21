import { clamp } from '@fr0st/core';
import { getAnimationDefaults } from './../config.js';
import { animations } from './../vars.js';
import { getTime } from './helpers.js';

/**
 * @typedef {'linear'|'ease-in'|'ease-out'|'ease-in-out'} AnimationType
 */

/**
 * @typedef {'top'|'right'|'bottom'|'left'|(() => string)} AnimationDirection
 */

/**
 * @typedef {object} AnimationOptions
 * @property {number} [duration=1000] The duration in milliseconds.
 * @property {AnimationType} [type='ease-in-out'] The easing type.
 * @property {boolean} [infinite=false] Whether to repeat indefinitely.
 * @property {boolean} [debug=false] Whether to expose timing data on the element.
 * @property {AnimationDirection} [direction] The animation direction.
 * @property {boolean} [useGpu=true] Whether to use GPU-accelerated transforms.
 * @property {number} [x=0] The X-axis rotation component.
 * @property {number} [y=1] The Y-axis rotation component.
 * @property {number} [z=0] The Z-axis rotation component.
 * @property {boolean} [inverse=false] Whether to invert the rotation.
 * @property {number} [start] The animation start time.
 */

/**
 * @typedef {AnimationOptions & {queueName?: string}} QueuedAnimationOptions
 */

/**
 * @typedef {object} StopAnimationOptions
 * @property {boolean} [finish=true] Whether to finish the animation.
 */

/**
 * @callback AnimationCallback
 * @param {HTMLElement} node The animated element.
 * @param {number} progress The animation progress from 0 to 1.
 * @param {AnimationOptions} options The resolved animation options.
 * @returns {void} Nothing.
 */

/**
 * Represents a single Promise-compatible element animation.
 */
export default class Animation {
    /**
     * Creates an animation.
     * @param {HTMLElement} node The input node.
     * @param {AnimationCallback} callback The animation callback.
     * @param {AnimationOptions} [options] The animation options.
     */
    constructor(node, callback, options) {
        this._node = node;
        this._callback = callback;

        this._options = {
            ...getAnimationDefaults(),
            ...options,
        };

        if (!('start' in this._options)) {
            this._options.start = getTime();
        }

        if (this._options.debug) {
            this._node.dataset.animationStart = this._options.start;
        }

        this._promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });

        if (!animations.has(node)) {
            animations.set(node, []);
        }

        animations.get(node).push(this);
    }

    /**
     * Executes a callback if the animation is rejected.
     * @param {((reason: *) => *)} [onRejected] The callback to execute if the animation is rejected.
     * @returns {Promise<*>} The resulting promise.
     */
    catch(onRejected) {
        return this._promise.catch(onRejected);
    }

    /**
     * Clones the animation to a new node.
     * @param {HTMLElement} node The input node.
     * @returns {Animation} The cloned Animation.
     */
    clone(node) {
        return new Animation(node, this._callback, this._options);
    }

    /**
     * Executes a callback once the animation is settled (resolved or rejected).
     * @param {(() => void)} [onFinally] The callback to execute once the animation is settled.
     * @returns {Promise<*>} The resulting promise.
     */
    finally(onFinally) {
        return this._promise.finally(onFinally);
    }

    /**
     * Stops the animation.
     * @param {StopAnimationOptions} [options] The stopping options.
     */
    stop({ finish = true } = {}) {
        if (this._isStopped || this._isFinished) {
            return;
        }

        const otherAnimations = animations.get(this._node)
            .filter((animation) => animation !== this);

        if (!otherAnimations.length) {
            animations.delete(this._node);
        } else {
            animations.set(this._node, otherAnimations);
        }

        if (finish) {
            this.update();
        }

        this._isStopped = true;

        if (!finish) {
            this._reject(this._node);
        }
    }

    /**
     * Executes a callback once the animation is resolved (or optionally rejected).
     * @param {((value: HTMLElement) => *)} onFulfilled The callback to execute if the animation is resolved.
     * @param {((reason: *) => *)} [onRejected] The callback to execute if the animation is rejected.
     * @returns {Promise<*>} The resulting promise.
     */
    then(onFulfilled, onRejected) {
        return this._promise.then(onFulfilled, onRejected);
    }

    /**
     * Runs a single frame of the animation.
     * @param {number} [time] The current time.
     * @returns {boolean} Whether the animation is finished.
     */
    update(time = null) {
        if (this._isStopped) {
            return true;
        }

        let progress;

        if (time === null) {
            progress = 1;
        } else {
            progress = (time - this._options.start) / this._options.duration;

            if (this._options.infinite) {
                progress %= 1;
            } else {
                progress = clamp(progress);
            }

            if (this._options.type === 'ease-in') {
                progress = progress ** 2;
            } else if (this._options.type === 'ease-out') {
                progress = Math.sqrt(progress);
            } else if (this._options.type === 'ease-in-out') {
                if (progress <= 0.5) {
                    progress = progress ** 2 * 2;
                } else {
                    progress = 1 - ((1 - progress) ** 2 * 2);
                }
            }
        }

        if (this._options.debug) {
            this._node.dataset.animationTime = time;
            this._node.dataset.animationProgress = progress;
        }

        try {
            this._callback(this._node, progress, this._options);
        } catch (error) {
            if (this._options.debug) {
                delete this._node.dataset.animationStart;
                delete this._node.dataset.animationTime;
                delete this._node.dataset.animationProgress;
            }

            this._isFinished = true;
            this._reject(error);

            return true;
        }

        if (progress < 1) {
            return false;
        }

        if (this._options.debug) {
            delete this._node.dataset.animationStart;
            delete this._node.dataset.animationTime;
            delete this._node.dataset.animationProgress;
        }

        if (!this._isFinished) {
            this._isFinished = true;

            this._resolve(this._node);
        }

        return true;
    }
}

Object.setPrototypeOf(Animation.prototype, Promise.prototype);
