/**
* AnimationSet Class
* @class
*/
class AnimationSet {

    /**
     * New AnimationSet constructor.
     * @param {array} animations The animations.
     */
    constructor(animations) {
        this._animations = animations;
        this.promise = Promise.all(animations);
    }

    /**
     * Execute a callback if any of the animations is rejected.
     * @param {function} [onRejected] The callback to execute if an animation is rejected.
     * @returns {Promise} The promise.
     */
    catch(onRejected) {
        return this.promise.catch(onRejected);
    }

    /**
     * Execute a callback once the animation is settled (resolved or rejected).
     * @param {function} [onRejected] The callback to execute once the animation is settled.
     * @returns {Promise} The promise.
     */
    finally(onFinally) {
        return this.promise.finally(onFinally);
    }

    /**
     * Stop the animations.
     * @param {Boolean} [finish=true] Whether to finish the animations.
    */
    stop(finish = true) {
        for (const animation of this._animations) {
            animation.stop(finish);
        }
    }

    /**
     * Execute a callback once the animation is resolved (or optionally rejected).
     * @param {function} onFulfilled The callback to execute if the animation is resolved.
     * @param {function} [onRejected] The callback to execute if the animation is rejected.
     * @returns {Promise} The promise.
     */
    then(onFulfilled, onRejected) {
        return this.promise.then(onFulfilled, onRejected);
    }

}
