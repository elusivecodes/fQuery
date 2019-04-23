/**
 * DOM Animate
 */

Object.assign(DOM.prototype, {

    /**
     * @callback DOM~animationCallback
     * @param {HTMLElement} node The input node.
     * @param {number} progress The animation progress.
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
        // set default options
        options = {
            ...DOM.animationDefaults,
            ...options
        };

        // handle multiple element argument
        const promises = this._nodeFilter(nodes)
            .map(node =>
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
        this._nodeFilter(nodes)
            .forEach(node => this._stop(node, finish));
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
        if (!this.animations.has(node)) {
            this.animations.set(node, []);
        }

        const start = performance.now();

        return new Promise((resolve, reject) => {

            this.animations.get(node).push((stop = false, finish = false) => {

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
        this.animations.forEach((animations, node) => {

            animations = animations.filter(animation => !animation());

            if (!animations.length) {
                this.animations.delete(node)
            } else {
                this.animations.set(node, animations);
            }
        });

        if (this.animations.size) {
            window.requestAnimationFrame(_ =>
                this._animationFrame()
            );
        } else {
            this.animating = false;
        }
    },

    /**
     * Start the animation loop (if not already started).
     */
    _start() {
        if (this.animating) {
            return;
        }

        this.animating = true;
        this._animationFrame();
    },

    /**
     * Stop all animations for a single element.
     * @param {HTMLElement} node The input node.
     * @param {Boolean} [finish=true] Whether to complete all current animations.
     */
    _stop(node, finish = true) {
        if (!this.animations.has(node)) {
            return;
        }

        this.animations.get(node)
            .forEach(animation =>
                animation(true, finish)
            );

        this.animations.delete(node);
    }

});
