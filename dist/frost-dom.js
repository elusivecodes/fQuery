(function(global, factory) {

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory;
    } else {
        Object.assign(global, factory(global));
    }

})(this, function(window) {
    'use strict';

    if (!window) {
        throw new Error('FrostDOM requires a Window.');
    }

    if (!('Core' in window)) {
        throw new Error('FrostDOM requires FrostCore.');
    }

    if (!window.Core.isWindow(window)) {
        throw new Error('FrostDOM requires a valid Window object.');
    }

    const Core = window.Core;
    const document = window.document;

    /**
     * DOM Class
     * @class
     */
    class DOM {

        /**
         * New DOM constructor.
         * @param {Document} [context=document] The document context.
         * @returns {DOM} A new DOM object.
         */
        constructor(context = document) {
            this.context = context;


            this.animating = false;
            this.animations = new Map;

            this.queues = new WeakMap;

            this.nodeData = new WeakMap;
            this.nodeEvents = new WeakMap;
            this.nodeStyles = new WeakMap;
        }

        /**
         * Execute a command in the document context.
         * @param {string} command The command to execute.
         * @param {string} [value] The value to give the command.
         * @returns {Boolean} TRUE if the command was executed, otherwise FALSE.
         */
        exec(command, value = null) {
            return this.context.execCommand(command, false, value);
        }

    }

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

    /**
     * DOM Animations
     */

    Object.assign(DOM.prototype, {

        /**
         * Drop each element into place.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {object} [options] The options to use for animating.
         * @param {string} [options.direction=top] The direction to drop the node from.
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
         * Drop each element out of place.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {object} [options] The options to use for animating.
         * @param {string} [options.direction=top] The direction to drop the node to.
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
         * Fade the opacity of each element in.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
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
         * Fade the opacity of each element out.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
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
         * Rotate each element in on an X,Y.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
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
         * Rotate each element out on an X,Y.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
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
         * Slide each element in from a direction.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {object} [options] The options to use for animating.
         * @param {string} [options.direction=bottom] The direction to slide from.
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
         * Slide each element out from a direction.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {object} [options] The options to use for animating.
         * @param {string} [options.direction=bottom] The direction to slide to.
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
         * Squeeze each element in from a direction.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {object} [options] The options to use for animating.
         * @param {string} [options.direction=bottom] The direction to squeeze from.
         * @param {number} [options.duration=1000] The duration of the animation.
         * @param {string} [options.type=ease-in-out] The type of animation.
         * @param {Boolean} [options.infinite] Whether the animation should run forever.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        squeezeIn(nodes, options) {
            options = {
                direction: 'bottom',
                ...options
            };

            return Promise.all(
                this._nodeFilter(nodes)
                    .map(node => this._squeezeIn(node, options))
            );
        },

        /**
         * Squeeze each element out from a direction.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {object} [options] The options to use for animating.
         * @param {string} [options.direction=bottom] The direction to squeeze to.
         * @param {number} [options.duration=1000] The duration of the animation.
         * @param {string} [options.type=ease-in-out] The type of animation.
         * @param {Boolean} [options.infinite] Whether the animation should run forever.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        squeezeOut(nodes, options) {
            options = {
                direction: 'bottom',
                ...options
            };

            return Promise.all(
                this._nodeFilter(nodes)
                    .map(node => this._squeezeOut(node, options))
            );
        },

        /**
         * Squeeze each element in from a direction.
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

            return this.animate(
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
         * Squeeze a single element out from a direction.
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

            return this.animate(
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

    /**
     * DOM Queue
     */

    Object.assign(DOM.prototype, {

        /**
         * @callback DOM~queueCallback
         * @param {HTMLElement} node The input node.
         */

        /**
         * Queue a callback on each element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {DOM~queueCallback} callback The callback to queue.
         */
        queue(nodes, callback) {
            this._nodeFilter(nodes)
                .forEach(node => this._queue(node, callback));
        },

        /**
         * Clear the queue of each element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         */
        clearQueue(nodes) {
            this._nodeFilter(nodes)
                .forEach(node => this._clearQueue(node));
        },

        /**
         * Clear the queue of a single element.
         * @param {HTMLElement} node The input node.
         */
        _clearQueue(node) {
            if (!this.queues.has(node)) {
                return;
            }

            this.queues.delete(node);
        },

        /**
         * Run the next callback for a single element.
         * @param {HTMLElement} node The input node.
         */
        _dequeueNode(node) {
            if (!this.queues.has(node)) {
                return;
            }

            const next = this.queues.get(node).shift();

            if (!next) {
                this.queues.delete(node);
                return;
            }

            Promise.resolve(next(node))
                .finally(_ =>
                    this._dequeueNode(node)
                );
        },

        /**
         * Queue a callback on a single element.
         * @param {HTMLElement} node The input node.
         * @param {DOM~queueCallback} callback The callback to queue.
         */
        _queue(node, callback) {
            const newQueue = !this.queues.has(node);

            let queue;
            if (newQueue) {
                queue = [];
                this.queues.set(node, queue);
            } else {
                queue = this.queues.get(node);
            }

            queue.push(callback);

            if (newQueue) {
                this._dequeueNode(node);
            }
        }

    });

    /**
     * DOM Attributes
     */

    Object.assign(DOM.prototype, {

        /**
         * Get an attribute value for the first element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string} attribute The attribute name.
         * @returns {string} The attribute value.
         */
        getAttribute(nodes, attribute) {
            const node = this._nodeFind(nodes);

            if (!node) {
                return;
            }

            return DOM._getAttribute(node, attribute);
        },

        /**
         * Get a dataset value for the first element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string} [key] The dataset key.
         * @returns {string|object} The dataset value.
         */
        getDataset(nodes, key) {
            const node = this._nodeFind(nodes);

            if (!node) {
                return;
            }

            return DOM._getDataset(node, key);
        },

        /**
         * Get the HTML contents of the first element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @returns {string} The HTML contents.
         */
        getHTML(nodes) {
            return this.getProperty(
                nodes,
                'innerHTML'
            );
        },

        /**
         * Get a property value for the first element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string} property The property name.
         * @returns {string} The property value.
         */
        getProperty(nodes, property) {
            const node = this._nodeFind(nodes);

            if (!node) {
                return;
            }

            return DOM._getProperty(node, property);
        },

        /**
         * Get the text contents of the first element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @returns {string} The text contents.
         */
        getText(nodes) {
            return this.getProperty(
                nodes,
                'innerText'
            );
        },

        /**
         * Get the value property of the first element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @returns {string} The value.
         */
        getValue(nodes) {
            return this.getProperty(
                nodes,
                'value'
            );
        },

        /**
         * Remove an attribute from each element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string} attribute The attribute name.
         */
        removeAttribute(nodes, attribute) {
            this._nodeFilter(nodes)
                .forEach(node =>
                    DOM._removeAttribute(node, attribute)
                );
        },

        /**
         * Remove a property from each element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string} property The property name.
         */
        removeProperty(nodes, property) {
            this._nodeFilter(nodes)
                .forEach(node =>
                    DOM._removeProperty(node, property)
                );
        },

        /**
         * Set an attribute value for each element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|object} attribute The attribute name, or an object containing attributes.
         * @param {string} [value] The attribute value.
         */
        setAttribute(nodes, attribute, value) {
            const attributes = DOM._parseData(attribute, value);

            this._nodeFilter(nodes)
                .forEach(node =>
                    DOM._setAttribute(node, attributes)
                );
        },

        /**
         * Set a dataset value for the first element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|object} key The dataset key, or an object containing dataset values.
         * @param {string} [value] The dataset value.
         */
        setDataset(nodes, key, value) {
            const dataset = DOM._parseData(key, value);

            this._nodeFilter(nodes)
                .forEach(node =>
                    DOM._setDataset(node, dataset)
                );
        },

        /**
         * Set the HTML contents of each element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string} html The HTML contents.
         */
        setHTML(nodes, html) {
            this.empty(nodes);

            this.setProperty(
                nodes,
                'innerHTML',
                html
            );
        },

        /**
         * Set a property value for each element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|object} property The property name, or an object containing properties.
         * @param {string} [value] The property value.
         */
        setProperty(nodes, property, value) {
            const properties = DOM._parseData(property, value);

            this._nodeFilter(nodes)
                .forEach(node =>
                    DOM._setProperty(node, properties)
                );
        },

        /**
         * Set the text contents of each element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string} text The text contents.
         */
        setText(nodes, text) {
            this.empty(nodes);

            this.setProperty(
                nodes,
                'innerText',
                text
            );
        },

        /**
         * Set the value property of each element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string} value The value.
         */
        setValue(nodes, value) {
            this.setProperty(
                nodes,
                'value',
                value
            );
        }

    });

    /**
     * DOM Data
     */

    Object.assign(DOM.prototype, {

        /**
         * Clone custom data from each node to each other node.
         * @param {string|Node|NodeList|HTMLCollection|Window|Node[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|Window|Node[]} others The other node(s), or a query selector string.
         */
        cloneData(nodes, others) {
            this._nodeFilter(nodes, node => DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node))
                .forEach(node =>
                    this._cloneData(node, others)
                );
        },

        /**
         * Get custom data for the first node.
         * @param {string|Node|NodeList|HTMLCollection|Window|Node[]} nodes The input node(s), or a query selector string.
         * @param {string} [key] The data key.
         * @returns {*} The data value.
         */
        getData(nodes, key) {
            const node = this._nodeFind(nodes, node => DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node));

            if (!node) {
                return;
            }

            return this._getData(node, key);
        },

        /**
         * Remove custom data from each node.
         * @param {string|Node|NodeList|HTMLCollection|Window|Node[]} nodes The input node(s), or a query selector string.
         * @param {string} [key] The data key.
         */
        removeData(nodes, key) {
            this._nodeFilter(nodes, node => DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node))
                .forEach(node =>
                    this._removeData(node, key)
                );
        },

        /**
         * Set custom data for each node.
         * @param {string|Node|NodeList|HTMLCollection|Window|Node[]} nodes The input node(s), or a query selector string.
         * @param {string|object} key The data key, or an object containing data.
         * @param {*} [value] The data value.
         */
        setData(nodes, key, value) {
            const data = DOM._parseData(key, value);

            this._nodeFilter(nodes, node => DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node))
                .forEach(node =>
                    this._setData(node, data)
                );
        },

        /**
         * Clone custom data from a single node to each other node.
         * @param {Node|Window} node The input node.
         * @param {string|Node|NodeList|HTMLCollection|Window|Node[]} others The other node(s), or a query selector string.
         */
        _cloneData(node, others) {
            if (!this.nodeData.has(node)) {
                return;
            }

            this.setData(others, {
                ...this.nodeData.get(node)
            });
        },

        /**
         * Get custom data for a single node.
         * @param {Node|Window} node The input node.
         * @param {string} [key] The data key.
         * @returns {*} The data value.
         */
        _getData(node, key) {
            if (!this.nodeData.has(node)) {
                return;
            }

            if (!key) {
                return this.nodeData.get(node);
            }

            return this.nodeData.get(node)[key];
        },

        /**
         * Remove custom data from a single node.
         * @param {Node|Window} node The input node.
         * @param {string} [key] The data key.
         */
        _removeData(node, key) {
            if (!this.nodeData.has(node)) {
                return;
            }

            if (key) {
                const nodeData = this.nodeData.get(node);
                delete nodeData[key];
                if (Object.keys(nodeData).length) {
                    return;
                }
            }

            this.nodeData.delete(node);
        },

        /**
         * Set custom data for a single node.
         * @param {Node|Window} node The input node.
         * @param {object} data An object containing data.
         */
        _setData(node, data) {
            if (!this.nodeData.has(node)) {
                this.nodeData.set(node, {});
            }

            Object.assign(
                this.nodeData.get(node),
                data
            );
        }

    });

    /**
     * DOM Position
     */

    Object.assign(DOM.prototype, {

        /**
         * Get the X,Y co-ordinates for the center of the first element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
         * @returns {object} An object with the x and y co-ordinates.
         */
        center(nodes, offset) {
            const nodeBox = this.rect(nodes, offset);

            if (!nodeBox) {
                return;
            }

            return {
                x: nodeBox.left + nodeBox.width / 2,
                y: nodeBox.top + nodeBox.height / 2
            };
        },

        /**
         * Contrain each element to a container element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} container The container node, or a query selector string.
         */
        constrain(nodes, container) {
            const containerBox = this.rect(container);

            if (!containerBox) {
                return;
            }

            this._nodeFilter(nodes)
                .forEach(node => this._constrain(node, containerBox));
        },

        /**
         * Get the distance of an element to an X,Y position in the Window.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {number} x The X co-ordinate.
         * @param {number} y The Y co-ordinate.
         * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
         * @returns {number} The distance to the element.
         */
        distTo(nodes, x, y, offset) {
            const nodeCenter = this.center(nodes, offset);

            if (!nodeCenter) {
                return;
            }

            return Core.dist(
                nodeCenter.x,
                nodeCenter.y,
                x,
                y
            );
        },

        /**
         * Get the distance between two elements.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The node to compare, or a query selector string.
         * @returns {number} The distance between the nodes.
         */
        distToNode(nodes, others) {
            const otherCenter = this.center(others);

            if (!otherCenter) {
                return;
            }

            return this.distTo(
                nodes,
                otherCenter.x,
                otherCenter.y
            );
        },

        /**
         * Get the nearest element to an X,Y position in the Window.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {number} x The X co-ordinate.
         * @param {number} y The Y co-ordinate.
         * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
         * @returns {HTMLElement} The nearest node.
         */
        nearestTo(nodes, x, y, offset) {
            let closest = null;
            let closestDistance = Number.MAX_VALUE;

            this._nodeFilter(nodes)
                .forEach(node => {
                    const dist = this.distTo(node, x, y, offset);
                    if (dist && dist < closestDistance) {
                        closestDistance = dist;
                        closest = node;
                    }
                });

            return closest;
        },

        /**
         * Get the nearest element to another element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The node to compare, or a query selector string.
         * @returns {HTMLElement} The nearest node.
         */
        nearestToNode(nodes, others) {
            const otherCenter = this.center(others);

            if (!otherCenter) {
                return;
            }

            return this.nearestTo(
                nodes,
                otherCenter.x,
                otherCenter.y
            );
        },

        /**
         * Get the percentage of an X co-ordinate relative to an element's width.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {number} x The X co-ordinate.
         * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
         * @returns {number} The percent.
         */
        percentX(nodes, x, offset) {
            const nodeBox = this.rect(nodes, offset);

            if (!nodeBox) {
                return;
            }

            return Core.clampPercent(
                (x - nodeBox.left)
                / nodeBox.width
                * 100
            );
        },

        /**
         * Get the percentage of a Y co-ordinate relative to an element's height.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {number} y The Y co-ordinate.
         * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
         * @returns {number} The percent.
         */
        percentY(nodes, y, offset) {
            const nodeBox = this.rect(nodes, offset);

            if (!nodeBox) {
                return;
            }

            return Core.clampPercent(
                (y - nodeBox.top)
                / nodeBox.height
                * 100
            );
        },

        /**
         * Get the position of the first element relative to the Window or Document.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
         * @returns {object} An object with the x and y co-ordinates.
         */
        position(nodes, offset) {
            const node = this._nodeFind(nodes);

            if (!node) {
                return;
            }

            return this._position(node, offset);
        },

        /**
         * Get the computed bounding rectangle of the first element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
         * @returns {DOMRect} The computed bounding rectangle.
         */
        rect(nodes, offset) {
            const node = this._nodeFind(nodes);

            if (!node) {
                return;
            }

            return this._rect(node, offset);
        },

        /**
         * Contrain a single element to a container box.
         * @param {HTMLElement} node The input node.
         * @param {DOMRect} containerBox The container box.
         */
        _constrain(node, containerBox) {
            const nodeBox = this._rect(node);

            if (nodeBox.height > containerBox.height) {
                DOM._setStyle(
                    node,
                    { height: containerBox.height }
                );
            }

            if (nodeBox.width > containerBox.width) {
                DOM._setStyle(
                    node,
                    { width: containerBox.width }
                );
            }

            if (nodeBox.top < containerBox.top) {
                DOM._setStyle(
                    node,
                    { top: containerBox.top }
                );
            }

            if (nodeBox.right > containerBox.right) {
                DOM._setStyle(
                    node,
                    { right: containerBox.right - nodeBox.width }
                );
            }

            if (nodeBox.bottom > containerBox.bottom) {
                DOM._setStyle(
                    node,
                    { top: containerBox.bottom - nodeBox.height }
                );
            }

            if (nodeBox.left < containerBox.left) {
                DOM._setStyle(
                    node,
                    { left: containerBox.left }
                );
            }
        },

        /**
         * Get the position of the a single element relative to the Window or Document.
         * @param {HTMLElement} node The input node.
         * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
         * @returns {object} An object with the x and y co-ordinates.
         */
        _position(node, offset) {
            return this.forceShow(
                node,
                node => {
                    const result = {
                        x: node.offsetLeft,
                        y: node.offsetTop
                    };

                    if (offset) {
                        let offsetParent = node;

                        while (offsetParent = offsetParent.offsetParent) {
                            result.x += offsetParent.offsetLeft;
                            result.y += offsetParent.offsetTop;
                        }
                    }

                    return result;
                }
            );
        },

        /**
         * Get the computed bounding rectangle of a single element.
         * @param {HTMLElement} node The input node.
         * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
         * @returns {DOMRect} The computed bounding rectangle.
         */
        _rect(node, offset) {
            return this.forceShow(
                node,
                node => {
                    const result = node.getBoundingClientRect();

                    if (offset) {
                        result.x += DOM._getScrollX(window);
                        result.y += DOM._getScrollY(window);
                    }

                    return result;
                }
            );
        }

    });

    /**
     * DOM Scroll
     */

    Object.assign(DOM.prototype, {

        /**
         * Get the scroll X position of the first element.
         * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @returns {number} The scroll X position.
         */
        getScrollX(nodes) {
            const node = this._nodeFind(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node));

            if (!node) {
                return;
            }

            return DOM._getScrollX(node);
        },

        /**
         * Get the scroll Y position of the first element.
         * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @returns {number} The scroll Y position.
         */
        getScrollY(nodes) {
            const node = this._nodeFind(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node));

            if (!node) {
                return;
            }

            return DOM._getScrollY(node);
        },

        /**
         * Scroll each element to an X,Y position.
         * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {number} x The scroll X position.
         * @param {number} y The scroll Y position.
         */
        setScroll(nodes, x, y) {
            this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))
                .forEach(node => DOM._setScroll(node, x, y));
        },

        /**
         * Scroll each element to an X position.
         * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {number} x The scroll X position.
         */
        setScrollX(nodes, x) {
            this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))
                .forEach(node => DOM._setScrollX(node, x));
        },

        /**
         * Scroll each element to a Y position.
         * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {number} y The scroll Y position.
         */
        setScrollY(nodes, y) {
            this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))
                .forEach(node => DOM._setScrollY(node, y));
        }

    });

    /**
     * DOM Size
     */

    Object.assign(DOM.prototype, {

        /**
         * Get the computed height of the first element.
         * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {Boolean} [padding=true] Whether to include padding height.
         * @param {Boolean} [border] Whether to include border height.
         * @param {Boolean} [margin] Whether to include margin height.
         * @returns {number} The height.
         */
        height(nodes, padding = true, border, margin) {
            const node = this._nodeFind(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node));

            if (!node) {
                return;
            }

            return this._height(node, padding, border, margin);
        },

        /**
         * Get the computed width of the first element.
         * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {Boolean} [padding=true] Whether to include padding width.
         * @param {Boolean} [border] Whether to include border width.
         * @param {Boolean} [margin] Whether to include margin width.
         * @returns {number} The width.
         */
        width(nodes, padding = true, border, margin) {
            const node = this._nodeFind(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node));

            if (!node) {
                return;
            }

            return this._width(node, padding, border, margin);
        },

        /**
         * Get the computed height of a single element.
         * @param {HTMLElement|Document|Window} node The input node.
         * @param {Boolean} [padding=true] Whether to include padding height.
         * @param {Boolean} [border] Whether to include border height.
         * @param {Boolean} [margin] Whether to include margin height.
         * @returns {number} The height.
         */
        _height(node, padding = true, border, margin) {
            if (Core.isWindow(node)) {
                return padding ?
                    node.outerHeight :
                    node.innerHeight;
            }

            if (DOM.isDocument(node)) {
                node = node.documentElement;
            }

            return this.forceShow(
                node,
                node => {
                    let result = node.clientHeight;

                    if (!padding) {
                        result -= parseInt(this._css(node, 'padding-top'))
                            + parseInt(this._css(node, 'padding-bottom'));
                    }

                    if (border) {
                        result += parseInt(this._css(node, 'border-top-width'))
                            + parseInt(this._css(node, 'border-bottom-width'));
                    }

                    if (margin) {
                        result += parseInt(this._css(node, 'margin-top'))
                            + parseInt(this._css(node, 'margin-bottom'));
                    }

                    return result;
                }
            );
        },

        /**
         * Get the computed width of a single element.
         * @param {HTMLElement|Document|Window} node The input node.
         * @param {Boolean} [padding=true] Whether to include padding width.
         * @param {Boolean} [border] Whether to include border width.
         * @param {Boolean} [margin] Whether to include margin width.
         * @returns {number} The width.
         */
        _width(node, padding = true, border, margin) {
            if (Core.isWindow(node)) {
                return padding ?
                    node.outerWidth :
                    node.innerWidth;
            }

            if (DOM.isDocument(node)) {
                node = node.documentElement;
            }

            return this.forceShow(
                node,
                node => {
                    let result = node.clientWidth;

                    if (!padding) {
                        result -= parseInt(this._css(node, 'padding-left'))
                            + parseInt(this._css(node, 'padding-right'));
                    }

                    if (border) {
                        result += parseInt(this._css(node, 'border-left-width'))
                            + parseInt(this._css(node, 'border-right-width'));
                    }

                    if (margin) {
                        result += parseInt(this._css(node, 'margin-left'))
                            + parseInt(this._css(node, 'margin-right'));
                    }

                    return result;
                }
            );
        }

    });

    /**
     * DOM Styles
     */

    Object.assign(DOM.prototype, {

        /**
         * Add classes to each element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {...string|string[]} classes The classes.
         */
        addClass(nodes, ...classes) {
            classes = DOM._parseClasses(classes);

            if (!classes.length) {
                return;
            }

            this._nodeFilter(nodes)
                .forEach(node => DOM._addClass(node, classes));
        },

        /**
         * Remove classes from each element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {...string|string[]} classes The classes.
         */
        removeClass(nodes, ...classes) {
            classes = DOM._parseClasses(classes);

            if (!classes.length) {
                return;
            }

            this._nodeFilter(nodes)
                .forEach(node => DOM._removeClass(node, classes));
        },

        /**
         * Toggle classes for each element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {...string|string[]} classes The classes.
         */
        toggleClass(nodes, ...classes) {
            classes = DOM._parseClasses(classes);

            if (!classes.length) {
                return;
            }

            this._nodeFilter(nodes)
                .forEach(node => DOM._toggleClass(node, classes));
        },

        /**
         * Get a style property for the first element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string} style The style name.
         * @returns {string} The style value.
         */
        getStyle(nodes, style) {
            // camelize style property
            style = Core.snakeCase(style);

            const node = this._nodeFind(nodes);

            if (!node) {
                return;
            }

            return DOM._getStyle(node, style);
        },

        /**
         * Set style properties for each element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|object} style The style name, or an object containing styles.
         * @param {string} [value] The style value.
         * @param {Boolean} [important] Whether the style should be !important.
         */
        setStyle(nodes, style, value, important) {
            const styles = DOM._parseData(style, value),
                realStyles = {};

            Object.keys(styles)
                .forEach(key => {
                    let value = '' + styles[key];
                    key = Core.snakeCase(key);

                    // if value is numeric and not a number property, add px
                    if (value && Core.isNumeric(value) && !DOM.cssNumberProperties.includes(key)) {
                        value = value + 'px';
                    }

                    realStyles[key] = value;
                });

            this._nodeFilter(nodes)
                .forEach(node => DOM._setStyle(node, realStyles, important));
        },

        /**
         * Get a computed CSS style value for the first element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string} style The CSS style name.
         * @returns {string} The CSS style value.
         */
        css(nodes, style) {
            const node = this._nodeFind(nodes);

            if (!node) {
                return;
            }

            return this._css(node, style);
        },

        /**
         * Hide each element from display.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         */
        hide(nodes) {
            this.setStyle(
                nodes,
                'display',
                'none'
            );
        },

        /**
         * Display each hidden element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         */
        show(nodes) {
            this.setStyle(
                nodes,
                'display',
                ''
            );
        },

        /**
         * Toggle the visibility of each element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         */
        toggle(nodes) {
            this._nodeFilter(nodes)
                .forEach(node => DOM._toggle(node));
        },

        /**
         * Get a computed CSS style value for a single element.
         * @param {HTMLElement} node The input node.
         * @param {string} style The CSS style name.
         * @returns {string} The CSS style value.
         */
        _css(node, style) {
            if (!this.nodeStyles.has(node)) {
                this.nodeStyles.set(
                    node,
                    window.getComputedStyle(node)
                );
            }

            return this.nodeStyles.get(node)
                .getPropertyValue(style);
        }

    });

    /**
     * DOM Events
     */

    Object.assign(DOM.prototype, {

        /**
         * Trigger a blur event on the first element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         */
        blur(nodes) {
            const node = this._nodeFind(nodes);

            if (!node) {
                return;
            }

            DOM._blur(node);
        },

        /**
         * Trigger a click event on the first element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         */
        click(nodes) {
            const node = this._nodeFind(nodes);

            if (!node) {
                return;
            }

            DOM._click(node);
        },

        /**
         * Trigger a focus event on the first element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         */
        focus(nodes) {
            const node = this._nodeFind(nodes);

            if (!node) {
                return;
            }

            DOM._focus(node);
        },

        /**
         * Add a function to the ready queue.
         * @param {DOM~eventCallback} callback The callback to execute.
         */
        ready(callback) {
            if (this.context.readyState === 'complete') {
                return callback();
            }

            this.addEvent(
                window,
                'DOMContentLoaded',
                callback
            );
        }

    });

    /**
     * DOM Event Handlers
     */

    Object.assign(DOM.prototype, {

        /**
         * @callback DOM~eventCallback
         * @param {Event} event The event object.
         */

        /**
         * Add an event to each element.
         * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string} events The event names.
         * @param {DOM~eventCallback} callback The callback to execute.
         * @param {string} [delegate] The delegate selector.
         * @param {Boolean} [selfDestruct] Whether to remove the event after triggering.
         */
        addEvent(nodes, events, callback, delegate, selfDestruct) {
            this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))
                .forEach(node => this._addEvent(node, events, callback, delegate, selfDestruct));
        },

        /**
         * Add a delegated event to each element.
         * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string} events The event names.
         * @param {string} [delegate] The delegate selector.
         * @param {DOM~eventCallback} callback The callback to execute.
         */
        addEventDelegate(nodes, events, delegate, callback) {
            return this.addEvent(nodes, events, callback, delegate);
        },

        /**
         * Add a self-destructing delegated event to each element.
         * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string} events The event names.
         * @param {string} [delegate] The delegate selector.
         * @param {DOM~eventCallback} callback The callback to execute.
         */
        addEventDelegateOnce(nodes, events, delegate, callback) {
            return this.addEvent(nodes, events, callback, delegate, true);
        },

        /**
         * Add a self-destructing event to each element.
         * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string} events The event names.
         * @param {DOM~eventCallback} callback The callback to execute.
         */
        addEventOnce(nodes, events, callback) {
            return this.addEvent(
                nodes,
                events,
                callback,
                null,
                true
            );
        },

        /**
         * Clone all events from each element to other elements.
         * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} others The other node(s), or a query selector string.
         */
        cloneEvents(nodes, others) {
            this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))
                .forEach(node => this._cloneEvents(node, others));
        },

        /**
         * Remove events from each element.
         * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string} [events] The event names.
         * @param {DOM~eventCallback} [callback] The callback to remove.
         * @param {string} [delegate] The delegate selector.
         */
        removeEvent(nodes, events, callback, delegate) {
            this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))
                .forEach(node => this._removeEvent(node, events, callback, delegate));
        },

        /**
         * Remove delegated events from each element.
         * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string} [events] The event names.
         * @param {string} [delegate] The delegate selector.
         * @param {DOM~eventCallback} [callback] The callback to remove.
         */
        removeEventDelegate(nodes, events, delegate, callback) {
            return this.removeEvent(nodes, events, callback, delegate);
        },

        /**
         * Trigger an event on each element.
         * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string} events The event names.
         * @param {object} [data] Additional data to attach to the event.
         */
        triggerEvent(nodes, events, data) {
            this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))
                .forEach(node => this._triggerEvent(node, events, data));
        },

        /**
         * Add an event to a single element.
         * @param {HTMLElement|Document|Window} node The input node.
         * @param {string} events The event names.
         * @param {DOM~eventCallback} callback The callback to execute.
         * @param {string} [delegate] The delegate selector.
         * @param {Boolean} [selfDestruct] Whether to remove the event after triggering.
         */
        _addEvent(node, events, callback, delegate, selfDestruct) {
            let realCallback = callback;

            if (selfDestruct) {
                realCallback = this._selfDestructFactory(node, events, delegate, realCallback);
            }

            if (delegate) {
                realCallback = this._delegateFactory(node, delegate, realCallback);
            }

            if (!this.nodeEvents.has(node)) {
                this.nodeEvents.set(node, {});
            }

            const nodeEvents = this.nodeEvents.get(node);

            const eventData = {
                delegate,
                callback,
                realCallback,
                selfDestruct
            };

            DOM._parseEvents(events).forEach(event => {
                const realEvent = DOM._parseEvent(event);
                eventData.event = event;
                eventData.realEvent = realEvent;

                if (!nodeEvents[realEvent]) {
                    nodeEvents[realEvent] = [];
                } else if (nodeEvents[realEvent].includes(eventData)) {
                    return;
                }

                node.addEventListener(realEvent, realCallback);

                nodeEvents[realEvent].push(eventData);
            });
        },

        /**
         * Clone all events from a single element to other elements.
         * @param {HTMLElement|Document|Window} nodes The input node.
         * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} others The other node(s), or a query selector string.
         */
        _cloneEvents(node, others) {
            if (!this.nodeEvents.has(node)) {
                return;
            }

            const nodeEvents = this.nodeEvents.get(node);
            Object.keys(nodeEvents)
                .forEach(event => {
                    const realEvent = DOM._parseEvent(event);
                    nodeEvents[realEvent].forEach(eventData => {
                        this.addEvent(
                            others,
                            eventData.event,
                            eventData.callback,
                            eventData.delegate,
                            eventData.selfDestruct
                        );
                    });
                });
        },

        /**
         * Remove events from a single element.
         * @param {HTMLElement|Document|Window} nodes The input node.
         * @param {string} [events] The event names.
         * @param {DOM~eventCallback} [callback] The callback to remove.
         * @param {string} [delegate] The delegate selector.
         */
        _removeEvent(node, events, callback, delegate) {
            if (!this.nodeEvents.has(node)) {
                return;
            }

            const nodeEvents = this.nodeEvents.get(node);

            const eventArray = events ?
                DOM._parseEvents(events) :
                Object.keys(nodeEvents);

            eventArray.forEach(event => {
                const realEvent = DOM._parseEvent(event);

                if (!nodeEvents[realEvent]) {
                    return;
                }

                nodeEvents[realEvent] = nodeEvents[realEvent].filter(eventData => {
                    if (
                        (
                            realEvent === event &&
                            realEvent !== eventData.realEvent
                        ) ||
                        (
                            realEvent !== event &&
                            event !== eventData.event
                        ) ||
                        (
                            delegate &&
                            (
                                delegate !== eventData.delegate ||
                                (
                                    callback &&
                                    callback !== eventData.callback
                                )
                            )
                        ) ||
                        (
                            !delegate &&
                            callback &&
                            callback !== eventData.realCallback
                        )
                    ) {
                        return true;
                    }

                    node.removeEventListener(eventData.realEvent, eventData.realCallback);

                    return false;
                });

                if (!nodeEvents[realEvent].length) {
                    delete nodeEvents[realEvent];
                }
            });

            if (!Object.keys(nodeEvents).length) {
                this.nodeEvents.delete(node);
            }
        },

        /**
         * Trigger an event on a single element.
         * @param {HTMLElement|Document|Window} nodes The input node.
         * @param {string} events The event names.
         * @param {object} [data] Additional data to attach to the Event object.
         */
        _triggerEvent(node, events, data) {
            DOM._parseEvents(events)
                .forEach(event => {
                    const realEvent = DOM._parseEvent(event);

                    const eventData = new Event(realEvent);

                    if (data) {
                        Object.assign(eventData, data);
                    }

                    node.dispatchEvent(eventData);
                });
        }

    });

    /**
     * DOM Create
     */

    Object.assign(DOM.prototype, {

        /**
         * Create a new DOM element.
         * @param {string} tagName The type of HTML element to create.
         * @param {object} options The options to use for creating the element.
         * @param {string} [options.html] The HTML contents.
         * @param {string} [options.text] The text contents.
         * @param {string|array} [options.class] The classes.
         * @param {object} [options.style] An object containing style properties.
         * @param {string} [options.value] The value.
         * @param {object} [options.attributes] An object containing attributes.
         * @param {object} [options.properties] An object containing properties.
         * @param {object} [options.dataset] An object containing dataset values.
         * @returns {HTMLElement} The new element.
         */
        create(tagName, options) {
            const node = this.context.createElement(tagName);

            if (!options) {
                return node;
            }

            if (options.html) {
                this.setHTML(node, options.html);
            } else if (options.text) {
                this.setText(node, options.text);
            }

            if (options.class) {
                this.addClass(node, options.class);
            }

            if (options.style) {
                this.setStyle(node, options.style);
            }

            if (options.value) {
                this.setValue(node, options.value);
            }

            if (options.attributes) {
                this.setAttribute(node, options.attributes);
            }

            if (options.properties) {
                this.setProperty(node, options.properties);
            }

            if (options.dataset) {
                this.setDataset(node, options.dataset);
            }

            return node;
        },

        /**
         * Create a new comment node.
         * @param {string} comment The comment contents.
         * @returns {Node} The new comment node.
         */
        createComment(comment) {
            return this.context.createComment(comment);
        },

        /**
         * Create a new text node.
         * @param {string} text The text contents.
         * @returns {Node} The new text node.
         */
        createText(text) {
            return this.context.createTextNode(text);
        }

    });

    /**
     * DOM Manipulation
     */

    Object.assign(DOM.prototype, {

        /**
         * Clone each node.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         * @param {Boolean} [deep=true] Whether to also clone all descendent nodes.
         * @param {Boolean} [cloneEvents=false] Whether to also clone events.
         * @param {Boolean} [cloneData=false] Whether to also clone custom data.
         * @returns {Node[]} The cloned nodes.
         */
        clone(nodes, deep = true, cloneEvents = false, cloneData = false) {
            return this._nodeFilter(nodes, DOM.isNode)
                .map(node =>
                    this._clone(node, deep, cloneEvents, cloneData)
                );
        },

        /**
         * Detach each node from the DOM.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         */
        detach(nodes) {
            this._nodeFilter(nodes, DOM.isNode)
                .forEach(node => DOM._detach(node));
        },

        /**
         * Remove all children of each node from the DOM.
         * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} nodes The input node(s), or a query selector string.
         */
        empty(nodes) {
            this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node))
                .forEach(node => this._empty(node));
        },

        /**
         * Extract selected nodes from the DOM.
         * @returns {Node[]} The selected nodes.
         */
        extractSelection() {
            const selection = window.getSelection();

            if (!selection.rangeCount) {
                return [];
            }

            const range = selection.getRangeAt(0);

            selection.removeAllRanges();

            return [...range.extractContents().childNodes];
        },

        /**
         * Remove each node from the DOM.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         */
        remove(nodes) {
            this._nodeFilter(nodes, DOM.isNode)
                .forEach(
                    node => this._remove(node)
                );
        },

        /**
         * Replace each other node with nodes.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector or HTML string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector string.
         */
        replaceAll(nodes, others) {
            this.replaceWith(others, nodes);
        },

        /**
         * Replace each node with other nodes.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector or HTML string.
         */
        replaceWith(nodes, others) {
            others = this._parseQuery(others, DOM.isNode);

            this._nodeFilter(nodes, DOM.isNode)
                .forEach(node => this._replaceWith(node, others));
        },

        /**
         * Clone a single node.
         * @param {Node} node The input node.
         * @param {Boolean} [deep=true] Whether to also clone all descendent nodes.
         * @param {Boolean} [cloneEvents=false] Whether to also clone events.
         * @param {Boolean} [cloneData=false] Whether to also clone custom data.
         * @returns {Node} The cloned node.
         */
        _clone(node, deep, cloneEvents, cloneData) {
            const clone = node.cloneNode(deep);

            if (!cloneEvents && !cloneData) {
                return clone;
            }

            if (cloneEvents) {
                this._cloneEvents(node, clone);
            }

            if (cloneData) {
                this._cloneData(node, clone);
            }

            if (deep) {
                this._deepClone(node, clone, cloneEvents, cloneData);
            }

            return clone;
        },

        /**
         * Deep clone a node.
         * @param {Node} node The input node.
         * @param {Node} clone The cloned node.
         * @param {Boolean} [cloneEvents=false] Whether to also clone events.
         * @param {Boolean} [cloneData=false] Whether to also clone custom data.
         */
        _deepClone(node, clone, cloneEvents, cloneData) {
            const cloneChildren = DOM._contents(clone);

            DOM._children(node, false, false, false).forEach((child, index) => {
                if (cloneEvents) {
                    this._cloneEvents(cloneChildren[index], child);
                }

                if (cloneData) {
                    this._cloneData(cloneChildren[index], child);
                }

                this._cloneDeep(child, cloneChildren[index]);
            });
        },

        /**
         * Remove all children of a single node from the DOM.
         * @param {HTMLElement} node The input node.
         */
        _empty(node) {
            DOM._children(node, false, false, false).forEach(child =>
                this._remove(child)
            );
        },

        /**
         * Remove a single node from the DOM.
         * @param {Node} node The input node.
         */
        _remove(node) {
            if (DOM.isElement(node)) {
                this._empty(node);
            }

            this._clearQueue(node);
            this._stop(node);
            this._removeEvent(node);
            this._removeData(node);

            if (this.nodeStyles.has(node)) {
                this.nodeStyles.delete(node);
            }

            DOM._detach(node);
            this._triggerEvent(node, 'remove');
        },

        /**
         * Replace a single node with other nodes.
         * @param {Node} node The input node.
         * @param {Node[]} others The other node(s).
         */
        _replaceWith(node, others) {
            DOM._before(
                node,
                this.clone(others, true)
            );
            this._remove(node);
        }

    });

    /**
     * DOM Move
     */

    Object.assign(DOM.prototype, {

        /**
         * Insert each other node after the first node.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector or HTML string.
         */
        after(nodes, others) {
            const node = this._nodeFind(nodes, DOM.isNode);

            if (!node) {
                return;
            }

            DOM._after(
                node,
                this._parseQuery(others, DOM.isNode)
            );
        },

        /**
         * Insert each node after the selection.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         */
        afterSelection(nodes) {
            const selection = window.getSelection();

            if (!selection.rangeCount) {
                return;
            }

            nodes = this._parseQuery(nodes);

            const range = selection.getRangeAt(0);

            selection.removeAllRanges();

            range.collapse();

            nodes.forEach(node =>
                range.insertNode(node)
            );
        },

        /**
         * Append each other node to the first node.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector or HTML string.
         */
        append(nodes, others) {
            const node = this._nodeFind(nodes);

            if (!node) {
                return;
            }

            DOM._append(
                node,
                this._parseQuery(others, DOM.isNode)
            );
        },

        /**
         * Append each node to the first other node.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector or HTML string.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The other node(s), or a query selector string.
         */
        appendTo(nodes, others) {
            this.append(others, nodes);
        },

        /**
         * Insert each other node before the first node.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector or HTML string.
         */
        before(nodes, others) {
            const node = this._nodeFind(nodes, DOM.isNode);

            if (!node) {
                return;
            }

            DOM._before(
                node,
                this._parseQuery(others, DOM.isNode)
            );
        },

        /**
         * Insert each node before the selection.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         */
        beforeSelection(nodes) {
            const selection = window.getSelection();

            if (!selection.rangeCount) {
                return;
            }

            nodes = this._parseQuery(nodes);

            const range = selection.getRangeAt(0);

            selection.removeAllRanges();

            nodes.forEach(node =>
                range.insertNode(node)
            );
        },

        /**
         * Insert each node after the first other node.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector or HTML string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector string.
         */
        insertAfter(nodes, others) {
            this.after(others, nodes);
        },

        /**
         * Insert each node before the first other node.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector or HTML string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector string.
         */
        insertBefore(nodes, others) {
            this.before(others, nodes);
        },

        /**
         * Prepend each other node to the first node.
         * @param {string|HTMLElement|HTMLElement|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector or HTML string.
         */
        prepend(nodes, others) {
            const node = this._nodeFind(nodes);

            if (!node) {
                return;
            }

            DOM._prepend(
                node,
                this._parseQuery(others, DOM.isNode)
            );
        },

        /**
         * Prepend each node to the first other node.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector or HTML string.
         * @param {string|HTMLElement|HTMLElement|HTMLElement[]} others The other node(s), or a query selector string.
         */
        prependTo(nodes, others) {
            this.prepend(others, nodes);
        }

    });

    /**
     * DOM Wrap
     */

    Object.assign(DOM.prototype, {

        /**
         * Unwrap each node.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         */
        unwrap(nodes, filter) {
            this._nodeFilter(nodes, DOM.isNode)
                .forEach(node =>
                    this._unwrap(node, filter)
                );
        },

        /**
         * Wrap each nodes with other nodes.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The other node(s), or a query selector or HTML string.
         */
        wrap(nodes, others) {
            others = this._parseQuery(others);

            this._nodeFilter(nodes, DOM.isNode)
                .forEach(node =>
                    this._wrap(node, others)
                );
        },

        /**
         * Wrap all nodes with other nodes.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The other node(s), or a query selector or HTML string.
         */
        wrapAll(nodes, others) {
            others = this._parseQuery(others);

            const clone = this.clone(others, true);

            DOM._before(nodes, clone);
            const first = clone.shift();

            DOM._append(
                Core.merge(
                    [],
                    DOM._findBySelector('*', first)
                ).find(node =>
                    !DOM._hasChildren(node)
                ) || first,
                nodes
            );
        },

        /**
         * Wrap the contents of each node with other nodes.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The other node(s), or a query selector or HTML string.
         */
        wrapInner(nodes, others) {
            others = this._parseQuery(others);

            this._nodeFilter(nodes, DOM.isNode)
                .forEach(node =>
                    this._wrapInner(node, others)
                );
        },

        /**
         * Wrap selected nodes with other nodes.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         */
        wrapSelection(nodes) {
            const selection = window.getSelection();

            if (!selection.rangeCount) {
                return;
            }

            nodes = this._parseQuery(nodes);

            const range = selection.getRangeAt(0);

            selection.removeAllRanges();

            const first = nodes.slice().shift();
            DOM._append(
                Core.merge(
                    [],
                    DOM._findBySelector('*', first)
                ).find(node =>
                    !DOM._hasChildren(node)
                ) || first,
                Core.merge(
                    [],
                    range.extractContents().childNodes
                )
            );

            nodes.forEach(node =>
                range.insertNode(node)
            );
        },

        /**
         * Unwrap a single node.
         * @param {Node} node The input node.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         */
        _unwrap(node, filter) {
            const parent = DOM._parent(node, filter).shift();

            if (!parent) {
                return;
            }

            DOM._before(
                parent,
                DOM._children(parent, false, false, false)
            );

            this._remove(parent);
        },

        /**
         * Wrap a single node with other nodes.
         * @param {Node} node The input node.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The other node(s), or a query selector or HTML string.
         */
        _wrap(node, others) {
            const clone = this.clone(others, true);
            DOM._before(node, clone);

            const first = clone.shift();
            DOM._append(
                Core.merge(
                    [],
                    DOM._findBySelector('*', first)
                ).find(node =>
                    !DOM._hasChildren(node)
                ) || first,
                [node]
            );
        },

        /**
         * Wrap the contents of a single node with other nodes.
         * @param {HTMLElement} node The input node.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} others The other node(s), or a query selector or HTML string.
         */
        _wrapInner(node, others) {
            const clone = this.clone(others, true);
            const children = DOM._children(node, false, false, false);
            DOM._append(node, clone);

            const first = clone.shift();
            DOM._append(
                Core.merge(
                    [],
                    DOM._findBySelector('*', first)
                ).find(node =>
                    !DOM._hasChildren(node)
                ) || first,
                children
            );
        }

    });

    /**
     * DOM Filter
     */

    Object.assign(DOM.prototype, {

        /**
         * Return all elements matching a filter.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {HTMLElement[]} The filtered nodes.
         */
        filter(nodes, filter) {
            filter = this._parseFilter(filter);

            return this._nodeFilter(
                nodes,
                (node, index) => DOM.isElement(node) && (!filter || filter(node, index))
            );
        },

        /**
         * Return the first element matching a filter.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {HTMLElement} The filtered node.
         */
        filterOne(nodes, filter) {
            filter = this._parseFilter(filter);

            return this._nodeFind(
                nodes,
                (node, index) => DOM.isElement(node) && (!filter || filter(node, index))
            ) || null;
        },

        /**
         * Return all elements not matching a filter.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {HTMLElement[]} The filtered nodes.
         */
        not(nodes, filter) {
            filter = this._parseFilter(filter);

            if (!filter) {
                return [];
            }

            return this._nodeFilter(
                nodes,
                (node, index) => DOM.isElement(node) && !filter(node, index)
            );
        },

        /**
         * Return the first element not matching a filter.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {HTMLElement} The filtered node.
         */
        notOne(nodes, filter) {
            filter = this._parseFilter(filter);

            if (!filter) {
                return null;
            }

            return this._nodeFind(
                nodes,
                (node, index) => DOM.isElement(node) && !filter(node, index)
            ) || null;
        },

        /**
         * Return all elements with a descendent matching a filter.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {HTMLElement[]} The filtered nodes.
         */
        has(nodes, filter) {
            filter = this._parseFilterContains(filter);

            return this._nodeFilter(
                nodes,
                (node, index) => (DOM.isElement(node) || DOM.isDocument(node)) && (!filter || filter(node, index))
            );
        },

        /**
         * Return the first element with a descendent matching a filter.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {HTMLElement} The filtered node.
         */
        hasOne(nodes, filter) {
            filter = this._parseFilterContains(filter);

            return this._nodeFind(
                nodes,
                (node, index) => (DOM.isElement(node) || DOM.isDocument(node)) && (!filter || filter(node, index))
            ) || null;
        },

        /**
         * Return all hidden elements.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @returns {HTMLElement[]} The filtered nodes.
         */
        hidden(nodes) {
            return this._nodeFilter(
                nodes,
                node => (DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node)) && this.isHidden(node)
            );
        },

        /**
         * Return the first hidden element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @returns {HTMLElement} The filtered node.
         */
        hiddenOne(nodes) {
            return this._nodeFind(
                nodes,
                node => (DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node)) && this.isHidden(node)
            ) || null;
        },

        /**
         * Return all visible elements.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @returns {HTMLElement[]} The filtered nodes.
         */
        visible(nodes) {
            return this._nodeFilter(
                nodes,
                node => (DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node)) && this.isVisible(node)
            );
        },

        /**
         * Return the first visible element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @returns {HTMLElement} The filtered node.
         */
        visibleOne(nodes) {
            return this._nodeFind(
                nodes,
                node => (DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node)) && this.isVisible(node)
            ) || null;
        }

    });

    /**
     * DOM Find
     */

    Object.assign(DOM.prototype, {

        /**
         * Return all elements matching a selector.
         * @param {string} selector The query selector.
         * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
         * @returns {HTMLElement[]} The matching nodes.
         */
        find(selector, nodes = this.context) {
            // fast selector
            const match = selector.match(DOM.fastRegex);
            if (match) {
                if (match[1] === '#') {
                    return this.findById(match[2]);
                }

                if (match[1] === '.') {
                    return this.findByClass(match[2], nodes);
                }

                return this.findByTag(match[2], nodes);
            }

            // custom selector
            if (selector.match(DOM.complexRegex)) {
                return this._findByCustom(selector, nodes);
            }

            // standard selector
            return this.findBySelector(selector, nodes);
        },

        /**
         * Return a single element matching a selector.
         * @param {string} selector The query selector.
         * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
         * @returns {HTMLElement} The matching node.
         */
        findOne(selector, nodes = this.context) {
            // fast selector
            const match = selector.match(DOM.fastRegex);
            if (match) {
                if (match[1] === '#') {
                    return this.findOneById(match[2]);
                }

                if (match[1] === '.') {
                    return this.findOneByClass(match[2], nodes);
                }

                return this.findOneByTag(match[2], nodes);
            }

            // custom selector
            if (selector.match(DOM.complexRegex)) {
                return this._findOneByCustom(selector, nodes);
            }

            // standard selector
            return this.findOneBySelector(selector, nodes);
        },

        /**
         * Return all elements with a specific class.
         * @param {string} className The class name.
         * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
         * @returns {HTMLElement[]} The matching nodes.
         */
        findByClass(className, nodes = this.context) {
            // single node case
            if (DOM.isElement(nodes) || DOM.isDocument(nodes)) {
                return Core.merge([], DOM._findByClass(className, nodes));
            }

            nodes = this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node));

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    DOM._findByClass(className, node)
                )
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

        /**
         * Return a single element with a specific class.
         * @param {string} className The class name.
         * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
         * @returns {HTMLElement} The matching node.
         */
        findOneByClass(className, nodes = this.context) {
            // single node case
            if (DOM.isElement(nodes) || DOM.isDocument(nodes)) {
                return DOM._findByClass(className, nodes).item(0);
            }

            nodes = this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node));

            for (const node of nodes) {
                const result = DOM._findByClass(className, node).item(0);
                if (result) {
                    return result;
                }
            }

            return null;
        },

        /**
         * Return all elements with a specific ID.
         * @param {string} id The id.
         * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
         * @returns {HTMLElement[]} The matching nodes.
         */
        findById(id, nodes = this.context) {
            const result = DOM._findById(id, this.context);

            if (!result ||
                (
                    nodes !== this.context &&
                    !this.hasOne(nodes, result)
                )
            ) {
                return [];
            }

            return [result];
        },

        /**
         * Return a single element with a specific ID.
         * @param {string} id The id.
         * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
         * @returns {HTMLElement} The matching element.
         */
        findOneById(id, nodes = this.context) {
            const result = DOM._findById(id, this.context);

            if (!result ||
                (
                    nodes !== this.context &&
                    !this.hasOne(nodes, result)
                )
            ) {
                return null;
            }

            return result;
        },

        /**
         * Return all elements with a specific tag.
         * @param {string} tagName The tag name.
         * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
         * @returns {HTMLElement[]} The matching nodes.
         */
        findByTag(tagName, nodes = this.context) {
            // single node case
            if (DOM.isElement(nodes) || DOM.isDocument(nodes)) {
                return Core.merge([], DOM._findByTag(tagName, nodes));
            }

            nodes = this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node));

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    DOM._findByTag(tagName, node)
                )
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

        /**
         * Return a single element with a specific tag.
         * @param {string} tagName The tag name.
         * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
         * @returns {HTMLElement} The matching node.
         */
        findOneByTag(tagName, nodes = this.context) {
            // single node case
            if (DOM.isElement(nodes) || DOM.isDocument(nodes)) {
                return DOM._findByTag(tagName, nodes).item(0);
            }

            nodes = this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node));

            for (const node of nodes) {
                const result = DOM._findByTag(tagName, node).item(0);
                if (result) {
                    return result;
                }
            }

            return null;
        },

        /**
         * Return all elements matching a standard CSS selector.
         * @param {string} selector The query selector.
         * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
         * @returns {HTMLElement[]} The matching nodes.
         */
        findBySelector(selector, nodes = this.context) {
            // single node case
            if (DOM.isElement(nodes) || DOM.isDocument(nodes)) {
                return Core.merge([], DOM._findBySelector(selector, nodes));
            }

            nodes = this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node));

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    DOM._findBySelector(selector, node)
                );
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

        /**
         * Return a single element matching a standard CSS selector.
         * @param {string} selector The query selector.
         * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
         * @returns {HTMLElement} The matching node.
         */
        findOneBySelector(selector, nodes = this.context) {
            // single node case
            if (DOM.isElement(nodes) || DOM.isDocument(nodes)) {
                return DOM._findOneBySelector(selector, nodes);
            }

            nodes = this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node));

            for (const node of nodes) {
                const result = DOM._findOneBySelector(selector, node);
                if (result) {
                    return result;
                }
            }

            return null;
        },

        /**
         * Return all elements matching a custom CSS selector.
         * @param {string} selector The custom query selector.
         * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
         * @returns {HTMLElement[]} The matching nodes.
         */
        _findByCustom(selector, nodes = this.context) {
            // string case
            if (Core.isString(nodes)) {
                return DOM._findBySelector(
                    DOM._prefixSelectors(selector, `${nodes} `),
                    this.context
                );
            }

            const selectors = DOM._prefixSelectors(selector, `#${DOM.tempId} `);

            // single node case
            if (DOM.isElement(nodes) || DOM.isDocument(nodes)) {
                return Core.merge([], DOM._findByCustom(selectors, nodes));
            }

            nodes = this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node));

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    DOM._findByCustom(selectors, node)
                );
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

        /**
         * Return a single element matching a custom CSS selector.
         * @param {string} selector The custom query selector.
         * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes] The input node(s), or a query selector string.
         * @returns {HTMLElement} The matching node.
         */
        _findOneByCustom(selector, nodes = this.context) {
            // string case
            if (Core.isString(nodes)) {
                return DOM._findOneBySelector(
                    DOM._prefixSelectors(selector, `${nodes} `),
                    this.context
                );
            }

            const selectors = DOM._prefixSelectors(selector, `#${DOM.tempId} `);

            // single node case
            if (DOM.isElement(nodes) || DOM.isDocument(nodes)) {
                return DOM._findOneByCustom(selectors, nodes);
            }

            nodes = this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node));

            for (const node of nodes) {
                const result = DOM._findOneByCustom(selectors, node);
                if (result) {
                    return result;
                }
            }

            return null;
        }

    });

    /**
     * DOM Traversal
     */

    Object.assign(DOM.prototype, {

        /**
         * Return the first child of each element (optionally matching a filter).
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {HTMLElement[]} The matching nodes.
         */
        child(nodes, filter) {
            return this.children(
                nodes,
                filter,
                true
            );
        },

        /**
         * Return all children of each element (optionally matching a filter).
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
         * @param {Boolean} [elementsOnly=false] Whether to only return element nodes.
         * @returns {Node[]} The matching nodes.
         */
        children(nodes, filter, first = false, elementsOnly = true) {
            filter = this._parseFilter(filter);

            if (DOM.isElement(nodes)) {
                return DOM._children(nodes, filter, first, elementsOnly);
            }

            nodes = this._nodeFilter(nodes);

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    DOM._children(node, filter, first, elementsOnly)
                )
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

        /**
         * Return the common ancestor of all elements.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @returns {HTMLElement} The common ancestor.
         */
        commonAncestor(nodes) {
            nodes = this.sortNodes(nodes);

            if (!nodes.length) {
                return;
            }

            const range = this.context.createRange();

            if (nodes.length == 1) {
                range.selectNode(nodes.shift());
            } else {
                range.setStartBefore(nodes.shift());
                range.setEndAfter(nodes.pop());
            }

            return range.commonAncestorContainer;
        },

        /**
         * Return all children of each element (including text and comment nodes).
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @returns {Node[]} The matching nodes.
         */
        contents(nodes) {
            return this.children(
                nodes,
                false,
                false,
                false
            );
        },

        /**
         * Return the closest ancestor to each element (optionally matching a filter, and before a limit).
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
         * @returns {HTMLElement[]} The matching nodes.
         */
        closest(nodes, filter, until) {
            return this.parents(
                nodes,
                filter,
                until,
                true
            );
        },

        /**
         * Return the parent of each element (optionally matching a filter).
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {HTMLElement[]} The matching nodes.
         */
        parent(nodes, filter) {
            filter = this._parseFilter(filter);

            if (DOM.isNode(nodes)) {
                return DOM._parent(nodes, filter);
            }

            nodes = this._nodeFilter(nodes, DOM.isNode);

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    DOM._parent(node, filter)
                )
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

        /**
         * Return all parents of each element (optionally matching a filter, and before a limit).
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         * @param {string|Array|Node|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @param {string|Array|Node|NodeList|HTMLCollection|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
         * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
         * @returns {HTMLElement[]} The matching nodes.
         */
        parents(nodes, filter, limit, first = false) {
            filter = this._parseFilter(filter);
            limit = this._parseFilter(limit);

            if (DOM.isNode(nodes)) {
                return DOM._parent(nodes, filter, limit, first);
            }

            nodes = this._nodeFilter(nodes, DOM.isNode);

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    DOM._parents(node, filter, limit, first)
                )
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

        /**
         * Return the offset parent (relatively positioned) of the first element.
         * @param {string|Node|NodeList|HTMLCollection|Node[]|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {HTMLElement} The offset parent.
         */
        offsetParent(nodes) {
            return this.forceShow(
                nodes,
                node => node.offsetParent
            );
        },

        /**
         * Return the next sibling for each element (optionally matching a filter).
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {Node[]} The matching nodes.
         */
        next(nodes, filter) {
            filter = this._parseFilter(filter);

            if (DOM.isElement(nodes)) {
                return DOM._next(nodes, filter);
            }

            nodes = this._nodeFilter(nodes);

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    DOM._next(node, filter)
                )
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

        /**
         * Return all next siblings for each element (optionally matching a filter, and before a limit).
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
         * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
         * @returns {Node[]} The matching nodes.
         */
        nextAll(nodes, filter, limit, first = false) {
            filter = this._parseFilter(filter);
            limit = this._parseFilter(limit);

            if (DOM.isElement(nodes)) {
                return DOM._nextAll(nodes, filter, limit, first);
            }

            nodes = this._nodeFilter(nodes);

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    DOM._nextAll(node, filter, limit, first)
                )
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

        /**
         * Return the previous sibling for each element (optionally matching a filter).
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {Node[]} The matching nodes.
         */
        prev(nodes, filter) {
            filter = this._parseFilter(filter);

            if (DOM.isElement(nodes)) {
                return DOM._prev(nodes, filter);
            }

            nodes = this._nodeFilter(nodes);

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    DOM._prev(node, filter)
                )
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

        /**
         * Return all previous siblings for each element (optionally matching a filter, and before a limit).
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
         * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
         * @returns {Node[]} The matching nodes.
         */
        prevAll(nodes, filter, limit, first = false) {
            filter = this._parseFilter(filter);
            limit = this._parseFilter(limit);

            if (DOM.isElement(nodes)) {
                return DOM._prevAll(nodes, filter, limit, first);
            }

            nodes = this._nodeFilter(nodes);

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    DOM._prevAll(node, filter, limit, first)
                )
            }

            return nodes.length > 1 && results.length ?
                Core.unique(results) :
                results;
        },

        /**
         * Return all siblings for each element (optionally matching a filter).
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
         * @returns {Node[]} The matching nodes.
         */
        siblings(nodes, filter, elementsOnly = true) {
            filter = this._parseFilter(filter);

            if (DOM.isElement(nodes)) {
                return DOM._siblings(nodes, filter, elementsOnly);
            }

            nodes = this._nodeFilter(nodes);

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    DOM._siblings(node, filter, elementsOnlyt)
                )
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

    });

    /**
     * DOM Selection
     */

    Object.assign(DOM.prototype, {

        /**
         * Return all selected nodes.
         * @returns {Node[]} The selected nodes.
         */
        getSelection() {
            const selection = window.getSelection();

            if (!selection.rangeCount) {
                return [];
            }

            const range = selection.getRangeAt(0);

            const nodes = Core.merge(
                [],
                DOM._findBySelector('*', range.commonAncestorContainer)
            );

            if (!nodes.length) {
                return [range.commonAncestorContainer];
            }

            if (nodes.length === 1) {
                return nodes;
            }

            const start = DOM.isElement(range.startContainer) ?
                range.startContainer :
                DOM._parent(range.startContainer).shift();

            const end = DOM.isElement(range.endContainer) ?
                range.endContainer :
                DOM._parent(range.endContainer).shift();

            return nodes.slice(
                nodes.indexOf(start),
                nodes.indexOf(end) + 1
            );
        },

        /**
         * Create a selection on the first node.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         */
        select(nodes) {
            const node = this._nodeFind(nodes, DOM.isNode);

            if (node && node.select) {
                return node.select();
            }

            const selection = window.getSelection();

            if (selection.rangeCount > 0) {
                selection.removeAllRanges();
            }

            if (!node) {
                return;
            }

            const range = this.context.createRange();
            range.selectNode(node);
            selection.addRange(range);
        },

        /**
         * Create a selection containing all of the nodes.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         */
        selectAll(nodes) {
            const selection = window.getSelection();

            if (selection.rangeCount) {
                selection.removeAllRanges();
            }

            nodes = this.sortNodes(nodes);

            if (!nodes.length) {
                return;
            }

            const range = this.context.createRange();

            if (nodes.length == 1) {
                range.selectNode(nodes.shift());
            } else {
                range.setStartBefore(nodes.shift());
                range.setEndAfter(nodes.pop());
            }

            selection.addRange(range);
        }

    });

    /**
     * DOM Tests
     */

    Object.assign(DOM.prototype, {

        /**
         * Returns true if any of the elements has a CSS animation.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @returns {Boolean} TRUE if any of the nodes has a CSS animation, otherwise FALSE.
         */
        hasAnimation(nodes) {
            return this._nodeFilter(nodes)
                .some(node =>
                    !!parseFloat(
                        this._css(node, 'animation-duration')
                    )
                );
        },

        /**
         * Returns true if any of the elements has a specified attribute.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string} attribute The attribute name.
         * @returns {Boolean} TRUE if any of the nodes has the attribute, otherwise FALSE.
         */
        hasAttribute(nodes, attribute) {
            return this._nodeFilter(nodes)
                .some(node =>
                    node.hasAttribute(attribute)
                );
        },

        /**
         * Returns true if any of the elements has any of the specified classes.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {...string|string[]} classes The classes.
         * @returns {Boolean} TRUE if any of the nodes has any of the classes, otherwise FALSE.
         */
        hasClass(nodes, ...classes) {
            classes = DOM._parseClasses(classes);

            return this._nodeFilter(nodes)
                .some(node =>
                    classes.find(className =>
                        node.classList.contains(className)
                    )
                );
        },

        /**
         * Returns true if any of the nodes has custom data.
         * @param {string|Node|NodeList|HTMLCollection|Window|Document|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string} [key] The data key.
         * @returns {Boolean} TRUE if any of the nodes has custom data, otherwise FALSE.
         */
        hasData(nodes, key) {
            return this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))
                .some(node =>
                    this.nodeData.has(node) &&
                    (
                        !key ||
                        this.nodeData.get(node)
                            .hasOwnProperty(key)
                    )
                );
        },

        /**
         * Returns true if any of the elements has a specified property.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string} property The property name.
         * @returns {Boolean} TRUE if any of the nodes has the property, otherwise FALSE.
         */
        hasProperty(nodes, property) {
            return this._nodeFilter(nodes)
                .some(node =>
                    node.hasOwnProperty(property)
                );
        },

        /**
         * Returns true if any of the elements has a CSS transition.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @returns {Boolean} TRUE if any of the nodes has a CSS transition, otherwise FALSE.
         */
        hasTransition(nodes) {
            return this._nodeFilter(nodes)
                .some(node =>
                    !!parseFloat(
                        this._css(node, 'transition-duration')
                    )
                );
        },

        /**
         * Returns true if any of the elements contains a descendent matching a filter.
         * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|HTMLElement[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {Boolean} TRUE if any of the nodes contains a descendent matching the filter, otherwise FALSE.
         */
        contains(nodes, filter) {
            filter = this._parseFilterContains(filter);

            return this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node))
                .some(node =>
                    !filter ||
                    filter(node)
                );
        },

        /**
         * Returns true if any of the elements matches a filter.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|HTMLElement[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {Boolean} TRUE if any of the nodes matches the filter, otherwise FALSE.
         */
        is(nodes, filter) {
            filter = this._parseFilter(filter);

            return this._nodeFilter(nodes)
                .some(node =>
                    !filter ||
                    filter(node)
                );
        },

        /**
         * Returns true if any of the nodes is connected to the DOM.
         * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
         * @returns {Boolean} TRUE if any of the nodes is connected to the DOM, otherwise FALSE.
         */
        isConnected(nodes) {
            return this._nodeFilter(nodes, DOM.isNode)
                .some(node => DOM._isConnected(node));
        },

        /**
         * Returns true if any of the elements or a parent of any of the elements is "fixed".
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @returns {Boolean} TRUE if any of the nodes is "fixed", otherwise FALSE.
         */
        isFixed(nodes) {
            return this._nodeFilter(nodes)
                .some(node =>
                    this._css(node, 'position') === 'fixed' ||
                    this._parents(
                        node,
                        parent =>
                            this._css(parent, 'position') === 'fixed',
                        false,
                        true
                    ).length
                );
        },

        /**
         * Returns true if any of the nodes is hidden.
         * @param {string|Node|NodeList|HTMLCollection|Document|Window|Node[]} nodes The input node(s), or a query selector string.
         * @returns {Boolean} TRUE if any of the nodes is hidden, otherwise FALSE.
         */
        isHidden(nodes) {
            return this._nodeFilter(nodes, node => DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node))
                .some(node =>
                    !DOM._isVisible(node)
                );
        },

        /**
         * Returns true if any of the nodes is visible.
         * @param {string|Node|NodeList|HTMLCollection|Document|Window|Node[]} nodes The input node(s), or a query selector string.
         * @returns {Boolean} TRUE if any of the nodes is visible, otherwise FALSE.
         */
        isVisible(nodes) {
            return this._nodeFilter(nodes, node => DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node))
                .some(node =>
                    DOM._isVisible(node)
                );
        }

    });

    /**
     * DOM Utility
     */

    Object.assign(DOM.prototype, {

        /**
         * @callback DOM~nodeCallback
         * @param {HTMLElement} node The input node.
         */

        /**
         * Force an element to be shown, and then execute a callback.
         * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {DOM~nodeCallback} callback The callback to execute.
         * @returns {*} The result of the callback.
         */
        forceShow(nodes, callback) {
            const node = this._nodeFind(nodes, node => DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node));

            if (!node) {
                return;
            }

            if (this.isVisible(node)) {
                return callback(node);
            }

            const elements = [];
            const styles = [];

            if (this._css(node, 'display') === 'none') {
                elements.push(node);
                styles.push(DOM._getAttribute(node, 'style'));
            }

            this._parents(node, parent =>
                this._css(parent, 'display') === 'none'
            )
                .forEach(parent => {
                    elements.push(parent);
                    styles.push(
                        DOM._getAttribute(parent, 'style')
                    );
                });

            DOM._setStyle(
                elements,
                {
                    display: 'initial'
                },
                true
            );

            const result = callback(node);

            elements.forEach((node, index) =>
                styles[index] ?
                    DOM._setStyle(
                        node,
                        {
                            display: styles[index]
                        }
                    ) :
                    DOM._removeAttribute(node, 'style')
            );

            return result;
        },

        /**
         * Get the index of the first element matching a filter.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @param {string|Node|NodeList|HTMLCollection|HTMLElement[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {number} The index.
         */
        index(nodes, filter) {
            filter = this._parseFilter(filter);

            return this._nodeFilter(nodes)
                .findIndex(node =>
                    !filter || filter(node)
                );
        },

        /**
         * Get the index of the first element relative to it's parent element.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @returns {number} The index.
         */
        indexOf(nodes) {
            const node = this._nodeFind(nodes);

            if (!node) {
                return;
            }

            return this.children(
                this.parent(node)
            ).indexOf(node);
        },

        /**
         * Return a serialized string containing names and values of all form elements.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @returns {string} The serialized string.
         */
        serialize(nodes) {
            return DOM._parseParams(
                this.serializeArray(nodes)
            );
        },

        /**
         * Return a serialized array containing names and values of all form elements.
         * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
         * @returns {Array} The serialized array.
         */
        serializeArray(nodes) {
            return this._nodeFilter(nodes)
                .reduce(
                    (values, node) => {
                        if (DOM._is(node, 'form')) {
                            return values.concat(
                                this.serializeArray(
                                    DOM._findBySelector(
                                        'input, select, textarea',
                                        node
                                    )
                                )
                            );
                        }

                        if (DOM._is(node, '[disabled], input[type=submit], input[type=reset], input[type=file], input[type=radio]:not(:checked), input[type=checkbox]:not(:checked)')) {
                            return values;
                        }

                        const name = DOM._getAttribute(node, 'name');
                        if (!name) {
                            return values;
                        }

                        const value = DOM._getAttribute(node, 'value') || '';

                        values.push(
                            {
                                name,
                                value
                            }
                        );

                        return values;
                    },
                    []
                );
        }

    });

    /**
     * DOM (Static) Attributes
     */

    Object.assign(DOM, {

        /**
         * Get an attribute value for a single element.
         * @param {HTMLElement} node The input node.
         * @param {string} attribute The attribute name.
         * @returns {string} The attribute value.
         */
        _getAttribute(node, attribute) {
            return node.getAttribute(attribute);
        },

        /**
         * Get a dataset value for a single element.
         * @param {HTMLElement} node The input node.
         * @param {string} [key] The dataset key.
         * @returns {string|object} The dataset value.
         */
        _getDataset(node, key) {
            if (!key) {
                return node.dataset;
            }

            return node.dataset[key];
        },

        /**
         * Get a property value for a single element.
         * @param {HTMLElement} node The input node.
         * @param {string} property The property name.
         * @returns {string} The property value.
         */
        _getProperty(node, property) {
            return node[property];
        },

        /**
         * Remove an attribute from a single element.
         * @param {HTMLElement} node The input node.
         * @param {string} attribute The attribute name.
         */
        _removeAttribute(node, attribute) {
            node.removeAttribute(attribute)
        },

        /**
         * Remove a property from a single element.
         * @param {HTMLElement} node The input node.
         * @param {string} property The property name.
         */
        _removeProperty(node, property) {
            delete node[property];
        },

        /**
         * Set an attribute value for a single element.
         * @param {HTMLElement} node The input node.
         * @param {object} attributes An object containing attributes.
         */
        _setAttribute(node, attributes) {
            for (const key in attributes) {
                node.setAttribute(
                    key,
                    attributes[key]
                );
            }
        },

        /**
         * Set a dataset value for a single element.
         * @param {HTMLElement} node The input node.
         * @param {object} dataset An object containing dataset values.
         */
        _setDataset(node, dataset) {
            Object.assign(
                node.dataset,
                dataset
            );
        },

        /**
         * Set a property value for a single element.
         * @param {HTMLElement} node The input node.
         * @param {object} properties An object containing properties.
         */
        _setProperty(node, properties) {
            Object.assign(
                node,
                properties
            );
        }

    });

    /**
     * DOM (Static) Scroll
     */

    Object.assign(DOM, {

        /**
         * Get the scroll X position of a single element.
         * @param {HTMLElement|Document|Window} node The input node.
         * @returns {number} The scroll X position.
         */
        _getScrollX(node) {
            if (Core.isWindow(node)) {
                return node.scrollX;
            }

            if (this.isDocument(node)) {
                return node.scrollingElement.scrollLeft;
            }

            return node.scrollLeft;
        },

        /**
         * Get the scroll Y position of a single element.
         * @param {HTMLElement|Document|Window} node The input node.
         * @returns {number} The scroll Y position.
         */
        _getScrollY(node) {
            if (Core.isWindow(node)) {
                return node.scrollY;
            }

            if (this.isDocument(node)) {
                return node.scrollingElement.scrollTop;
            }

            return node.scrollTop;
        },

        /**
         * Scroll a single element to an X,Y position.
         * @param {HTMLElement|Document|Window} node The input node.
         * @param {number} x The scroll X position.
         * @param {number} y The scroll Y position.
         */
        _setScroll(node, x, y) {
            if (Core.isWindow(node)) {
                return node.scroll(x, y);
            }

            if (this.isDocument(node)) {
                node.scrollingElement.scrollLeft = x;
                node.scrollingElement.scrollTop = y;
                return;
            }

            node.scrollLeft = x;
            node.scrollTop = y;
        },

        /**
         * Scroll a single element to an X position.
         * @param {HTMLElement|Document|Window} node The input node.
         * @param {number} x The scroll X position.
         */
        _setScrollX(node, x) {
            if (Core.isWindow(node)) {
                return node.scroll(x, node.scrollY);
            }

            if (this.isDocument(node)) {
                node.scrollingElement.scrollLeft = x;
                return;
            }

            node.scrollLeft = x;
        },

        /**
         * Scroll a single element to a Y position.
         * @param {HTMLElement|Document|Window} node The input node.
         * @param {number} y The scroll Y position.
         */
        _setScrollY(node, y) {
            if (Core.isWindow(node)) {
                return node.scroll(node.scrollX, y);
            }

            if (this.isDocument(node)) {
                node.scrollingElement.scrollTop = y;
                return;
            }

            node.scrollTop = y;
        }

    });

    /**
     * DOM (Static) Styles
     */

    Object.assign(DOM, {

        /**
         * Add classes to a single element.
         * @param {HTMLElement} node The input node.
         * @param {...string} classes The classes.
         */
        _addClass(node, classes) {
            node.classList.add(...classes)
        },

        /**
         * Remove classes from a single element.
         * @param {HTMLElement} node The input node.
         * @param {...string} classes The classes.
         */
        _removeClass(node, classes) {
            node.classList.remove(...classes)
        },

        /**
         * Toggle classes for a single element.
         * @param {HTMLElement} node The input node.
         * @param {...string} classes The classes.
         */
        _toggleClass(node, classes) {
            node.classList.toggle(...classes)
        },

        /**
         * Get a style property for a single element.
         * @param {HTMLElement} node The input node.
         * @param {string} style The style name.
         * @returns {string} The style value.
         */
        _getStyle(node, style) {
            return node.style[style];
        },

        /**
         * Set style properties for a single element.
         * @param {HTMLElement} node The input node.
         * @param {object} styles An object containing styles.
         * @param {Boolean} [important] Whether the style should be !important.
         */
        _setStyle(node, styles, important = '') {
            for (const style in styles) {
                node.style.setProperty(
                    style,
                    styles[style],
                    important ?
                        'important' :
                        ''
                );
            }
        },

        /**
         * Toggle the visibility of a single element.
         * @param {HTMLElement} node The input node.
         */
        _toggle(node) {
            this._getStyle(node, 'display') === 'none' ?
                this._setStyle(node, { display: '' }) :
                this._setStyle(node, { display: 'none' });
        }

    });

    /**
     * DOM (Static) Events
     */

    Object.assign(DOM, {

        /**
         * Trigger a blur event on a single element.
         * @param {HTMLElement} node The input node.
         */
        _blur(node) {
            node.blur();
        },

        /**
         * Trigger a click event on a single element.
         * @param {HTMLElement} node The input node.
         */
        _click(node) {
            node.click();
        },

        /**
         * Trigger a focus event on a single element.
         * @param {HTMLElement} node The input node.
         */
        _focus(node) {
            node.focus();
        }

    });

    /**
     * DOM (Static) Manipulation
     */

    Object.assign(DOM, {

        /**
         * Detach a single node from the DOM.
         * @param {Node} node The input node.
         */
        _detach(node) {
            if (!node.parentNode) {
                return;
            }

            node.parentNode.removeChild(node);
        }

    });

    /**
     * DOM (Static) Move
     */

    Object.assign(DOM, {

        /**
         * Insert each other node after the first node.
         * @param {Node} node The input node.
         * @param {Node[]} others The other node(s).
         */
        _after(node, others) {
            if (!node.parentNode) {
                return;
            }

            others.reverse()
                .forEach(other =>
                    node.parentNode.insertBefore(
                        other,
                        node.nextSibling
                    )
                );
        },

        /**
         * Append each other node to a single node.
         * @param {Node} node The input node.
         * @param {Node[]} others The other node(s).
         */
        _append(node, others) {
            others.forEach(other =>
                node.insertBefore(other, null)
            );
        },

        /**
         * Insert each other node before a single node.
         * @param {Node} node The input node.
         * @param {Node[]} others The other node(s).
         */
        _before(node, others) {
            if (!node.parentNode) {
                return;
            }

            others.forEach(other =>
                node.parentNode.insertBefore(
                    other,
                    node
                )
            );
        },

        /**
         * Prepend each other node to a single node.
         * @param {Node} node The input node.
         * @param {Node[]} others The other node(s).
         */
        _prepend(node, others) {
            others.reverse()
                .forEach(other =>
                    node.insertBefore(other, node.firstChild)
                );
        }

    });

    /**
     * DOM (Static) Nodes
     */

    Object.assign(DOM, {

        /**
         * Returns true if the value is a Document.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is a Document, otherwise FALSE.
         */
        isDocument(node) {
            return Core.isObject(node) &&
                'nodeType' in node &&
                node.nodeType === Node.DOCUMENT_NODE;
        },

        /**
         * Returns true if the value is a HTMLElement.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is a HTMLElement, otherwise FALSE.
         */
        isElement(node) {
            return Core.isObject(node) &&
                'nodeType' in node &&
                node.nodeType === Node.ELEMENT_NODE;
        },

        /**
         * Returns true if the value is a Node.
         * @param {*} value The value to test.
         * @returns {Boolean} TRUE if the value is a Node, otherwise FALSE.
         */
        isNode(node) {
            return Core.isObject(node) &&
                'nodeType' in node &&
                (
                    node.nodeType === Node.ELEMENT_NODE ||
                    node.nodeType === Node.TEXT_NODE ||
                    node.nodeType === Node.COMMENT_NODE
                );
        },

        _compareNodes(a, b) {
            if (DOM._isSame(a, b)) {
                return 0;
            }

            const pos = a.compareDocumentPosition(b);

            if (pos & Node.DOCUMENT_POSITION_FOLLOWING ||
                pos & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                return -1;
            }

            if (pos & Node.DOCUMENT_POSITION_PRECEDING ||
                pos & Node.DOCUMENT_POSITION_CONTAINS) {
                return 1;
            }

            return 0;
        },

        /**
         * Returns true if a single node has another node as a descendent.
         * @param {HTMLElement} node The input node.
         * @param {Node} node The other node.
         * @returns {Boolean} TRUE if the node has the other node as a descendent, otherwise FALSE.
         */
        _has(node, other) {
            return node.contains(other);
        },

        /**
         * Returns true if a single node has child elements.
         * @param {HTMLElement} node The input node.
         * @returns {Boolean} TRUE if the node has child elements, otherwise FALSE.
         */
        _hasChildren(node) {
            return !!node.childElementCount;
        },

        /**
         * Returns true if a single node matches a query selector.
         * @param {HTMLElement} node The input node.
         * @param {string} selector The query selector.
         * @returns {Boolean} TRUE if the node matches the selector, otherwise FALSE.
         */
        _is(node, selector) {
            return node.matches(selector);
        },

        /**
         * Returns true if a single node is connected to the DOM.
         * @param {Node} node The input node.
         * @returns {Boolean} TRUE if the node is connected to the DOM, otherwise FALSE.
         */
        _isConnected(node) {
            return node.isConnected;
        },

        /**
         * Returns true if a single node is equal to another node.
         * @param {Node} node The input node.
         * @param {Node} node The other node.
         * @returns {Boolean} TRUE if the node is equal to the other node, otherwise FALSE.
         */
        _isEqual(node, other) {
            return node.isEqualNode(other);
        },

        /**
         * Returns true if a single node is the same as another node.
         * @param {Node} node The input node.
         * @param {Node} node The other node.
         * @returns {Boolean} TRUE if the node is the same as the other node, otherwise FALSE.
         */
        _isSame(node, other) {
            return node.isSameNode(other);
        },

        /**
         * Returns true if a single node is visible.
         * @param {HTMLElement|Document|Window} node The input node.
         * @returns {Boolean} TRUE if the node is visible, otherwise FALSE.
         */
        _isVisible(node) {
            if (Core.isWindow(node)) {
                return dom.context.visibilityState === 'visible';
            }

            if (DOM.isDocument(node)) {
                return node.visibilityState === 'visible';
            }

            return !!node.offsetParent;
        },

        /**
         * Normalize a single node (remove empty Text nodes, and join neighbouring Text nodes).
         * @param {HTMLElement} node The input node.
         */
        _normalize(node) {
            node.normalize();
        }

    });

    /**
     * DOM (Static) Parsing
     */

    Object.assign(DOM, {

        /**
         * Create a Document object from a HTML string.
         * @param {string} html The HTML input string.
         * @returns {Document} A new Document object.
         */
        parseHTML(html) {
            return new DOMParser()
                .parseFromString(html, 'text/html');
        },

        /**
         * Create a Document object from an XML string.
         * @param {string} xml The XML input string.
         * @returns {Document} A new Document object.
         */
        parseXML(xml) {
            return new DOMParser()
                .parseFromString(xml, 'application/xml');
        }

    });

    /**
     * DOM (Static) Find
     */

    Object.assign(DOM, {

        /**
         * Return all elements with a specific class.
         * @param {string} className The class name.
         * @param {HTMLElement|Document} node The input node.
         * @returns {HTMLElement[]} The matching nodes.
         */
        _findByClass(className, node) {
            return node.getElementsByClassName(className);
        },

        /**
         * Return a single elements with a specific ID.
         * @param {string} id The id.
         * @param {Document} node The input node.
         * @returns {HTMLElement} The matching node.
         */
        _findById(id, node) {
            return node.getElementById(id);
        },

        /**
         * Return all elements with a specific tag.
         * @param {string} tagName The tag name.
         * @param {HTMLElement|Document} node The input node.
         * @returns {HTMLElement[]} The matching nodes.
         */
        _findByTag(tagName, node) {
            return node.getElementsByTagName(tagName);
        },

        /**
         * Return all elements matching a standard CSS selector.
         * @param {string} selector The query selector.
         * @param {HTMLElement|Document} node The input node.
         * @returns {HTMLElement[]} The matching nodes.
         */
        _findBySelector(selector, node) {
            return node.querySelectorAll(selector);
        },

        /**
         * Return a single element matching a standard CSS selector.
         * @param {string} selector The query selector.
         * @param {HTMLElement|Document} node The input node.
         * @returns {HTMLElement} The matching node.
         */
        _findOneBySelector(selector, node) {
            return node.querySelector(selector);
        },

        /**
         * Return all elements matching a custom CSS selector.
         * @param {string} selector The custom query selector.
         * @param {HTMLElement} node The input node.
         * @returns {HTMLElement[]} The matching nodes.
         */
        _findByCustom(selector, node) {
            const nodeId = this._getAttribute(node, 'id');
            this._setAttribute(node, { id: this.tempId });

            const results = this._findBySelector(selector, node);

            if (nodeId) {
                this._setAttribute(node, { id: nodeId });
            } else {
                this._removeAttribute(node, 'id');
            }

            return results;
        },

        /**
         * Return a single element matching a custom CSS selector.
         * @param {string} selector The custom query selector.
         * @param {HTMLElement} node The input node.
         * @returns {HTMLElement} The matching node.
         */
        _findOneByCustom(selector, node) {
            const nodeId = this._getAttribute(node, 'id');
            this._setAttribute(node, { id: this.tempId });

            const result = this._findOneBySelector(selector, node);

            if (nodeId) {
                this._setAttribute(node, { id: nodeId });
            } else {
                this._removeAttribute(node, 'id');
            }

            return result;
        }

    });

    /**
     * DOM Traversal
     */

    Object.assign(DOM, {

        /**
         * Return all children of a single element (optionally matching a filter).
         * @param {HTMLElement} node The input node.
         * @param {DOM~filterCallback} [filter] The filter function.
         * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
         * @param {Boolean} [elementsOnly=false] Whether to only return element nodes.
         * @returns {Node[]} The matching nodes.
         */
        _children(node, filter, first = false, elementsOnly = false) {
            const children = elementsOnly ?
                node.children :
                node.childNodes,
                results = [];

            let child;
            for (child of children) {
                if (filter && !filter(child)) {
                    continue;
                }

                results.push(child);
                if (first) {
                    break;
                }
            }

            return results;
        },

        /**
         * Return the parent of a single element (optionally matching a filter).
         * @param {HTMLElement} node The input node.
         * @param {DOM~filterCallback} [filter] The filter function.
         * @returns {HTMLElement[]} The matching nodes.
         */
        _parent(node, filter) {
            const results = [];

            if (!node.parentNode) {
                return results;
            }

            if (filter && !filter(node.parentNode)) {
                return results;
            }

            results.push(node.parentNode);

            return results;
        },

        /**
         * Return all parents of a single element (optionally matching a filter, and before a limit).
         * @param {HTMLElement} node The input node.
         * @param {DOM~filterCallback} [filter] The filter function.
         * @param {DOM~filterCallback} [limit] The limit function.
         * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
         * @returns {HTMLElement[]} The matching nodes.
         */
        _parents(node, filter, limit, closest = false) {
            const results = [];

            while (node = node.parentNode) {
                if (limit && limit(node)) {
                    break;
                }

                if (filter && !filter(node)) {
                    continue;
                }

                results.push(node);

                if (closest) {
                    break;
                }
            }

            return results;
        },

        /**
         * Return the next sibling for a single element (optionally matching a filter).
         * @param {HTMLElement} node The input node.
         * @param {DOM~filterCallback} [filter] The filter function.
         * @returns {Node[]} The matching nodes.
         */
        _next(node, filter) {
            const results = [];

            while (node = node.nextSibling) {
                if (this.isElement(node)) {
                    break;
                }
            }

            if (!node) {
                return results;
            }

            if (filter && !filter(node)) {
                return results;
            }

            results.push(node);

            return results;
        },

        /**
         * Return all next siblings for a single element (optionally matching a filter, and before a limit).
         * @param {HTMLElement} node The input node.
         * @param {DOM~filterCallback} [filter] The filter function.
         * @param {DOM~filterCallback} [limit] The limit function.
         * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
         * @returns {Node[]} The matching nodes.
         */
        _nextAll(node, filter, limit, first = false) {
            const results = [];

            while (node = node.nextSibling) {
                if (!this.isElement(node)) {
                    continue;
                }

                if (limit && limit(node)) {
                    break;
                }

                if (filter && !filter(node)) {
                    continue;
                }

                results.push(node);

                if (first) {
                    break;
                }
            }

            return results;
        },

        /**
         * Return the previous sibling for a single element (optionally matching a filter).
         * @param {HTMLElement} node The input node.
         * @param {DOM~filterCallback} [filter] The filter function.
         * @returns {Node[]} The matching nodes.
         */
        _prev(node, filter) {
            const results = [];

            while (node = node.previousSibling) {
                if (this.isElement(node)) {
                    break;
                }
            }

            if (!node) {
                return results;
            }

            if (filter && !filter(node)) {
                return results;
            }

            results.push(node);

            return results;
        },

        /**
         * Return all previous siblings for a single element (optionally matching a filter, and before a limit).
         * @param {HTMLElement} node The input node.
         * @param {DOM~filterCallback} [filter] The filter function.
         * @param {DOM~filterCallback} [limit] The limit function.
         * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
         * @returns {Node[]} The matching nodes.
         */
        _prevAll(node, filter, limit, first = false) {
            const results = [];

            while (node = node.previousSibling) {
                if (!this.isElement(node)) {
                    continue;
                }

                if (limit && limit(node)) {
                    break;
                }

                if (filter && !filter(node)) {
                    continue;
                }

                results.push(node);

                if (first) {
                    break;
                }
            }

            return results;
        },

        /**
         * Return all siblings for a single element (optionally matching a filter).
         * @param {HTMLElement} node The input node.
         * @param {DOM~filterCallback} [filter] The filter function.
         * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
         * @returns {Node[]} The matching nodes.
         */
        _siblings(node, filter, elementsOnly = true) {
            const results = [];

            if (!node.parentNode) {
                return results;
            }

            const siblings = elementsOnly ?
                node.parentNode.children :
                node.parentNode.childNodes;

            let sibling;
            for (sibling of siblings) {
                if (DOM._isSame(node, sibling)) {
                    continue;
                }

                if (filter && !filter(sibling)) {
                    continue;
                }

                results.push(sibling);
            }

            return results;
        }

    });

    /**
     * DOM (Static) Utility
     */

    Object.assign(DOM, {

        /**
         * Return a single dimensional array of classes (from a multi-dimensional array or space-separated strings).
         * @param {array} classList The classes to parse.
         * @returns {string[]} The parsed classes.
         */
        _parseClasses(classList) {
            return classList
                .flat()
                .flatMap(val => val.split(' '));
        },

        /**
         * Return a data object from a key and value, or a data object.
         * @param {string|object} key The data key, or an object containing data.
         * @param {*} [value] The data value.
         * @returns {object} The data object.
         */
        _parseData(key, value) {
            return Core.isObject(key) ?
                key :
                { [key]: value };
        },

        /**
         * Return a "real" event from a namespaced event.
         * @param {string} event The namespaced event.
         * @returns {string} The real event.
         */
        _parseEvent(event) {
            return event.split('.')
                .shift();
        },

        /**
         * Return an array of events from a space-separated string.
         * @param {string} events The events.
         * @returns {array} The parsed events.
         */
        _parseEvents(events) {
            return events.split(' ');
        },

        /**
         * Return a FormData object from an array or object.
         * @param {array|object} data The input data.
         * @returns {FormData} The FormData object.
         */
        _parseFormData(data) {
            const formData = new FormData;

            if (Array.isArray(data)) {
                const obj = {};
                data.forEach(value => obj[value.name] = value.value);
                data = obj;
            }

            this._parseFormValues(data, formData);

            return formData;
        },

        /**
         * Recursively append an object to a FormData object.
         * @param {object} data The input object.
         * @param {FormData} formData The FormData object to append to.
         * @param {string} [prevKey] The previous key value.
         */
        _parseFormValues(data, formData, prevKey) {
            let key;
            for (key in data) {
                const value = data[key];

                if (prevKey) {
                    key = `${prevKey}[${key}]`;
                }

                if (Core.isPlainObject(value)) {
                    this._parseFormValues(value, formData, key);
                } else if (!Array.isArray(value)) {
                    formData.set(key, value);
                } else {
                    value.forEach(val =>
                        formData.append(key, val)
                    );
                }
            }
        },

        /**
         * Return a URI-encoded attribute string from an array or object.
         * @param {array|object} data The input data.
         * @returns {string} The URI-encoded attribute string.
         */
        _parseParams(data) {
            let values = [];

            if (Array.isArray(data)) {
                values = data.map(value =>
                    this._parseParam(
                        value.name,
                        value.value
                    )
                );
            } else if (Core.isObject(data)) {
                values = Object.keys(data)
                    .map(key =>
                        this._parseParam(key, data[key])
                    );
            }

            return values
                .flatMap(encodeURI)
                .join('&');
        },

        /**
         * Return a string attribute, or a flat array of attributes from a key and value.
         * @param {string} key The input key.
         * @param {array|object|string} value The input value.
         * @returns {string|array} The parsed attributes.
         */
        _parseParam(key, value) {
            if (Array.isArray(value)) {
                return value.map(val =>
                    this._parseParam(key, val)
                ).flat();
            }

            if (Core.isObject(value)) {
                return Object.keys(value)
                    .map(subKey =>
                        this._parseParam(
                            key + '[' + subKey + ']',
                            value[subKey]
                        )
                    ).flat();
            }

            return key + '=' + value;
        },

        /**
         * Return a prefixed selector string.
         * @param {string} selectors The input selectors.
         * @param {string} prefix The input prefix.
         * @returns {string} The prefixed selector.
         */
        _prefixSelectors(selectors, prefix) {
            return selectors.split(this.splitRegex)
                .filter(select => !!select)
                .map(select => `${prefix} ${select}`)
                .join(', ');
        }

    });

    /**
     * DOM AJAX
     */

    Object.assign(DOM.prototype, {

        /**
         * Perform an XHR request.
         * @param {object} [options] The options to use for the request.
         * @param {string} [options.url=window.location] The URL of the request.
         * @param {string} [options.method=GET] The HTTP method of the request.
         * @param {Boolean|string|array|object} [options.data=false] The data to send with the request.
         * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
         * @param {Boolean|string} [options.responseType] The content type of the response.
         * @param {Boolean} [options.cache=true] Whether to cache the request.
         * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
         * @param {object} [options.headers] Additional headers to send with the request.
         * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
         * @param {Boolean|function} [options.uploadProgress=false] A callback to execute on upload progress.
         * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
         */
        ajax(options) {
            const settings = {
                url: window.location,
                headers: {},
                ...DOM.ajaxDefaults,
                ...options
            };

            if (!settings.cache) {
                const url = new URL(settings.url);
                url.searchParams.append('_', Date.now());
                settings.url = url.toString();
            }

            if (settings.contentType && !settings.headers['Content-Type']) {
                settings.headers['Content-Type'] = settings.contentType;
            }

            if (!settings.headers['X-Requested-With']) {
                settings.headers['X-Requested-With'] = 'XMLHttpRequest';
            }

            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest;

                xhr.open(settings.method, settings.url, true);

                Object.keys(settings.headers)
                    .forEach(key =>
                        xhr.setRequestHeader(key, settings.headers[key])
                    );

                if (settings.responseType) {
                    xhr.responseType = settings.responseType;
                }

                xhr.onload = e => {
                    if (xhr.status > 400) {
                        reject({
                            status: xhr.status,
                            xhr: xhr,
                            event: e
                        });
                    } else {
                        resolve({
                            response: xhr.response,
                            xhr: xhr,
                            event: e
                        });
                    }
                };

                xhr.onerror = e =>
                    reject({
                        status: xhr.status,
                        xhr: xhr,
                        event: e
                    });

                if (settings.uploadProgress) {
                    xhr.upload.onprogress = e =>
                        settings.uploadProgress(e.loaded / e.total, xhr, e);
                }

                if (settings.beforeSend) {
                    settings.beforeSend(xhr);
                }

                if (settings.data && settings.processData) {
                    if (settings.contentType === 'application/json') {
                        settings.data = JSON.stringify(settings.data);
                    } else if (settings.contentType === 'application/x-www-form-urlencoded') {
                        settings.data = DOM._parseParams(settings.data);
                    } else {
                        options.data = DOM._parseFormData(options.data);
                    }
                }
                xhr.send(settings.data);
            });
        },

        /**
         * Perform an XHR GET request.
         * @param {string} url The URL of the request.
         * @param {object} [options] The options to use for the request.
         * @param {string} [options.method=GET] The HTTP method of the request.
         * @param {Boolean|string|array|object} [options.data=false] The data to send with the request.
         * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
         * @param {Boolean|string} [options.responseType] The content type of the response.
         * @param {Boolean} [options.cache=true] Whether to cache the request.
         * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
         * @param {object} [options.headers] Additional headers to send with the request.
         * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
         * @param {Boolean|function} [options.uploadProgress=false] A callback to execute on upload progress.
         * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
         */
        get(url, options) {
            return this.ajax({
                url,
                ...options
            });
        },

        /**
         * Perform an XHR POST request.
         * @param {string} url The URL of the request.
         * @param {Boolean|string|array|object} data The data to send with the request.
         * @param {object} [options] The options to use for the request.
         * @param {string} [options.method=POST] The HTTP method of the request.
         * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
         * @param {Boolean|string} [options.responseType] The content type of the response.
         * @param {Boolean} [options.cache=true] Whether to cache the request.
         * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
         * @param {object} [options.headers] Additional headers to send with the request.
         * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
         * @param {Boolean|function} [options.uploadProgress=false] A callback to execute on upload progress.
         * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
         */
        post(url, data, options) {
            return this.ajax({
                url,
                data,
                method: 'POST',
                ...options
            });
        },

        /**
         * Perform an XHR request for a file upload.
         * @param {object} [options] The options to use for the request.
         * @param {string} [options.url=window.location] The URL of the request.
         * @param {string} [options.method=POST] The HTTP method of the request.
         * @param {Boolean|string|array|object} [options.data=false] The data to send with the request.
         * @param {Boolean|string} [options.contentType=false] The content type of the request.
         * @param {Boolean|string} [options.responseType] The content type of the response.
         * @param {Boolean} [options.cache=true] Whether to cache the request.
         * @param {Boolean} [options.processData=false] Whether to process the data based on the content type.
         * @param {object} [options.headers] Additional headers to send with the request.
         * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
         * @param {Boolean|function} [options.uploadProgress=false] A callback to execute on upload progress.
         * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
         */
        upload(options) {
            return this.ajax({
                method: 'POST',
                contentType: false,
                ...options
            });
        },

        /**
         * Load and executes a JavaScript file.
         * @param {string} script The URL of the script.
         * @param {Boolean} [cache=true] Whether to cache the request.
         * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
         */
        loadScript(script, cache = true) {
            return this.ajax(script, { cache })
                .then(response =>
                    eval.apply(window, response.response)
                );
        },

        /**
         * Load and executes multiple JavaScript files (in order).
         * @param {string[]} scripts An array of script URLs.
         * @param {Boolean} [cache=true] Whether to cache the requests.
         * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
         */
        loadScripts(scripts, cache = true) {
            return Promise.all
                (
                    scripts.map(script =>
                        this.ajax(script, { cache })
                    )
                )
                .then(responses =>
                    responses.forEach(response =>
                        eval.apply(window, response.response)
                    )
                );
        },

        /**
         * Import a CSS Stylesheet file.
         * @param {string} stylesheet The URL of the stylesheet.
         * @param {Boolean} [cache=true] Whether to cache the request.
         * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
         */
        loadStyle(stylesheet, cache = true) {
            return this.ajax(stylesheet, { cache })
                .then(response =>
                    this.append(
                        this.findOne('head'),
                        this.create(
                            'style',
                            {
                                text: response.response
                            }
                        )
                    )
                );
        },

        /**
         * Import multiple CSS Stylesheet files.
         * @param {string[]} stylesheets An array of stylesheet URLs.
         * @param {Boolean} [cache=true] Whether to cache the requests.
         * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
         */
        loadStyles(stylesheets, cache = true) {
            return Promise.all
                (
                    stylesheets.map(stylesheet =>
                        this.ajax(stylesheet, { cache })
                    )
                )
                .then(responses =>
                    this.append(
                        this.findOne('head'),
                        this.create(
                            'style',
                            {
                                text: responses
                                    .map(response => response.response)
                                    .join("\r\n")
                            }
                        )
                    )
                );
        }

    });

    /**
     * DOM Cookie
     */

    Object.assign(DOM.prototype, {

        /**
         * Get a cookie value.
         * @param {string} name The cookie name.
         * @param {Boolean} [json=false] Whether the cookie value is in JSON.
         * @returns {*} The cookie value.
         */
        getCookie(name, json = false) {
            const cookie = decodeURIComponent(this.context.cookie)
                .split(';')
                .find(cookie =>
                    cookie.trimStart()
                        .substring(0, name.length) === name
                );

            if (!cookie) {
                return null;
            }

            const value = cookie.trimStart().
                substring(name.length + 1);

            return json ?
                JSON.parse(value) :
                value;
        },

        /**
         * Remove a cookie.
         * @param {string} name The cookie name.
         * @param {object} [options] The options to use for the cookie.
         * @param {number} [options.expires=-1] The number of seconds until the cookie will expire.
         * @param {string} [options.path] The cookie path.
         * @param {Boolean} [options.secure] Whether the cookie is secure.
         */
        removeCookie(name, options) {
            this.setCookie(
                name,
                '',
                {
                    expires: -1,
                    ...options
                }
            );
        },

        /**
         * Set a cookie value.
         * @param {string} name The cookie name.
         * @param {*} value The cookie value.
         * @param {object} [options] The options to use for the cookie.
         * @param {number} [options.expires] The number of seconds until the cookie will expire.
         * @param {string} [options.path] The path to use for the cookie.
         * @param {Boolean} [options.secure] Whether the cookie is secure.
         * @param {Boolean} [json=false] Whether to JSON encode the cookie value.
         */
        setCookie(name, value, options, json = false) {
            if (!name) {
                return;
            }

            if (json) {
                value = JSON.stringify(value);
            }

            let cookie = `${name}=${value}`;

            if (options) {
                if (options.expires) {
                    let date = new Date;
                    date.setTime(date.getTime() + (options.expires * 1000));
                    cookie += `;expires=${date.toUTCString()}`;
                }

                if (options.path) {
                    cookie += `;path=${options.path}`;
                }

                if (options.secure) {
                    cookie += ';secure';
                }
            }

            this.context.cookie = cookie;
        }

    });

    /**
     * DOM Event Factory
     */

    Object.assign(DOM.prototype, {

        /** 
         * Return a wrapped mouse drag event (optionally limited by animation frame).
         * @param {function} down The callback to execute on mousedown.
         * @param {function} move The callback to execute on mousemove.
         * @param {function} up The callback to execute on mouseup.
         * @param {Boolean} [animated=true] Whether to limit the move event by animation frame.
         * @returns {DOM~eventCallback} The mouse drag event callback.
         */
        mouseDragFactory(down, move, up, animated = true) {
            if (move && animated) {
                move = Core.animationFactory(move);

                // needed to make sure up callback executes after final move callback
                if (up) {
                    up = Core.animationFactory(up);
                }
            }

            return e => {
                if (down && down(e) === false) {
                    return false;
                }

                if (move) {
                    this._addEvent(window, 'mousemove', move);
                }

                if (move || up) {
                    this._addEventOnce(window, 'mouseup', e => {
                        if (move) {
                            this._removeEvent(window, 'mousemove', move);
                        }

                        if (up) {
                            up(e);
                        }
                    });
                }
            };
        },

        /**
         * Return a wrapped event callback that executes on a delegate selector.
         * @param {HTMLElement} node The input node.
         * @param {string} selector The delegate query selector.
         * @param {function} callback The event callback.
         * @returns {DOM~eventCallback} The delegated event callback.
         */
        _delegateFactory(node, selector, callback) {
            const getDelegate = selector.match(DOM.complexRegex) ?
                this._getDelegateContainsFactory(node, selector) :
                this._getDelegateMatchFactory(node, selector);

            return e => {
                if (DOM._isSame(e.target, node)) {
                    return;
                }

                const delegate = getDelegate(e.target);

                if (!delegate) {
                    return;
                }

                e.delegateTarget = delegate;

                return callback(e);
            };
        },

        /**
         * Return a function for matching a delegate target to a complex selector.
         * @param {HTMLElement} node The input node.
         * @param {string} selector The delegate query selector.
         * @returns {function} The callback for finding the matching delegate.
         */
        _getDelegateContainsFactory(node, selector) {
            selector = DOM._prefixSelectors(selectors, `#${DOM._tempId}`);

            return target => {
                const matches = Core.merge(
                    [],
                    DOM._findByCustom(selector, node)
                );

                if (!matches.length) {
                    return false;
                }

                if (matches.includes(target)) {
                    return target;
                }

                return DOM._parents(
                    target,
                    parent => matches.contains(parent),
                    parent => DOM._isSame(node, parent),
                    true
                ).shift();
            };
        },

        /**
         * Return a function for matching a delegate target to a standard selector.
         * @param {HTMLElement} node The input node.
         * @param {string} selector The delegate query selector.
         * @returns {function} The callback for finding the matching delegate.
         */
        _getDelegateMatchFactory(node, selector) {
            return target =>
                DOM._is(target, selector) ?
                    target :
                    DOM._parents(
                        target,
                        parent => DOM._is(parent, selector),
                        parent => DOM._isSame(node, parent),
                        true
                    ).shift();
        },

        /**
         * Return a wrapped event callback that removes itself after execution.
         * @param {HTMLElement|Document|Window} node The input node.
         * @param {string} events The event names.
         * @param {string} delegate The delegate selector.
         * @param {DOM~eventCallback} callback The callback to execute.
         */
        _selfDestructFactory(node, events, delegate, callback) {
            const realCallback = e => {
                delegate ?
                    this._removeEvent(node, events, callback, delegate) :
                    this._removeEvent(node, events, realCallback);
                return callback(e);
            };

            return realCallback;
        }

    });

    /**
     * DOM Filters
     */

    Object.assign(DOM.prototype, {

        /**
         * Return an element filter callback.
         * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
         * @returns {DOM~filterCallback} The element filter callback.
         */
        _parseFilter(filter) {
            if (!filter) {
                return false;
            }

            if (Core.isFunction(filter)) {
                return filter;
            }

            if (Core.isString(filter)) {
                return node =>
                    DOM.isElement(node) &&
                    DOM._is(node, filter);
            }

            if (DOM.isNode(filter)) {
                return node => DOM._isSame(node, filter);
            }

            filter = this._nodeFilter(filter);
            if (filter.length) {
                return node => filter.includes(node);
            }

            return false;
        },

        /**
         * Return an element contains filter callback.
         * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
         * @returns {DOM~filterCallback} The element contains filter callback.
         */
        _parseFilterContains(filter) {
            if (!filter) {
                return false;
            }

            if (Core.isFunction(filter)) {
                return filter;
            }

            if (Core.isString(filter)) {
                return node => !!this.findOne(filter, node);
            }

            if (DOM.isElement(filter)) {
                return node => DOM._has(node, filter);
            }

            filter = this._nodeFilter(filter);
            if (filter.length) {
                return node => !!filter.find(other => DOM._has(node, other));
            }

            return false;
        }

    });

    /**
     * DOM Nodes
     */

    Object.assign(DOM.prototype, {

        /**
         * Sorts nodes by their position in the document
         * @param {string|Node|NodeList|HTMLCollection|Document|Node[]} nodes The input node(s), or a query selector string.
         * @returns {Node[]} The sorted array of nodes.
         */
        sortNodes(nodes) {
            return this._nodeFilter(nodes, DOM.isNode)
                .sort(DOM._compareNodes);
        },

        /**
         * Return a filtered array of nodes.
         * @param {string|Node|NodeList|HTMLCollection|Document|Node[]} nodes The input node(s), or a query selector string.
         * @param {DOM~filterCallback} [filter=DOM.isElement] The filter callback.
         * @returns {Node[]} The filtered array of nodes.
         */
        _nodeFilter(nodes, filter = DOM.isElement) {
            if (Core.isString(nodes)) {
                return this.find(nodes)
                    .filter(filter);
            }

            if (filter(nodes)) {
                return [nodes];
            }

            return Core.wrap(nodes)
                .filter(filter);
        },

        /**
         * Return the first node matching a filter.
         * @param {string|Node|NodeList|HTMLCollection|Document|Node[]} nodes The input node(s), or a query selector string.
         * @param {DOM~filterCallback} [filter=DOM.isElement] The filter callback.
         * @returns {Node} The matching node.
         */
        _nodeFind(nodes, filter = DOM.isElement) {
            if (Core.isString(nodes)) {
                const node = this.findOne(nodes);
                if (filter(node)) {
                    return node;
                }

                return null;
            }

            const node = Core.wrap(nodes).shift();

            if (filter(node)) {
                return node;
            }

            return null;
        },

        /**
         * Return a filtered array of nodes from a query.
         * @param {string|Node|NodeList|HTMLCollection|Document|Node[]} nodes The input node(s), or a query selector or HTML string.
         * @param {DOM~filterCallback} [filter=DOM.isElement] The filter callback.
         * @returns {Node[]} The filtered array of nodes.
         */
        _parseQuery(query = '*', filter = DOM.isElement) {
            if (Core.isString(query) && query.trim().charAt(0) === '<') {
                return this.parseHTML(query);
            }

            return this._nodeFilter(query, filter);
        }

    });

    /**
     * DOM Parsers
     */

    Object.assign(DOM.prototype, {

        /**
         * Create an Array containing nodes parsed from a HTML string.
         * @param {string} html The HTML input string.
         * @returns {array} An array of nodes.
         */
        parseHTML(html) {
            return Core.merge(
                [],
                this.context
                    .createRange()
                    .createContextualFragment(html)
                    .childNodes
            );
        }

    });

    /**
     * DOM (Static) Properties
     */

    Object.assign(DOM, {

        // Default AJAX options
        ajaxDefaults: {
            beforeSend: false,
            cache: true,
            contentType: 'application/x-www-form-urlencoded',
            data: false,
            method: 'GET',
            processData: true
        },

        // Default animation options
        animationDefaults: {
            duration: 1000,
            type: 'ease-in-out',
            infinite: false
        },

        // CSS properties that can have number-only values
        cssNumberProperties: [
            'font-weight',
            'line-height',
            'opacity',
            'orphans',
            'widows',
            'z-index'
        ],

        // Complex selector RegEX
        complexRegex: /(?:^\s*[\>\+\~]|\,(?=(?:(?:[^"']*["']){2})*[^"']*$)\s*[\>\+\~])/,

        // Fast selector RegEx
        fastRegex: /^([\#\.]?)([\w\-]+)$/,

        // Comma seperated selector RegEx
        splitRegex: /\,(?=(?:(?:[^"]*"){2})*[^"]*$)\s*/,

        // Temporary ID
        tempId: 'frost' + (Date.now().toString(16))

    });

    return {
        DOM,
        dom: new DOM
    };

});