/**
 * DOM Animations
 */

Object.assign(DOM.prototype, {

    /**
     * Drop each node into place.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=top] The direction to drop the node from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    dropIn(nodes, options) {
        return this.slideIn(
            nodes,
            {
                direction: 'top',
                ...options
            }
        );
    },

    /**
     * Drop each node out of place.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=top] The direction to drop the node to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    dropOut(nodes, options) {
        return this.slideOut(
            nodes,
            {
                direction: 'top',
                ...options
            }
        );
    },

    /**
     * Fade the opacity of each node in.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    fadeIn(nodes, options) {
        return this.animate(
            nodes,
            (node, progress) =>
                DOM._setStyle(
                    node,
                    {
                        opacity: progress < 1 ?
                            progress :
                            ''
                    }
                ),
            options
        );
    },

    /**
     * Fade the opacity of each node out.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    fadeOut(nodes, options) {
        return this.animate(
            nodes,
            (node, progress) =>
                DOM._setStyle(
                    node,
                    {
                        opacity: progress < 1 ?
                            1 - progress :
                            ''
                    }
                ),
            options
        );
    },

    /**
     * Rotate each node in on an X,Y.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.x=0] The amount to rotate on the X-axis.
     * @param {number} [options.y=1] The amount to rotate on the Y-axis.
     * @param {Boolean} [options.inverse] Whether to invert the rotation.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    rotateIn(nodes, options) {
        return this.animate(
            nodes,
            (node, progress, options) =>
                DOM._setStyle(
                    node,
                    {
                        transform: progress < 1 ?
                            `rotate3d(${options.x}, ${options.y}, 0, ${(90 - (progress * 90)) * (options.inverse ? -1 : 1)}deg)` :
                            ''
                    }
                ),
            {
                x: 0,
                y: 1,
                ...options
            }
        );
    },

    /**
     * Rotate each node out on an X,Y.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {number} [options.x=0] The amount to rotate on the X-axis.
     * @param {number} [options.y=1] The amount to rotate on the Y-axis.
     * @param {Boolean} [options.inverse] Whether to invert the rotation.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    rotateOut(nodes, options) {
        return this.animate(
            nodes,
            (node, progress, options) =>
                DOM._setStyle(
                    node,
                    {
                        transform: progress < 1 ?
                            `rotate3d(${options.x}, ${options.y}, 0, ${(progress * 90) * (options.inverse ? -1 : 1)}deg)` :
                            ''
                    }
                ),
            {
                x: 0,
                y: 1,
                ...options
            }
        );
    },

    /**
     * Slide each node in from a direction.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to slide from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    slideIn(nodes, options) {
        return this.animate(
            nodes,
            (node, progress, options) => {
                let transform;

                if (progress < 1) {
                    const dir = Core.isFunction(options.direction) ?
                        options.direction() :
                        options.direction;

                    let axis, size, inverse;
                    if (dir === 'top' || dir === 'bottom') {
                        axis = 'Y';
                        size = this._height(node);
                        inverse = dir === 'top';
                    } else {
                        axis = 'X';
                        size = this._width(node);
                        inverse = dir === 'left';
                    }

                    transform = `translate${axis}(${Math.round(size - (size * progress)) * (inverse ? -1 : 1)}px)`;
                } else {
                    transform = '';
                }

                DOM._setStyle(
                    node,
                    {
                        transform
                    }
                );
            },
            {
                direction: 'bottom',
                ...options
            }
        );
    },

    /**
     * Slide each node out from a direction.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to slide to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    slideOut(nodes, options) {
        return this.animate(
            nodes,
            (node, progress, options) => {
                let transform;

                if (progress < 1) {
                    const dir = Core.isFunction(options.direction) ?
                        options.direction() :
                        options.direction;

                    let axis, size, inverse;
                    if (dir === 'top' || dir === 'bottom') {
                        axis = 'Y';
                        size = this._height(node);
                        inverse = dir === 'top';
                    } else {
                        axis = 'X';
                        size = this._width(node);
                        inverse = dir === 'left';
                    }

                    transform = `translate${axis}(${Math.round(size * progress) * (inverse ? -1 : 1)}px)`;
                } else {
                    transform = '';
                }

                DOM._setStyle(
                    node,
                    {
                        transform
                    }
                );
            },
            {
                direction: 'bottom',
                ...options
            }
        );
    },

    /**
     * Squeeze each node in from a direction.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to squeeze from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    squeezeIn(nodes, options) {
        nodes = this._nodeFilter(nodes);

        options = {
            ...DOM.animationDefaults,
            direction: 'bottom',
            ...options
        };

        const promises = nodes.map(node =>
            this._squeezeIn(node, options)
        );

        this._start();

        return Promise.all(promises);
    },

    /**
     * Squeeze each node out from a direction.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to squeeze to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    squeezeOut(nodes, options) {
        nodes = this._nodeFilter(nodes);

        options = {
            ...DOM.animationDefaults,
            direction: 'bottom',
            ...options
        };

        const promises = nodes.map(node =>
            this._squeezeOut(node, options)
        );

        this._start();

        return Promise.all(promises);
    },

    /**
     * Squeeze a single node in from a direction.
     * @param {HTMLElement} node The input node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.direction=bottom] The direction to squeeze from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    _squeezeIn(node, options) {
        const wrapper = this.create('div', {
            style: {
                overflow: 'hidden',
                position: 'relative'
            }
        });

        this._wrap(node, wrapper);
        const parent = DOM._parent(node).shift();

        return this._animate(
            node,
            (node, progress, options) => {
                if (progress === 1) {
                    DOM._before(parent, DOM._children(parent, false, false, false));
                    this._remove(parent);
                    return;
                }

                const dir = Core.isFunction(options.direction) ?
                    options.direction() :
                    options.direction;

                let sizeStyle, translateStyle;
                if (dir === 'top' || dir === 'bottom') {
                    sizeStyle = 'height';
                    if (dir === 'top') {
                        translateStyle = 'Y';
                    }
                } else if (dir === 'left' || dir === 'right') {
                    sizeStyle = 'width';
                    if (dir === 'left') {
                        translateStyle = 'X';
                    }
                }

                const size = Math.round(this[`_${sizeStyle}`](node)),
                    amount = Math.round(size * progress),
                    styles = {
                        [sizeStyle]: amount + 'px'
                    };
                if (translateStyle) {
                    styles.transform = `translate${translateStyle}(${size - amount}px)`;
                }
                DOM._setStyle(parent, styles);
            },
            options
        );
    },

    /**
     * Squeeze a single node out from a direction.
     * @param {HTMLElement} node The input node.
     * @param {object} [options] The options to use for animating.
     * @param {string} [options.direction=bottom] The direction to squeeze to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    _squeezeOut(node, options) {
        const wrapper = this.create('div', {
            style: {
                overflow: 'hidden',
                position: 'relative'
            }
        });

        this._wrap(node, wrapper);
        const parent = DOM._parent(node).shift();

        return this._animate(
            node,
            (node, progress, options) => {
                if (progress === 1) {
                    DOM._before(parent, DOM._children(parent, false, false, false));
                    this._remove(parent);
                    return;
                }

                const dir = Core.isFunction(options.direction) ?
                    options.direction() :
                    options.direction;

                let sizeStyle, translateStyle;
                if (dir === 'top' || dir === 'bottom') {
                    sizeStyle = 'height';
                    if (dir === 'top') {
                        translateStyle = 'Y';
                    }
                }
                else if (dir === 'left' || dir === 'right') {
                    sizeStyle = 'width';
                    if (dir === 'left') {
                        translateStyle = 'X';
                    }
                }

                const size = Math.round(this[`_${sizeStyle}`](node)),
                    amount = Math.round(size - (size * progress)),
                    styles = {
                        [sizeStyle]: amount + 'px'
                    };
                if (translateStyle) {
                    styles.transform = `translate${translateStyle}(${size - amount}px)`;
                }
                DOM._setStyle(parent, styles);
            },
            options
        );
    }

});
