/**
 * QuerySet Animations
 */

Object.assign(QuerySet.prototype, {

    /**
     * Add a drop in animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=top] The direction to drop the node from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @returns {QuerySet} The QuerySet object.
     */
    dropIn(options) {
        return this.queue(node =>
            this._dom.dropIn(node, options)
        );
    },

    /**
     * Add a drop out animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=top] The direction to drop the node to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @returns {QuerySet} The QuerySet object.
     */
    dropOut(options) {
        return this.queue(node =>
            this._dom.dropOut(node, options)
        );
    },

    /**
     * Add a fade in animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @returns {QuerySet} The QuerySet object.
     */
    fadeIn(options) {
        return this.queue(node =>
            this._dom.fadeIn(node, options)
        );
    },

    /**
     * Add a fade out animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @returns {QuerySet} The QuerySet object.
     */
    fadeOut(options) {
        return this.queue(node =>
            this._dom.fadeOut(node, options)
        );
    },

    /**
     * Add a rotate in animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.x=0] The amount to rotate on the X-axis.
     * @param {number} [options.y=1] The amount to rotate on the Y-axis.
     * @param {number} [options.z=0] The amount to rotate on the Z-axis.
     * @param {Boolean} [options.inverse] Whether to invert the rotation.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @returns {QuerySet} The QuerySet object.
     */
    rotateIn(options) {
        return this.queue(node =>
            this._dom.rotateIn(node, options)
        );
    },

    /**
     * Add a rotate out animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.x=0] The amount to rotate on the X-axis.
     * @param {number} [options.y=1] The amount to rotate on the Y-axis.
     * @param {number} [options.z=0] The amount to rotate on the Z-axis.
     * @param {Boolean} [options.inverse] Whether to invert the rotation.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @returns {QuerySet} The QuerySet object.
     */
    rotateOut(options) {
        return this.queue(node =>
            this._dom.rotateOut(node, options)
        );
    },

    /**
     * Add a slide in animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to slide from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @returns {QuerySet} The QuerySet object.
     */
    slideIn(options) {
        return this.queue(node =>
            this._dom.slideIn(node, options)
        );
    },

    /**
     * Add a slide out animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to slide to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @returns {QuerySet} The QuerySet object.
     */
    slideOut(options) {
        return this.queue(node =>
            this._dom.slideOut(node, options)
        );
    },
    /**
     * Add a squeeze in animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to squeeze from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @returns {QuerySet} The QuerySet object.
     */
    squeezeIn(options) {
        return this.queue(node =>
            this._dom.squeezeIn(node, options)
        );
    },

    /**
     * Add a squeeze out animation to the queue for each node.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to squeeze to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @param {Boolean} [options.debug] Whether to set debugging info on the node.
     * @returns {QuerySet} The QuerySet object.
     */
    squeezeOut(options) {
        return this.queue(node =>
            this._dom.squeezeOut(node, options)
        );
    }

});
