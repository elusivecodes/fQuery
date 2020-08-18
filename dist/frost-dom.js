/**
 * FrostDOM v1.0.4
 * https://github.com/elusivecodes/FrostDOM
 */
(function(global, factory) {
    'use strict';

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory;
    } else {
        Object.assign(global, factory(global));
    }

})(this || window, function(window) {
    'use strict';

    if (!window) {
        throw new Error('FrostDOM requires a Window.');
    }

    if (!('Core' in window)) {
        throw new Error('FrostDOM requires FrostCore.');
    }

    const Core = window.Core;
    const document = window.document;

    /**
     * AjaxRequest Class
     * @class
     */
    class AjaxRequest {

        /**
         * New AjaxRequest constructor.
         * @param {object} [options] The options to use for the request.
         * @param {string} [options.url=window.location] The URL of the request.
         * @param {string} [options.method=GET] The HTTP method of the request.
         * @param {Boolean|string|array|object|FormData} [options.data=null] The data to send with the request.
         * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
         * @param {Boolean|string} [options.responseType] The content type of the response.
         * @param {string} [options.mimeType] The MIME type to use.
         * @param {string} [options.username] The username to authenticate with.
         * @param {string} [options.password] The password to authenticate with.
         * @param {number} [options.timeout] The number of milliseconds before the request will be terminated.
         * @param {Boolean} [options.isLocal] Whether to treat the request as a local request.
         * @param {Boolean} [options.cache=true] Whether to cache the request.
         * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
         * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
         * @param {object} [options.headers] Additional headers to send with the request.
         * @param {Boolean|function} [options.afterSend=null] A callback to execute after making the request.
         * @param {Boolean|function} [options.beforeSend=null] A callback to execute before making the request.
         * @param {Boolean|function} [options.onProgress=null] A callback to execute on download progress.
         * @param {Boolean|function} [options.onUploadProgress=null] A callback to execute on upload progress.
         * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
         */
        constructor(options) {
            this._options = Core.extend(
                {},
                this.constructor.defaults,
                options
            );

            if (!this._options.url) {
                this._options.url = window.location.href;
            }

            if (!this._options.cache) {
                this._options.url = this.constructor.appendQueryString(this._options.url, '_', Date.now());
            }

            if (!('Content-Type' in this._options.headers) && this._options.contentType) {
                this._options.headers['Content-Type'] = this._options.contentType;
            }

            if (this._options.isLocal === null) {
                this._options.isLocal = this.constructor._localRegExp.test(location.protocol);
            }

            if (!this._options.isLocal && !('X-Requested-With' in this._options.headers)) {
                this._options.headers['X-Requested-With'] = 'XMLHttpRequest';
            }

            this._isResolved = false;
            this._isRejected = false;
            this._isCancelled = false;

            this.promise = new Promise((resolve, reject) => {
                this._resolve = value => {
                    this._isResolved = true;
                    resolve(value);
                };

                this._reject = error => {
                    this._isRejected = true;
                    reject(error);
                };
            });

            this._build();
            this._events();
            this._send();
        }

        /**
         * Cancel a pending request.
         * @param {string} [reason=Request was cancelled] The reason for cancelling the request.
         */
        cancel(reason = 'Request was cancelled') {
            if (this._isResolved || this._isRejected || this._isCancelled) {
                return;
            }

            this._xhr.abort();

            this._isCancelled = true;

            if (this._options.rejectOnCancel) {
                this._reject({
                    status: this._xhr.status,
                    xhr: this._xhr,
                    reason
                });
            }
        }

        /**
         * Execute a callback if the request is rejected.
         * @param {function} [onRejected] The callback to execute if the request is rejected.
         * @returns {Promise} The promise.
         */
        catch(onRejected) {
            return this.promise.catch(onRejected);
        }

        /**
         * Execute a callback once the request is settled (resolved or rejected).
         * @param {function} [onRejected] The callback to execute once the request is settled.
         * @returns {Promise} The promise.
         */
        finally(onFinally) {
            return this.promise.finally(onFinally);
        }

        /**
         * Execute a callback once the request is resolved (or optionally rejected).
         * @param {function} onFulfilled The callback to execute if the request is resolved.
         * @param {function} [onRejected] The callback to execute if the request is rejected.
         * @returns {Promise} The promise.
         */
        then(onFulfilled, onRejected) {
            return this.promise.then(onFulfilled, onRejected);
        }

    }

    /**
     * MockXMLHttpRequest Class
     * @class
     */
    class MockXMLHttpRequest {

        /**
         * New MockXMLHttpRequest constructor.
         * @returns {MockXMLHttpRequest} A new MockXMLHttpRequest.
         */
        constructor() {
            this.data = {
                headers: {}
            };
            this.status = 200;
            this.timeout = 0;
            this.upload = {};
            this._response = 'Test';
        }

        /**
         * Abort the request if it has already been sent.
         */
        abort() {
            clearTimeout(this._uploadTimer);
            clearTimeout(this._progressTimer);
            clearTimeout(this._completeTimer);
        }

        /**
         * Initialize a request.
         * @param {string} method The request method.
         * @param {string} url The URL to send the request to.
         * @param {Boolean} [async=true] Whether to perform the request asynchronously.
         * @param {string} [username] The username to authenticate with.
         * @param {string} [password] The password to authenticate with.
         */
        open(method, url, async = true, username = undefined, password = undefined) {
            this.data.method = method;
            this.data.url = url;
            this.data.async = async;
            this.data.username = username;
            this.data.password = password;
        }

        /**
         * Override the MIME type sent by the server.
         * @param {string} mimeType The MIME type to use.
         */
        overrideMimeType(mimeType) {
            this.data.mimeType = mimeType;
        }

        /**
         * Send the request.
         * @param {*} [data=null] Data to send with the request.
         */
        send(data = null) {
            this.data.body = data;

            if (this.responseType) {
                this.data.responseType = this.responseType;
            }

            if (this.timeout) {
                this.data.timeout = this.timeout;
            }

            if (this.upload && this.upload.onprogress) {
                this._uploadTimer = setTimeout(_ => {
                    this._uploadTimer = null;

                    const progressEvent = new Event('progress');
                    progressEvent.loaded = 5000;
                    progressEvent.total = 10000;

                    this.upload.onprogress(progressEvent);
                }, 10);
            }

            if (this.onprogress) {
                this._progressTimer = setTimeout(_ => {
                    this._progressTimer = null;

                    const progressEvent = new Event('progress');
                    progressEvent.loaded = 500;
                    progressEvent.total = 1000;

                    this.onprogress(progressEvent);
                }, 10);
            }

            this._completeTimer = setTimeout(_ => {
                this._completeTimer = null;

                if (this.forceError) {
                    if (this.onerror) {
                        const errorEvent = new Event('error');
                        this.onerror(errorEvent);
                    }
                    return;
                }

                this.data.status = this.status;
                this.response = this._response;

                if (this.onload) {
                    const loadEvent = new Event('load');
                    this.onload(loadEvent);
                }
            }, 20);
        }

        /**
         * Set a value of a HTTP request header.
         * @param {string} header The header to set.
         * @param {string} value The value to set.
         */
        setRequestHeader(header, value) {
            this.data.headers[header] = value;
        }

    }

    /**
     * AjaxRequest Helpers
     */

    Object.assign(AjaxRequest.prototype, {

        /**
         * Build the XHR request object.
         */
        _build() {
            this._xhr = this.constructor.useMock ?
                new MockXMLHttpRequest :
                new XMLHttpRequest;

            this._xhr.open(this._options.method, this._options.url, true, this._options.username, this._options.password);

            for (const key in this._options.headers) {
                this._xhr.setRequestHeader(key, this._options.headers[key]);
            }

            if (this._options.responseType) {
                this._xhr.responseType = this._options.responseType;
            }

            if (this._options.mimeType) {
                this._xhr.overrideMimeType(this._options.mimeType);
            }

            if (this._options.timeout) {
                this._xhr.timeout = this._options.timeout;
            }
        },

        /**
         * Attach events to the XHR request object.
         */
        _events() {
            this._xhr.onload = e => {
                if (this._xhr.status > 400) {
                    this._reject({
                        status: this._xhr.status,
                        xhr: this._xhr,
                        event: e
                    });
                } else {
                    this._resolve({
                        response: this._xhr.response,
                        xhr: this._xhr,
                        event: e
                    });
                }
            };

            if (!this._isLocal) {
                this._xhr.onerror = e =>
                    this._reject({
                        status: this._xhr.status,
                        xhr: this._xhr,
                        event: e
                    });
            }

            if (this._options.onProgress) {
                this._xhr.onprogress = e =>
                    this._options.onProgress(e.loaded / e.total, this._xhr, e);
            }

            if (this._options.onUploadProgress) {
                this._xhr.upload.onprogress = e =>
                    this._options.onUploadProgress(e.loaded / e.total, this._xhr, e);
            }
        },

        /**
         * Process the data and send the XHR request.
         */
        _send() {
            if (this._options.beforeSend) {
                this._options.beforeSend(this._xhr);
            }

            if (this._options.data && this._options.processData && Core.isObject(this._options.data)) {
                if (this._options.contentType === 'application/json') {
                    this._options.data = JSON.stringify(this._options.data);
                } else if (this._options.contentType === 'application/x-www-form-urlencoded') {
                    this._options.data = this.constructor._parseParams(this._options.data);
                } else {
                    this._options.data = this.constructor._parseFormData(this._options.data);
                }
            }

            this._xhr.send(this._options.data);

            if (this._options.afterSend) {
                this._options.afterSend(this._xhr);
            }
        }

    });


    /**
     * AjaxRequest (Static) Helpers
     */

    Object.assign(AjaxRequest, {

        /**
         * Append a query string to a URL.
         * @param {string} url The input URL.
         * @param {string} key The query string key.
         * @param {string} value The query string value.
         * @returns {string} The new URL.
         */
        appendQueryString(url, key, value) {
            const baseHref = (window.location.origin + window.location.pathname).replace(/\/$/, '');
            const urlData = new URL(url, baseHref);
            urlData.searchParams.append(key, value);
            let newUrl = urlData.toString();

            if (newUrl.substring(0, url.length) === url) {
                return newUrl;
            }

            const pos = newUrl.indexOf(url);
            return newUrl.substring(pos);
        },

        /**
         * Return a FormData object from an array or object.
         * @param {array|object} data The input data.
         * @returns {FormData} The FormData object.
         */
        _parseFormData(data) {
            const values = this._parseValues(data);

            const formData = new FormData;

            for (const [key, value] of values) {
                if (key.substring(key.length - 2) === '[]') {
                    formData.append(key, value);
                } else {
                    formData.set(key, value);
                }
            }

            return formData;
        },

        /**
         * Return a URI-encoded attribute string from an array or object.
         * @param {array|object} data The input data.
         * @returns {string} The URI-encoded attribute string.
         */
        _parseParams(data) {
            const values = this._parseValues(data);

            const paramString = values
                .map(([key, value]) => `${key}=${value}`)
                .join('&');

            return encodeURI(paramString);
        },

        /**
         * Return an attributes array, or a flat array of attributes from a key and value.
         * @param {string} key The input key.
         * @param {array|object|string} value The input value.
         * @returns {array} The parsed attributes.
         */
        _parseValue(key, value) {
            if (Core.isArray(value)) {
                if (key.substring(key.length - 2) !== '[]') {
                    key += '[]';
                }

                const values = [];
                for (const val of value) {
                    values.push(
                        ...this._parseValue(key, val)
                    );
                }

                return values;
            }

            if (Core.isObject(value)) {
                const values = [];
                for (const subKey in value) {
                    values.push(
                        ...this._parseValue(
                            `${key}[${subKey}]`,
                            value[subKey]
                        )
                    );
                }

                return values;
            }

            return [[key, value]];
        },

        /**
         * Return an attributes array from a data array or data object.
         * @param {array|object} data The input data.
         * @returns {array} The parsed attributes.
         */
        _parseValues(data) {

            if (Core.isArray(data)) {
                const values = [];

                for (const value of data) {
                    values.push(
                        ...this._parseValue(
                            value.name,
                            value.value
                        )
                    )
                }

                return values;
            }

            if (Core.isObject(data)) {
                const values = [];

                for (const key in data) {
                    values.push(
                        ...this._parseValue(
                            key,
                            data[key]
                        )
                    );
                }

                return values;
            }

            return data;
        }

    });

    /**
     * AjaxRequest (Static) Properties
     */

    Object.assign(AjaxRequest, {

        // AjaxRequest defaults
        defaults: {
            afterSend: null,
            beforeSend: null,
            cache: true,
            contentType: 'application/x-www-form-urlencoded',
            data: null,
            headers: {},
            isLocal: null,
            method: 'GET',
            onProgress: null,
            onUploadProgress: null,
            processData: true,
            rejectOnCancel: true,
            responseType: null,
            url: null
        },

        // Use mock
        useMock: false,

        // Local protocol test
        _localRegExp: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/

    });

    // Set the AjaxRequest prototype
    Object.setPrototypeOf(AjaxRequest.prototype, Promise.prototype);

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

    /**
    * AnimationSet Class
    * @class
    */
    class AnimationSet {

        /**
         * New AnimationSet constructor.
         * @param {array} animations The animations.
         */
        constructor(animations) {
            this._animations = animations;
            this.promise = Promise.all(animations);
        }

        /**
         * Execute a callback if any of the animations is rejected.
         * @param {function} [onRejected] The callback to execute if an animation is rejected.
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
         * Stop the animations.
         * @param {Boolean} [finish=true] Whether to finish the animations.
        */
        stop(finish = true) {
            for (const animation of this._animations) {
                animation.stop(finish);
            }
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

    }

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

    /**
     * Animation (Static) Properties
     */

    Object.assign(Animation, {

        // Animation defaults
        defaults: {
            duration: 1000,
            type: 'ease-in-out',
            infinite: false,
            debug: false
        },

        // Use timeout
        useTimeout: false,

        // Animating flag
        _animating: false,

        // Current animations
        _animations: new Map()

    });

    // Set the Animation prototype
    Object.setPrototypeOf(Animation.prototype, Promise.prototype);

    // Set the AnimationSet prototype
    Object.setPrototypeOf(AnimationSet.prototype, Promise.prototype);

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
            if (!(Core.isDocument(context))) {
                throw new Error('Invalid document');
            }

            this._context = context;
        }

    }

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
         * @param {Boolean} [options.debug] Whether to set debugging info on the node.
         * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
         */
        animate(nodes, callback, options) {
            nodes = this.parseNodes(nodes);

            const animations = nodes.map(node =>
                new Animation(node, callback, options)
            );

            Animation.start();

            return new AnimationSet(animations);
        },

        /**
         * Stop all animations for each node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {Boolean} [finish=true] Whether to complete all current animations.
         */
        stop(nodes, finish = true) {
            nodes = this.parseNodes(nodes);

            for (const node of nodes) {
                Animation.stop(node, finish);
            }
        }

    });

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
         * @param {Boolean} [options.debug] Whether to set debugging info on the node.
         * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
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
         * @param {Boolean} [options.debug] Whether to set debugging info on the node.
         * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
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
         * @param {Boolean} [options.debug] Whether to set debugging info on the node.
         * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
         */
        fadeIn(nodes, options) {
            return this.animate(
                nodes,
                (node, progress) =>
                    node.style.setProperty(
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
         * @param {Boolean} [options.debug] Whether to set debugging info on the node.
         * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
         */
        fadeOut(nodes, options) {
            return this.animate(
                nodes,
                (node, progress) =>
                    node.style.setProperty(
                        'opacity',
                        progress < 1 ?
                            (1 - progress).toFixed(2) :
                            ''
                    ),
                options
            );
        },

        /**
         * Rotate each node in on an X, Y or Z.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {object} [options] The options to use for animating.
         * @param {number} [options.x=0] The amount to rotate on the X-axis.
         * @param {number} [options.y=1] The amount to rotate on the Y-axis.
         * @param {number} [options.z=1] The amount to rotate on the Z-axis.
         * @param {Boolean} [options.inverse] Whether to invert the rotation.
         * @param {number} [options.duration=1000] The duration of the animation.
         * @param {string} [options.type=ease-in-out] The type of animation.
         * @param {Boolean} [options.infinite] Whether the animation should run forever.
         * @param {Boolean} [options.debug] Whether to set debugging info on the node.
         * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
         */
        rotateIn(nodes, options) {
            return this.animate(
                nodes,
                (node, progress, options) => {
                    const amount = ((90 - (progress * 90)) * (options.inverse ? -1 : 1)).toFixed(2);
                    node.style.setProperty(
                        'transform',
                        progress < 1 ?
                            `rotate3d(${options.x}, ${options.y}, ${options.z}, ${amount}deg)` :
                            ''
                    );
                },
                {
                    x: 0,
                    y: 1,
                    z: 0,
                    ...options
                }
            );
        },

        /**
         * Rotate each node out on an X, Y or Z.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {object} [options] The options to use for animating.
         * @param {number} [options.x=0] The amount to rotate on the X-axis.
         * @param {number} [options.y=1] The amount to rotate on the Y-axis.
         * @param {number} [options.z=1] The amount to rotate on the Z-axis.
         * @param {Boolean} [options.inverse] Whether to invert the rotation.
         * @param {number} [options.duration=1000] The duration of the animation.
         * @param {string} [options.type=ease-in-out] The type of animation.
         * @param {Boolean} [options.infinite] Whether the animation should run forever.
         * @param {Boolean} [options.debug] Whether to set debugging info on the node.
         * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
         */
        rotateOut(nodes, options) {
            return this.animate(
                nodes,
                (node, progress, options) => {
                    const amount = ((progress * 90) * (options.inverse ? -1 : 1)).toFixed(2);
                    node.style.setProperty(
                        'transform',
                        progress < 1 ?
                            `rotate3d(${options.x}, ${options.y}, ${options.z}, ${amount}deg)` :
                            ''
                    );
                },
                {
                    x: 0,
                    y: 1,
                    z: 0,
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
         * @param {Boolean} [options.debug] Whether to set debugging info on the node.
         * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
         */
        slideIn(nodes, options) {
            return this.animate(
                nodes,
                (node, progress, options) => {
                    if (progress === 1) {
                        node.style.setProperty('overflow', '');
                        if (options.useGpu) {
                            node.style.setProperty('transform', '');
                        } else {
                            node.style.setProperty('margin-left', '');
                            node.style.setProperty('margin-top', '');
                        }
                        return;
                    }

                    const dir = Core.evaluate(options.direction);

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
                        node.style.setProperty('transform', `translate${translateStyle}(${translateAmount}px)`);
                    } else {
                        node.style.setProperty(translateStyle, `${translateAmount}px`);
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
         * @param {Boolean} [options.debug] Whether to set debugging info on the node.
         * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
         */
        slideOut(nodes, options) {
            return this.animate(
                nodes,
                (node, progress, options) => {
                    if (progress === 1) {
                        node.style.setProperty('overflow', '');
                        if (options.useGpu) {
                            node.style.setProperty('transform', '');
                        } else {
                            node.style.setProperty('margin-left', '');
                            node.style.setProperty('margin-top', '');
                        }
                        return;
                    }

                    const dir = Core.evaluate(options.direction);

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
                        node.style.setProperty('transform', `translate${translateStyle}(${translateAmount}px)`);
                    } else {
                        node.style.setProperty(translateStyle, `${translateAmount}px`);
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
         * @param {Boolean} [options.debug] Whether to set debugging info on the node.
         * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
         */
        squeezeIn(nodes, options) {
            nodes = this.parseNodes(nodes);

            options = {
                direction: 'bottom',
                useGpu: true,
                ...options
            };

            const animations = nodes.map(node => {
                const initialHeight = node.style.height;
                const initialWidth = node.style.width;
                node.style.setProperty('overflow', 'hidden');

                return new Animation(
                    node,
                    (node, progress, options) => {
                        node.style.setProperty('height', initialHeight);
                        node.style.setProperty('width', initialWidth);

                        if (progress === 1) {
                            node.style.setProperty('overflow', '');
                            if (options.useGpu) {
                                node.style.setProperty('transform', '');
                            } else {
                                node.style.setProperty('margin-left', '');
                                node.style.setProperty('margin-top', '');
                            }
                            return;
                        }

                        const dir = Core.evaluate(options.direction);

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

                        node.style.setProperty(sizeStyle, `${amount}px`);

                        if (translateStyle) {
                            const translateAmount = (size - amount).toFixed(2);
                            if (options.useGpu) {
                                node.style.setProperty('transform', `translate${translateStyle}(${translateAmount}px)`);
                            } else {
                                node.style.setProperty(translateStyle, `${translateAmount}px`);
                            }
                        }
                    },
                    options
                );
            });

            Animation.start();

            return new AnimationSet(animations);
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
         * @param {Boolean} [options.debug] Whether to set debugging info on the node.
         * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
         */
        squeezeOut(nodes, options) {
            nodes = this.parseNodes(nodes);

            options = {
                direction: 'bottom',
                useGpu: true,
                ...options
            };

            const animations = nodes.map(node => {
                const initialHeight = node.style.height;
                const initialWidth = node.style.width;
                node.style.setProperty('overflow', 'hidden');

                return new Animation(
                    node,
                    (node, progress, options) => {
                        node.style.setProperty('height', initialHeight);
                        node.style.setProperty('width', initialWidth);

                        if (progress === 1) {
                            node.style.setProperty('overflow', '');
                            if (options.useGpu) {
                                node.style.setProperty('transform', '');
                            } else {
                                node.style.setProperty('margin-left', '');
                                node.style.setProperty('margin-top', '');
                            }
                            return;
                        }

                        const dir = Core.evaluate(options.direction);

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

                        node.style.setProperty(sizeStyle, `${amount}px`);

                        if (translateStyle) {
                            const translateAmount = (size - amount).toFixed(2);
                            if (options.useGpu) {
                                node.style.setProperty('transform', `translate${translateStyle}(${translateAmount}px)`);
                            } else {
                                node.style.setProperty(translateStyle, `${translateAmount}px`);
                            }
                        }
                    },
                    options
                );
            });

            Animation.start();

            return new AnimationSet(animations);
        }

    });

    /**
     * DOM Queue
     */

    Object.assign(DOM.prototype, {

        /**
         * Clear the queue of each node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         */
        clearQueue(nodes) {
            nodes = this.parseNodes(nodes);

            for (const node of nodes) {
                this.constructor._clearQueue(node);
            }
        },

        /**
         * Queue a callback on each node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {DOM~queueCallback} callback The callback to queue.
         */
        queue(nodes, callback) {
            nodes = this.parseNodes(nodes);

            for (const node of nodes) {
                this.constructor._queue(node, callback);
            }
        }

    });

    /**
     * DOM Attributes
     */

    Object.assign(DOM.prototype, {

        /**
         * Get attribute value(s) for the first node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} [attribute] The attribute name.
         * @returns {string|object} The attribute value, or an object containing attributes.
         */
        getAttribute(nodes, attribute) {
            const node = this.parseNode(nodes);

            if (!node) {
                return;
            }

            return this.constructor._getAttribute(node, attribute);
        },

        /**
         * Get dataset value(s) for the first node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} [key] The dataset key.
         * @returns {*} The dataset value, or an object containing the dataset.
         */
        getDataset(nodes, key) {
            const node = this.parseNode(nodes);

            if (!node) {
                return;
            }

            return this.constructor._getDataset(node, key);
        },

        /**
         * Get the HTML contents of the first node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {string} The HTML contents.
         */
        getHTML(nodes) {
            return this.getProperty(nodes, 'innerHTML');
        },

        /**
         * Get a property value for the first node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} property The property name.
         * @returns {string} The property value.
         */
        getProperty(nodes, property) {
            const node = this.parseNode(nodes);

            if (!node) {
                return;
            }

            return node[property];
        },

        /**
         * Get the text contents of the first node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {string} The text contents.
         */
        getText(nodes) {
            return this.getProperty(nodes, 'innerText');
        },

        /**
         * Get the value property of the first node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {string} The value.
         */
        getValue(nodes) {
            return this.getProperty(nodes, 'value');
        },

        /**
         * Remove an attribute from each node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} attribute The attribute name.
         */
        removeAttribute(nodes, attribute) {
            nodes = this.parseNodes(nodes);

            for (const node of nodes) {
                node.removeAttribute(attribute);
            }
        },

        /**
         * Remove a dataset value from each node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} key The dataset key.
         */
        removeDataset(nodes, key) {
            nodes = this.parseNodes(nodes);

            for (const node of nodes) {
                this.constructor._removeDataset(node, key);
            }
        },

        /**
         * Remove a property from each node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} property The property name.
         */
        removeProperty(nodes, property) {
            nodes = this.parseNodes(nodes);

            for (const node of nodes) {
                delete node[property];
            }
        },

        /**
         * Set an attribute value for each node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|object} attribute The attribute name, or an object containing attributes.
         * @param {string} [value] The attribute value.
         */
        setAttribute(nodes, attribute, value) {
            nodes = this.parseNodes(nodes);

            const attributes = this.constructor._parseData(attribute, value);

            for (const node of nodes) {
                this.constructor._setAttribute(node, attributes);
            }
        },

        /**
         * Set a dataset value for each node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|object} key The dataset key, or an object containing dataset values.
         * @param {*} [value] The dataset value.
         */
        setDataset(nodes, key, value) {
            nodes = this.parseNodes(nodes);

            const dataset = this.constructor._parseData(key, value, true);

            for (const node of nodes) {
                this.constructor._setDataset(node, dataset);
            }
        },

        /**
         * Set the HTML contents of each node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} html The HTML contents.
         */
        setHTML(nodes, html) {
            this.empty(nodes);

            this.setProperty(nodes, 'innerHTML', html);
        },

        /**
         * Set a property value for each node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|object} property The property name, or an object containing properties.
         * @param {string} [value] The property value.
         */
        setProperty(nodes, property, value) {
            nodes = this.parseNodes(nodes);

            const properties = this.constructor._parseData(property, value);

            for (const node of nodes) {
                for (const property in properties) {
                    node[property] = properties[property];
                }
            }
        },

        /**
         * Set the text contents of each node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} text The text contents.
         */
        setText(nodes, text) {
            this.empty(nodes);

            this.setProperty(nodes, 'innerText', text);
        },

        /**
         * Set the value property of each node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} value The value.
         */
        setValue(nodes, value) {
            this.setProperty(nodes, 'value', value);
        }

    });

    /**
     * DOM Data
     */

    Object.assign(DOM.prototype, {

        /**
         * Clone custom data from each node to each other node.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
         */
        cloneData(nodes, others) {
            nodes = this.parseNodes(nodes, {
                fragment: true,
                shadow: true,
                document: true,
                window: true
            });

            others = this.parseNodes(others, {
                fragment: true,
                shadow: true,
                document: true,
                window: true
            });

            for (const node of nodes) {
                for (const other of others) {
                    this.constructor._cloneData(node, other);
                }
            }
        },

        /**
         * Get custom data for the first node.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} [key] The data key.
         * @returns {*} The data value.
         */
        getData(nodes, key) {
            const node = this.parseNode(nodes, {
                fragment: true,
                shadow: true,
                document: true,
                window: true
            });

            if (!node) {
                return;
            }

            return this.constructor._getData(node, key);
        },

        /**
         * Remove custom data from each node.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} [key] The data key.
         */
        removeData(nodes, key) {
            nodes = this.parseNodes(nodes, {
                fragment: true,
                shadow: true,
                document: true,
                window: true
            });

            for (const node of nodes) {
                this.constructor._removeData(node, key);
            }
        },

        /**
         * Set custom data for each node.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|object} key The data key, or an object containing data.
         * @param {*} [value] The data value.
         */
        setData(nodes, key, value) {
            nodes = this.parseNodes(nodes, {
                fragment: true,
                shadow: true,
                document: true,
                window: true
            });

            const data = this.constructor._parseData(key, value);

            for (const node of nodes) {
                this.constructor._setData(node, data);
            }
        }

    });

    /**
     * DOM Position
     */

    Object.assign(DOM.prototype, {

        /**
         * Get the X,Y co-ordinates for the center of the first node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
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
         * Contrain each node to a container node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} container The container node, or a query selector string.
         */
        constrain(nodes, container) {
            const containerBox = this.rect(container);

            if (!containerBox) {
                return;
            }

            nodes = this.parseNodes(nodes);

            for (const node of nodes) {
                this.constructor._constrain(node, containerBox);
            }
        },

        /**
         * Get the distance of a node to an X,Y position in the Window.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
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

            return Core.dist(nodeCenter.x, nodeCenter.y, x, y);
        },

        /**
         * Get the distance between two nodes.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} others The node to compare, or a query selector string.
         * @returns {number} The distance between the nodes.
         */
        distToNode(nodes, others) {
            const otherCenter = this.center(others);

            if (!otherCenter) {
                return;
            }

            return this.distTo(nodes, otherCenter.x, otherCenter.y);
        },

        /**
         * Get the nearest node to an X,Y position in the Window.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {number} x The X co-ordinate.
         * @param {number} y The Y co-ordinate.
         * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
         * @returns {HTMLElement} The nearest node.
         */
        nearestTo(nodes, x, y, offset) {
            let closest,
                closestDistance = Number.MAX_VALUE;

            nodes = this.parseNodes(nodes);

            for (const node of nodes) {
                const dist = this.distTo(node, x, y, offset);
                if (dist && dist < closestDistance) {
                    closestDistance = dist;
                    closest = node;
                }
            }

            return closest;
        },

        /**
         * Get the nearest node to another node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} others The node to compare, or a query selector string.
         * @returns {HTMLElement} The nearest node.
         */
        nearestToNode(nodes, others) {
            const otherCenter = this.center(others);

            if (!otherCenter) {
                return;
            }

            return this.nearestTo(nodes, otherCenter.x, otherCenter.y);
        },

        /**
         * Get the percentage of an X co-ordinate relative to a node's width.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {number} x The X co-ordinate.
         * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
         * @param {Boolean} [clamp=true] Whether to clamp the percent between 0 and 100.
         * @returns {number} The percent.
         */
        percentX(nodes, x, offset, clamp = true) {
            const nodeBox = this.rect(nodes, offset);

            if (!nodeBox) {
                return;
            }

            const percent = (x - nodeBox.left)
                / nodeBox.width
                * 100;

            return clamp ?
                Core.clampPercent(percent) :
                percent;
        },

        /**
         * Get the percentage of a Y co-ordinate relative to a node's height.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {number} y The Y co-ordinate.
         * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
         * @param {Boolean} [clamp=true] Whether to clamp the percent between 0 and 100.
         * @returns {number} The percent.
         */
        percentY(nodes, y, offset, clamp = true) {
            const nodeBox = this.rect(nodes, offset);

            if (!nodeBox) {
                return;
            }

            const percent = (y - nodeBox.top)
                / nodeBox.height
                * 100;

            return clamp ?
                Core.clampPercent(percent) :
                percent;
        },

        /**
         * Get the position of the first node relative to the Window or Document.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
         * @returns {object} An object with the X and Y co-ordinates.
         */
        position(nodes, offset) {
            const node = this.parseNode(nodes);

            if (!node) {
                return;
            }

            return this.constructor._position(node, offset);
        },

        /**
         * Get the computed bounding rectangle of the first node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
         * @returns {DOMRect} The computed bounding rectangle.
         */
        rect(nodes, offset) {
            const node = this.parseNode(nodes);

            if (!node) {
                return;
            }

            return this.constructor._rect(node, offset);
        }

    });

    /**
     * DOM Scroll
     */

    Object.assign(DOM.prototype, {

        /**
         * Get the scroll X position of the first node.
         * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {number} The scroll X position.
         */
        getScrollX(nodes) {
            const node = this.parseNode(nodes, {
                document: true,
                window: true
            });

            if (!node) {
                return;
            }

            if (Core.isWindow(node)) {
                return node.scrollX;
            }

            if (Core.isDocument(node)) {
                return node.scrollingElement.scrollLeft;
            }

            return node.scrollLeft;
        },

        /**
         * Get the scroll Y position of the first node.
         * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {number} The scroll Y position.
         */
        getScrollY(nodes) {
            const node = this.parseNode(nodes, {
                document: true,
                window: true
            });

            if (!node) {
                return;
            }

            if (Core.isWindow(node)) {
                return node.scrollY;
            }

            if (Core.isDocument(node)) {
                return node.scrollingElement.scrollTop;
            }

            return node.scrollTop;
        },

        /**
         * Scroll each node to an X,Y position.
         * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {number} x The scroll X position.
         * @param {number} y The scroll Y position.
         */
        setScroll(nodes, x, y) {
            nodes = this.parseNodes(nodes, {
                document: true,
                window: true
            });

            for (const node of nodes) {
                if (Core.isWindow(node)) {
                    node.scroll(x, y);
                } else if (Core.isDocument(node)) {
                    node.scrollingElement.scrollLeft = x;
                    node.scrollingElement.scrollTop = y;
                } else {
                    node.scrollLeft = x;
                    node.scrollTop = y;
                }
            }
        },

        /**
         * Scroll each node to an X position.
         * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {number} x The scroll X position.
         */
        setScrollX(nodes, x) {
            nodes = this.parseNodes(nodes, {
                document: true,
                window: true
            });

            for (const node of nodes) {
                if (Core.isWindow(node)) {
                    node.scroll(x, node.scrollY);
                } else if (Core.isDocument(node)) {
                    node.scrollingElement.scrollLeft = x;
                } else {
                    node.scrollLeft = x;
                }
            }
        },

        /**
         * Scroll each node to a Y position.
         * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {number} y The scroll Y position.
         */
        setScrollY(nodes, y) {
            nodes = this.parseNodes(nodes, {
                document: true,
                window: true
            });

            for (const node of nodes) {
                if (Core.isWindow(node)) {
                    node.scroll(node.scrollX, y);
                } else if (Core.isDocument(node)) {
                    node.scrollingElement.scrollTop = y;
                } else {
                    node.scrollTop = y;
                }
            }
        }

    });

    /**
     * DOM Size
     */

    Object.assign(DOM.prototype, {

        /**
         * Get the computed height of the first node.
         * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {number} [innerOuter] Whether to include padding, border and margin heights.
         * @returns {number} The height.
         */
        height(nodes, innerOuter) {
            const node = this.parseNode(nodes, {
                document: true,
                window: true
            });

            if (!node) {
                return;
            }

            if (Core.isWindow(node)) {
                return innerOuter ?
                    node.outerHeight :
                    node.innerHeight;
            }

            if (Core.isUndefined(innerOuter)) {
                innerOuter = 1;
            }

            return this.constructor._height(node, innerOuter);
        },

        /**
         * Get the scroll height of the first node.
         * @param {string|array|HTMLElement|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {number} The scroll height.
         */
        scrollHeight(nodes) {
            const node = this.parseNode(nodes, {
                document: true
            });

            if (!node) {
                return;
            }

            return this.constructor._scrollHeight(node);
        },

        /**
         * Get the scroll width of the first node.
         * @param {string|array|HTMLElement|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {number} The scroll width.
         */
        scrollWidth(nodes) {
            const node = this.parseNode(nodes, {
                document: true
            });

            if (!node) {
                return;
            }

            return this.constructor._scrollWidth(node);
        },

        /**
         * Get the computed width of the first node.
         * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {number} [innerOuter] Whether to include padding, border and margin widths.
         * @returns {number} The width.
         */
        width(nodes, innerOuter) {
            const node = this.parseNode(nodes, {
                document: true,
                window: true
            });

            if (!node) {
                return;
            }

            if (Core.isWindow(node)) {
                return innerOuter ?
                    node.outerWidth :
                    node.innerWidth;
            }

            if (Core.isUndefined(innerOuter)) {
                innerOuter = 1;
            }

            return this.constructor._width(node, innerOuter);
        }

    });

    /**
     * DOM Styles
     */

    Object.assign(DOM.prototype, {

        /**
         * Add classes to each node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {...string|string[]} classes The classes.
         */
        addClass(nodes, ...classes) {
            nodes = this.parseNodes(nodes);

            classes = this.constructor._parseClasses(classes);

            if (!classes.length) {
                return;
            }

            for (const node of nodes) {
                node.classList.add(...classes);
            }
        },

        /**
         * Get computed CSS style value(s) for the first node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} [style] The CSS style name.
         * @returns {string|object} The CSS style value, or an object containing the computed CSS style properties.
         */
        css(nodes, style) {
            const node = this.parseNode(nodes);

            if (!node) {
                return;
            }

            return this.constructor._css(node, style);
        },

        /**
         * Get style properties for the first node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} [style] The style name.
         * @returns {string|object} The style value, or an object containing the style properties.
         */
        getStyle(nodes, style) {
            const node = this.parseNode(nodes);

            if (!node) {
                return;
            }

            return this.constructor._getStyle(node, style);
        },

        /**
         * Hide each node from display.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         */
        hide(nodes) {
            this.setStyle(nodes, 'display', 'none');
        },

        /**
         * Remove classes from each node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {...string|string[]} classes The classes.
         */
        removeClass(nodes, ...classes) {
            nodes = this.parseNodes(nodes);

            classes = this.constructor._parseClasses(classes);

            if (!classes.length) {
                return;
            }

            for (const node of nodes) {
                node.classList.remove(...classes);
            }
        },

        /**
         * Set style properties for each node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|object} style The style name, or an object containing styles.
         * @param {string} [value] The style value.
         * @param {Boolean} [important] Whether the style should be !important.
         */
        setStyle(nodes, style, value, important) {
            nodes = this.parseNodes(nodes);

            const styles = this.constructor._parseData(style, value);

            for (const node of nodes) {
                this.constructor._setStyle(node, styles, important);
            }
        },

        /**
         * Display each hidden node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         */
        show(nodes) {
            this.setStyle(nodes, 'display', '');
        },

        /**
         * Toggle the visibility of each node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         */
        toggle(nodes) {
            nodes = this.parseNodes(nodes);

            for (const node of nodes) {
                node.style.setProperty(
                    'display',
                    node.style.display === 'none' ?
                        '' :
                        'none'
                );
            }
        },

        /**
         * Toggle classes for each node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {...string|string[]} classes The classes.
         */
        toggleClass(nodes, ...classes) {
            nodes = this.parseNodes(nodes);

            classes = this.constructor._parseClasses(classes);

            if (!classes.length) {
                return;
            }

            for (const node of nodes) {
                for (const className of classes) {
                    node.classList.toggle(className);
                }
            }
        }

    });

    /**
     * DOM Cookie
     */

    Object.assign(DOM.prototype, {

        /**
         * Get a cookie value.
         * @param {string} name The cookie name.
         * @returns {*} The cookie value.
         */
        getCookie(name) {
            const cookie = this._context.cookie
                .split(';')
                .find(cookie =>
                    cookie
                        .trimStart()
                        .substring(0, name.length) === name
                )
                .trimStart();

            if (!cookie) {
                return null;
            }

            return decodeURIComponent(
                cookie.substring(name.length + 1)
            );
        },

        /**
         * Remove a cookie.
         * @param {string} name The cookie name.
         * @param {object} [options] The options to use for the cookie.
         * @param {string} [options.path] The cookie path.
         * @param {Boolean} [options.secure] Whether the cookie is secure.
         */
        removeCookie(name, options) {
            if (!name) {
                return;
            }

            let cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;

            if (options) {
                if (options.path) {
                    cookie += `;path=${options.path}`;
                }

                if (options.secure) {
                    cookie += ';secure';
                }
            }

            this._context.cookie = cookie;
        },

        /**
         * Set a cookie value.
         * @param {string} name The cookie name.
         * @param {*} value The cookie value.
         * @param {object} [options] The options to use for the cookie.
         * @param {number} [options.expires] The number of seconds until the cookie will expire.
         * @param {string} [options.path] The path to use for the cookie.
         * @param {Boolean} [options.secure] Whether the cookie is secure.
         */
        setCookie(name, value, options) {
            if (!name) {
                return;
            }

            let cookie = `${name}=${value}`;

            if (options) {
                if (options.expires) {
                    const date = new Date;
                    date.setTime(
                        date.getTime()
                        + options.expires * 1000
                    );
                    cookie += `;expires=${date.toUTCString()}`;
                }

                if (options.path) {
                    cookie += `;path=${options.path}`;
                }

                if (options.secure) {
                    cookie += ';secure';
                }
            }

            this._context.cookie = cookie;
        }

    });

    /**
     * DOM Event Factory
     */

    Object.assign(DOM.prototype, {

        /** 
         * Return a wrapped mouse drag event (optionally limited by animation frame).
         * @param {DOM~eventCallback} down The callback to execute on mousedown.
         * @param {DOM~eventCallback} move The callback to execute on mousemove.
         * @param {DOM~eventCallback} up The callback to execute on mouseup.
         * @param {Boolean} [animated=true] Whether to limit the move event by animation frame.
         * @returns {DOM~eventCallback} The mouse drag event callback.
         */
        mouseDragFactory(down, move, up, animated = true) {
            if (move && animated) {
                move = Core.animation(move);

                // needed to make sure up callback executes after final move callback
                if (up) {
                    up = Core.animation(up);
                }
            }

            return e => {
                if (down && down(e) === false) {
                    return false;
                }

                if (move) {
                    this.addEvent(window, 'mousemove', move);
                }

                if (move || up) {
                    this.addEventOnce(window, 'mouseup', e => {
                        if (move) {
                            this.removeEvent(window, 'mousemove', move);
                        }

                        if (up) {
                            up(e);
                        }
                    });
                }
            };
        }

    });

    /**
     * DOM Events
     */

    Object.assign(DOM.prototype, {

        /**
         * Trigger a blur event on the first node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         */
        blur(nodes) {
            const node = this.parseNode(nodes);

            if (!node) {
                return;
            }

            node.blur();
        },

        /**
         * Trigger a click event on the first node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         */
        click(nodes) {
            const node = this.parseNode(nodes);

            if (!node) {
                return;
            }

            node.click();
        },

        /**
         * Trigger a focus event on the first node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         */
        focus(nodes) {
            const node = this.parseNode(nodes);

            if (!node) {
                return;
            }

            node.focus();
        },

        /**
         * Add a function to the ready queue.
         * @param {DOM~eventCallback} callback The callback to execute.
         */
        ready(callback) {
            if (this._context.readyState === 'complete') {
                callback();
                return;
            }

            window.addEventListener('DOMContentLoaded', callback, {
                once: true
            })
        }

    });

    /**
     * DOM Event Handlers
     */

    Object.assign(DOM.prototype, {

        /**
         * Add events to each node.
         * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} events The event names.
         * @param {DOM~eventCallback} callback The callback to execute.
         * @param {string} [delegate] The delegate selector.
         * @param {Boolean} [selfDestruct] Whether to remove the event after triggering.
         */
        addEvent(nodes, events, callback, delegate, selfDestruct) {
            nodes = this.parseNodes(nodes, {
                shadow: true,
                document: true,
                window: !delegate
            });

            for (const node of nodes) {
                for (const event of this.constructor._parseEvents(events)) {
                    this.constructor._addEvent(node, event, callback, delegate, selfDestruct);
                }
            }
        },

        /**
         * Add delegated events to each node.
         * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} events The event names.
         * @param {string} delegate The delegate selector.
         * @param {DOM~eventCallback} callback The callback to execute.
         */
        addEventDelegate(nodes, events, delegate, callback) {
            this.addEvent(nodes, events, callback, delegate);
        },

        /**
         * Add self-destructing delegated events to each node.
         * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} events The event names.
         * @param {string} delegate The delegate selector.
         * @param {DOM~eventCallback} callback The callback to execute.
         */
        addEventDelegateOnce(nodes, events, delegate, callback) {
            this.addEvent(nodes, events, callback, delegate, true);
        },

        /**
         * Add self-destructing events to each node.
         * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} events The event names.
         * @param {DOM~eventCallback} callback The callback to execute.
         */
        addEventOnce(nodes, events, callback) {
            this.addEvent(nodes, events, callback, null, true);
        },

        /**
         * Clone all events from each node to other nodes.
         * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
         */
        cloneEvents(nodes, others) {
            nodes = this.parseNodes(nodes, {
                shadow: true,
                document: true,
                window: true
            });

            others = this.parseNodes(others, {
                shadow: true,
                document: true,
                window: true
            });

            for (const node of nodes) {
                for (const other of others) {
                    this.constructor._cloneEvents(node, other);
                }
            }
        },

        /**
         * Remove events from each node.
         * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} [events] The event names.
         * @param {DOM~eventCallback} [callback] The callback to remove.
         * @param {string} [delegate] The delegate selector.
         */
        removeEvent(nodes, events, callback, delegate) {
            nodes = this.parseNodes(nodes, {
                shadow: true,
                document: true,
                window: !delegate
            });

            events = events ?
                this.constructor._parseEvents(events) :
                false;

            for (const node of nodes) {
                if (!this.constructor._events.has(node)) {
                    continue;
                }

                if (!events) {
                    this.constructor._removeEvent(node, events, callback, delegate);
                    continue;
                }

                for (const event of events) {
                    this.constructor._removeEvent(node, event, callback, delegate);
                }
            }
        },

        /**
         * Remove delegated events from each node.
         * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} [events] The event names.
         * @param {string} [delegate] The delegate selector.
         * @param {DOM~eventCallback} [callback] The callback to remove.
         */
        removeEventDelegate(nodes, events, delegate, callback) {
            this.removeEvent(nodes, events, callback, delegate);
        },

        /**
         * Trigger events on each node.
         * @param {string|array|HTMLElement|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} events The event names.
         * @param {object} [options] The options to use for the Event.
         * @param {*} [options.detail] Additional data to attach to the event.
         * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
         * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
         */
        triggerEvent(nodes, events, options) {
            nodes = this.parseNodes(nodes, {
                shadow: true,
                document: true,
                window: true
            });

            events = this.constructor._parseEvents(events);

            for (const node of nodes) {
                for (const event of events) {
                    this.constructor._triggerEvent(node, event, options);
                }
            }
        },

        /**
         * Trigger an event for the first node.
         * @param {string|array|HTMLElement|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} event The event name.
         * @param {object} [options] The options to use for the Event.
         * @param {*} [options.detail] Additional data to attach to the event.
         * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
         * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
         */
        triggerOne(nodes, event, options) {
            const node = this.parseNode(nodes, {
                shadow: true,
                document: true,
                window: true
            });

            return this.constructor._triggerEvent(node, event, options);
        }

    });

    /**
     * DOM Create
     */

    Object.assign(DOM.prototype, {

        /**
         * Attach a shadow DOM tree to the first node.
         * @param {string|array|HTMLElement|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {Boolean} [open=true] Whether the elements are accessible from JavaScript outside the root.
         * @returns {ShadowRoot} The new ShadowRoot.
         */
        attachShadow(nodes, open = true) {
            const node = this.parseNode(nodes);

            if (!node) {
                return;
            }

            return node.attachShadow({
                mode: open ?
                    'open' :
                    'closed'
            });
        },

        /**
         * Create a new DOM element.
         * @param {string} [tagName=div] The type of HTML element to create.
         * @param {object} [options] The options to use for creating the element.
         * @param {string} [options.html] The HTML contents.
         * @param {string} [options.text] The text contents.
         * @param {string|array} [options.class] The classes.
         * @param {object} [options.style] An object containing style properties.
         * @param {string} [options.value] The value.
         * @param {object} [options.attributes] An object containing attributes.
         * @param {object} [options.properties] An object containing properties.
         * @param {object} [options.dataset] An object containing dataset values.
         * @returns {HTMLElement} The new HTMLElement.
         */
        create(tagName = 'div', options) {
            const node = this._context.createElement(tagName);

            if (!options) {
                return node;
            }

            if ('html' in options) {
                node.innerHTML = options.html;
            } else if ('text' in options) {
                node.innerText = options.text;
            }

            if ('class' in options) {
                node.classList.add(
                    ...this.constructor._parseClasses(
                        Core.wrap(options.class)
                    )
                );
            }

            if ('style' in options) {
                this.constructor._setStyle(node, options.style);
            }

            if ('value' in options) {
                node.value = options.value;
            }

            if ('attributes' in options) {
                this.constructor._setAttribute(node, options.attributes);
            }

            if ('properties' in options) {
                for (const key in options.properties) {
                    node[key] = options.properties[key];
                }
            }

            if ('dataset' in options) {
                const dataset = this.constructor._parseData(options.dataset, null, true);
                this.constructor._setDataset(node, dataset);
            }

            return node;
        },

        /**
         * Create a new comment node.
         * @param {string} comment The comment contents.
         * @returns {Node} The new comment node.
         */
        createComment(comment) {
            return this._context.createComment(comment);
        },

        /**
         * Create a new document fragment.
         * @returns {DocumentFragment} The new DocumentFragment.
         */
        createFragment() {
            return this._context.createDocumentFragment();
        },

        /**
         * Create a new range object.
         * @returns {Range} The new Range.
         */
        createRange() {
            return this._context.createRange();
        },

        /**
         * Create a new text node.
         * @param {string} text The text contents.
         * @returns {Node} The new text node.
         */
        createText(text) {
            return this._context.createTextNode(text);
        },

        /**
         * Create an Array containing nodes parsed from a HTML string.
         * @param {string} html The HTML input string.
         * @returns {array} An array of nodes.
         */
        parseHTML(html) {
            return Core.wrap(
                this.createRange()
                    .createContextualFragment(html)
                    .children
            );
        }

    });

    /**
     * DOM Manipulation
     */

    Object.assign(DOM.prototype, {

        /**
         * Clone each node.
         * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {object} options Options for cloning the node.
         * @param {Boolean} [options.deep=true] Whether to also clone all descendent nodes.
         * @param {Boolean} [options.events] Whether to also clone events.
         * @param {Boolean} [options.data] Whether to also clone custom data.
         * @param {Boolean} [options.animations] Whether to also clone animations.
         * @returns {array} The cloned nodes.
         */
        clone(nodes, options) {
            options = {
                deep: true,
                ...options
            };

            // ShadowRoot nodes can not be cloned
            nodes = this.parseNodes(nodes, {
                node: true,
                fragment: true
            });

            return nodes.map(node =>
                this.constructor._clone(node, options)
            );
        },

        /**
         * Detach each node from the DOM.
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @return {array} The detached nodes.
         */
        detach(nodes) {

            // DocumentFragment and ShadowRoot nodes can not be detached
            nodes = this.parseNodes(nodes, {
                node: true
            });

            for (const node of nodes) {
                const parent = node.parentNode;

                if (!parent) {
                    continue;
                }

                parent.removeChild(node);
            }

            return nodes;
        },

        /**
         * Remove all children of each node from the DOM.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         */
        empty(nodes) {
            nodes = this.parseNodes(nodes, {
                fragment: true,
                shadow: true,
                document: true
            });

            for (const node of nodes) {
                this.constructor._empty(node);
            }
        },

        /**
         * Remove each node from the DOM.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         */
        remove(nodes) {

            // DocumentFragment and ShadowRoot nodes can not be removed
            nodes = this.parseNodes(nodes, {
                node: true
            });

            for (const node of nodes) {
                const parent = node.parentNode;

                if (!parent) {
                    continue;
                }

                this.constructor._remove(node);
                parent.removeChild(node);
            }
        },

        /**
         * Replace each other node with nodes.
         * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The input node(s), or a query selector string.
         */
        replaceAll(nodes, others) {
            this.replaceWith(others, nodes);
        },

        /**
         * Replace each node with other nodes.
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The input node(s), or a query selector or HTML string.
         */
        replaceWith(nodes, others) {

            // DocumentFragment and ShadowRoot nodes can not be removed
            nodes = this.parseNodes(nodes, {
                node: true
            });

            // ShadowRoot nodes can not be cloned
            others = this.parseNodes(others, {
                node: true,
                fragment: true,
                html: true
            });

            // Move nodes to a fragment so they don't get removed
            const fragment = this.createFragment();

            for (const other of others) {
                fragment.insertBefore(other, null);
            }

            others = Core.wrap(fragment.childNodes);

            nodes = nodes.filter(node =>
                !others.includes(node) &&
                !nodes.some(other =>
                    !other.isSameNode(node) &&
                    other.contains(node)
                )
            );

            const lastNode = nodes[nodes.length - 1];

            for (const node of nodes) {
                const parent = node.parentNode;

                if (!parent) {
                    continue;
                }

                for (const other of others) {
                    parent.insertBefore(
                        node.isSameNode(lastNode) ?
                            other :
                            this.constructor._clone(other, {
                                deep: true,
                                events: true,
                                data: true,
                                animations: true
                            }),
                        node
                    );
                }
            }

            for (const node of nodes) {
                const parent = node.parentNode;

                if (!parent) {
                    continue;
                }

                this.constructor._remove(node);
                parent.removeChild(node);
            }
        }

    });

    /**
     * DOM Move
     */

    Object.assign(DOM.prototype, {

        /**
         * Insert each other node after each node.
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
         */
        after(nodes, others) {

            // DocumentFragment and ShadowRoot nodes can not have siblings
            nodes = this.parseNodes(nodes, {
                node: true
            });

            // ShadowRoot nodes can not be moved
            others = this.parseNodes(others, {
                node: true,
                fragment: true,
                html: true
            }).reverse();

            const lastNode = nodes[nodes.length - 1];

            for (const node of nodes) {
                const parent = node.parentNode;

                if (!parent) {
                    continue;
                }

                for (const other of others) {
                    parent.insertBefore(
                        node.isSameNode(lastNode) ?
                            other :
                            this.constructor._clone(other, {
                                deep: true,
                                events: true,
                                data: true,
                                animations: true
                            }),
                        node.nextSibling
                    );
                }
            }
        },

        /**
         * Append each other node to each node.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
         */
        append(nodes, others) {
            nodes = this.parseNodes(nodes, {
                fragment: true,
                shadow: true,
                document: true
            });

            // ShadowRoot nodes can not be moved
            others = this.parseNodes(others, {
                node: true,
                fragment: true,
                html: true
            });

            const lastNode = nodes[nodes.length - 1];

            for (const node of nodes) {
                for (const other of others) {
                    node.insertBefore(
                        node.isSameNode(lastNode) ?
                            other :
                            this.constructor._clone(other, {
                                deep: true,
                                events: true,
                                data: true,
                                animations: true
                            }),
                        null
                    );
                }
            }
        },

        /**
         * Append each node to each other node.
         * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
         */
        appendTo(nodes, others) {
            this.append(others, nodes);
        },

        /**
         * Insert each other node before each node.
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
         */
        before(nodes, others) {

            // DocumentFragment and ShadowRoot nodes can not have siblings
            nodes = this.parseNodes(nodes, {
                node: true
            });

            // ShadowRoot nodes can not be moved
            others = this.parseNodes(others, {
                node: true,
                fragment: true,
                html: true
            });

            const lastNode = nodes[nodes.length - 1];

            for (const node of nodes) {
                const parent = node.parentNode;

                if (!parent) {
                    continue;
                }

                for (const other of others) {
                    parent.insertBefore(
                        node.isSameNode(lastNode) ?
                            other :
                            this.constructor._clone(other, {
                                deep: true,
                                events: true,
                                data: true,
                                animations: true
                            }),
                        node
                    );
                }
            }
        },

        /**
         * Insert each node after each other node.
         * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
         */
        insertAfter(nodes, others) {
            this.after(others, nodes);
        },

        /**
         * Insert each node before each other node.
         * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
         */
        insertBefore(nodes, others) {
            this.before(others, nodes);
        },

        /**
         * Prepend each other node to each node.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection} others The other node(s), or a query selector or HTML string.
         */
        prepend(nodes, others) {
            nodes = this.parseNodes(nodes, {
                fragment: true,
                shadow: true,
                document: true
            });

            // ShadowRoot nodes can not be moved
            others = this.parseNodes(others, {
                node: true,
                fragment: true,
                html: true
            });

            const lastNode = nodes[nodes.length - 1];

            for (const node of nodes) {
                const firstChild = node.firstChild;

                for (const other of others) {
                    node.insertBefore(
                        node.isSameNode(lastNode) ?
                            other :
                            this.constructor._clone(other, {
                                deep: true,
                                events: true,
                                data: true,
                                animations: true
                            }),
                        firstChild
                    );
                }
            }
        },

        /**
         * Prepend each node to each other node.
         * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
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
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         */
        unwrap(nodes, filter) {

            // DocumentFragment and ShadowRoot nodes can not be unwrapped
            nodes = this.parseNodes(nodes, {
                node: true
            });

            filter = this.parseFilter(filter);

            const parents = [];

            for (const node of nodes) {
                const parent = node.parentNode;

                if (!parent) {
                    continue;
                }

                if (parents.includes(parent)) {
                    continue;
                }

                if (filter && !filter(parent)) {
                    continue;
                }

                parents.push(parent);
            }

            for (const parent of parents) {
                this.constructor._unwrap(parent);
            }
        },

        /**
         * Wrap each nodes with other nodes.
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
         */
        wrap(nodes, others) {

            // DocumentFragment and ShadowRoot nodes can not be wrapped
            nodes = this.parseNodes(nodes, {
                node: true
            });

            // ShadowRoot nodes can not be cloned
            others = this.parseNodes(others, {
                fragment: true,
                html: true
            });

            for (const node of nodes) {
                this.constructor._wrap(node, others);
            }
        },

        /**
         * Wrap all nodes with other nodes.
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
         */
        wrapAll(nodes, others) {

            // DocumentFragment and ShadowRoot nodes can not be wrapped
            nodes = this.parseNodes(nodes, {
                node: true
            });

            // ShadowRoot nodes can not be cloned
            others = this.parseNodes(others, {
                fragment: true,
                html: true
            });

            const clones = this.clone(others, {
                events: true,
                data: true,
                animations: true
            });

            this.constructor._wrapAll(nodes, clones);
        },

        /**
         * Wrap the contents of each node with other nodes.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
         */
        wrapInner(nodes, others) {
            nodes = this.parseNodes(nodes, {
                node: true,
                fragment: true,
                shadow: true
            });

            // ShadowRoot nodes can not be cloned
            others = this.parseNodes(others, {
                fragment: true,
                html: true
            });

            for (const node of nodes) {
                this.constructor._wrapInner(node, others);
            }
        }

    });

    /**
     * DOM AJAX Scripts
     */

    Object.assign(DOM.prototype, {

        /**
         * Load and execute a JavaScript file.
         * @param {string} url The URL of the script.
         * @param {object} [attributes] Additional attributes to set on the script tag.
         * @param {Boolean} [cache=true] Whether to cache the request.
         * @returns {Promise} A new Promise that resolves when the script is loaded, or rejects on failure.
         */
        loadScript(url, attributes, cache = true) {
            attributes = {
                src: url,
                type: 'text/javascript',
                ...attributes
            };

            if (!cache) {
                attributes.src = AjaxRequest.appendQueryString(attributes.src, '_', Date.now());
            }

            return new Promise((resolve, reject) => {
                const script = this.create('script', {
                    attributes
                });

                script.onload = _ => resolve();
                script.onerror = _ => reject();

                this._context.head.appendChild(script);
            });
        },

        /**
         * Load and executes multiple JavaScript files (in order).
         * @param {array} urls An array of script URLs or attribute objects.
         * @param {Boolean} [cache=true] Whether to cache the requests.
         * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
         */
        loadScripts(urls, cache = true) {
            return Promise.all(
                urls.map(url =>
                    Core.isString(url) ?
                        this.loadScript(url, null, cache) :
                        this.loadScript(null, url, cache)
                )
            );
        }

    });

    /**
     * DOM AJAX Styles
     */

    Object.assign(DOM.prototype, {

        /**
         * Import a CSS Stylesheet file.
         * @param {string} url The URL of the stylesheet.
         * @param {object} [attributes] Additional attributes to set on the style tag.
         * @param {Boolean} [cache=true] Whether to cache the request.
         * @returns {Promise} A new Promise that resolves when the stylesheet is loaded, or rejects on failure.
         */
        loadStyle(url, attributes, cache = true) {
            attributes = {
                href: url,
                rel: 'stylesheet',
                ...attributes
            };

            if (!cache) {
                attributes.href = AjaxRequest.appendQueryString(attributes.href, '_', Date.now());
            }

            return new Promise((resolve, reject) => {
                const link = this.create('link', {
                    attributes
                });

                link.onload = _ => resolve();
                link.onerror = _ => reject();

                this._context.head.appendChild(link);
            });
        },

        /**
         * Import multiple CSS Stylesheet files.
         * @param {array} urls An array of stylesheet URLs or attribute objects.
         * @param {Boolean} [cache=true] Whether to cache the requests.
         * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
         */
        loadStyles(urls, cache = true) {
            return Promise.all(
                urls.map(url =>
                    Core.isString(url) ?
                        this.loadStyle(url, null, cache) :
                        this.loadStyle(null, url, cache)
                )
            );
        }

    });

    /**
     * DOM Filter
     */

    Object.assign(DOM.prototype, {

        /**
         * Return all nodes connected to the DOM.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {array} The filtered nodes.
         */
        connected(nodes) {
            return this.parseNodes(nodes, {
                node: true,
                fragment: true,
                shadow: true
            }).filter(node => node.isConnected);
        },

        /**
         * Return all nodes considered equal to any of the other nodes.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
         * @returns {array} The filtered nodes.
         */
        equal(nodes, others) {
            others = this.parseNodes(others, {
                node: true,
                fragment: true,
                shadow: true
            });

            return this.parseNodes(nodes, {
                node: true,
                fragment: true,
                shadow: true
            }).filter(node =>
                others.some(other =>
                    node.isEqualNode(other)
                )
            );
        },

        /**
         * Return all nodes matching a filter.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {array} The filtered nodes.
         */
        filter(nodes, filter) {
            filter = this.parseFilter(filter);

            return this.parseNodes(nodes, {
                node: true,
                fragment: true,
                shadow: true
            }).filter((node, index) =>
                !filter || filter(node, index)
            );
        },

        /**
         * Return the first node matching a filter.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {Node|HTMLElement|DocumentFragment|ShadowRoot} The filtered node.
         */
        filterOne(nodes, filter) {
            filter = this.parseFilter(filter);

            return this.parseNodes(nodes, {
                node: true,
                fragment: true,
                shadow: true
            }).find((node, index) =>
                !filter || filter(node, index)
            ) || null;
        },

        /**
         * Return all "fixed" nodes.
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {array} The filtered nodes.
         */
        fixed(nodes) {
            return this.parseNodes(nodes, {
                node: true
            }).filter(node =>
                (
                    Core.isElement(node) &&
                    this.constructor._css(node, 'position') === 'fixed'
                ) ||
                this.constructor._parents(
                    node,
                    parent =>
                        Core.isElement(parent) &&
                        this.constructor._css(parent, 'position') === 'fixed',
                    false,
                    true
                ).length
            );
        },

        /**
         * Return all hidden nodes.
         * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {array} The filtered nodes.
         */
        hidden(nodes) {
            return this.parseNodes(nodes, {
                node: true,
                document: true,
                window: true
            }).filter(node =>
                !this.constructor._isVisible(node)
            );
        },

        /**
         * Return all nodes not matching a filter.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {array} The filtered nodes.
         */
        not(nodes, filter) {
            filter = this.parseFilter(filter);

            return this.parseNodes(nodes, {
                node: true,
                fragment: true,
                shadow: true
            }).filter((node, index) =>
                filter && !filter(node, index)
            );
        },

        /**
         * Return the first node not matching a filter.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {Node|HTMLElement|DocumentFragment|ShadowRoot} The filtered node.
         */
        notOne(nodes, filter) {
            filter = this.parseFilter(filter);

            return this.parseNodes(nodes, {
                node: true,
                fragment: true,
                shadow: true
            }).find((node, index) =>
                filter && !filter(node, index)
            ) || null;
        },

        /**
         * Return all nodes considered identical to any of the other nodes.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
         * @returns {array} The filtered nodes.
         */
        same(nodes, others) {
            others = this.parseNodes(others, {
                node: true,
                fragment: true,
                shadow: true
            });

            return this.parseNodes(nodes, {
                node: true,
                fragment: true,
                shadow: true
            }).filter(node =>
                others.some(other =>
                    node.isSameNode(other)
                )
            );
        },

        /**
         * Return all visible nodes.
         * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {array} The filtered nodes.
         */
        visible(nodes) {
            return this.parseNodes(nodes, {
                node: true,
                document: true,
                window: true
            }).filter(node =>
                this.constructor._isVisible(node)
            );
        },

        /**
         * Return all nodes with an animation.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {array} The filtered nodes.
         */
        withAnimation(nodes) {
            return this.parseNodes(nodes)
                .filter(node =>
                    Animation._animations.has(node)
                );
        },

        /**
         * Return all nodes with a specified attribute.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} attribute The attribute name.
         * @returns {array} The filtered nodes.
         */
        withAttribute(nodes, attribute) {
            return this.parseNodes(nodes)
                .filter(node =>
                    node.hasAttribute(attribute)
                );
        },

        /**
         * Return all nodes with child elements.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {array} The filtered nodes.
         */
        withChildren(nodes) {
            return this.parseNodes(nodes, {
                fragment: true,
                shadow: true,
                document: true
            }).filter(node =>
                !!node.childElementCount
            );
        },

        /**
         * Return all nodes with any of the specified classes.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {...string|string[]} classes The classes.
         * @returns {array} The filtered nodes.
         */
        withClass(nodes, ...classes) {
            classes = this.constructor._parseClasses(classes);

            return this.parseNodes(nodes)
                .filter(node =>
                    classes.some(className =>
                        node.classList.contains(className)
                    )
                );
        },

        /**
         * Return all nodes with a CSS animation.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {array} The filtered nodes.
         */
        withCSSAnimation(nodes) {
            return this.parseNodes(nodes)
                .filter(node =>
                    this.constructor._hasCSSAnimation(node)
                );
        },

        /**
         * Return all nodes with a CSS transition.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {array} The filtered nodes.
         */
        withCSSTransition(nodes) {
            return this.parseNodes(nodes)
                .filter(node =>
                    this.constructor._hasCSSTransition(node)
                );
        },

        /**
         * Return all nodes with custom data.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} [key] The data key.
         * @returns {array} The filtered nodes.
         */
        withData(nodes, key) {
            return this.parseNodes(nodes, {
                node: true,
                fragment: true,
                shadow: true,
                document: true,
                window: true
            }).filter(node =>
                this.constructor._hasData(node, key)
            );
        },

        /**
         * Return all nodes with a descendent matching a filter.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {array} The filtered nodes.
         */
        withDescendent(nodes, filter) {
            filter = this.parseFilterContains(filter);

            return this.parseNodes(nodes, {
                fragment: true,
                shadow: true,
                document: true
            }).filter((node, index) =>
                !filter || filter(node, index)
            );
        },

        /**
         * Return all nodes with a specified property.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} property The property name.
         * @returns {array} The filtered nodes.
         */
        withProperty(nodes, property) {
            return this.parseNodes(nodes)
                .filter(node =>
                    node.hasOwnProperty(property)
                );
        }

    });

    /**
     * DOM Find
     */

    Object.assign(DOM.prototype, {

        /**
         * Return all nodes matching a selector.
         * @param {string} selector The query selector.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
         * @returns {array} The matching nodes.
         */
        find(selector, nodes = this._context) {
            // fast selector
            const match = selector.match(this.constructor._fastRegExp);
            if (match) {
                if (match[1] === '#') {
                    return this.findById(match[2], nodes);
                }

                if (match[1] === '.') {
                    return this.findByClass(match[2], nodes);
                }

                return this.findByTag(match[2], nodes);
            }

            // custom selector
            if (selector.match(this.constructor._complexRegExp)) {
                selector = this.constructor._prefixSelectors(selector, ':scope ');
            }

            // standard selector
            if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
                return Core.wrap(
                    nodes.querySelectorAll(selector)
                );
            }

            nodes = this.parseNodes(nodes, {
                fragment: true,
                shadow: true,
                document: true
            });

            return this.constructor._findBySelector(selector, nodes);
        },

        /**
         * Return all nodes with a specific class.
         * @param {string} className The class name.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
         * @returns {array} The matching nodes.
         */
        findByClass(className, nodes = this._context) {
            if (Core.isDocument(nodes) || Core.isElement(nodes)) {
                return Core.wrap(
                    nodes.getElementsByClassName(className)
                );
            }

            if (Core.isFragment(nodes) || Core.isShadow(nodes)) {
                return Core.wrap(
                    nodes.querySelectorAll(`.${className}`)
                );
            }

            nodes = this.parseNodes(nodes, {
                fragment: true,
                shadow: true,
                document: true
            });

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    Core.isFragment(node) || Core.isShadow(node) ?
                        node.querySelectorAll(`.${className}`) :
                        node.getElementsByClassName(className)
                )
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

        /**
         * Return all nodes with a specific ID.
         * @param {string} id The id.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
         * @returns {array} The matching nodes.
         */
        findById(id, nodes = this._context) {
            if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
                return Core.wrap(
                    nodes.querySelectorAll(`#${id}`)
                );
            }

            nodes = this.parseNodes(nodes, {
                fragment: true,
                shadow: true,
                document: true
            });

            return this.constructor._findBySelector(`#${id}`, nodes);
        },

        /**
         * Return all nodes with a specific tag.
         * @param {string} tagName The tag name.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
         * @returns {array} The matching nodes.
         */
        findByTag(tagName, nodes = this._context) {
            if (Core.isDocument(nodes) || Core.isElement(nodes)) {
                return Core.wrap(
                    nodes.getElementsByTagName(tagName)
                );
            }

            if (Core.isFragment(nodes) || Core.isShadow(nodes)) {
                return Core.wrap(
                    nodes.querySelectorAll(tagName)
                );
            }

            nodes = this.parseNodes(nodes, {
                fragment: true,
                shadow: true,
                document: true
            });

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    Core.isFragment(node) || Core.isShadow(node) ?
                        node.querySelectorAll(tagName) :
                        node.getElementsByTagName(tagName)
                )
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

        /**
         * Return a single node matching a selector.
         * @param {string} selector The query selector.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
         * @returns {HTMLElement} The matching node.
         */
        findOne(selector, nodes = this._context) {
            // fast selector
            const match = selector.match(this.constructor._fastRegExp);
            if (match) {
                if (match[1] === '#') {
                    return this.findOneById(match[2], nodes);
                }

                if (match[1] === '.') {
                    return this.findOneByClass(match[2], nodes);
                }

                return this.findOneByTag(match[2], nodes);
            }

            // custom selector
            if (selector.match(this.constructor._complexRegExp)) {
                selector = this.constructor._prefixSelectors(selector, ':scope ');
            }

            // standard selector
            if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
                return nodes.querySelector(selector);
            }

            nodes = this.parseNodes(nodes, {
                fragment: true,
                shadow: true,
                document: true
            });

            if (!nodes.length) {
                return;
            }

            return this.constructor._findOneBySelector(selector, nodes);
        },

        /**
         * Return a single node with a specific class.
         * @param {string} className The class name.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
         * @returns {HTMLElement} The matching node.
         */
        findOneByClass(className, nodes = this._context) {
            if (Core.isDocument(nodes) || Core.isElement(nodes)) {
                return nodes.getElementsByClassName(className).item(0);
            }

            if (Core.isFragment(nodes) || Core.isShadow(nodes)) {
                return nodes.querySelector(`.${className}`);
            }

            nodes = this.parseNodes(nodes, {
                fragment: true,
                shadow: true,
                document: true
            });

            if (!nodes.length) {
                return;
            }

            for (const node of nodes) {
                const result = Core.isFragment(node) || Core.isShadow(node) ?
                    node.querySelector(`.${className}`) :
                    node.getElementsByClassName(className).item(0);
                if (result) {
                    return result;
                }
            }

            return null;
        },

        /**
         * Return a single node with a specific ID.
         * @param {string} id The id.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
         * @returns {HTMLElement} The matching element.
         */
        findOneById(id, nodes = this._context) {
            if (Core.isDocument(nodes)) {
                return nodes.getElementById(id);
            }

            if (Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
                return nodes.querySelector(`#${id}`);
            }

            nodes = this.parseNodes(nodes, {
                fragment: true,
                shadow: true,
                document: true
            });

            if (!nodes.length) {
                return;
            }

            return this.constructor._findOneBySelector(`#${id}`, nodes);
        },

        /**
         * Return a single node with a specific tag.
         * @param {string} tagName The tag name.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
         * @returns {HTMLElement} The matching node.
         */
        findOneByTag(tagName, nodes = this._context) {
            if (Core.isDocument(nodes) || Core.isElement(nodes)) {
                return nodes.getElementsByTagName(tagName).item(0);
            }

            if (Core.isFragment(nodes) || Core.isShadow(nodes)) {
                return nodes.querySelector(tagName);
            }

            nodes = this.parseNodes(nodes, {
                fragment: true,
                shadow: true,
                document: true
            });

            if (!nodes.length) {
                return;
            }

            for (const node of nodes) {
                const result = Core.isFragment(node) || Core.isShadow(node) ?
                    node.querySelector(tagName) :
                    node.getElementsByTagName(tagName).item(0);
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
         * Return the first child of each node (optionally matching a filter).
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {array} The matching nodes.
         */
        child(nodes, filter) {
            return this.children(nodes, filter, true);
        },

        /**
         * Return all children of each node (optionally matching a filter).
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
         * @param {Boolean} [elementsOnly=false] Whether to only return element nodes.
         * @returns {array} The matching nodes.
         */
        children(nodes, filter, first = false, elementsOnly = true) {
            filter = this.parseFilter(filter);

            if (Core.isElement(nodes) || Core.isDocument(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
                return this.constructor._children(nodes, filter, first, elementsOnly);
            }

            nodes = this.parseNodes(nodes, {
                fragment: true,
                shadow: true,
                document: true
            });

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    this.constructor._children(node, filter, first, elementsOnly)
                )
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

        /**
         * Return the closest ancestor to each node (optionally matching a filter, and before a limit).
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
         * @returns {array} The matching nodes.
         */
        closest(nodes, filter, limit) {
            return this.parents(nodes, filter, limit, true);
        },

        /**
         * Return the common ancestor of all nodes.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {HTMLElement} The common ancestor.
         */
        commonAncestor(nodes) {
            nodes = this.sort(nodes);

            if (!nodes.length) {
                return;
            }

            // Make sure all nodes have a parent
            if (nodes.some(node => !node.parentNode)) {
                return;
            }

            const range = this.createRange();

            if (nodes.length === 1) {
                range.selectNode(nodes.shift());
            } else {
                range.setStartBefore(nodes.shift());
                range.setEndAfter(nodes.pop());
            }

            return range.commonAncestorContainer;
        },

        /**
         * Return all children of each node (including text and comment nodes).
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {array} The matching nodes.
         */
        contents(nodes) {
            return this.children(nodes, false, false, false);
        },

        /**
         * Return the DocumentFragment of the first node.
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {DocumentFragment} The DocumentFragment.
         */
        fragment(nodes) {
            const node = this.parseNode(nodes);

            if (!node) {
                return;
            }

            return node.content;
        },

        /**
         * Return the next sibling for each node (optionally matching a filter).
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {array} The matching nodes.
         */
        next(nodes, filter) {
            filter = this.parseFilter(filter);

            if (Core.isNode(nodes)) {
                return this.constructor._next(nodes, filter);
            }

            // DocumentFragment and ShadowRoot nodes can not have siblings
            nodes = this.parseNodes(nodes, {
                node: true
            });

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    this.constructor._next(node, filter)
                )
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

        /**
         * Return all next siblings for each node (optionally matching a filter, and before a limit).
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
         * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
         * @returns {array} The matching nodes.
         */
        nextAll(nodes, filter, limit, first = false) {
            filter = this.parseFilter(filter);
            limit = this.parseFilter(limit);

            if (Core.isNode(nodes)) {
                return this.constructor._nextAll(nodes, filter, limit, first);
            }

            // DocumentFragment and ShadowRoot nodes can not have siblings
            nodes = this.parseNodes(nodes, {
                node: true
            });

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    this.constructor._nextAll(node, filter, limit, first)
                )
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

        /**
         * Return the offset parent (relatively positioned) of the first node.
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {HTMLElement} The offset parent.
         */
        offsetParent(nodes) {
            return this.forceShow(
                nodes,
                node => node.offsetParent
            );
        },

        /**
         * Return the parent of each node (optionally matching a filter).
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {array} The matching nodes.
         */
        parent(nodes, filter) {
            filter = this.parseFilter(filter);

            if (Core.isNode(nodes)) {
                return this.constructor._parent(nodes, filter);
            }

            // DocumentFragment and ShadowRoot nodes have no parent
            nodes = this.parseNodes(nodes, {
                node: true
            });

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    this.constructor._parent(node, filter)
                )
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

        /**
         * Return all parents of each node (optionally matching a filter, and before a limit).
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
         * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
         * @returns {array} The matching nodes.
         */
        parents(nodes, filter, limit, first = false) {
            filter = this.parseFilter(filter);
            limit = this.parseFilter(limit);

            if (Core.isNode(nodes)) {
                return this.constructor._parents(nodes, filter, limit, first);
            }

            // DocumentFragment and ShadowRoot nodes have no parent
            nodes = this.parseNodes(nodes, {
                node: true
            });

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    this.constructor._parents(node, filter, limit, first)
                )
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

        /**
         * Return the previous sibling for each node (optionally matching a filter).
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {array} The matching nodes.
         */
        prev(nodes, filter) {
            filter = this.parseFilter(filter);

            if (Core.isNode(nodes)) {
                return this.constructor._prev(nodes, filter);
            }

            // DocumentFragment and ShadowRoot nodes can not have siblings
            nodes = this.parseNodes(nodes, {
                node: true
            });

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    this.constructor._prev(node, filter)
                )
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

        /**
         * Return all previous siblings for each node (optionally matching a filter, and before a limit).
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
         * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
         * @returns {array} The matching nodes.
         */
        prevAll(nodes, filter, limit, first = false) {
            filter = this.parseFilter(filter);
            limit = this.parseFilter(limit);

            if (Core.isNode(nodes)) {
                return this.constructor._prevAll(nodes, filter, limit, first);
            }

            // DocumentFragment and ShadowRoot nodes can not have siblings
            nodes = this.parseNodes(nodes, {
                node: true
            });

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    this.constructor._prevAll(node, filter, limit, first)
                )
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

        /**
         * Return the ShadowRoot of the first node.
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {ShadowRoot} The ShadowRoot.
         */
        shadow(nodes) {
            const node = this.parseNode(nodes);

            if (!node) {
                return;
            }

            return node.shadowRoot;
        },

        /**
         * Return all siblings for each node (optionally matching a filter).
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
         * @returns {array} The matching nodes.
         */
        siblings(nodes, filter, elementsOnly = true) {
            filter = this.parseFilter(filter);

            if (Core.isNode(nodes)) {
                return this.constructor._siblings(nodes, filter, elementsOnly);
            }

            // DocumentFragment and ShadowRoot nodes can not have siblings
            nodes = this.parseNodes(nodes, {
                node: true
            });

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    this.constructor._siblings(node, filter, elementsOnly)
                )
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        }

    });

    /**
     * DOM Filters
     */

    Object.assign(DOM.prototype, {

        /**
         * Return a node filter callback.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
         * @returns {DOM~filterCallback} The node filter callback.
         */
        parseFilter(filter) {
            if (!filter) {
                return false;
            }

            if (Core.isFunction(filter)) {
                return filter;
            }

            if (Core.isString(filter)) {
                return node => Core.isElement(node) && node.matches(filter);
            }

            if (Core.isNode(filter) || Core.isFragment(filter) || Core.isShadow(filter)) {
                return node => node.isSameNode(filter);
            }

            filter = this.parseNodes(filter, {
                node: true,
                fragment: true,
                shadow: true
            });

            if (filter.length) {
                return node => filter.includes(node);
            }

            return false;
        },

        /**
         * Return a node contains filter callback.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
         * @returns {DOM~filterCallback} The node contains filter callback.
         */
        parseFilterContains(filter) {
            if (!filter) {
                return false;
            }

            if (Core.isFunction(filter)) {
                return node =>
                    Core.wrap(
                        node.querySelectorAll('*')
                    ).some(filter);
            }

            if (Core.isString(filter)) {
                return node => !!this.findOne(filter, node);
            }

            if (Core.isNode(filter) || Core.isFragment(filter) || Core.isShadow(filter)) {
                return node => node.contains(filter);
            }

            filter = this.parseNodes(filter, {
                node: true,
                fragment: true,
                shadow: true
            });

            if (filter.length) {
                return node => filter.some(other => node.contains(other));
            }

            return false;
        },

        /**
         * Return the first node matching a filter.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
         * @param {object} [options] The options for filtering.
         * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
         * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
         * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
         * @param {Boolean} [options.document=false] Whether to allow Document.
         * @param {Boolean} [options.window=false] Whether to allow Window.
         * @param {Boolean} [options.html=false] Whether to allow HTML strings.
         * @param {HTMLElement|Document} [options.context=this._context] The Document context.
         * @returns {Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window} The matching node.
         */
        parseNode(nodes, options = {}) {
            const filter = this.constructor.parseNodesFactory(options);

            return this.parseNodesDeep(
                nodes,
                options.context || this._context,
                filter,
                options.html,
                true
            );
        },

        /**
         * Return a filtered array of nodes.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
         * @param {object} [options] The options for filtering.
         * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
         * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
         * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
         * @param {Boolean} [options.document=false] Whether to allow Document.
         * @param {Boolean} [options.window=false] Whether to allow Window.
         * @param {Boolean} [options.html=false] Whether to allow HTML strings.
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} [options.context=this._context] The Document context.
         * @returns {array} The filtered array of nodes.
         */
        parseNodes(nodes, options = {}) {
            const filter = this.constructor.parseNodesFactory(options);

            return this.parseNodesDeep(
                nodes,
                options.context || this._context,
                filter,
                options.html
            );
        },

        /**
         * Recursively parse nodes.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} context The context node(s), or a query selector string.
         * @param {DOM~nodeCallback} [filter] The callback to use for filtering nodes.
         * @param {Boolean} [first=false] Whether to only return the first result.
         * @returns {array|Node|DocumentFragment|ShadowRoot|Document|Window} The parsed node(s).
         */
        parseNodesDeep(nodes, context, filter, html = false, first = false) {

            // check nodes
            if (!nodes) {
                return first ?
                    null :
                    [];
            }

            // String
            if (Core.isString(nodes)) {
                // HTML string
                if (html && nodes.trim().charAt(0) === '<') {
                    return this.parseHTML(nodes);
                }

                // query selector
                if (!first) {
                    return this.find(nodes, context);
                }

                const node = this.findOne(nodes, context);
                return node ?
                    node :
                    null;
            }

            // Node/HTMLElement/Window/Document
            if (filter(nodes)) {
                return first ?
                    nodes :
                    [nodes];
            }

            // QuerySet
            if ('QuerySet' in window && nodes instanceof QuerySet) {
                if (!first) {
                    return nodes.get().filter(filter);
                }

                const node = nodes.get(0);
                return node && filter(node) ?
                    node :
                    null;
            }

            // HTMLCollection
            if (nodes instanceof HTMLCollection) {
                if (!first) {
                    return Core.wrap(nodes);
                }

                return nodes.length ?
                    nodes.item(0) :
                    null;
            }

            // Array
            if (Core.isArray(nodes)) {
                const subFilter = this.constructor.parseNodesFactory({
                    node: true,
                    fragment: true,
                    shadow: true,
                    document: true,
                    window: true
                });
                nodes = nodes.flatMap(node =>
                    this.parseNodesDeep(node, context, subFilter, html)
                );
            } else {
                nodes = Core.wrap(nodes);
            }

            if (nodes.length) {
                nodes = Core.unique(nodes);
            }

            if (!first) {
                return nodes.filter(filter);
            }

            const node = nodes.shift();
            return node && filter(node) ?
                node :
                null;
        }

    });

    /**
     * DOM Selection
     */

    Object.assign(DOM.prototype, {

        /**
         * Insert each node after the selection.
         * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
         */
        afterSelection(nodes) {

            // ShadowRoot nodes can not be moved
            nodes = this.parseNodes(nodes, {
                node: true,
                fragment: true,
                html: true
            }).reverse();

            const selection = window.getSelection();

            if (!selection.rangeCount) {
                return;
            }

            const range = selection.getRangeAt(0);

            selection.removeAllRanges();
            range.collapse();

            for (const node of nodes) {
                range.insertNode(node);
            }
        },

        /**
         * Insert each node before the selection.
         * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
         */
        beforeSelection(nodes) {

            // ShadowRoot nodes can not be moved
            nodes = this.parseNodes(nodes, {
                node: true,
                fragment: true,
                html: true
            }).reverse();

            const selection = window.getSelection();

            if (!selection.rangeCount) {
                return;
            }

            const range = selection.getRangeAt(0);

            selection.removeAllRanges();

            for (const node of nodes) {
                range.insertNode(node);
            }
        },

        /**
         * Extract selected nodes from the DOM.
         * @returns {array} The selected nodes.
         */
        extractSelection() {
            const selection = window.getSelection();

            if (!selection.rangeCount) {
                return [];
            }

            const range = selection.getRangeAt(0);

            selection.removeAllRanges();

            const fragment = range.extractContents();

            return Core.wrap(fragment.childNodes);
        },

        /**
         * Return all selected nodes.
         * @returns {array} The selected nodes.
         */
        getSelection() {
            const selection = window.getSelection();

            if (!selection.rangeCount) {
                return [];
            }

            const range = selection.getRangeAt(0),
                nodes = Core.wrap(
                    range.commonAncestorContainer.querySelectorAll('*')
                );

            if (!nodes.length) {
                return [range.commonAncestorContainer];
            }

            if (nodes.length === 1) {
                return nodes;
            }

            const startContainer = range.startContainer,
                endContainer = range.endContainer,
                start = (Core.isElement(startContainer) ?
                    startContainer :
                    startContainer.parentNode),
                end = (Core.isElement(endContainer) ?
                    endContainer :
                    endContainer.parentNode);

            const selectedNodes = nodes.slice(
                nodes.indexOf(start),
                nodes.indexOf(end) + 1
            );
            const results = [];

            let lastNode;
            for (const node of selectedNodes) {
                if (lastNode && lastNode.contains(node)) {
                    continue;
                }

                lastNode = node;
                results.push(node);
            }

            return results;
        },

        /**
         * Create a selection on the first node.
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         */
        select(nodes) {
            const node = this.parseNode(nodes, {
                node: true
            });

            if (node && 'select' in node) {
                return node.select();
            }

            const selection = window.getSelection();

            if (selection.rangeCount > 0) {
                selection.removeAllRanges();
            }

            if (!node) {
                return;
            }

            const range = this.createRange();
            range.selectNode(node);
            selection.addRange(range);
        },

        /**
         * Create a selection containing all of the nodes.
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         */
        selectAll(nodes) {
            nodes = this.sort(nodes);

            const selection = window.getSelection();

            if (selection.rangeCount) {
                selection.removeAllRanges();
            }

            if (!nodes.length) {
                return;
            }

            const range = this.createRange();

            if (nodes.length == 1) {
                range.selectNode(nodes.shift());
            } else {
                range.setStartBefore(nodes.shift());
                range.setEndAfter(nodes.pop());
            }

            selection.addRange(range);
        },

        /**
         * Wrap selected nodes with other nodes.
         * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
         */
        wrapSelection(nodes) {

            // ShadowRoot nodes can not be cloned
            nodes = this.parseNodes(nodes, {
                fragment: true,
                html: true
            });

            const selection = window.getSelection();

            if (!selection.rangeCount) {
                return;
            }

            const range = selection.getRangeAt(0);

            selection.removeAllRanges();

            const fragment = range.extractContents(),
                deepest = this.constructor._deepest(nodes.slice().shift()),
                children = Core.wrap(fragment.childNodes);

            for (const child of children) {
                deepest.insertBefore(child, null);
            }

            for (const node of nodes) {
                range.insertNode(node);
            }
        }

    });

    /**
     * DOM Tests
     */

    Object.assign(DOM.prototype, {

        /**
         * Returns true if any of the nodes has an animation.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {Boolean} TRUE if any of the nodes has an animation, otherwise FALSE.
         */
        hasAnimation(nodes) {
            return this.parseNodes(nodes)
                .some(node =>
                    Animation._animations.has(node)
                );
        },

        /**
         * Returns true if any of the nodes has a specified attribute.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} attribute The attribute name.
         * @returns {Boolean} TRUE if any of the nodes has the attribute, otherwise FALSE.
         */
        hasAttribute(nodes, attribute) {
            return this.parseNodes(nodes)
                .some(node =>
                    node.hasAttribute(attribute)
                );
        },

        /**
         * Returns true if any of the nodes has child nodes.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {Boolean} TRUE if the any of the nodes has child nodes, otherwise FALSE.
         */
        hasChildren(nodes) {
            return this.parseNodes(nodes, {
                fragment: true,
                shadow: true,
                document: true
            }).some(node =>
                !!node.childElementCount
            );
        },

        /**
         * Returns true if any of the nodes has any of the specified classes.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {...string|string[]} classes The classes.
         * @returns {Boolean} TRUE if any of the nodes has any of the classes, otherwise FALSE.
         */
        hasClass(nodes, ...classes) {
            classes = this.constructor._parseClasses(classes);

            return this.parseNodes(nodes)
                .some(node =>
                    classes.some(className =>
                        node.classList.contains(className)
                    )
                );
        },

        /**
         * Returns true if any of the nodes has a CSS animation.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {Boolean} TRUE if any of the nodes has a CSS animation, otherwise FALSE.
         */
        hasCSSAnimation(nodes) {
            return this.parseNodes(nodes)
                .some(node =>
                    this.constructor._hasCSSAnimation(node)
                );
        },

        /**
         * Returns true if any of the nodes has a CSS transition.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {Boolean} TRUE if any of the nodes has a CSS transition, otherwise FALSE.
         */
        hasCSSTransition(nodes) {
            return this.parseNodes(nodes)
                .some(node =>
                    this.constructor._hasCSSTransition(node)
                );
        },

        /**
         * Returns true if any of the nodes has custom data.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} [key] The data key.
         * @returns {Boolean} TRUE if any of the nodes has custom data, otherwise FALSE.
         */
        hasData(nodes, key) {
            return this.parseNodes(nodes, {
                fragment: true,
                shadow: true,
                document: true,
                window: true
            }).some(node =>
                this.constructor._hasData(node, key)
            );
        },

        /**
         * Returns true if any of the nodes contains a descendent matching a filter.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {Boolean} TRUE if any of the nodes contains a descendent matching the filter, otherwise FALSE.
         */
        hasDescendent(nodes, filter) {
            filter = this.parseFilterContains(filter);

            return this.parseNodes(nodes, {
                fragment: true,
                shadow: true,
                document: true
            }).some(node =>
                !filter || filter(node)
            );
        },

        /**
         * Returns true if any of the nodes has a DocumentFragment.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {Boolean} TRUE if any of the nodes has a DocumentFragment, otherwise FALSE.
         */
        hasFragment(nodes) {
            return this.parseNodes(nodes)
                .some(node =>
                    !!node.content
                );
        },

        /**
         * Returns true if any of the nodes has a specified property.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} property The property name.
         * @returns {Boolean} TRUE if any of the nodes has the property, otherwise FALSE.
         */
        hasProperty(nodes, property) {
            return this.parseNodes(nodes)
                .some(node =>
                    node.hasOwnProperty(property)
                );
        },

        /**
         * Returns true if any of the nodes has a ShadowRoot.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {Boolean} TRUE if any of the nodes has a ShadowRoot, otherwise FALSE.
         */
        hasShadow(nodes) {
            return this.parseNodes(nodes)
                .some(node =>
                    !!node.shadowRoot
                );
        },

        /**
         * Returns true if any of the nodes matches a filter.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {Boolean} TRUE if any of the nodes matches the filter, otherwise FALSE.
         */
        is(nodes, filter) {
            filter = this.parseFilter(filter);

            return this.parseNodes(nodes, {
                node: true,
                fragment: true,
                shadow: true
            }).some(node =>
                !filter || filter(node)
            );
        },

        /**
         * Returns true if any of the nodes is connected to the DOM.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {Boolean} TRUE if any of the nodes is connected to the DOM, otherwise FALSE.
         */
        isConnected(nodes) {
            return this.parseNodes(nodes, {
                node: true,
                fragment: true,
                shadow: true
            }).some(node => node.isConnected);
        },

        /**
         * Returns true if any of the nodes is considered equal to any of the other nodes.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
         * @returns {Boolean} TRUE if any of the nodes is considered equal to any of the other nodes, otherwise FALSE.
         */
        isEqual(nodes, others) {
            others = this.parseNodes(others, {
                node: true,
                fragment: true,
                shadow: true
            });

            return this.parseNodes(nodes, {
                node: true,
                fragment: true,
                shadow: true
            }).some(node =>
                others.some(other =>
                    node.isEqualNode(other)
                )
            );
        },

        /**
         * Returns true if any of the nodes or a parent of any of the nodes is "fixed".
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {Boolean} TRUE if any of the nodes is "fixed", otherwise FALSE.
         */
        isFixed(nodes) {
            return this.parseNodes(nodes, {
                node: true
            }).some(node =>
                (
                    Core.isElement(node) &&
                    this.constructor._css(node, 'position') === 'fixed'
                ) ||
                this.constructor._parents(
                    node,
                    parent =>
                        Core.isElement(parent) &&
                        this.constructor._css(parent, 'position') === 'fixed',
                    false,
                    true
                ).length
            );
        },

        /**
         * Returns true if any of the nodes is hidden.
         * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {Boolean} TRUE if any of the nodes is hidden, otherwise FALSE.
         */
        isHidden(nodes) {
            return this.parseNodes(nodes, {
                node: true,
                document: true,
                window: true
            }).some(node =>
                !this.constructor._isVisible(node)
            );
        },

        /**
         * Returns true if any of the nodes is considered identical to any of the other nodes.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
         * @returns {Boolean} TRUE if any of the nodes is considered identical to any of the other nodes, otherwise FALSE.
         */
        isSame(nodes, others) {
            others = this.parseNodes(others, {
                node: true,
                fragment: true,
                shadow: true
            });

            return this.parseNodes(nodes, {
                node: true,
                fragment: true,
                shadow: true
            }).some(node =>
                others.some(other =>
                    node.isSameNode(other)
                )
            );
        },

        /**
         * Returns true if any of the nodes is visible.
         * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {Boolean} TRUE if any of the nodes is visible, otherwise FALSE.
         */
        isVisible(nodes) {
            return this.parseNodes(nodes, {
                node: true,
                document: true,
                window: true
            }).some(node =>
                this.constructor._isVisible(node)
            );
        }

    });

    /**
     * DOM Utility
     */

    Object.assign(DOM.prototype, {

        /**
         * Execute a command in the document context.
         * @param {string} command The command to execute.
         * @param {string} [value] The value to give the command.
         * @returns {Boolean} TRUE if the command was executed, otherwise FALSE.
         */
        exec(command, value = null) {
            return this._context.execCommand(command, false, value);
        },

        /**
         * Force a node to be shown, and then execute a callback.
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {DOM~nodeCallback} callback The callback to execute.
         * @returns {*} The result of the callback.
         */
        forceShow(nodes, callback) {

            // DocumentFragment and ShadowRoot nodes have no parent
            const node = this.parseNode(nodes, {
                node: true
            });

            if (!node) {
                return;
            }

            return this.constructor._forceShow(node, callback);
        },

        /**
         * Get the index of the first node relative to it's parent.
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {number} The index.
         */
        index(nodes) {
            const node = this.parseNode(nodes, {
                node: true
            });

            if (!node) {
                return;
            }

            return Core.wrap(
                node.parentNode.children
            ).indexOf(node);
        },

        /**
         * Get the index of the first node matching a filter.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {number} The index.
         */
        indexOf(nodes, filter) {
            filter = this.parseFilter(filter);

            return this.parseNodes(nodes, {
                node: true,
                fragment: true,
                shadow: true
            }).findIndex(node =>
                !filter || filter(node)
            );
        },

        /**
         * Normalize nodes (remove empty text nodes, and join adjacent text nodes).
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         */
        normalize(nodes) {
            nodes = this.parseNodes(nodes, {
                node: true,
                fragment: true,
                shadow: true,
                document: true
            });

            for (const node of nodes) {
                node.normalize();
            }
        },

        /**
         * Sanitize a HTML string.
         * @param {string} html The input HTML string.
         * @param {object} [allowedTags] An object containing allowed tags and attributes.
         * @returns {string} The sanitized HTML string.
         */
        sanitize(html, allowedTags = DOM.allowedTags) {
            const template = this.create('template', { html }),
                fragment = template.content,
                children = this.constructor._children(fragment, null, false, true);

            for (const child of children) {
                this.constructor._sanitize(child, fragment, allowedTags);
            }

            return this.getHTML(template);
        },

        /**
         * Return a serialized string containing names and values of all form nodes.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {string} The serialized string.
         */
        serialize(nodes) {
            return AjaxRequest._parseParams(
                this.serializeArray(nodes)
            );
        },

        /**
         * Return a serialized array containing names and values of all form nodes.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {array} The serialized array.
         */
        serializeArray(nodes) {
            return this.parseNodes(nodes, {
                fragment: true,
                shadow: true
            }).reduce(
                (values, node) => {
                    if (
                        (
                            Core.isElement(node) &&
                            node.matches('form')
                        ) ||
                        Core.isFragment(node) ||
                        Core.isShadow(node)
                    ) {
                        return values.concat(
                            this.serializeArray(
                                node.querySelectorAll(
                                    'input, select, textarea'
                                )
                            )
                        );
                    }

                    if (
                        Core.isElement(node) &&
                        node.matches('[disabled], input[type=submit], input[type=reset], input[type=file], input[type=radio]:not(:checked), input[type=checkbox]:not(:checked)')
                    ) {
                        return values;
                    }

                    const name = node.getAttribute('name');
                    if (!name) {
                        return values;
                    }

                    if (
                        Core.isElement(node) &&
                        node.matches('select[multiple]')
                    ) {
                        for (const option of node.selectedOptions) {
                            values.push(
                                {
                                    name,
                                    value: option.value || ''
                                }
                            );
                        }
                    } else {
                        values.push(
                            {
                                name,
                                value: node.value || ''
                            }
                        );
                    }

                    return values;
                },
                []
            );
        },

        /**
         * Sort nodes by their position in the document.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {array} The sorted array of nodes.
         */
        sort(nodes) {
            nodes = this.parseNodes(nodes, {
                node: true,
                fragment: true,
                shadow: true,
                document: true,
                window: true
            });

            return this.constructor._sort(nodes);
        },

        /**
         * Return the tag name (lowercase) of the first node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {string} The nodes tag name (lowercase).
         */
        tagName(nodes) {
            const node = this.parseNode(nodes);

            if (!node) {
                return;
            }

            return node.tagName.toLowerCase();
        }

    });

    /**
     * DOM (Static) AJAX
     */

    Object.assign(DOM, {

        /**
         * New AjaxRequest constructor.
         * @param {object} [options] The options to use for the request.
         * @param {string} [options.url=window.location] The URL of the request.
         * @param {string} [options.method=GET] The HTTP method of the request.
         * @param {Boolean|string|array|object|FormData} [options.data=null] The data to send with the request.
         * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
         * @param {Boolean|string} [options.responseType] The content type of the response.
         * @param {Boolean} [options.cache=true] Whether to cache the request.
         * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
         * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
         * @param {object} [options.headers] Additional headers to send with the request.
         * @param {Boolean|function} [options.afterSend=null] A callback to execute after making the request.
         * @param {Boolean|function} [options.beforeSend=null] A callback to execute before making the request.
         * @param {Boolean|function} [options.onProgress=null] A callback to execute on download progress.
         * @param {Boolean|function} [options.onUploadProgress=null] A callback to execute on upload progress.
         * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
         */
        ajax(options) {
            return new AjaxRequest(options);
        },

        /**
         * Perform an XHR DELETE request.
         * @param {string} url The URL of the request.
         * @param {object} [options] The options to use for the request.
         * @param {string} [options.method=DELETE] The HTTP method of the request.
         * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
         * @param {Boolean|string} [options.responseType] The content type of the response.
         * @param {Boolean} [options.cache=true] Whether to cache the request.
         * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
         * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
         * @param {object} [options.headers] Additional headers to send with the request.
         * @param {Boolean|function} [options.afterSend=null] A callback to execute after making the request.
         * @param {Boolean|function} [options.beforeSend=null] A callback to execute before making the request.
         * @param {Boolean|function} [options.onProgress=null] A callback to execute on download progress.
         * @param {Boolean|function} [options.onUploadProgress=null] A callback to execute on upload progress.
         * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
         */
        delete(url, options) {
            return new AjaxRequest({
                url,
                method: 'DELETE',
                ...options
            });
        },

        /**
         * Perform an XHR GET request.
         * @param {string} url The URL of the request.
         * @param {string|array|object} data The data to send with the request.
         * @param {object} [options] The options to use for the request.
         * @param {string} [options.method=GET] The HTTP method of the request.
         * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
         * @param {Boolean|string} [options.responseType] The content type of the response.
         * @param {Boolean} [options.cache=true] Whether to cache the request.
         * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
         * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
         * @param {object} [options.headers] Additional headers to send with the request.
         * @param {Boolean|function} [options.afterSend=null] A callback to execute after making the request.
         * @param {Boolean|function} [options.beforeSend=null] A callback to execute before making the request.
         * @param {Boolean|function} [options.onProgress=null] A callback to execute on download progress.
         * @param {Boolean|function} [options.onUploadProgress=null] A callback to execute on upload progress.
         * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
         */
        get(url, data, options) {
            return new AjaxRequest({
                url,
                data,
                ...options
            });
        },

        /**
         * Perform an XHR PATCH request.
         * @param {string} url The URL of the request.
         * @param {string|array|object|FormData} data The data to send with the request.
         * @param {object} [options] The options to use for the request.
         * @param {string} [options.method=PATCH] The HTTP method of the request.
         * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
         * @param {Boolean|string} [options.responseType] The content type of the response.
         * @param {Boolean} [options.cache=true] Whether to cache the request.
         * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
         * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
         * @param {object} [options.headers] Additional headers to send with the request.
         * @param {Boolean|function} [options.afterSend=null] A callback to execute after making the request.
         * @param {Boolean|function} [options.beforeSend=null] A callback to execute before making the request.
         * @param {Boolean|function} [options.onProgress=null] A callback to execute on download progress.
         * @param {Boolean|function} [options.onUploadProgress=null] A callback to execute on upload progress.
         * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
         */
        patch(url, data, options) {
            return new AjaxRequest({
                url,
                data,
                method: 'PATCH',
                ...options
            });
        },

        /**
         * Perform an XHR POST request.
         * @param {string} url The URL of the request.
         * @param {string|array|object|FormData} data The data to send with the request.
         * @param {object} [options] The options to use for the request.
         * @param {string} [options.method=POST] The HTTP method of the request.
         * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
         * @param {Boolean|string} [options.responseType] The content type of the response.
         * @param {Boolean} [options.cache=true] Whether to cache the request.
         * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
         * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
         * @param {object} [options.headers] Additional headers to send with the request.
         * @param {Boolean|function} [options.afterSend=null] A callback to execute after making the request.
         * @param {Boolean|function} [options.beforeSend=null] A callback to execute before making the request.
         * @param {Boolean|function} [options.onProgress=null] A callback to execute on download progress.
         * @param {Boolean|function} [options.onUploadProgress=null] A callback to execute on upload progress.
         * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
         */
        post(url, data, options) {
            return new AjaxRequest({
                url,
                data,
                method: 'POST',
                ...options
            });
        },

        /**
         * Perform an XHR PUT request.
         * @param {string} url The URL of the request.
         * @param {string|array|object|FormData} data The data to send with the request.
         * @param {object} [options] The options to use for the request.
         * @param {string} [options.method=PUT] The HTTP method of the request.
         * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
         * @param {Boolean|string} [options.responseType] The content type of the response.
         * @param {Boolean} [options.cache=true] Whether to cache the request.
         * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
         * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
         * @param {object} [options.headers] Additional headers to send with the request.
         * @param {Boolean|function} [options.afterSend=null] A callback to execute after making the request.
         * @param {Boolean|function} [options.beforeSend=null] A callback to execute before making the request.
         * @param {Boolean|function} [options.onProgress=null] A callback to execute on download progress.
         * @param {Boolean|function} [options.onUploadProgress=null] A callback to execute on upload progress.
         * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
         */
        put(url, data, options) {
            return new AjaxRequest({
                url,
                data,
                method: 'PUT',
                ...options
            });
        }

    });

    /**
     * DOM (Static) Queue
     */

    Object.assign(DOM, {

        /**
         * Clear the queue of a single node.
         * @param {HTMLElement} node The input node.
         */
        _clearQueue(node) {
            if (!this._queues.has(node)) {
                return;
            }

            this._queues.delete(node);
        },

        /**
         * Run the next callback for a single node.
         * @param {HTMLElement} node The input node.
         */
        _dequeueNode(node) {
            if (!this._queues.has(node)) {
                return;
            }

            const next = this._queues.get(node).shift();

            if (!next) {
                this._queues.delete(node);
                return;
            }

            Promise.resolve(next(node))
                .then(_ =>
                    this._dequeueNode(node)
                ).catch(_ =>
                    this._clearQueue(node)
                );
        },

        /**
         * Queue a callback on a single node.
         * @param {HTMLElement} node The input node.
         * @param {DOM~queueCallback} callback The callback to queue.
         */
        _queue(node, callback) {
            const newQueue = !this._queues.has(node);

            if (newQueue) {
                this._queues.set(node, [
                    _ => new Promise(
                        resolve => setTimeout(resolve, 0)
                    )
                ]);
            }

            this._queues.get(node).push(callback);

            if (newQueue) {
                this._dequeueNode(node);
            }
        }

    });

    /**
     * DOM (Static) Attributes
     */

    Object.assign(DOM, {

        /**
         * Get attribute value(s) for a single node.
         * @param {HTMLElement} node The input node.
         * @param {string} [attribute] The attribute name.
         * @returns {string|object} The attribute value, or an object containing attributes.
         */
        _getAttribute(node, attribute) {
            if (attribute) {
                return node.getAttribute(attribute);
            }

            const attributes = {};

            for (const attr of node.attributes) {
                attributes[attr.nodeName] = attr.nodeValue;
            }

            return attributes;
        },

        /**
         * Get dataset value(s) for a single node.
         * @param {HTMLElement} node The input node.
         * @param {string} [key] The dataset key.
         * @returns {string|object} The dataset value, or an object containing the dataset.
         */
        _getDataset(node, key) {
            if (key) {
                key = Core.camelCase(key);

                return this._parseDataset(
                    node.dataset[key]
                );
            }

            const dataset = {};

            for (const k in node.dataset) {
                dataset[k] = this._parseDataset(node.dataset[k]);
            }

            return dataset;
        },

        /**
         * Remove a dataset value from a single node.
         * @param {HTMLElement} node The input node.
         * @param {string} key The dataset key.
         */
        _removeDataset(node, key) {
            key = Core.camelCase(key);

            delete node.dataset[key];
        },

        /**
         * Set an attribute value for a single node.
         * @param {HTMLElement} node The input node.
         * @param {object} attributes An object containing attributes.
         */
        _setAttribute(node, attributes) {
            for (const key in attributes) {
                node.setAttribute(key, attributes[key]);
            }
        },

        /**
         * Set dataset values for a single node.
         * @param {HTMLElement} node The input node.
         * @param {object} dataset An object containing dataset values.
         */
        _setDataset(node, dataset) {
            for (const key in dataset) {
                const realKey = Core.camelCase(key);
                node.dataset[realKey] = dataset[key];
            }
        }

    });

    /**
     * DOM (Static) Data
     */

    Object.assign(DOM, {

        /**
         * Clone custom data from a single node to each other node.
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} other The other node.
         */
        _cloneData(node, other) {
            if (!this._data.has(node)) {
                return;
            }

            this._setData(other, {
                ...this._data.get(node)
            });
        },

        /**
         * Get custom data for a single node.
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
         * @param {string} [key] The data key.
         * @returns {*} The data value.
         */
        _getData(node, key) {
            if (!this._data.has(node)) {
                return;
            }

            if (!key) {
                return this._data.get(node);
            }

            return this._data.get(node)[key];
        },

        /**
         * Remove custom data from a single node.
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
         * @param {string} [key] The data key.
         */
        _removeData(node, key) {
            if (!this._data.has(node)) {
                return;
            }

            if (key) {
                const data = this._data.get(node);

                delete data[key];

                if (Object.keys(data).length) {
                    return;
                }
            }

            this._data.delete(node);
        },

        /**
         * Set custom data for a single node.
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
         * @param {object} data An object containing data.
         */
        _setData(node, data) {
            if (!this._data.has(node)) {
                this._data.set(node, {});
            }

            Object.assign(
                this._data.get(node),
                data
            );
        }

    });

    /**
     * DOM (Static) Position
     */

    Object.assign(DOM, {

        /**
         * Constrain a single node to a container box.
         * @param {HTMLElement} node The input node.
         * @param {DOMRect} containerBox The container box.
         */
        _constrain(node, containerBox) {
            const nodeBox = this._rect(node);

            const style = {};

            if (nodeBox.height > containerBox.height) {
                style.height = containerBox.height;
            }

            if (nodeBox.width > containerBox.width) {
                style.width = containerBox.width;
            }

            let leftOffset;
            if (nodeBox.left - containerBox.left < 0) {
                leftOffset = nodeBox.left - containerBox.left
            } else if (nodeBox.right - containerBox.right > 0) {
                leftOffset = nodeBox.right - containerBox.right;
            }

            if (leftOffset) {
                const oldLeft = this._css(node, 'left');
                const trueLeft = oldLeft && oldLeft !== 'auto' ? parseFloat(oldLeft) : 0;
                style.left = `${trueLeft - leftOffset}px`;
            }

            let topOffset;
            if (nodeBox.top - containerBox.top < 0) {
                topOffset = nodeBox.top - containerBox.top;
            } else if (nodeBox.bottom - containerBox.bottom > 0) {
                topOffset = nodeBox.bottom - containerBox.bottom;
            }

            if (topOffset) {
                const oldTop = this._css(node, 'top');
                const trueTop = oldTop && oldTop !== 'auto' ? parseFloat(oldTop) : 0;
                style.top = `${trueTop - topOffset}px`;
            }

            if (this._css(node, 'position') === 'static') {
                style.position = 'relative';
            }

            this._setStyle(node, style);
        },

        /**
         * Get the position of the a single node relative to the Window or Document.
         * @param {HTMLElement} node The input node.
         * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
         * @returns {object} An object with the X and Y co-ordinates.
         */
        _position(node, offset) {
            return this._forceShow(node, node => {
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
            });
        },

        /**
         * Get the computed bounding rectangle of a single node.
         * @param {HTMLElement} node The input node.
         * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
         * @returns {DOMRect} The computed bounding rectangle.
         */
        _rect(node, offset) {
            return this._forceShow(node, node => {
                const result = node.getBoundingClientRect();

                if (offset) {
                    result.x += window.scrollX;
                    result.y += window.scrollY;
                }

                return result;
            });
        }

    });

    /**
     * DOM (Static) Size
     */

    Object.assign(DOM, {

        /**
         * Get the computed height of a single node.
         * @param {HTMLElement} node The input node.
         * @param {number} [innerOuter=1] Whether to include padding, border and margin heights.
         * @returns {number} The height.
         */
        _height(node, innerOuter = 1) {
            return this._forceShow(node, node => {
                if (Core.isDocument(node)) {
                    node = node.documentElement;
                }

                let result = node.clientHeight;

                if (innerOuter === this.INNER) {
                    result -= parseInt(this._css(node, 'padding-top'))
                        + parseInt(this._css(node, 'padding-bottom'));
                }

                if (innerOuter >= this.OUTER) {
                    result += parseInt(this._css(node, 'border-top-width'))
                        + parseInt(this._css(node, 'border-bottom-width'));
                }

                if (innerOuter === this.OUTER_MARGIN) {
                    result += parseInt(this._css(node, 'margin-top'))
                        + parseInt(this._css(node, 'margin-bottom'));
                }

                return result;
            });
        },

        /**
         * Get the scroll height of a single node.
         * @param {HTMLElement} node The input node.
         * @returns {number} The scroll height.
         */
        _scrollHeight(node) {
            return this._forceShow(node, node => {
                if (Core.isDocument(node)) {
                    node = node.documentElement;
                }

                return node.scrollHeight;
            });
        },

        /**
         * Get the scroll width of a single node.
         * @param {HTMLElement} node The input node.
         * @returns {number} The scroll width.
         */
        _scrollWidth(node) {
            return this._forceShow(node, node => {
                if (Core.isDocument(node)) {
                    node = node.documentElement;
                }

                return node.scrollWidth;
            });
        },

        /**
         * Get the computed width of a single node.
         * @param {HTMLElement} node The input node.
         * @param {number} [innerOuter] Whether to include padding, border and margin widths.
         * @returns {number} The width.
         */
        _width(node, innerOuter = 1) {
            return this._forceShow(node, node => {
                if (Core.isDocument(node)) {
                    node = node.documentElement;
                }

                let result = node.clientWidth;

                if (innerOuter === this.INNER) {
                    result -= parseInt(this._css(node, 'padding-left'))
                        + parseInt(this._css(node, 'padding-right'));
                }

                if (innerOuter >= this.OUTER) {
                    result += parseInt(this._css(node, 'border-left-width'))
                        + parseInt(this._css(node, 'border-right-width'));
                }

                if (innerOuter === this.OUTER_MARGIN) {
                    result += parseInt(this._css(node, 'margin-left'))
                        + parseInt(this._css(node, 'margin-right'));
                }

                return result;
            });
        }

    });

    /**
     * DOM (Static) Styles
     */

    Object.assign(DOM, {

        /**
         * Get computed CSS style value(s) for a single node.
         * @param {HTMLElement} node The input node.
         * @param {string} [style] The CSS style name.
         * @returns {string|object} The CSS style value, or an object containing the computed CSS style properties.
         */
        _css(node, style) {
            if (!this._styles.has(node)) {
                this._styles.set(
                    node,
                    window.getComputedStyle(node)
                );
            }

            if (!style) {
                return {
                    ...this._styles.get(node)
                };
            }

            style = Core.kebabCase(style);

            return this._styles.get(node)
                .getPropertyValue(style);
        },

        /**
         * Get style properties for a single node.
         * @param {HTMLElement} node The input node.
         * @param {string} [style] The style name.
         * @returns {string|object} The style value, or an object containing the style properties.
         */
        _getStyle(node, style) {
            if (style) {
                style = Core.kebabCase(style);

                return node.style[style];
            }

            const styles = {};

            for (const style of node.style) {
                styles[style] = node.style[style];
            }

            return styles;
        },

        /**
         * Set style properties for a single node.
         * @param {HTMLElement} node The input node.
         * @param {object} styles An object containing styles.
         * @param {Boolean} [important] Whether the style should be !important.
         */
        _setStyle(node, styles, important) {
            for (let style in styles) {
                let value = styles[style];
                style = Core.kebabCase(style);

                // if value is numeric and not a number property, add px
                if (value && Core.isNumeric(value) && !this.cssNumberProperties.includes(style)) {
                    value += 'px';
                }

                node.style.setProperty(
                    style,
                    value,
                    important ?
                        'important' :
                        ''
                );
            }
        }

    });

    /**
     * DOM (Static) Event Factory
     */

    Object.assign(DOM, {

        /**
         * Return a wrapped event callback that executes on a delegate selector.
         * @param {HTMLElement|ShadowRoot|Document} node The input node.
         * @param {string} selector The delegate query selector.
         * @param {function} callback The event callback.
         * @returns {DOM~eventCallback} The delegated event callback.
         */
        _delegateFactory(node, selector, callback) {
            const getDelegate = selector.match(this._complexRegExp) ?
                this._getDelegateContainsFactory(node, selector) :
                this._getDelegateMatchFactory(node, selector);

            return e => {
                if (node.isSameNode(e.target)) {
                    return;
                }

                const delegate = getDelegate(e.target);

                if (!delegate) {
                    return;
                }

                const event = {};

                for (const key in e) {
                    event[key] = Core.isFunction(e[key]) ?
                        (...args) => e[key](...args) :
                        e[key];
                }

                event.currentTarget = delegate;
                event.delegateTarget = node;
                event.originalEvent = e;

                Object.freeze(event)

                return callback(event);
            };
        },

        /**
         * Return a function for matching a delegate target to a custom selector.
         * @param {HTMLElement|ShadowRoot|Document} node The input node.
         * @param {string} selector The delegate query selector.
         * @returns {DOM~delegateCallback} The callback for finding the matching delegate.
         */
        _getDelegateContainsFactory(node, selector) {
            selector = this._prefixSelectors(selector, ':scope ');

            return target => {
                const matches = Core.wrap(
                    node.querySelectorAll(selector)
                );

                if (!matches.length) {
                    return false;
                }

                if (matches.includes(target)) {
                    return target;
                }

                return this._parents(
                    target,
                    parent => matches.includes(parent),
                    parent => parent.isSameNode(node),
                    true
                ).shift();
            };
        },

        /**
         * Return a function for matching a delegate target to a standard selector.
         * @param {HTMLElement|ShadowRoot|Document} node The input node.
         * @param {string} selector The delegate query selector.
         * @returns {DOM~delegateCallback} The callback for finding the matching delegate.
         */
        _getDelegateMatchFactory(node, selector) {
            return target =>
                target.matches(selector) ?
                    target :
                    this._parents(
                        target,
                        parent => parent.matches(selector),
                        parent => parent.isSameNode(node),
                        true
                    ).shift();
        },

        /**
         * Return a wrapped event callback that check for a namespace match.
         * @param {string} event The namespaced event name.
         * @param {DOM~eventCallback} callback The callback to execute.
         * @returns {DOM~eventCallback} The wrapped event callback.
         */
        _namespaceFactory(event, callback) {
            return e => {
                if ('namespaceRegExp' in e && !e.namespaceRegExp.test(event)) {
                    return;
                }

                return callback(e);
            };
        },

        /**
         * Return a wrapped event callback that removes itself after execution.
         * @param {HTMLElement|ShadowRoot|Document|Window} node The input node.
         * @param {string} events The event names.
         * @param {string} delegate The delegate selector.
         * @param {DOM~eventCallback} callback The callback to execute.
         * @returns {DOM~eventCallback} The wrapped event callback.
         */
        _selfDestructFactory(node, events, delegate, callback) {
            return e => {
                this._removeEvent(node, events, callback, delegate);
                return callback(e);
            };
        }

    });

    /**
     * DOM (Static) Event Handlers
     */

    Object.assign(DOM, {

        /**
         * Add an event to a single node.
         * @param {HTMLElement|ShadowRoot|Document|Window} node The input node.
         * @param {string} event The event name.
         * @param {DOM~eventCallback} callback The callback to execute.
         * @param {string} [delegate] The delegate selector.
         * @param {Boolean} [selfDestruct] Whether to remove the event after triggering.
         */
        _addEvent(node, event, callback, delegate, selfDestruct) {
            if (!this._events.has(node)) {
                this._events.set(node, {});
            }

            const nodeEvents = this._events.get(node),
                eventData = {
                    delegate,
                    callback,
                    selfDestruct
                },
                realEvent = this._parseEvent(event);

            let realCallback = callback;

            if (selfDestruct) {
                realCallback = this._selfDestructFactory(node, event, delegate, realCallback);
            }

            if (delegate) {
                realCallback = this._delegateFactory(node, delegate, realCallback);
            }

            realCallback = this._namespaceFactory(event, realCallback);

            eventData.realCallback = realCallback;
            eventData.event = event;
            eventData.realEvent = realEvent;

            if (!nodeEvents[realEvent]) {
                nodeEvents[realEvent] = [];
            } else if (nodeEvents[realEvent].includes(eventData)) {
                return;
            }

            nodeEvents[realEvent].push(eventData);

            node.addEventListener(realEvent, realCallback);
        },

        /**
         * Clone all events from a single node to other nodes.
         * @param {HTMLElement|ShadowRoot|Document|Window} nodes The input node.
         * @param {HTMLElement|ShadowRoot|Document|Window} other The other node.
         */
        _cloneEvents(node, other) {
            if (!this._events.has(node)) {
                return;
            }

            const nodeEvents = this._events.get(node);
            for (const event in nodeEvents) {
                for (const eventData of nodeEvents[event]) {
                    this._addEvent(
                        other,
                        eventData.event,
                        eventData.callback,
                        eventData.delegate,
                        eventData.selfDestruct
                    );
                }
            }
        },

        /**
         * Remove an event from a single node.
         * @param {HTMLElement|ShadowRoot|Document|Window} nodes The input node.
         * @param {string} [event] The event name.
         * @param {DOM~eventCallback} [callback] The callback to remove.
         * @param {string} [delegate] The delegate selector.
         */
        _removeEvent(node, event, callback, delegate) {
            if (!this._events.has(node)) {
                return;
            }

            const nodeEvents = this._events.get(node);

            if (!event) {
                const realEvents = Object.keys(nodeEvents);

                for (const realEvent of realEvents) {
                    this._removeEvent(node, realEvent, callback, delegate);
                }

                return;
            }

            const realEvent = this._parseEvent(event);

            if (!nodeEvents[realEvent]) {
                return;
            }

            nodeEvents[realEvent] = nodeEvents[realEvent].filter(eventData => {
                if (
                    (
                        delegate &&
                        delegate !== eventData.delegate
                    ) ||
                    (
                        callback &&
                        callback !== eventData.callback
                    )
                ) {
                    return true;
                }

                if (realEvent !== event) {
                    const regExp = this._eventNamespacedRegExp(event);

                    if (!eventData.event.match(regExp)) {
                        return true;
                    }
                }

                node.removeEventListener(eventData.realEvent, eventData.realCallback);

                return false;
            });

            if (!nodeEvents[realEvent].length) {
                delete nodeEvents[realEvent];
            }

            if (Object.keys(nodeEvents).length) {
                return;
            }

            this._events.delete(node);
        },

        /**
         * Trigger an event on a single node.
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
         * @param {string} event The event name.
         * @param {object} [options] The options to use for the Event.
         * @param {*} [options.detail] Additional data to attach to the event.
         * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
         * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
         * @returns {Boolean} FALSE if the event was cancelled, otherwise TRUE.
         */
        _triggerEvent(node, event, options) {
            const realEvent = this._parseEvent(event);

            const eventData = new CustomEvent(realEvent, {
                bubbles: true,
                cancelable: true,
                ...options
            });

            if (realEvent !== event) {
                eventData.namespace = event.substring(realEvent.length + 1);
                eventData.namespaceRegExp = this._eventNamespacedRegExp(event);
            }

            return node.dispatchEvent(eventData);
        }

    });

    /**
     * DOM (Static) Helpers
     */

    Object.assign(DOM, {

        /**
         * Return a RegExp for testing a namespaced event.
         * @param {string} event The namespaced event.
         * @returns {RegExp} The namespaced event RegExp.
         */
        _eventNamespacedRegExp(event) {
            return new RegExp(`^${Core.escapeRegExp(event)}(?:\\.|$)`, 'i');
        },

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
         * @param {Boolean} [json=false] Whether to JSON encode the values.
         * @returns {object} The data object.
         */
        _parseData(key, value, json = false) {
            const obj = Core.isObject(key) ?
                key :
                { [key]: value };

            const result = {};

            for (const k in obj) {
                const v = obj[k];
                result[k] = json && (Core.isObject(v) || Core.isArray(v)) ?
                    JSON.stringify(v) :
                    v;
            }

            return result;
        },

        /**
         * Return a JS primitive from a dataset string.
         * @param {string} value The input value.
         * @return {*} The parsed value.
         */
        _parseDataset(value) {
            if (Core.isUndefined(value)) {
                return value;
            }

            const lower = value.toLowerCase().trim();

            if (['true', 'on'].includes(lower)) {
                return true;
            }

            if (['false', 'off'].includes(lower)) {
                return false;
            }

            if (lower === 'null') {
                return null;
            }

            if (Core.isNumeric(lower)) {
                return parseFloat(lower);
            }

            if (['{', '['].includes(lower.charAt(0))) {
                try {
                    const result = JSON.parse(value);
                    return result;
                } catch (e) { }
            }

            return value;
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
         * Return a prefixed selector string.
         * @param {string} selectors The input selectors.
         * @param {string} prefix The input prefix.
         * @returns {string} The prefixed selector.
         */
        _prefixSelectors(selectors, prefix) {
            return selectors.split(this._splitRegExp)
                .filter(selector => !!selector)
                .map(selector =>
                    this._customSelectors.includes(selector.trim().charAt(0)) ?
                        `${prefix} ${selector}` :
                        selector
                )
                .join(', ');
        }

    });

    /**
     * DOM (Static) Manipulation
     */

    Object.assign(DOM, {

        /**
         * Clone a single node.
         * @param {Node|HTMLElement|DocumentFragment} node The input node.
         * @param {object} options Options for cloning the node.
         * @param {Boolean} [options.deep] Whether to also clone all descendent nodes.
         * @param {Boolean} [options.events] Whether to also clone events.
         * @param {Boolean} [options.data] Whether to also clone custom data.
         * @param {Boolean} [options.animations] Whether to also clone animations.
         * @returns {Node|HTMLElement|DocumentFragment} The cloned node.
         */
        _clone(node, options) {
            const clone = node.cloneNode(options.deep);

            if (options.events) {
                this._cloneEvents(node, clone);
            }

            if (options.data) {
                this._cloneData(node, clone);
            }

            if (options.animations) {
                this._cloneAnimations(node, clone);
            }

            if (options.deep) {
                this._deepClone(node, clone, options);
            }

            return clone;
        },

        /**
         * Clone animations for a single node.
         * @param {Node|HTMLElement|DocumentFragment} node The input node.
         * @param {Node|HTMLElement|DocumentFragment} clone The cloned node.
         */
        _cloneAnimations(node, clone) {
            if (!Animation._animations.has(node)) {
                return;
            }

            const animations = Animation._animations.get(node)
                .map(animation =>
                    new Animation(clone, animation._callback, animation._options)
                );

            Animation._animations.set(clone, animations);
        },

        /**
         * Deep clone a node.
         * @param {Node|HTMLElement|DocumentFragment} node The input node.
         * @param {Node|HTMLElement|DocumentFragment} clone The cloned node.
         * @param {object} options Options for cloning the node.
         * @param {Boolean} [options.events] Whether to also clone events.
         * @param {Boolean} [options.data] Whether to also clone custom data.
         * @param {Boolean} [options.animations] Whether to also clone animations.
         */
        _deepClone(node, clone, options) {
            for (let i = 0; i < node.childNodes.length; i++) {
                const child = node.childNodes.item(i);
                const childClone = clone.childNodes.item(i);

                if (options.events) {
                    this._cloneEvents(child, childClone);
                }

                if (options.data) {
                    this._cloneData(child, childClone);
                }

                if (options.animations) {
                    this._cloneAnimations(child, childClone);
                }

                this._deepClone(child, childClone, options);
            }
        },

        /**
         * Remove all children of a single node from the DOM.
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
         */
        _empty(node) {
            // Remove descendent elements
            const children = Core.wrap(node.childNodes);

            for (const child of children) {
                this._remove(child);
                node.removeChild(child);
            }

            // Remove ShadowRoot
            if (node.shadowRoot) {
                this._remove(node.shadowRoot);
            }

            // Remove DocumentFragment
            if (node.content) {
                this._remove(node.content);
            }
        },

        /**
         * Remove a single node from the DOM.
         * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The input node.
         */
        _remove(node) {
            const eventData = new Event('remove');
            node.dispatchEvent(eventData);

            this._empty(node);

            if (Core.isElement(node)) {
                this._clearQueue(node);
                Animation.stop(node);

                if (this._styles.has(node)) {
                    this._styles.delete(node);
                }
            }

            this._removeEvent(node);
            this._removeData(node);
        }

    });

    /**
     * DOM (Static) Wrap
     */

    Object.assign(DOM, {

        /**
         * Unwrap a single node.
         * @param {Node|HTMLElement} parent The input node.
         */
        _unwrap(parent) {
            const outerParent = parent.parentNode;

            if (!outerParent) {
                return;
            }

            const children = Core.wrap(parent.childNodes);

            for (const child of children) {
                outerParent.insertBefore(child, parent);
            }

            this._remove(parent);
            outerParent.removeChild(parent);
        },

        /**
         * Wrap a single node with other nodes.
         * @param {Node|HTMLElement} node The input node.
         * @param {array} others The other node(s).
         */
        _wrap(node, others) {
            const parent = node.parentNode;

            if (!parent) {
                return;
            }

            const clones = others.map(other =>
                this._clone(other, {
                    deep: true,
                    events: true,
                    data: true,
                    animations: true
                })
            );

            const firstClone = clones.slice().shift();

            const deepest = this._deepest(
                Core.isFragment(firstClone) ?
                    firstClone.firstChild :
                    firstClone
            );

            for (const clone of clones) {
                parent.insertBefore(clone, node);
            }

            deepest.insertBefore(node, null);
        },

        /**
         * Wrap all nodes with other nodes.
         * @param {array} nodes The input node(s).
         * @param {array} others The other node(s).
         */
        _wrapAll(nodes, others) {
            const firstNode = nodes[0];

            if (!firstNode) {
                return;
            }

            const parent = firstNode.parentNode;

            if (!parent) {
                return;
            }

            const firstOther = others[0];

            const deepest = this._deepest(
                Core.isFragment(firstOther) ?
                    firstOther.firstChild :
                    firstOther
            );

            for (const other of others) {
                parent.insertBefore(other, firstNode);
            }

            for (const node of nodes) {
                deepest.insertBefore(node, null);
            }
        },

        /**
         * Wrap the contents of a single node with other nodes.
         * @param {HTMLElement|DocumentFragment|ShadowRoot} node The input node.
         * @param {array} others The other node(s).
         */
        _wrapInner(node, others) {
            const children = Core.wrap(node.childNodes);

            const clones = others.map(other =>
                this._clone(other, {
                    deep: true,
                    events: true,
                    data: true,
                    animatinos: true
                })
            );

            const firstClone = clones.slice().shift();

            const deepest = this._deepest(
                Core.isFragment(firstClone) ?
                    firstClone.firstChild :
                    firstClone
            );

            for (const clone of clones) {
                node.insertBefore(clone, null);
            }

            for (const child of children) {
                deepest.insertBefore(child, null);
            }
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
         * Return all nodes matching a standard CSS selector.
         * @param {string} selector The query selector.
         * @param {array} nodes The input nodes.
         * @returns {array} The matching nodes.
         */
        _findBySelector(selector, nodes) {
            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    node.querySelectorAll(selector)
                );
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

        /**
         * Return a single node matching a standard CSS selector.
         * @param {string} selector The query selector.
         * @param {array} nodes The input nodes.
         * @returns {HTMLElement} The matching node.
         */
        _findOneBySelector(selector, nodes) {
            for (const node of nodes) {
                const result = node.querySelector(selector);
                if (result) {
                    return result;
                }
            }

            return null;
        }

    });

    /**
     * DOM (Static) Traversal
     */

    Object.assign(DOM, {

        /**
         * Return all children of a single node (optionally matching a filter).
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
         * @param {DOM~filterCallback} [filter] The filter function.
         * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
         * @param {Boolean} [elementsOnly=false] Whether to only return element nodes.
         * @returns {array} The matching nodes.
         */
        _children(node, filter, first = false, elementsOnly = false) {
            const children = elementsOnly ?
                node.children :
                node.childNodes;
            const results = [];

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
         * Return the deepest child node for a single node.
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
         * @returns {HTMLElement} The deepest node.
         */
        _deepest(node) {
            return Core.wrap(
                node.querySelectorAll('*')
            ).find(node =>
                !node.childElementCount
            ) || node;
        },

        /**
         * Return the next sibling for a single node (optionally matching a filter).
         * @param {Node|HTMLElement} node The input node.
         * @param {DOM~filterCallback} [filter] The filter function.
         * @returns {array} The matching nodes.
         */
        _next(node, filter) {
            const results = [];

            node = node.nextSibling;

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
         * Return all next siblings for a single node (optionally matching a filter, and before a limit).
         * @param {Node|HTMLElement} node The input node.
         * @param {DOM~filterCallback} [filter] The filter function.
         * @param {DOM~filterCallback} [limit] The limit function.
         * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
         * @returns {array} The matching nodes.
         */
        _nextAll(node, filter, limit, first = false) {
            const results = [];

            while (node = node.nextSibling) {
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
         * Return the parent of a single node (optionally matching a filter).
         * @param {Node|HTMLElement} node The input node.
         * @param {DOM~filterCallback} [filter] The filter function.
         * @returns {array} The matching nodes.
         */
        _parent(node, filter) {
            const results = [];

            const parent = node.parentNode;

            if (!parent) {
                return results;
            }

            if (filter && !filter(parent)) {
                return results;
            }

            results.push(parent);

            return results;
        },

        /**
         * Return all parents of a single node (optionally matching a filter, and before a limit).
         * @param {Node|HTMLElement} node The input node.
         * @param {DOM~filterCallback} [filter] The filter function.
         * @param {DOM~filterCallback} [limit] The limit function.
         * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
         * @returns {array} The matching nodes.
         */
        _parents(node, filter, limit, first = false) {
            const results = [];

            while (node = node.parentNode) {
                if (Core.isDocument(node)) {
                    break;
                }

                if (limit && limit(node)) {
                    break;
                }

                if (filter && !filter(node)) {
                    continue;
                }

                results.unshift(node);

                if (first) {
                    break;
                }
            }

            return results;
        },

        /**
         * Return the previous sibling for a single node (optionally matching a filter).
         * @param {Node|HTMLElement} node The input node.
         * @param {DOM~filterCallback} [filter] The filter function.
         * @returns {array} The matching nodes.
         */
        _prev(node, filter) {
            const results = [];

            node = node.previousSibling;

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
         * Return all previous siblings for a single node (optionally matching a filter, and before a limit).
         * @param {Node|HTMLElement} node The input node.
         * @param {DOM~filterCallback} [filter] The filter function.
         * @param {DOM~filterCallback} [limit] The limit function.
         * @param {Boolean} [first=false] Whether to only return the first matching node for each node.
         * @returns {array} The matching nodes.
         */
        _prevAll(node, filter, limit, first = false) {
            const results = [];

            while (node = node.previousSibling) {
                if (limit && limit(node)) {
                    break;
                }

                if (filter && !filter(node)) {
                    continue;
                }

                results.unshift(node);

                if (first) {
                    break;
                }
            }

            return results;
        },

        /**
         * Return all siblings for a single node (optionally matching a filter).
         * @param {Node|HTMLElement} node The input node.
         * @param {DOM~filterCallback} [filter] The filter function.
         * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
         * @returns {array} The matching nodes.
         */
        _siblings(node, filter, elementsOnly = true) {
            const results = [];

            const parent = node.parentNode;

            if (!parent) {
                return results;
            }

            const siblings = elementsOnly ?
                parent.children :
                parent.childNodes;

            let sibling;
            for (sibling of siblings) {
                if (node.isSameNode(sibling)) {
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
     * DOM (Static) Filters
     */

    Object.assign(DOM, {

        /**
         * Return a function for filtering nodes.
         * @param {object} [options] The options for filtering.
         * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
         * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
         * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
         * @param {Boolean} [options.document=false] Whether to allow Document.
         * @param {Boolean} [options.window=false] Whether to allow Window.
         * @returns {DOM~nodeCallback} The node filter function.
         */
        parseNodesFactory(options) {
            return options ?
                node =>
                    (options.node ? Core.isNode(node) : Core.isElement(node)) ||
                    (options.fragment && Core.isFragment(node)) ||
                    (options.shadow && Core.isShadow(node)) ||
                    (options.document && Core.isDocument(node)) ||
                    (options.window && Core.isWindow(node)) :
                Core.isElement;
        }

    });

    /**
     * DOM (Static) Tests
     */

    Object.assign(DOM, {

        /**
         * Returns true if a single node has a CSS animation.
         * @param {HTMLElement} node The input node.
         * @returns {Boolean} TRUE if the node has a CSS animation, otherwise FALSE.
         */
        _hasCSSAnimation(node) {
            return !!parseFloat(
                this._css(node, 'animation-duration')
            );
        },

        /**
         * Returns true if a single node has a CSS transition.
         * @param {HTMLElement} node The input node.
         * @returns {Boolean} TRUE if the node has a CSS transition, otherwise FALSE.
         */
        _hasCSSTransition(node) {
            return !!parseFloat(
                this._css(node, 'transition-duration')
            );
        },

        /**
         * Returns true if a single node has custom data.
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
         * @param {string} [key] The data key.
         * @returns {Boolean} TRUE if the node has custom data, otherwise FALSE.
         */
        _hasData(node, key) {
            return this._data.has(node) &&
                (
                    !key ||
                    this._data.get(node)
                        .hasOwnProperty(key)
                );
        },

        /**
         * Returns true if a single node is visible.
         * @param {HTMLElement|Document|Window} node The input node.
         * @returns {Boolean} TRUE if the node is visible, otherwise FALSE.
         */
        _isVisible(node) {
            if (Core.isWindow(node)) {
                return node.document.visibilityState === 'visible';
            }

            if (Core.isDocument(node)) {
                return node.visibilityState === 'visible';
            }

            return !!node.offsetParent;
        }

    });

    /**
     * DOM (Static) Utility
     */

    Object.assign(DOM, {

        /**
         * Force a single node to be shown, and then execute a callback.
         * @param {Node|HTMLElement} node The input node.
         * @param {DOM~nodeCallback} callback The callback to execute.
         * @returns {*} The result of the callback.
         */
        _forceShow(node, callback) {
            if (this._isVisible(node)) {
                return callback(node);
            }

            const elements = [];

            if (Core.isElement(node) && this._css(node, 'display') === 'none') {
                elements.push(node);
            }

            Core.merge(
                elements,
                this._parents(
                    node,
                    parent =>
                        Core.isElement(parent) &&
                        this._css(parent, 'display') === 'none'
                )
            );

            const hidden = new Map;

            for (const element of elements) {
                hidden.set(element, element.getAttribute('style'));
                element.style.setProperty('display', 'initial', 'important');
            }

            const result = callback(node);

            for (const [element, style] of hidden) {
                if (style) {
                    element.setAttribute('style', style);
                } else {
                    // force DOM to update
                    element.getAttribute('style');
                    element.removeAttribute('style');
                }
            }

            return result;
        },

        /**
         * Sanitize a single node.
         * @param {HTMLElement} node The input node.
         * @param {HTMLElement} parent The parent node.
         * @param {object} [allowedTags] An object containing allowed tags and attributes.
         */
        _sanitize(node, parent, allowedTags = this.allowedTags) {
            // check node
            const name = node.tagName.toLowerCase();

            if (!(name in allowedTags)) {
                parent.removeChild(node);
                return;
            }

            // check node attributes
            const allowedAttributes = [];

            if ('*' in allowedTags && allowedTags['*'].length) {
                allowedAttributes.push(...allowedTags['*']);
            }

            if (allowedTags[name].length) {
                allowedAttributes.push(...allowedTags[name]);
            }

            const attributes = this._getAttribute(node);
            for (const attribute in attributes) {
                const valid = !!allowedAttributes.find(test => attribute.match(test));

                if (!valid) {
                    node.removeAttribute(attribute);
                }
            }

            // check children
            const children = this._children(node, null, false, true);
            for (const child of children) {
                this._sanitize(child, node, allowedTags);
            }
        },

        /**
         * Sort nodes by their position in the document.
         * @param {array} nodes The input nodes.
         * @returns {array} The sorted array of nodes.
         */
        _sort(nodes) {
            return nodes.sort((node, other) => {
                if (Core.isWindow(node)) {
                    return 1;
                }

                if (Core.isWindow(other)) {
                    return -1;
                }

                if (Core.isDocument(node)) {
                    return 1;
                }

                if (Core.isDocument(other)) {
                    return -1;
                }

                if (Core.isFragment(other)) {
                    return 1;
                }

                if (Core.isFragment(node)) {
                    return -1;
                }

                if (Core.isShadow(node)) {
                    node = node.host;
                }

                if (Core.isShadow(other)) {
                    other = other.host;
                }

                if (node.isSameNode(other)) {
                    return 0;
                }

                const pos = node.compareDocumentPosition(other);

                if (pos & Node.DOCUMENT_POSITION_FOLLOWING ||
                    pos & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                    return -1;
                }

                if (pos & Node.DOCUMENT_POSITION_PRECEDING ||
                    pos & Node.DOCUMENT_POSITION_CONTAINS) {
                    return 1;
                }

                return 0;
            });
        }

    });

    /**
     * DOM (Static) Properties
     */

    /**
     * @callback DOM~animationCallback
     * @param {HTMLElement} node The input node.
     * @param {number} progress The animation progress.
     * @param {object} options The options to use for animating.
     */

    /**
     * @callback DOM~delegateCallback
     * @param {HTMLElement} node The input node.
     */

    /**
     * @callback DOM~eventCallback
     * @param {Event} event The event object.
     */

    /**
     * @callback DOM~nodeCallback
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
     */

    /**
     * @callback DOM~queueCallback
     * @param {HTMLElement} node The input node.
     */

    Object.assign(DOM, {

        _queues: new WeakMap,

        _data: new WeakMap,
        _events: new WeakMap,
        _styles: new WeakMap,

        // Default allowed tags/attributes for sanitizer
        allowedTags: {
            '*': ['class', 'dir', 'id', 'lang', 'role', /^aria-[\w-]*$/i],
            a: ['target', 'href', 'title', 'rel'],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ['src', 'alt', 'title', 'width', 'height'],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
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

        INNER: 0,
        OUTER: 2,
        OUTER_MARGIN: 3,

        // Complex selector RegExp
        _complexRegExp: /(?:^\s*[\>\+\~]|\,(?=(?:(?:[^"']*["']){2})*[^"']*$)\s*[\>\+\~])/,

        // Custom selectors
        _customSelectors: ['>', '+', '~'],

        // Fast selector RegExp
        _fastRegExp: /^([\#\.]?)([\w\-]+)$/,

        // Comma seperated selector RegExp
        _splitRegExp: /\,(?=(?:(?:[^"]*"){2})*[^"]*$)\s*/

    });

    return {
        AjaxRequest,
        Animation,
        AnimationSet,
        DOM,
        dom: new DOM
    };

});