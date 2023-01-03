import { clamp } from '@fr0st/core';
import { getTime } from './helpers.js';
import { getAnimationDefaults } from './../config.js';
import { animations } from './../vars.js';

/**
 * Animation Class
 * @class
 */
export default class Animation {
    #node;
    #callback;
    #options;
    #promise;
    #resolve;
    #reject;

    #isStopped = false;
    #isFinished = false;

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
        this.#node = node;
        this.#callback = callback;

        this.#options = {
            ...getAnimationDefaults(),
            ...options,
        };

        if (!('start' in this.#options)) {
            this.#options.start = getTime();
        }

        if (this.#options.debug) {
            this.#node.dataset.animationStart = this.#options.start;
        }

        this.#promise = new Promise((resolve, reject) => {
            this.#resolve = resolve;
            this.#reject = reject;
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
        return this.#promise.catch(onRejected);
    }

    /**
     * Clone the animation to a new node.
     * @param {HTMLElement} node The input node.
     * @return {Animation} The cloned Animation.
     */
    clone(node) {
        return new Animation(node, this.#callback, this.#options);
    }

    /**
     * Execute a callback once the animation is settled (resolved or rejected).
     * @param {function} [onFinally] The callback to execute once the animation is settled.
     * @return {Promise} The promise.
     */
    finally(onFinally) {
        return this.#promise.finally(onFinally);
    }

    /**
     * Stop the animation.
     * @param {object} [options] The options for stopping the animation.
     * @param {Boolean} [options.finish=true] Whether to finish the animation.
    */
    stop({ finish = true } = {}) {
        if (this.#isStopped || this.#isFinished) {
            return;
        }

        const otherAnimations = animations.get(this.#node)
            .filter((animation) => animation !== this);

        if (!otherAnimations.length) {
            animations.delete(this.#node);
        } else {
            animations.set(this.#node, otherAnimations);
        }

        if (finish) {
            this.update();
        }

        this.#isStopped = true;

        if (!finish) {
            this.#reject(this.#node);
        }
    }

    /**
     * Execute a callback once the animation is resolved (or optionally rejected).
     * @param {function} onFulfilled The callback to execute if the animation is resolved.
     * @param {function} [onRejected] The callback to execute if the animation is rejected.
     * @return {Promise} The promise.
     */
    then(onFulfilled, onRejected) {
        return this.#promise.then(onFulfilled, onRejected);
    }

    /**
     * Run a single frame of the animation.
     * @param {number} [time] The current time.
     * @return {Boolean} TRUE if the animation is finished, otherwise FALSE.
     */
    update(time = null) {
        if (this.#isStopped) {
            return true;
        }

        let progress;

        if (time === null) {
            progress = 1;
        } else {
            progress = (time - this.#options.start) / this.#options.duration;

            if (this.#options.infinite) {
                progress %= 1;
            } else {
                progress = clamp(progress);
            }

            if (this.#options.type === 'ease-in') {
                progress = progress ** 2;
            } else if (this.#options.type === 'ease-out') {
                progress = Math.sqrt(progress);
            } else if (this.#options.type === 'ease-in-out') {
                if (progress <= 0.5) {
                    progress = progress ** 2 * 2;
                } else {
                    progress = 1 - ((1 - progress) ** 2 * 2);
                }
            }
        }

        if (this.#options.debug) {
            this.#node.dataset.animationTime = time;
            this.#node.dataset.animationProgress = progress;
        }

        this.#callback(this.#node, progress, this.#options);

        if (progress < 1) {
            return false;
        }

        if (this.#options.debug) {
            delete this.#node.dataset.animationStart;
            delete this.#node.dataset.animationTime;
            delete this.#node.dataset.animationProgress;
        }

        if (!this.#isFinished) {
            this.#isFinished = true;

            this.#resolve(this.#node);
        }

        return true;
    }
}

Object.setPrototypeOf(Animation.prototype, Promise.prototype);
