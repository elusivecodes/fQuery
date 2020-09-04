/**
 * QuerySet Animate
 */

Object.assign(QuerySet.prototype, {

    /**
     * Add an animation to the queue for each node.
     * @param {DOM~animationCallback} callback The animation callback.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @returns {QuerySet} The QuerySet object.
     */
    animate(callback, options) {
        return this.queue(node =>
            this._dom.animate(node, callback, options)
        );
    },

    /**
     * Stop all animations and clear the queue of each node.
     * @param {Boolean} [finish=true] Whether to complete all current animations.
     * @returns {QuerySet} The QuerySet object.
     */
    stop(finish = true) {
        this.clearQueue();
        this._dom.stop(this, finish);

        return this;
    }

});
