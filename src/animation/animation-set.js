/**
* AnimationSet Class
* @class
*/
export default class AnimationSet {
    /**
     * New AnimationSet constructor.
     * @param {array} animations The animations.
     */
    constructor(animations) {
        this._animations = animations;
        this._promise = Promise.all(animations);
    }

    /**
     * Execute a callback if any of the animations is rejected.
     * @param {function} [onRejected] The callback to execute if an animation is rejected.
     * @return {Promise} The promise.
     */
    catch(onRejected) {
        return this._promise.catch(onRejected);
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
     * Stop the animations.
     * @param {object} [options] The options for stopping the animation.
     * @param {Boolean} [options.finish=true] Whether to finish the animations.
    */
    stop({ finish = true } = {}) {
        for (const animation of this._animations) {
            animation.stop({ finish });
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
}

Object.setPrototypeOf(AnimationSet.prototype, Promise.prototype);
