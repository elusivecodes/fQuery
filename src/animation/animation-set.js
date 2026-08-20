/**
 * @typedef {import('./animation.js').default} Animation
 * @typedef {import('./animation.js').StopAnimationOptions} StopAnimationOptions
 */

/**
 * Represents a Promise-compatible collection of animations.
 */
export default class AnimationSet {
    /**
     * Creates an animation set.
     * @param {Animation[]} animations The animations.
     */
    constructor(animations) {
        this._animations = animations;
        this._promise = Promise.all(animations);
    }

    /**
     * Executes a callback if any of the animations is rejected.
     * @param {((reason: HTMLElement) => *)} [onRejected] The callback to execute if an animation is rejected.
     * @returns {Promise<*>} The resulting promise.
     */
    catch(onRejected) {
        return this._promise.catch(onRejected);
    }

    /**
     * Executes a callback once the animation is settled (resolved or rejected).
     * @param {(() => void)} [onFinally] The callback to execute once the animation set is settled.
     * @returns {Promise<*>} The resulting promise.
     */
    finally(onFinally) {
        return this._promise.finally(onFinally);
    }

    /**
     * Stops the animations.
     * @param {StopAnimationOptions} [options] The stopping options.
     */
    stop({ finish = true } = {}) {
        for (const animation of this._animations) {
            animation.stop({ finish });
        }
    }

    /**
     * Executes a callback once the animation is resolved (or optionally rejected).
     * @param {((value: HTMLElement[]) => *)} onFulfilled The callback to execute if the animations resolve.
     * @param {((reason: HTMLElement) => *)} [onRejected] The callback to execute if an animation is rejected.
     * @returns {Promise<*>} The resulting promise.
     */
    then(onFulfilled, onRejected) {
        return this._promise.then(onFulfilled, onRejected);
    }
}

Object.setPrototypeOf(AnimationSet.prototype, Promise.prototype);
