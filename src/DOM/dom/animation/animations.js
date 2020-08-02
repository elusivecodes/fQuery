/**
 * DOM Animations
 */

Object.assign(DOM.prototype, {

    /**
     * Drop each node into place.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=top] The direction to drop the node from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
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
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=top] The direction to drop the node to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
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
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
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
                DOMNode.setStyle(
                    node,
                    'opacity',
                    progress < 1 ?
                        progress.toFixed(2) :
                        ''
                ),
            options
        );
    },

    /**
     * Fade the opacity of each node out.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
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
                DOMNode.setStyle(
                    node,
                    'opacity',
                    progress < 1 ?
                        (1 - progress).toFixed(2) :
                        ''
                ),
            options
        );
    },

    /**
     * Rotate each node in on an X,Y.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
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
            (node, progress, options) => {
                const amount = ((90 - (progress * 90)) * (options.inverse ? -1 : 1)).toFixed(2);
                DOMNode.setStyle(
                    node,
                    'transform',
                    progress < 1 ?
                        `rotate3d(${options.x}, ${options.y}, 0, ${amount}deg)` :
                        ''
                );
            },
            {
                x: 0,
                y: 1,
                ...options
            }
        );
    },

    /**
     * Rotate each node out on an X,Y.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
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
            (node, progress, options) => {
                const amount = ((progress * 90) * (options.inverse ? -1 : 1)).toFixed(2);
                DOMNode.setStyle(
                    node,
                    'transform',
                    progress < 1 ?
                        `rotate3d(${options.x}, ${options.y}, 0, ${amount}deg)` :
                        ''
                );
            },
            {
                x: 0,
                y: 1,
                ...options
            }
        );
    },

    /**
     * Slide each node in from a direction.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to slide from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    slideIn(nodes, options) {
        return this.animate(
            nodes,
            (node, progress, options) => {
                if (progress === 1) {
                    DOMNode.setStyle(node, 'overflow', '');
                    if (options.useGpu) {
                        DOMNode.setStyle(node, 'transform', '');
                    } else {
                        DOMNode.setStyle(node, 'margin-left', '');
                        DOMNode.setStyle(node, 'margin-top', '');
                    }
                    return;
                }

                const dir = Core.isFunction(options.direction) ?
                    options.direction() :
                    options.direction;

                let translateStyle, size, inverse;
                if (['top', 'bottom'].includes(dir)) {
                    translateStyle = options.useGpu ?
                        'Y' :
                        'margin-top';
                    size = this.constructor._height(node);
                    inverse = dir === 'top';
                } else {
                    translateStyle = options.useGpu ?
                        'X' :
                        'margin-left';
                    size = this.constructor._width(node);
                    inverse = dir === 'left';
                }

                const translateAmount = ((size - (size * progress)) * (inverse ? -1 : 1)).toFixed(2);
                if (options.useGpu) {
                    DOMNode.setStyle(node, 'transform', `translate${translateStyle}(${translateAmount}px)`);
                } else {
                    DOMNode.setStyle(node, translateStyle, `${translateAmount}px`);
                }
            },
            {
                direction: 'bottom',
                useGpu: true,
                ...options
            }
        );
    },

    /**
     * Slide each node out from a direction.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to slide to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    slideOut(nodes, options) {
        return this.animate(
            nodes,
            (node, progress, options) => {
                if (progress === 1) {
                    DOMNode.setStyle(node, 'overflow', '');
                    if (options.useGpu) {
                        DOMNode.setStyle(node, 'transform', '');
                    } else {
                        DOMNode.setStyle(node, 'margin-left', '');
                        DOMNode.setStyle(node, 'margin-top', '');
                    }
                    return;
                }

                const dir = Core.isFunction(options.direction) ?
                    options.direction() :
                    options.direction;

                let translateStyle, size, inverse;
                if (['top', 'bottom'].includes(dir)) {
                    translateStyle = options.useGpu ?
                        'Y' :
                        'margin-top';
                    size = this.constructor._height(node);
                    inverse = dir === 'top';
                } else {
                    translateStyle = options.useGpu ?
                        'X' :
                        'margin-left';
                    size = this.constructor._width(node);
                    inverse = dir === 'left';
                }

                const translateAmount = (size * progress * (inverse ? -1 : 1)).toFixed(2);
                if (options.useGpu) {
                    DOMNode.setStyle(node, 'transform', `translate${translateStyle}(${translateAmount}px)`);
                } else {
                    DOMNode.setStyle(node, translateStyle, `${translateAmount}px`);
                }
            },
            {
                direction: 'bottom',
                useGpu: true,
                ...options
            }
        );
    },

    /**
     * Squeeze each node in from a direction.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to squeeze from.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    squeezeIn(nodes, options) {
        nodes = this.parseNodes(nodes);

        options = {
            direction: 'bottom',
            useGpu: true,
            ...options
        };

        const promises = nodes.map(node => {
            const initialHeight = DOMNode.getStyle(node, 'height');
            const initialWidth = DOMNode.getStyle(node, 'width');
            DOMNode.setStyle(node, 'overflow', 'hidden');

            return new Animation(
                node,
                (node, progress, options) => {
                    DOMNode.setStyle(node, 'height', initialHeight);
                    DOMNode.setStyle(node, 'width', initialWidth);

                    if (progress === 1) {
                        DOMNode.setStyle(node, 'overflow', '');
                        if (options.useGpu) {
                            DOMNode.setStyle(node, 'transform', '');
                        } else {
                            DOMNode.setStyle(node, 'margin-left', '');
                            DOMNode.setStyle(node, 'margin-top', '');
                        }
                        return;
                    }

                    const dir = Core.isFunction(options.direction) ?
                        options.direction() :
                        options.direction;

                    let sizeStyle, translateStyle;
                    if (['top', 'bottom'].includes(dir)) {
                        sizeStyle = 'height';
                        if (dir === 'top') {
                            translateStyle = options.useGpu ?
                                'Y' :
                                'margin-top';
                        }
                    } else {
                        sizeStyle = 'width';
                        if (dir === 'left') {
                            translateStyle = options.useGpu ?
                                'X' :
                                'margin-left';
                        }
                    }

                    const size = DOM[`_${sizeStyle}`](node),
                        amount = (size * progress).toFixed(2);

                    DOMNode.setStyle(node, sizeStyle, `${amount}px`);

                    if (translateStyle) {
                        const translateAmount = (size - amount).toFixed(2);
                        if (options.useGpu) {
                            DOMNode.setStyle(node, 'transform', `translate${translateStyle}(${translateAmount}px)`);
                        } else {
                            DOMNode.setStyle(node, translateStyle, `${translateAmount}px`);
                        }
                    }
                },
                options
            );
        });

        Animation.start();

        return Promise.all(promises);
    },

    /**
     * Squeeze each node out from a direction.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {object} [options] The options to use for animating.
     * @param {string|function} [options.direction=bottom] The direction to squeeze to.
     * @param {number} [options.duration=1000] The duration of the animation.
     * @param {string} [options.type=ease-in-out] The type of animation.
     * @param {Boolean} [options.infinite] Whether the animation should run forever.
     * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    squeezeOut(nodes, options) {
        nodes = this.parseNodes(nodes);

        options = {
            direction: 'bottom',
            useGpu: true,
            ...options
        };

        const promises = nodes.map(node => {
            const initialHeight = DOMNode.getStyle(node, 'height');
            const initialWidth = DOMNode.getStyle(node, 'width');
            DOMNode.setStyle(node, 'overflow', 'hidden');

            return new Animation(
                node,
                (node, progress, options) => {
                    DOMNode.setStyle(node, 'height', initialHeight);
                    DOMNode.setStyle(node, 'width', initialWidth);

                    if (progress === 1) {
                        DOMNode.setStyle(node, 'overflow', '');
                        if (options.useGpu) {
                            DOMNode.setStyle(node, 'transform', '');
                        } else {
                            DOMNode.setStyle(node, 'margin-left', '');
                            DOMNode.setStyle(node, 'margin-top', '');
                        }
                        return;
                    }

                    const dir = Core.isFunction(options.direction) ?
                        options.direction() :
                        options.direction;

                    let sizeStyle, translateStyle;
                    if (['top', 'bottom'].includes(dir)) {
                        sizeStyle = 'height';
                        if (dir === 'top') {
                            translateStyle = options.useGpu ?
                                'Y' :
                                'margin-top';
                        }
                    } else {
                        sizeStyle = 'width';
                        if (dir === 'left') {
                            translateStyle = options.useGpu ?
                                'X' :
                                'margin-left';
                        }
                    }

                    const size = DOM[`_${sizeStyle}`](node),
                        amount = (size - (size * progress)).toFixed(2);

                    DOMNode.setStyle(node, sizeStyle, `${amount}px`);

                    if (translateStyle) {
                        const translateAmount = (size - amount).toFixed(2);
                        if (options.useGpu) {
                            DOMNode.setStyle(node, 'transform', `translate${translateStyle}(${translateAmount}px)`);
                        } else {
                            DOMNode.setStyle(node, translateStyle, `${translateAmount}px`);
                        }
                    }
                },
                options
            );
        });

        Animation.start();

        return Promise.all(promises);
    }

});
