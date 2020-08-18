/**
 * Animation Class
 * @class
 */
class Animation {

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
            ...this.constructor.defaults,
            ...options
        };

        if (!('start' in this._options)) {
            this._options.start = performance.now();
        }

        if (this._options.debug) {
            this._node.dataset.animationStart = this._options.start;
        }

        this.promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });

        if (this.constructor._animations.has(node)) {
            this.constructor._animations.get(node).push(this);
        } else {
            this.constructor._animations.set(node, [this]);
        }
    }

    /**
     * Execute a callback if the animation is rejected.
     * @param {function} [onRejected] The callback to execute if the animation is rejected.
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
     * Stop the animation.
     * @param {Boolean} [finish=true] Whether to finish the animation.
    */
    stop(finish = true) {
        const animations = this.constructor._animations.get(this._node)
            .filter(animation => animation !== this);

        if (!animations.length) {
            this.constructor._animations.delete(this._node)
        } else {
            this.constructor._animations.set(this._node, animations);
        }

        this.update(true, finish);
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

    /**
     * Run a single frame of the animation.
     * @param {Boolean} [stop] Whether to stop the animation.
     * @param {Booelan} [finish] Whether to finish the animation.
     */
    update(stop = false, finish = false) {
        if (stop && !finish) {
            this._reject(this._node);
            return true;
        }

        const now = performance.now();

        let progress;
        if (finish) {
            progress = 1;
        } else {
            progress = (now - this._options.start) / this._options.duration;

            if (this._options.infinite) {
                progress %= 1;
            } else {
                progress = Core.clamp(progress);
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
            this._node.dataset.animationNow = now;
            this._node.dataset.animationProgress = progress;
        }

        this._callback(this._node, progress, this._options);

        if (progress < 1) {
            return;
        }

        if (this._options.debug) {
            delete this._node.dataset.animationStart;
            delete this._node.dataset.animationNow;
            delete this._node.dataset.animationProgress;
        }

        this._resolve(this._node);
        return true;
    }

}
