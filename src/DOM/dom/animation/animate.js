/**
 * DOM Animate
 */

Object.assign(DOM.prototype, {

    /**
     * @callback DOM~animationCallback
     * @param {HTMLElement} node The input node.
     * @param {number} progress The animation progress.
     * @param {object} options The options to use for animating.
     */

    /**
     * Add an animation to each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {DOM~animationCallback} callback The animation callback.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    animate(nodes, callback, options) {
        nodes = this._nodeFilter(nodes);

        options = {
            ...DOM.animationDefaults,
            ...options
        };

        const promises = nodes.map(node =>
            this._animate(node, callback, options)
        );

        this._start();

        return Promise.all(promises);
    },

    /**
     * Stop all animations for each element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {Boolean} [finish=true] Whether to complete all current animations.
     */
    stop(nodes, finish = true) {
        nodes = this._nodeFilter(nodes);

        for (const node of nodes) {
            this._stop(node, finish);
        }
    },

    /**
     * Add an animation to a single element.
     * @param {HTMLElement} node The input node.
     * @param {DOM~animationCallback} callback The animation callback.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    _animate(node, callback, options) {
        if (!this._animations.has(node)) {
            this._animations.set(node, []);
        }

        const start = performance.now();

        return new Promise((resolve, reject) => {

            this._animations.get(node).push((stop = false, finish = false) => {

                if (stop && !finish) {
                    reject(node);
                    return true;
                }

                let progress;
                if (finish) {
                    progress = 1;
                } else {
                    progress = (performance.now() - start) / options.duration;

                    if (options.infinite) {
                        progress %= 1;
                    } else {
                        progress = Core.clamp(progress);
                    }

                    if (options.type === 'ease-in') {
                        progress = Math.pow(progress, 2);
                    } else if (options.type === 'ease-out') {
                        progress = Math.sqrt(progress);
                    } else if (options.type === 'ease-in-out') {
                        if (progress <= 0.5) {
                            progress = Math.pow(progress, 2) * 2;
                        } else {
                            progress = 1 - ((1 - progress) ** 2 * 2);
                        }
                    }
                }

                callback(node, progress, options);

                if (progress === 1) {
                    resolve(node);
                    return true;
                }
            });
        });
    },

    /**
     * Run a single frame of all animations, and then queue up the next frame.
     */
    _animationFrame() {
        for (let [node, animations] of this._animations) {
            animations = animations.filter(animation => !animation());

            if (!animations.length) {
                this._animations.delete(node)
            } else {
                this._animations.set(node, animations);
            }
        }

        if (this._animations.size) {
            window.requestAnimationFrame(_ =>
                this._animationFrame()
            );
        } else {
            this._animating = false;
        }
    },

    /**
     * Start the animation loop (if not already started).
     */
    _start() {
        if (this._animating) {
            return;
        }

        this._animating = true;
        this._animationFrame();
    },

    /**
     * Stop all animations for a single element.
     * @param {HTMLElement} node The input node.
     * @param {Boolean} [finish=true] Whether to complete all current animations.
     */
    _stop(node, finish = true) {
        if (!this._animations.has(node)) {
            return;
        }

        for (const animation of this._animations.get(node)) {
            animation(true, finish);
        }

        this._animations.delete(node);
    }

});
