/**
 * DOM Animate
 */

Object.assign(DOM.prototype, {

    /**
     * Add an animation to each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {DOM~animationCallback} callback The animation callback.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    animate(nodes, callback, options) {
        nodes = this.parseNodes(nodes);

        const promises = nodes.map(node =>
            this.constructor._animate(node, callback, {
                ...this.constructor.animationDefaults,
                ...options
            })
        );

        this.constructor._start();

        return Promise.all(promises);
    },

    /**
     * Stop all animations for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {Boolean} [finish=true] Whether to complete all current animations.
     */
    stop(nodes, finish = true) {
        nodes = this.parseNodes(nodes);

        for (const node of nodes) {
            this.constructor._stop(node, finish);
        }
    }

});
