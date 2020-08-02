/**
 * Animation (Static) Helpers
 */

Object.assign(Animation, {

    /**
     * Start the animation loop (if not already started).
     */
    start() {
        if (this._animating) {
            return;
        }

        this._animating = true;
        this.update();
    },

    /**
     * Stop all animations for a single element.
     * @param {HTMLElement} node The input node.
     * @param {Boolean} [finish=true] Whether to complete all current animations.
     */
    stop(node, finish = true) {
        if (!this._animations.has(node)) {
            return;
        }

        const animations = this._animations.get(node);
        for (const animation of animations) {
            animation.update(true, finish);
        }

        this._animations.delete(node);
    },

    /**
     * Run a single frame of all animations, and then queue up the next frame.
     */
    update() {
        for (let [node, animations] of this._animations) {
            animations = animations.filter(animation => !animation.update());

            if (!animations.length) {
                this._animations.delete(node)
            } else {
                this._animations.set(node, animations);
            }
        }

        if (!this._animations.size) {
            this._animating = false;
            return;
        }

        if (this.useTimeout) {
            setTimeout(_ => this.update(), 1000 / 60)
        } else {
            window.requestAnimationFrame(_ => this.update());
        }
    }

});
