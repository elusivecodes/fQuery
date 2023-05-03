import { clamp } from '@fr0st/core';
import { getTime } from './helpers.js';
import { getAnimationDefaults } from './../config.js';
import { animations } from './../vars.js';

/**
 * Animation Class
 * @class
 */
export default class Animation {
    /**
     * New Animation constructor.
     * @param {HTMLElement} node The input node.
     * @param {DOM~animationCallback} callback The animation callback.
     * @param {object} [options] The options to use for the animation.
     * @param {string} [options.type=ease-in-out] The type of animation
     * @param {number} [options.duration=1000] The duration the animation should last.
     * @param {Boolean} [options.infinite] Whether to repeat the animation.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
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
     * Execute a callback if the animation is rejected.
     * @param {function} [onRejected] The callback to execute if the animation is rejected.
     * @return {Promise} The promise.
     */
    catch(onRejected) {
        return this._promise.catch(onRejected);
    }

    /**
     * Clone the animation to a new node.
     * @param {HTMLElement} node The input node.
     * @return {Animation} The cloned Animation.
     */
    clone(node) {
        return new Animation(node, this._callback, this._options);
    }

    /**
     * Execute a callback once the animation is settled (resolved or rejected).
     * @param {function} [onFinally] The callback to execute once the animation is settled.
     * @return {Promise} The promise.
     */
    finally(onFinally) {
        return this._promise.finally(onFinally);
    }

    /**
     * Stop the animation.
     * @param {object} [options] The options for stopping the animation.
     * @param {Boolean} [options.finish=true] Whether to finish the animation.
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
     * Execute a callback once the animation is resolved (or optionally rejected).
     * @param {function} onFulfilled The callback to execute if the animation is resolved.
     * @param {function} [onRejected] The callback to execute if the animation is rejected.
     * @return {Promise} The promise.
     */
    then(onFulfilled, onRejected) {
        return this._promise.then(onFulfilled, onRejected);
    }

    /**
     * Run a single frame of the animation.
     * @param {number} [time] The current time.
     * @return {Boolean} TRUE if the animation is finished, otherwise FALSE.
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

        this._callback(this._node, progress, this._options);

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
