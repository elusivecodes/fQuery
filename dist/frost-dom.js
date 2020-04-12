/**
 * FrostDOM v1.0
 * https://github.com/elusivecodes/FrostDOM
 */
(function(global, factory) {
    'use strict';

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
         * @param {Boolean|string|array|object|FormData} [options.data=false] The data to send with the request.
         * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
         * @param {Boolean|string} [options.responseType] The content type of the response.
         * @param {Boolean} [options.cache=true] Whether to cache the request.
         * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
         * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
         * @param {object} [options.headers] Additional headers to send with the request.
         * @param {Boolean|function} [options.afterSend=false] A callback to execute after making the request.
         * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
         * @param {Boolean|function} [options.onProgress=false] A callback to execute on download progress.
         * @param {Boolean|function} [options.onUploadProgress=false] A callback to execute on upload progress.
         * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
         */
        constructor(settings) {
            this._settings = Core.extend(
                {},
                this.constructor.defaults,
                settings
            );

            if (!this._settings.url) {
                this._settings.url = window.location;
            }

            if (!this._settings.cache) {
                const url = new URL(this._settings.url);
                url.searchParams.append('_', Date.now());
                this._settings.url = url.toString();
            }

            if (!('Content-Type' in this._settings.headers) && this._settings.contentType) {
                this._settings.headers['Content-Type'] = this._settings.contentType;
            }

            this._isLocal = this.constructor._localRegExp.test(location.protocol);

            if (!this._isLocal && !('X-Requested-With' in this._settings.headers)) {
                this._settings.headers['X-Requested-With'] = 'XMLHttpRequest';
            }

            this._isResolved = false;
            this._isRejected = false;
            this._isCancelled = false;

            this._promise = new Promise((resolve, reject) => {
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

            if (this._settings.rejectOnCancel) {
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
         * @returns {Promise} A new pending Promise.
         */
        catch(onRejected) {
            return this._promise.catch(onRejected);
        }

        /**
         * Execute a callback once the request is settled (resolved or rejected).
         * @param {function} [onRejected] The callback to execute once the request is settled.
         * @returns {Promise} A new pending Promise.
         */
        finally(onFinally) {
            return this._promise.finally(onFinally);
        }

        /**
         * Execute a callback once the request is resolved (or optionally rejected).
         * @param {function} onFulfilled The callback to execute if the request is resolved.
         * @param {function} [onRejected] The callback to execute if the request is rejected.
         * @returns {Promise} A new pending Promise.
         */
        then(onFulfilled, onRejected) {
            return this._promise.then(onFulfilled, onRejected);
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
            this._xhr = new XMLHttpRequest;

            this._xhr.open(this._settings.method, this._settings.url, true);

            for (const key in this._settings.headers) {
                this._xhr.setRequestHeader(key, this._settings.headers[key]);
            }

            if (this._settings.responseType) {
                this._xhr.responseType = this._settings.responseType;
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

            if (this._settings.onProgress) {
                this._xhr.onprogress = e =>
                    this._settings.onProgress(e.loaded / e.total, this._xhr, e);
            }

            if (this._settings.onUploadProgress) {
                this._xhr.upload.onprogress = e =>
                    this._settings.onUploadProgress(e.loaded / e.total, this._xhr, e);
            }
        },

        /**
         * Process the data and send the XHR request.
         */
        _send() {
            if (this._settings.beforeSend) {
                this._settings.beforeSend(this._xhr);
            }

            if (this._settings.data && this._settings.processData) {
                if (this._settings.contentType === 'application/json') {
                    this._settings.data = JSON.stringify(this._settings.data);
                } else if (this._settings.contentType === 'application/x-www-form-urlencoded') {
                    this._settings.data = this.constructor._parseParams(this._settings.data);
                } else {
                    this._settings.data = this.constructor._parseFormData(this._settings.data);
                }
            }

            this._xhr.send(this._settings.data);

            if (this._settings.afterSend) {
                this._settings.afterSend(this._xhr);
            }
        }

    });

    /**
     * AjaxRequest (Static) Helpers
     */

    Object.assign(AjaxRequest, {

        /**
         * Return a FormData object from an array or object.
         * @param {array|object} data The input data.
         * @returns {FormData} The FormData object.
         */
        _parseFormData(data) {
            const formData = new FormData;

            if (Core.isArray(data)) {
                const obj = {};
                for (const value of data) {
                    obj[value.name] = value.value;
                }
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
                } else if (!Core.isArray(value)) {
                    formData.set(key, value);
                } else {
                    for (const val of value) {
                        formData.append(key, val);
                    }
                }
            }
        },

        /**
         * Return a string attribute, or a flat array of attributes from a key and value.
         * @param {string} key The input key.
         * @param {array|object|string} value The input value.
         * @returns {string|array} The parsed attributes.
         */
        _parseParam(key, value) {
            if (Core.isArray(value)) {
                const values = [];
                for (const val of value) {
                    values.push(
                        this._parseParam(key, val)
                    );
                }
                return values.flat();
            }

            if (Core.isObject(value)) {
                const values = [];
                for (const key in value) {
                    values.push(
                        this._parseParam(
                            `${key}[${subKey}]`,
                            value[subKey]
                        )
                    );
                }
                return values.flat();
            }

            return `${key}=${value}`;
        },

        /**
         * Return a URI-encoded attribute string from an array or object.
         * @param {array|object} data The input data.
         * @returns {string} The URI-encoded attribute string.
         */
        _parseParams(data) {
            const values = [];

            if (Core.isArray(data)) {
                for (const value of data) {
                    values.push(
                        this._parseParam(
                            value.name,
                            value.value
                        )
                    )
                }
            } else if (Core.isObject(data)) {
                for (const key in data) {
                    values.push(
                        this._parseParam(key, data[key])
                    );
                }
            }

            const paramString = values.flat().join('&');

            return encodeURI(paramString);
        }

    });

    /**
     * AjaxRequest (Static) Properties
     */

    Object.assign(AjaxRequest, {

        // AjaxRequest defaults
        defaults: {
            afterSend: false,
            beforeSend: false,
            cache: true,
            contentType: 'application/x-www-form-urlencoded',
            data: false,
            headers: {},
            method: 'GET',
            onProgress: false,
            onUploadProgress: false,
            processData: true,
            rejectOnCancel: true,
            responseType: false,
            url: false
        },

        // Local protocol test
        _localRegExp: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/

    });

    // Set the AjaxRequest prototype
    Object.setPrototypeOf(AjaxRequest.prototype, Promise.prototype);

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
            this._context = context;
        }

    }

    /**
     * DOM AJAX
     */

    Object.assign(DOM.prototype, {

        /**
         * New AjaxRequest constructor.
         * @param {object} [options] The options to use for the request.
         * @param {string} [options.url=window.location] The URL of the request.
         * @param {string} [options.method=GET] The HTTP method of the request.
         * @param {Boolean|string|array|object|FormData} [options.data=false] The data to send with the request.
         * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
         * @param {Boolean|string} [options.responseType] The content type of the response.
         * @param {Boolean} [options.cache=true] Whether to cache the request.
         * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
         * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
         * @param {object} [options.headers] Additional headers to send with the request.
         * @param {Boolean|function} [options.afterSend=false] A callback to execute after making the request.
         * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
         * @param {Boolean|function} [options.onProgress=false] A callback to execute on download progress.
         * @param {Boolean|function} [options.onUploadProgress=false] A callback to execute on upload progress.
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
         * @param {Boolean|string|array|object} [options.data=false] The data to send with the request.
         * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
         * @param {Boolean|string} [options.responseType] The content type of the response.
         * @param {Boolean} [options.cache=true] Whether to cache the request.
         * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
         * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
         * @param {object} [options.headers] Additional headers to send with the request.
         * @param {Boolean|function} [options.afterSend=false] A callback to execute after making the request.
         * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
         * @param {Boolean|function} [options.onProgress=false] A callback to execute on download progress.
         * @param {Boolean|function} [options.onUploadProgress=false] A callback to execute on upload progress.
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
         * @param {object} [options] The options to use for the request.
         * @param {string} [options.method=GET] The HTTP method of the request.
         * @param {Boolean|string|array|object} [options.data=false] The data to send with the request.
         * @param {Boolean|string} [options.contentType=application/x-www-form-urlencoded] The content type of the request.
         * @param {Boolean|string} [options.responseType] The content type of the response.
         * @param {Boolean} [options.cache=true] Whether to cache the request.
         * @param {Boolean} [options.processData=true] Whether to process the data based on the content type.
         * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
         * @param {object} [options.headers] Additional headers to send with the request.
         * @param {Boolean|function} [options.afterSend=false] A callback to execute after making the request.
         * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
         * @param {Boolean|function} [options.onProgress=false] A callback to execute on download progress.
         * @param {Boolean|function} [options.onUploadProgress=false] A callback to execute on upload progress.
         * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
         */
        get(url, options) {
            return new AjaxRequest({
                url,
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
         * @param {Boolean|function} [options.afterSend=false] A callback to execute after making the request.
         * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
         * @param {Boolean|function} [options.onProgress=false] A callback to execute on download progress.
         * @param {Boolean|function} [options.onUploadProgress=false] A callback to execute on upload progress.
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
         * @param {Boolean|function} [options.afterSend=false] A callback to execute after making the request.
         * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
         * @param {Boolean|function} [options.onProgress=false] A callback to execute on download progress.
         * @param {Boolean|function} [options.onUploadProgress=false] A callback to execute on upload progress.
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
         * @param {Boolean|function} [options.afterSend=false] A callback to execute after making the request.
         * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
         * @param {Boolean|function} [options.onProgress=false] A callback to execute on download progress.
         * @param {Boolean|function} [options.onUploadProgress=false] A callback to execute on upload progress.
         * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
         */
        put(url, data, options) {
            return new AjaxRequest({
                url,
                data,
                method: 'PUT',
                ...options
            });
        },

        /**
         * Perform an XHR request for a file upload.
         * @param {string} url The URL of the request.
         * @param {FormData} data The data to send with the request.
         * @param {object} [options] The options to use for the request.
         * @param {string} [options.method=POST] The HTTP method of the request.
         * @param {Boolean|string} [options.contentType=false] The content type of the request.
         * @param {Boolean|string} [options.responseType] The content type of the response.
         * @param {Boolean} [options.cache=true] Whether to cache the request.
         * @param {Boolean} [options.processData=false] Whether to process the data based on the content type.
         * @param {Boolean} [options.rejectOnCancel=true] Whether to reject the promise if the request is cancelled.
         * @param {object} [options.headers] Additional headers to send with the request.
         * @param {Boolean|function} [options.afterSend=false] A callback to execute after making the request.
         * @param {Boolean|function} [options.beforeSend=false] A callback to execute before making the request.
         * @param {Boolean|function} [options.onProgress=false] A callback to execute on download progress.
         * @param {Boolean|function} [options.onUploadProgress=false] A callback to execute on upload progress.
         * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
         */
        upload(url, data, options) {
            return new AjaxRequest({
                url,
                data,
                method: 'POST',
                contentType: false,
                ...options
            });
        }

    });

    /**
     * DOM AJAX Scripts
     */

    Object.assign(DOM.prototype, {

        /**
         * Load and execute a JavaScript file.
         * @param {string} url The URL of the script.
         * @param {Boolean} [cache=true] Whether to cache the request.
         * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
         */
        loadScript(url, cache = true) {
            return new AjaxRequest({ url, cache })
                .then(response =>
                    eval.call(window, response.response)
                );
        },

        /**
         * Load and executes multiple JavaScript files (in order).
         * @param {string[]} urls An array of script URLs.
         * @param {Boolean} [cache=true] Whether to cache the requests.
         * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
         */
        loadScripts(urls, cache = true) {
            return Promise.all
                (
                    urls.map(url =>
                        new AjaxRequest({ url, cache })
                    )
                )
                .then(responses => {
                    for (const response of responses) {
                        eval.call(window, response.response);
                    }
                });
        }

    });

    /**
     * DOM AJAX Styles
     */

    Object.assign(DOM.prototype, {

        /**
         * Import a CSS Stylesheet file.
         * @param {string} url The URL of the stylesheet.
         * @param {Boolean} [cache=true] Whether to cache the request.
         * @returns {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
         */
        loadStyle(url, cache = true) {
            return new AjaxRequest({ url, cache })
                .then(response =>
                    DOMNode.insertBefore(
                        this._context.head,
                        this.create(
                            'style',
                            {
                                html: response.response
                            }
                        )
                    )
                );
        },

        /**
         * Import multiple CSS Stylesheet files.
         * @param {string[]} urls An array of stylesheet URLs.
         * @param {Boolean} [cache=true] Whether to cache the requests.
         * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
         */
        loadStyles(urls, cache = true) {
            return Promise.all
                (
                    urls.map(url =>
                        new AjaxRequest({ url, cache })
                    )
                )
                .then(responses => {
                    for (const response of responses) {
                        DOMNode.insertBefore(
                            this._context.head,
                            this.create(
                                'style',
                                {
                                    html: response.response
                                }
                            )
                        );
                    }

                });
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
            const cookie = decodeURIComponent(this._context.cookie)
                .split(';')
                .find(cookie =>
                    cookie
                        .trimStart()
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
                            progress :
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
                            1 - progress :
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
                (node, progress, options) =>
                    DOMNode.setStyle(
                        node,
                        'transform',
                        progress < 1 ?
                            `rotate3d(${options.x}, ${options.y}, 0, ${(90 - (progress * 90)) * (options.inverse ? -1 : 1)}deg)` :
                            ''
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
                (node, progress, options) =>
                    DOMNode.setStyle(
                        node,
                        'transform',
                        progress < 1 ?
                            `rotate3d(${options.x}, ${options.y}, 0, ${(progress * 90) * (options.inverse ? -1 : 1)}deg)` :
                            ''
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

                    const translateAmount = (size - (size * progress)) * (inverse ? -1 : 1);
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

                    const translateAmount = size * progress * (inverse ? -1 : 1);
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
                ...this.constructor.animationDefaults,
                direction: 'bottom',
                useGpu: true,
                ...options
            };

            const promises = nodes.map(node => {
                const initialHeight = DOMNode.getStyle(node, 'height');
                const initialWidth = DOMNode.getStyle(node, 'width');
                DOMNode.setStyle(node, 'overflow', 'hidden');

                return this.constructor._animate(
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
                            amount = size * progress;

                        DOMNode.setStyle(node, sizeStyle, `${amount}px`);

                        if (translateStyle) {
                            const translateAmount = size - amount;
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

            this.constructor._start();

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
                ...this.constructor.animationDefaults,
                direction: 'bottom',
                useGpu: true,
                ...options
            };

            const promises = nodes.map(node => {
                const initialHeight = DOMNode.getStyle(node, 'height');
                const initialWidth = DOMNode.getStyle(node, 'width');
                DOMNode.setStyle(node, 'overflow', 'hidden');

                return this.constructor._animate(
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
                            amount = size - (size * progress);

                        DOMNode.setStyle(node, sizeStyle, `${amount}px`);

                        if (translateStyle) {
                            const translateAmount = size - amount;
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

            this.constructor._start();

            return Promise.all(promises);
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
            return this.getProperty(
                nodes,
                'innerHTML'
            );
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

            return DOMNode.getProperty(node, property);
        },

        /**
         * Get the text contents of the first node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {string} The text contents.
         */
        getText(nodes) {
            return this.getProperty(
                nodes,
                'innerText'
            );
        },

        /**
         * Get the value property of the first node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {string} The value.
         */
        getValue(nodes) {
            return this.getProperty(
                nodes,
                'value'
            );
        },

        /**
         * Remove an attribute from each node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} attribute The attribute name.
         */
        removeAttribute(nodes, attribute) {
            nodes = this.parseNodes(nodes);

            for (const node of nodes) {
                DOMNode.removeAttribute(node, attribute);
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
                DOMNode.removeProperty(node, property);
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
         * Set a dataset value for the first node.
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

            this.setProperty(
                nodes,
                'innerHTML',
                html
            );
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
                    DOMNode.setProperty(node, property, properties[property]);
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

            this.setProperty(
                nodes,
                'innerText',
                text
            );
        },

        /**
         * Set the value property of each node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
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
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
         */
        cloneData(nodes, others) {
            nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true, window: true });
            others = this.parseNodes(others, { fragment: true, shadow: true, document: true, window: true });

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
            const node = this.parseNode(nodes, { fragment: true, shadow: true, document: true, window: true });

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
            nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true, window: true });

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
            nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true, window: true });

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

            return Core.dist(
                nodeCenter.x,
                nodeCenter.y,
                x,
                y
            );
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

            return this.distTo(
                nodes,
                otherCenter.x,
                otherCenter.y
            );
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
            let closest = null,
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

            return this.nearestTo(
                nodes,
                otherCenter.x,
                otherCenter.y
            );
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
            const node = this.parseNode(nodes, { document: true, window: true });

            if (!node) {
                return;
            }

            if (Core.isWindow(node)) {
                return DOMNode.getScrollXWindow(node);
            }

            if (Core.isDocument(node)) {
                return this.constructor._getScrollXDocument(node);
            }

            return DOMNode.getScrollX(node);
        },

        /**
         * Get the scroll Y position of the first node.
         * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {number} The scroll Y position.
         */
        getScrollY(nodes) {
            const node = this.parseNode(nodes, { document: true, window: true });

            if (!node) {
                return;
            }

            if (Core.isWindow(node)) {
                return DOMNode.getScrollYWindow(node);
            }

            if (Core.isDocument(node)) {
                return this.constructor._getScrollYDocument(node);
            }

            return DOMNode.getScrollY(node);
        },

        /**
         * Scroll each node to an X,Y position.
         * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {number} x The scroll X position.
         * @param {number} y The scroll Y position.
         */
        setScroll(nodes, x, y) {
            nodes = this.parseNodes(nodes, { document: true, window: true });

            for (const node of nodes) {
                if (Core.isWindow(node)) {
                    DOMNode.setScrollWindow(node, x, y);
                } else if (Core.isDocument(node)) {
                    this.constructor._setScrollDocument(node, x, y);
                } else {
                    this.constructor._setScroll(node, x, y);
                }
            }
        },

        /**
         * Scroll each node to an X position.
         * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {number} x The scroll X position.
         */
        setScrollX(nodes, x) {
            nodes = this.parseNodes(nodes, { document: true, window: true });

            for (const node of nodes) {
                if (Core.isWindow(node)) {
                    this.constructor._setScrollXWindow(node, x);
                } else if (Core.isDocument(node)) {
                    this.constructor._setScrollXDocument(node, x);
                } else {
                    DOMNode.setScrollX(node, x);
                }
            }
        },

        /**
         * Scroll each node to a Y position.
         * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {number} y The scroll Y position.
         */
        setScrollY(nodes, y) {
            nodes = this.parseNodes(nodes, { document: true, window: true });

            for (const node of nodes) {
                if (Core.isWindow(node)) {
                    this.constructor._setScrollYWindow(node, y);
                } else if (Core.isDocument(node)) {
                    this.constructor._setScrollYDocument(node, y);
                } else {
                    DOMNode.setScrollY(node, y);
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
         * @param {number} [innerOuter=1] Whether to include padding, border and margin heights.
         * @returns {number} The height.
         */
        height(nodes, innerOuter) {
            const node = this.parseNode(nodes, { document: true, window: true });

            if (!node) {
                return;
            }

            if (Core.isWindow(node)) {
                return DOMNode.heightWindow(
                    node,
                    Core.isUndefined(innerOuter) ?
                        0 :
                        innerOuter
                );
            }

            if (Core.isUndefined(innerOuter)) {
                innerOuter = 1;
            }

            if (Core.isDocument(node)) {
                return this.constructor._height(
                    DOMNode.documentElement(node),
                    innerOuter
                );
            }

            return this.constructor._height(node, innerOuter);
        },

        /**
         * Get the computed width of the first node.
         * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {number} [innerOuter] Whether to include padding, border and margin widths.
         * @returns {number} The width.
         */
        width(nodes, innerOuter) {
            const node = this.parseNode(nodes, { document: true, window: true });

            if (!node) {
                return;
            }

            if (Core.isWindow(node)) {
                return DOMNode.widthWindow(
                    node,
                    Core.isUndefined(innerOuter) ?
                        0 :
                        innerOuter
                );
            }

            if (Core.isUndefined(innerOuter)) {
                innerOuter = 1;
            }

            if (Core.isDocument(node)) {
                return this.constructor._width(
                    DOMNode.documentElement(node),
                    innerOuter
                );
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
                DOMNode.addClass(node, ...classes);
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
            this.setStyle(
                nodes,
                'display',
                'none'
            );
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
                DOMNode.removeClass(node, ...classes);
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
            this.setStyle(
                nodes,
                'display',
                ''
            );
        },

        /**
         * Toggle the visibility of each node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         */
        toggle(nodes) {
            nodes = this.parseNodes(nodes);

            for (const node of nodes) {
                DOMNode.getStyle(node, 'display') === 'none' ?
                    DOMNode.setStyle(node, 'display', '') :
                    DOMNode.setStyle(node, 'display', 'none');
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
                    DOMNode.toggleClass(node, className);
                }
            }
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
                    this.addEvent(window, 'mouseup', e => {
                        if (move) {
                            this.removeEvent(window, 'mousemove', move);
                        }

                        if (up) {
                            up(e);
                        }
                    }, false, true);
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

            DOMNode.blur(node);
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

            DOMNode.click(node);
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

            DOMNode.focus(node);
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

            this.constructor._addEvent(
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
         * Add events to each node.
         * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} events The event names.
         * @param {DOM~eventCallback} callback The callback to execute.
         * @param {string} [delegate] The delegate selector.
         * @param {Boolean} [selfDestruct] Whether to remove the event after triggering.
         */
        addEvent(nodes, events, callback, delegate, selfDestruct) {
            nodes = this.parseNodes(nodes, { shadow: true, document: true, window: true });

            for (const node of nodes) {
                for (const event of this.constructor._parseEvents(events)) {
                    this.constructor._addEvent(node, event, callback, delegate, selfDestruct);
                }
            }
        },

        /**
         * Add delegated events to each node.
         * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string} events The event names.
         * @param {string} delegate The delegate selector.
         * @param {DOM~eventCallback} callback The callback to execute.
         */
        addEventDelegate(nodes, events, delegate, callback) {
            this.addEvent(nodes, events, callback, delegate);
        },

        /**
         * Add self-destructing delegated events to each node.
         * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
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
            nodes = this.parseNodes(nodes, { shadow: true, document: true, window: true });
            others = this.parseNodes(others, { shadow: true, document: true, window: true });

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
            nodes = this.parseNodes(nodes, { shadow: true, document: true, window: true });

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
         * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
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
         * @param {object} [data] Additional data to attach to the event.
         * @param {object} [options] The options to use for the Event.
         * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
         * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
         */
        triggerEvent(nodes, events, data, options) {
            nodes = this.parseNodes(nodes, { shadow: true, document: true, window: true });

            events = this.constructor._parseEvents(events);

            for (const node of nodes) {
                for (const event of events) {
                    this.constructor._triggerEvent(node, event, data, options);
                }
            }
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

            return DOMNode.attachShadow(node, open);
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
            const node = DOMNode.create(this._context, tagName);

            if (!options) {
                return node;
            }

            if ('html' in options) {
                DOMNode.setProperty(node, 'innerHTML', options.html);
            } else if ('text' in options) {
                DOMNode.setProperty(node, 'innerText', options.text);
            }

            if ('class' in options) {
                DOMNode.addClass(
                    node,
                    ...this.constructor._parseClasses(
                        Core.wrap(options.class)
                    )
                );
            }

            if ('style' in options) {
                this.constructor._setStyle(node, options.style);
            }

            if ('value' in options) {
                DOMNode.setProperty(node, 'value', options.value);
            }

            if ('attributes' in options) {
                this.constructor._setAttribute(node, options.attributes);
            }

            if ('properties' in options) {
                this.constructor._setProperty(node, options.properties);
            }

            if ('dataset' in options) {
                this.constructor._setDataset(node, options.dataset);
            }

            return node;
        },

        /**
         * Create a new comment node.
         * @param {string} comment The comment contents.
         * @returns {Node} The new comment node.
         */
        createComment(comment) {
            return DOMNode.createComment(this._context, comment);
        },

        /**
         * Create a new document fragment.
         * @returns {DocumentFragment} The new DocumentFragment.
         */
        createFragment() {
            return DOMNode.createFragment(this._context);
        },

        /**
         * Create a new range object.
         * @returns {Range} The new Range.
         */
        createRange() {
            return DOMNode.createRange(this._context);
        },

        /**
         * Create a new text node.
         * @param {string} text The text contents.
         * @returns {Node} The new text node.
         */
        createText(text) {
            return DOMNode.createText(this._context, text);
        },

        /**
         * Create an Array containing nodes parsed from a HTML string.
         * @param {string} html The HTML input string.
         * @returns {array} An array of nodes.
         */
        parseHTML(html) {
            return Core.wrap(
                DOMNode.children(
                    this.createRange()
                        .createContextualFragment(html)
                )
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
         * @param {Boolean} [deep=true] Whether to also clone all descendent nodes.
         * @param {Boolean} [cloneEvents=false] Whether to also clone events.
         * @param {Boolean} [cloneData=false] Whether to also clone custom data.
         * @returns {array} The cloned nodes.
         */
        clone(nodes, deep = true, cloneEvents = false, cloneData = false) {

            // ShadowRoot nodes can not be cloned
            nodes = this.parseNodes(nodes, { node: true, fragment: true });

            return nodes.map(node =>
                this.constructor._clone(node, deep, cloneEvents, cloneData)
            );
        },

        /**
         * Detach each node from the DOM.
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @return {array} The detached nodes.
         */
        detach(nodes) {

            // DocumentFragment and ShadowRoot nodes can not be detached
            nodes = this.parseNodes(nodes, { node: true });

            for (const node of nodes) {
                const parent = DOMNode.parent(node);

                if (!parent) {
                    continue;
                }

                DOMNode.removeChild(parent, node);
            }

            return nodes;
        },

        /**
         * Remove all children of each node from the DOM.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         */
        empty(nodes) {
            nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

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
            nodes = this.parseNodes(nodes, { node: true });

            for (const node of nodes) {
                const parent = DOMNode.parent(node);

                if (!parent) {
                    continue;
                }

                this.constructor._remove(node);
                DOMNode.removeChild(parent, node);
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
            nodes = this.parseNodes(nodes, { node: true });

            // ShadowRoot nodes can not be cloned
            others = this.parseNodes(others, { node: true, fragment: true, html: true });

            // Clone other nodes first, so they can not be removed during replacement
            const clones = others.map(
                other => this.constructor._clone(other, true)
            );

            for (const node of nodes) {
                this.constructor._replaceWith(node, clones);
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
            nodes = this.parseNodes(nodes, { node: true });

            // ShadowRoot nodes can not be moved
            others = this.parseNodes(others, { node: true, fragment: true, html: true }).reverse();

            const lastNode = nodes.slice(-1).pop();

            for (const node of nodes) {
                const parent = DOMNode.parent(node);

                if (!parent) {
                    continue;
                }

                for (const other of others) {
                    DOMNode.insertBefore(
                        parent,
                        DOMNode.isSame(node, lastNode) ?
                            other :
                            DOMNode.clone(other, true),
                        DOMNode.next(node)
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
            nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

            // ShadowRoot nodes can not be moved
            others = this.parseNodes(others, { node: true, fragment: true, html: true });

            const lastNode = nodes.slice(-1).pop();

            for (const node of nodes) {
                for (const other of others) {
                    DOMNode.insertBefore(
                        node,
                        DOMNode.isSame(node, lastNode) ?
                            other :
                            DOMNode.clone(other, true)
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
            nodes = this.parseNodes(nodes, { node: true });

            // ShadowRoot nodes can not be moved
            others = this.parseNodes(others, { node: true, fragment: true, html: true });

            const lastNode = nodes.slice(-1).pop();

            for (const node of nodes) {
                const parent = DOMNode.parent(node);

                if (!parent) {
                    continue;
                }

                for (const other of others) {
                    DOMNode.insertBefore(
                        parent,
                        DOMNode.isSame(node, lastNode) ?
                            other :
                            DOMNode.clone(other, true),
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
            nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

            // ShadowRoot nodes can not be moved
            others = this.parseNodes(others, { node: true, fragment: true, html: true });

            const lastNode = nodes.slice(-1).pop();

            for (const node of nodes) {
                const firstChild = DOMNode.firstChild(node);

                for (const other of others) {
                    DOMNode.insertBefore(
                        node,
                        DOMNode.isSame(node, lastNode) ?
                            other :
                            DOMNode.clone(other, true),
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
            nodes = this.parseNodes(nodes, { node: true });

            filter = this.parseFilter(filter);

            const parents = [];

            for (const node of nodes) {
                const parent = DOMNode.parent(node);

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
            nodes = this.parseNodes(nodes, { node: true });

            // ShadowRoot nodes can not be cloned
            others = this.parseNodes(others, { fragment: true, html: true });

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
            nodes = this.parseNodes(nodes, { node: true });

            // ShadowRoot nodes can not be cloned
            others = this.parseNodes(others, { fragment: true, html: true });

            const clones = this.clone(others, true);

            this.constructor._wrapAll(nodes, clones);
        },

        /**
         * Wrap the contents of each node with other nodes.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
         */
        wrapInner(nodes, others) {
            nodes = this.parseNodes(nodes, { node: true, fragment: true, shadow: true });

            // ShadowRoot nodes can not be cloned
            others = this.parseNodes(others, { fragment: true, html: true });

            for (const node of nodes) {
                this.constructor._wrapInner(node, others);
            }
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
            return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
                .filter(node => DOMNode.isConnected(node));
        },

        /**
         * Return all nodes considered equal to any of the other nodes.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
         * @returns {array} The filtered nodes.
         */
        equal(nodes, others) {
            others = this.parseNodes(others, { node: true, fragment: true, shadow: true });

            return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
                .filter(node =>
                    others.some(other => DOMNode.isEqual(node, other))
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

            return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
                .filter((node, index) => !filter || filter(node, index));
        },

        /**
         * Return the first node matching a filter.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {Node|HTMLElement|DocumentFragment|ShadowRoot} The filtered node.
         */
        filterOne(nodes, filter) {
            filter = this.parseFilter(filter);

            return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
                .find((node, index) => !filter || filter(node, index)) || null;
        },

        /**
         * Return all "fixed" nodes.
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {array} The filtered nodes.
         */
        fixed(nodes) {
            return this.parseNodes(nodes, { node: true })
                .filter(node =>
                    (Core.isElement(node) && this.constructor._css(node, 'position') === 'fixed') ||
                    this.constructor._parents(
                        node,
                        parent =>
                            Core.isElement(parent) && this.constructor._css(parent, 'position') === 'fixed',
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
            return this.parseNodes(nodes, { node: true, document: true, window: true })
                .filter(node => !this.constructor._isVisible(node));
        },

        /**
         * Return all nodes not matching a filter.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {array} The filtered nodes.
         */
        not(nodes, filter) {
            filter = this.parseFilter(filter);

            return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
                .filter((node, index) => filter && !filter(node, index));
        },

        /**
         * Return the first node not matching a filter.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
         * @returns {array} The filtered nodes.
         */
        notOne(nodes, filter) {
            filter = this.parseFilter(filter);

            return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
                .find((node, index) => filter && !filter(node, index));
        },

        /**
         * Return all nodes considered identical to any of the other nodes.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
         * @returns {array} The filtered nodes.
         */
        same(nodes, others) {
            others = this.parseNodes(others, { node: true, fragment: true, shadow: true });

            return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
                .filter(node =>
                    others.some(other => DOMNode.isSame(node, other))
                );
        },

        /**
         * Return all visible nodes.
         * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {array} The filtered nodes.
         */
        visible(nodes) {
            return this.parseNodes(nodes, { node: true, document: true, window: true })
                .filter(node => this.constructor._isVisible(node));
        },

        /**
         * Return all nodes with an animation.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {array} The filtered nodes.
         */
        withAnimation(nodes) {
            return this.parseNodes(nodes)
                .filter(node =>
                    this.constructor._hasAnimation(node)
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
                    DOMNode.hasAttribute(node, attribute)
                );
        },

        /**
         * Return all nodes with child elements.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {array} The filtered nodes.
         */
        withChildren(nodes) {
            return this.parseNodes(nodes, { fragment: true, shadow: true, document: true })
                .filter(node =>
                    DOMNode.hasChildren(node)
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
                        DOMNode.hasClass(node, className)
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
            return this.parseNodes(nodes, { node: true, fragment: true, shadow: true, document: true, window: true })
                .filter(node =>
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

            return this.parseNodes(nodes, { fragment: true, shadow: true, document: true })
                .filter((node, index) => !filter || filter(node, index));
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
                    DOMNode.hasProperty(node, property)
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
                const selectors = this.constructor._prefixSelectors(selector, `#${this.constructor._tempId} `);

                if (Core.isElement(nodes)) {
                    return this.constructor.__findByCustom(selectors, nodes);
                }

                nodes = this.parseNodes(nodes);

                return this.constructor._findByCustom(selectors, nodes);
            }

            // standard selector
            if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
                return Core.wrap(
                    DOMNode.findBySelector(selector, nodes)
                );
            }

            nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

            return this.constructor._findBySelector(selector, nodes);
        },

        /**
         * Return all nodes with a specific class.
         * @param {string} className The class name.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
         * @returns {array} The matching nodes.
         */
        findByClass(className, nodes = this._context) {
            if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
                return Core.wrap(DOMNode.findByClass(className, nodes));
            }

            nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    DOMNode.findByClass(className, node)
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
            const result = this.findOneById(id, nodes);

            if (result) {
                return [result];
            }

            return [];
        },

        /**
         * Return all nodes with a specific tag.
         * @param {string} tagName The tag name.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
         * @returns {array} The matching nodes.
         */
        findByTag(tagName, nodes = this._context) {
            if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
                return Core.wrap(DOMNode.findByTag(tagName, nodes));
            }

            nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    DOMNode.findByTag(tagName, node)
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
                const selectors = this.constructor._prefixSelectors(selector, `#${this.constructor._tempId} `);

                if (Core.isElement(nodes)) {
                    return this.constructor.__findOneByCustom(selectors, nodes);
                }

                nodes = this.parseNodes(nodes);

                return this.constructor._findOneByCustom(selectors, nodes);
            }

            // standard selector
            if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
                return DOMNode.findOneBySelector(selector, nodes);
            }

            nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

            return this.constructor._findOneBySelector(selector, nodes);
        },

        /**
         * Return a single node with a specific class.
         * @param {string} className The class name.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
         * @returns {HTMLElement} The matching node.
         */
        findOneByClass(className, nodes = this._context) {
            if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
                return DOMNode.findByClass(className, nodes).item(0);
            }

            nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

            for (const node of nodes) {
                const result = DOMNode.findByClass(className, node).item(0);
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
            const result = DOMNode.findById(id, this._context);

            if (!result) {
                return null;
            }

            if (Core.isDocument(nodes)) {
                return result;
            }

            if (Core.isElement(nodes)) {
                if (DOMNode.contains(nodes, result)) {
                    return result;
                }

                return null;
            }

            nodes = this.parseNodes(nodes);

            if (nodes.some(node => DOMNode.contains(node, result))) {
                return result;
            }

            return null;
        },

        /**
         * Return a single node with a specific tag.
         * @param {string} tagName The tag name.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
         * @returns {HTMLElement} The matching node.
         */
        findOneByTag(tagName, nodes = this._context) {
            if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
                return DOMNode.findByTag(tagName, nodes).item(0);
            }

            nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

            for (const node of nodes) {
                const result = DOMNode.findByTag(tagName, node).item(0);
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
            return this.children(
                nodes,
                filter,
                true
            );
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

            nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

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
            return this.parents(
                nodes,
                filter,
                limit,
                true
            );
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

            const range = this.createRange();

            if (nodes.length === 1) {
                DOMNode.select(range, nodes.shift());
            } else {
                DOMNode.setStartBefore(range, nodes.shift());
                DOMNode.setEndAfter(range, nodes.pop());
            }

            return range.commonAncestorContainer;
        },

        /**
         * Return all children of each node (including text and comment nodes).
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {array} The matching nodes.
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
         * Return the DocumentFragment of the first node.
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {DocumentFragment} The DocumentFragment.
         */
        fragment(nodes) {
            const node = this.parseNode(nodes);

            if (!node) {
                return;
            }

            return DOMNode.fragment(node);
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
            nodes = this.parseNodes(nodes, { node: true });

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
            nodes = this.parseNodes(nodes, { node: true });

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
                node => DOMNode.offsetParent(node)
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
            nodes = this.parseNodes(nodes, { node: true });

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
            nodes = this.parseNodes(nodes, { node: true });

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
            nodes = this.parseNodes(nodes, { node: true });

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
            nodes = this.parseNodes(nodes, { node: true });

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    this.constructor._prevAll(node, filter, limit, first)
                )
            }

            return nodes.length > 1 && results.length ?
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

            return DOMNode.shadow(node);
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
            nodes = this.parseNodes(nodes, { node: true });

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
                return node => DOMNode.is(node, filter);
            }

            if (Core.isNode(filter) || Core.isFragment(filter) || Core.isShadow(filter)) {
                return node => DOMNode.isSame(node, filter);
            }

            filter = this.parseNodes(filter, { node: true, fragment: true, shadow: true });

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
                return filter;
            }

            if (Core.isString(filter)) {
                return node => !!this.findOne(filter, node);
            }

            if (Core.isNode(filter) || Core.isFragment(filter) || Core.isShadow(filter)) {
                return node => DOMNode.contains(node, filter);
            }

            filter = this.parseNodes(filter, { node: true, fragment: true, shadow: true });

            if (filter.length) {
                return node => filter.some(other => DOMNode.contains(node, other));
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
            if (Core.isString(nodes)) {
                if ('html' in options && options.html && nodes.trim().charAt(0) === '<') {
                    return this.parseHTML(nodes).shift();
                }

                const node = this.findOne(
                    nodes,
                    'context' in options ?
                        options.context :
                        this._context
                );

                return node ?
                    node :
                    null;
            }

            const nodeFilter = this.constructor.parseNodesFactory(options);

            if (nodeFilter(nodes)) {
                return nodes;
            }

            const node = Core.wrap(nodes).slice().shift();

            return node && nodeFilter(node) ?
                node :
                null;
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
            if (Core.isString(nodes)) {
                if ('html' in options && options.html && nodes.trim().charAt(0) === '<') {
                    return this.parseHTML(nodes);
                }

                return this.find(
                    nodes,
                    'context' in options ?
                        options.context :
                        this._context
                );
            }

            const nodeFilter = this.constructor.parseNodesFactory(options);

            if (nodeFilter(nodes)) {
                return [nodes];
            }

            return Core.wrap(nodes)
                .filter(nodeFilter);
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
            nodes = this.parseNodes(nodes, { node: true, fragment: true, html: true });

            const selection = DOMNode.getSelection();

            if (!DOMNode.rangeCount(selection)) {
                return;
            }

            const range = DOMNode.getRange(selection);

            DOMNode.removeRanges(selection);
            DOMNode.collapse(range);

            for (const node of nodes) {
                DOMNode.insert(range, node);
            }
        },

        /**
         * Insert each node before the selection.
         * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
         */
        beforeSelection(nodes) {

            // ShadowRoot nodes can not be moved
            nodes = this.parseNodes(nodes, { node: true, fragment: true, html: true });

            const selection = DOMNode.getSelection();

            if (!DOMNode.rangeCount(selection)) {
                return;
            }

            const range = DOMNode.getRange(selection);

            DOMNode.removeRanges(selection);

            for (const node of nodes) {
                DOMNode.insert(range, node);
            }
        },

        /**
         * Extract selected nodes from the DOM.
         * @returns {array} The selected nodes.
         */
        extractSelection() {
            const selection = DOMNode.getSelection();

            if (!DOMNode.rangeCount(selection)) {
                return [];
            }

            const range = DOMNode.getRange(selection);

            DOMNode.removeRanges(selection);

            const fragment = DOMNode.extract(range);

            return Core.wrap(DOMNode.childNodes(fragment));
        },

        /**
         * Return all selected nodes.
         * @returns {array} The selected nodes.
         */
        getSelection() {
            const selection = DOMNode.getSelection();

            if (!DOMNode.rangeCount(selection)) {
                return [];
            }

            const range = DOMNode.getRange(selection),
                nodes = Core.wrap(
                    DOMNode.findBySelector('*', range.commonAncestorContainer)
                );

            if (!nodes.length) {
                return [range.commonAncestorContainer];
            }

            if (nodes.length === 1) {
                return nodes;
            }

            const startContainer = DOMNode.startContainer(range),
                endContainer = DOMNode.endContainer(range),
                start = (Core.isElement(startContainer) ?
                    startContainer :
                    DOMNode.parent(startContainer)),
                end = (Core.isElement(endContainer) ?
                    endContainer :
                    DOMNode.parent(endContainer));

            return nodes.slice(
                nodes.indexOf(start),
                nodes.indexOf(end) + 1
            );
        },

        /**
         * Create a selection on the first node.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         */
        select(nodes) {
            const node = this.parseNode(nodes, { node: true, fragment: true, shadow: true });

            if (node && 'select' in node) {
                return node.select();
            }

            const selection = DOMNode.getSelection();

            if (DOMNode.rangeCount(selection) > 0) {
                DOMNode.removeRanges(selection);
            }

            if (!node) {
                return;
            }

            const range = this.createRange();
            DOMNode.select(range, node);
            DOMNode.addRange(selection, range);
        },

        /**
         * Create a selection containing all of the nodes.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         */
        selectAll(nodes) {
            nodes = this.sort(nodes);

            const selection = DOMNode.getSelection();

            if (DOMNode.rangeCount(selection)) {
                DOMNode.removeRanges(selection);
            }

            if (!nodes.length) {
                return;
            }

            const range = this.createRange();

            if (nodes.length == 1) {
                DOMNode.select(range, nodes.shift());
            } else {
                DOMNode.setStartBefore(range, nodes.shift());
                DOMNode.setEndAfter(range, nodes.pop());
            }

            DOMNode.addRange(selection, range);
        },

        /**
         * Wrap selected nodes with other nodes.
         * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
         */
        wrapSelection(nodes) {

            // ShadowRoot nodes can not be cloned
            nodes = this.parseNodes(nodes, { fragment: true, html: true });

            const selection = DOMNode.getSelection();

            if (!DOMNode.rangeCount(selection)) {
                return;
            }

            const range = DOMNode.getRange(selection);

            DOMNode.removeRanges(selection);

            const fragment = DOMNode.extract(range),
                deepest = this.constructor._deepest(nodes.slice().shift()),
                children = Core.wrap(DOMNode.childNodes(fragment));

            for (const child of children) {
                DOMNode.insertBefore(deepest, child);
            }

            for (const node of nodes) {
                DOMNode.insert(range, node);
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
                    this.constructor._hasAnimation(node)
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
                    DOMNode.hasAttribute(node, attribute)
                );
        },

        /**
         * Returns true if any of the nodes has child nodes.
         * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {Boolean} TRUE if the any of the nodes has child nodes, otherwise FALSE.
         */
        hasChildren(nodes) {
            return this.parseNodes(nodes, { fragment: true, shadow: true, document: true })
                .some(node =>
                    DOMNode.hasChildren(node)
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
                        DOMNode.hasClass(node, className)
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
            return this.parseNodes(nodes, { fragment: true, shadow: true, document: true, window: true })
                .some(node =>
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

            return this.parseNodes(nodes, { fragment: true, shadow: true, document: true })
                .some(node =>
                    !filter ||
                    filter(node)
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
                    this.constructor._hasFragment(node)
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
                    DOMNode.hasProperty(node, property)
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
                    this.constructor._hasShadow(node)
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

            return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
                .some(node =>
                    !filter ||
                    filter(node)
                );
        },

        /**
         * Returns true if any of the nodes is connected to the DOM.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {Boolean} TRUE if any of the nodes is connected to the DOM, otherwise FALSE.
         */
        isConnected(nodes) {
            return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
                .some(node => DOMNode.isConnected(node));
        },

        /**
         * Returns true if any of the nodes is considered equal to any of the other nodes.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
         * @returns {Boolean} TRUE if any of the nodes is considered equal to any of the other nodes, otherwise FALSE.
         */
        isEqual(nodes, others) {
            others = this.parseNodes(others, { node: true, fragment: true, shadow: true });

            return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
                .some(node =>
                    others.some(other => DOMNode.isEqual(node, other))
                );
        },

        /**
         * Returns true if any of the nodes or a parent of any of the nodes is "fixed".
         * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {Boolean} TRUE if any of the nodes is "fixed", otherwise FALSE.
         */
        isFixed(nodes) {
            return this.parseNodes(nodes, { node: true })
                .some(node =>
                    (Core.isElement(node) && this.constructor._css(node, 'position') === 'fixed') ||
                    this.constructor._parents(
                        node,
                        parent =>
                            Core.isElement(parent) && this.constructor._css(parent, 'position') === 'fixed',
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
            return this.parseNodes(nodes, { node: true, document: true, window: true })
                .some(node =>
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
            others = this.parseNodes(others, { node: true, fragment: true, shadow: true });

            return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
                .some(node =>
                    others.some(other => DOMNode.isSame(node, other))
                );
        },

        /**
         * Returns true if any of the nodes is visible.
         * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {Boolean} TRUE if any of the nodes is visible, otherwise FALSE.
         */
        isVisible(nodes) {
            return this.parseNodes(nodes, { node: true, document: true, window: true })
                .some(node =>
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
         * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @param {DOM~nodeCallback} callback The callback to execute.
         * @returns {*} The result of the callback.
         */
        forceShow(nodes, callback) {

            // DocumentFragment and ShadowRoot nodes have no parent
            const node = this.parseNode(nodes, { node: true, document: true, window: true });

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
            const node = this.parseNode(nodes, { node: true });

            if (!node) {
                return;
            }

            return Core.wrap(
                DOMNode.children(
                    DOMNode.parent(node)
                )
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

            return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
                .findIndex(node =>
                    !filter || filter(node)
                );
        },

        /**
         * Normalize nodes (remove empty text nodes, and join adjacent text nodes).
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         */
        normalize(nodes) {
            nodes = this.parseNodes(nodes, { node: true, fragment: true, shadow: true, document: true });

            for (const node of nodes) {
                DOMNode.normalize(node);
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
                fragment = DOMNode.fragment(template),
                children = DOMNode.children(fragment);

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
            return this.parseNodes(nodes, { fragment: true, shadow: true })
                .reduce(
                    (values, node) => {
                        if (DOMNode.is(node, 'form') || Core.isFragment(node) || Core.isShadow(node)) {
                            return values.concat(
                                this.serializeArray(
                                    DOMNode.findBySelector(
                                        'input, select, textarea',
                                        node
                                    )
                                )
                            );
                        }

                        if (DOMNode.is(node, '[disabled], input[type=submit], input[type=reset], input[type=file], input[type=radio]:not(:checked), input[type=checkbox]:not(:checked)')) {
                            return values;
                        }

                        const name = DOMNode.getAttribute(node, 'name');
                        if (!name) {
                            return values;
                        }

                        const value = DOMNode.getAttribute(node, 'value') || '';

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
        },

        /**
         * Sort nodes by their position in the document.
         * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {array} The sorted array of nodes.
         */
        sort(nodes) {
            return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
                .sort((node, other) => {
                    if (DOMNode.isSame(node, other)) {
                        return 0;
                    }

                    const pos = DOMNode.comparePosition(node, other);

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
        },

        /**
         * Return the tag name (lowercase) of the first node.
         * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
         * @returns {string} The elements tag name (lowercase).
         */
        tagName(nodes) {
            const node = this.parseNode(nodes);

            if (!node) {
                return;
            }

            return DOMNode.tagName(node);
        }

    });

    /**
     * DOM (Static) Animate
     */

    Object.assign(DOM, {

        /**
         * Add an animation to a single node.
         * @param {HTMLElement} node The input node.
         * @param {DOM~animationCallback} callback The animation callback.
         * @param {object} [options] The options to use for animating.
         * @param {number} [options.duration=1000] The duration of the animation.
         * @param {string} [options.type=ease-in-out] The type of animation.
         * @param {Boolean} [options.infinite] Whether the animation should run forever.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        _animate(node, callback, options) {
            if (!DOM._hasAnimation(node)) {
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
            if (!DOM._hasAnimation(node)) {
                return;
            }

            const animations = this._animations.get(node);
            for (const animation of animations) {
                animation(true, finish);
            }

            this._animations.delete(node);
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
                .finally(_ =>
                    this._dequeueNode(node)
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
                this._queues.set(node, []);
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
                return DOMNode.getAttribute(node, attribute);
            }

            const nodeAttributes = DOMNode.attributes(node),
                attributes = {};

            for (const attr of nodeAttributes) {
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

                return DOM._parseDataset(
                    DOMNode.getDataset(node, key)
                );
            }

            const dataset = DOMNode.dataset(node);

            const result = {};

            for (const k in dataset) {
                result[k] = DOM._parseDataset(dataset[k]);
            }

            return result;
        },

        /**
         * Remove a dataset value from a single node.
         * @param {HTMLElement} node The input node.
         * @param {string} key The dataset key.
         */
        _removeDataset(node, key) {
            key = Core.camelCase(key);

            DOMNode.removeDataset(node, key);
        },

        /**
         * Set an attribute value for a single node.
         * @param {HTMLElement} node The input node.
         * @param {object} attributes An object containing attributes.
         */
        _setAttribute(node, attributes) {
            for (const key in attributes) {
                DOMNode.setAttribute(
                    node,
                    key,
                    attributes[key]
                );
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

                DOMNode.setDataset(
                    node,
                    realKey,
                    dataset[key]
                );
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
            return this._forceShow(
                node,
                node => {
                    const result = {
                        x: DOMNode.offsetLeft(node),
                        y: DOMNode.offsetTop(node)
                    };

                    if (offset) {
                        let offsetParent = node;

                        while (offsetParent = DOMNode.offsetParent(offsetParent)) {
                            result.x += DOMNode.offsetLeft(offsetParent);
                            result.y += DOMNode.offsetTop(offsetParent);
                        }
                    }

                    return result;
                }
            );
        },

        /**
         * Get the computed bounding rectangle of a single node.
         * @param {HTMLElement} node The input node.
         * @param {Boolean} [offset] Whether to offset from the top-left of the Document.
         * @returns {DOMRect} The computed bounding rectangle.
         */
        _rect(node, offset) {
            return this._forceShow(
                node,
                node => {
                    const result = DOMNode.rect(node);

                    if (offset) {
                        result.x += DOMNode.getScrollXWindow(window);
                        result.y += DOMNode.getScrollYWindow(window);
                    }

                    return result;
                }
            );
        }

    });

    /**
     * DOM (Static) Scroll
     */

    Object.assign(DOM, {

        /**
         * Get the scroll X position of a Document.
         * @param {Document} node The input node.
         * @returns {number} The scroll X position.
         */
        _getScrollXDocument(node) {
            return DOMNode.getScrollX(
                DOMNode.scrollingElement(node)
            );
        },

        /**
         * Get the scroll Y position of a Document.
         * @param {Document} node The input node.
         * @returns {number} The scroll Y position.
         */
        _getScrollYDocument(node) {
            return DOMNode.getScrollY(
                DOMNode.scrollingElement(node)
            );
        },

        /**
         * Scroll a single node to an X,Y position.
         * @param {HTMLElement} node The input node.
         * @param {number} x The scroll X position.
         * @param {number} y The scroll Y position.
         */
        _setScroll(node, x, y) {
            DOMNode.setScrollX(node, x);
            DOMNode.setScrollY(node, y);
        },

        /**
         * Scroll a Document to an X,Y position.
         * @param {Document} node The input node.
         * @param {number} x The scroll X position.
         * @param {number} y The scroll Y position.
         */
        _setScrollDocument(node, x, y) {
            return this._setScroll(
                DOMNode.scrollingElement(node),
                x,
                y
            );
        },

        /**
         * Scroll a Document to an X position.
         * @param {Document} node The input node.
         * @param {number} x The scroll X position.
         */
        _setScrollXDocument(node, x) {
            return DOMNode.setScrollX(
                DOMNode.scrollingElement(node),
                x
            );
        },

        /**
         * Scroll a Window to an X position.
         * @param {Window} node The input node.
         * @param {number} x The scroll X position.
         */
        _setScrollXWindow(node, x) {
            return DOMNode.setScrollWindow(
                node,
                x,
                DOMNode.getScrollYWindow(node)
            );
        },

        /**
         * Scroll a single node to a Y position.
         * @param {Document} node The input node.
         * @param {number} y The scroll Y position.
         */
        _setScrollYDocument(node, y) {
            return DOMNode.setScrollY(
                DOMNode.scrollingElement(node),
                y
            );
        },

        /**
         * Scroll a Window to a Y position.
         * @param {Window} node The input node.
         * @param {number} y The scroll Y position.
         */
        _setScrollYWindow(node, y) {
            return DOMNode.setScrollWindow(
                node,
                DOMNode.getScrollXWindow(node),
                y
            );
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
            return this._forceShow(
                node,
                node => {
                    let result = DOMNode.height(node);

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
                }
            );
        },

        /**
         * Get the computed width of a single node.
         * @param {HTMLElement} node The input node.
         * @param {number} [innerOuter] Whether to include padding, border and margin widths.
         * @returns {number} The width.
         */
        _width(node, innerOuter = 1) {
            return this._forceShow(
                node,
                node => {
                    let result = DOMNode.width(node);

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
                }
            );
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
                    DOMNode.css(node)
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

                return DOMNode.getStyle(node, style);
            }

            const nodeStyles = DOMNode.style(node),
                styles = {};

            for (const style of nodeStyles) {
                styles[style] = DOMNode.getStyle(node, style);
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

                DOMNode.setStyle(node, style, value, important);
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
            const getDelegate = selector.match(DOM._complexRegExp) ?
                this._getDelegateContainsFactory(node, selector) :
                this._getDelegateMatchFactory(node, selector);

            return e => {
                if (DOMNode.isSame(e.target, node)) {
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
            selector = DOM._prefixSelectors(selectors, `#${DOM._tempId}`);

            return target => {
                const matches = this.__findByCustom(selector, node);

                if (!matches.length) {
                    return false;
                }

                if (matches.includes(target)) {
                    return target;
                }

                return this._parents(
                    target,
                    parent => matches.includes(parent),
                    parent => DOMNode.isSame(node, parent),
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
                DOMNode.is(target, selector) ?
                    target :
                    this._parents(
                        target,
                        parent => DOMNode.is(parent, selector),
                        parent => DOMNode.isSame(node, parent),
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
                delegate ?
                    this._removeEvent(node, events, callback, delegate) :
                    this._removeEvent(node, events, callback);
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

            if (event !== realEvent) {
                realCallback = this._namespaceFactory(event, realCallback);
            }

            eventData.realCallback = realCallback;
            eventData.event = event;
            eventData.realEvent = realEvent;

            if (!nodeEvents[realEvent]) {
                nodeEvents[realEvent] = [];
            } else if (nodeEvents[realEvent].includes(eventData)) {
                return;
            }

            nodeEvents[realEvent].push(eventData);

            DOMNode.addEvent(node, realEvent, realCallback);
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
                    const regExp = DOM._eventNamespacedRegExp(event);

                    if (!eventData.event.match(regExp)) {
                        return true;
                    }
                }

                DOMNode.removeEvent(node, eventData.realEvent, eventData.realCallback);

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
         * @param {object} [data] Additional data to attach to the Event object.
         * @param {object} [options] The options to use for the Event.
         * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
         * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
         * @returns {Boolean} FALSE if the event was cancelled, otherwise TRUE.
         */
        _triggerEvent(node, event, data, options) {
            const realEvent = DOM._parseEvent(event),
                eventData = {
                    ...data
                };

            if (realEvent !== event) {
                eventData.namespace = event.substring(realEvent.length + 1);
                eventData.namespaceRegExp = DOM._eventNamespacedRegExp(event);
            }

            return DOMNode.triggerEvent(node, realEvent, eventData, options);
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
                .filter(select => !!select)
                .map(select => `${prefix} ${select}`);
        }

    });

    /**
     * DOM (Static) Manipulation
     */

    Object.assign(DOM, {

        /**
         * Clone a single node.
         * @param {Node|HTMLElement|DocumentFragment} node The input node.
         * @param {Boolean} [deep=true] Whether to also clone all descendent nodes.
         * @param {Boolean} [cloneEvents=false] Whether to also clone events.
         * @param {Boolean} [cloneData=false] Whether to also clone custom data.
         * @returns {Node|HTMLElement|DocumentFragment} The cloned node.
         */
        _clone(node, deep = true, cloneEvents = false, cloneData = false) {
            const clone = DOMNode.clone(node, deep);

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
         * @param {Node|HTMLElement|DocumentFragment} node The input node.
         * @param {Node|HTMLElement|DocumentFragment} clone The cloned node.
         * @param {Boolean} [cloneEvents=false] Whether to also clone events.
         * @param {Boolean} [cloneData=false] Whether to also clone custom data.
         */
        _deepClone(node, clone, cloneEvents = false, cloneData = false) {
            const children = Core.wrap(DOMNode.childNodes(node));
            const cloneChildren = Core.wrap(DOMNode.childNodes(clone));

            for (let i = 0; i < children.length; i++) {
                if (cloneEvents) {
                    this._cloneEvents(children[i], cloneChildren[i]);
                }

                if (cloneData) {
                    this._cloneData(children[i], cloneChildren[i]);
                }

                this._deepClone(children[i], cloneChildren[i]);
            }
        },

        /**
         * Detach a single node from the DOM.
         * @param {Node|HTMLElement} node The input node.
         */
        _detach(node) {
            const parent = DOMNode.parent(node);

            if (parent) {
                return;
            }

            DOMNode.removeChild(parent, node);
        },

        /**
         * Remove all children of a single node from the DOM.
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
         */
        _empty(node) {
            // Remove descendent elements
            const children = Core.wrap(DOMNode.childNodes(node));

            for (const child of children) {
                this._remove(child);
                DOMNode.removeChild(node, child);
            }

            // Remove ShadowRoot
            if (this._hasShadow(node)) {
                const shadow = DOMNode.shadow(node);
                this._remove(shadow);
            }

            // Remove DocumentFragment
            if (this._hasFragment(node)) {
                const fragment = DOMNode.fragment(node);
                this._remove(fragment);
            }
        },

        /**
         * Remove a single node from the DOM.
         * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The input node.
         */
        _remove(node) {
            DOMNode.triggerEvent(node, 'remove');

            this._empty(node);

            if (Core.isElement(node)) {
                this._clearQueue(node);
                this._stop(node);

                if (this._styles.has(node)) {
                    this._styles.delete(node);
                }
            }

            this._removeEvent(node);
            this._removeData(node);
        },

        /**
         * Replace a single node with other nodes.
         * @param {Node|HTMLElement} node The input node.
         * @param {array} others The other node(s).
         */
        _replaceWith(node, others) {
            const parent = DOMNode.parent(node);

            if (!parent) {
                return;
            }

            for (const other of others) {
                const clone = this._clone(other, true);
                DOMNode.insertBefore(parent, clone, node);
            }

            this._remove(node);
            DOMNode.removeChild(parent, node);
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
            const outerParent = DOMNode.parent(parent);

            if (!outerParent) {
                return;
            }

            const children = Core.wrap(DOMNode.childNodes(parent));

            for (const child of children) {
                DOMNode.insertBefore(outerParent, child, parent);
            }

            this._remove(parent);
            DOMNode.removeChild(outerParent, parent);
        },

        /**
         * Wrap a single node with other nodes.
         * @param {Node|HTMLElement} node The input node.
         * @param {array} others The other node(s).
         */
        _wrap(node, others) {
            const parent = DOMNode.parent(node);

            if (!parent) {
                return;
            }

            const clones = others.map(other =>
                this._clone(other, true)
            );

            for (const clone of clones) {
                DOMNode.insertBefore(parent, clone, node);
            }

            const deepest = this._deepest(clones.shift());

            DOMNode.insertBefore(deepest, node);
        },

        /**
         * Wrap all nodes with other nodes.
         * @param {array} nodes The input node(s).
         * @param {array} others The other node(s).
         */
        _wrapAll(nodes, others) {
            const firstNode = nodes.slice().shift();

            if (!firstNode) {
                return;
            }

            const parent = DOMNode.parent(firstNode);

            if (!parent) {
                return;
            }

            for (const other of others) {
                DOMNode.insertBefore(parent, other, firstNode);
            }

            const deepest = DOM._deepest(others.shift());

            for (const node of nodes) {
                DOMNode.insertBefore(deepest, node);
            }
        },

        /**
         * Wrap the contents of a single node with other nodes.
         * @param {HTMLElement|DocumentFragment|ShadowRoot} node The input node.
         * @param {array} others The other node(s).
         */
        _wrapInner(node, others) {
            const children = Core.wrap(DOMNode.childNodes(node));

            const clones = others.map(other =>
                this._clone(other, true)
            );

            for (const clone of clones) {
                DOMNode.insertBefore(node, clone);
            }

            const deepest = this._deepest(clones.shift());

            for (const child of children) {
                DOMNode.insertBefore(deepest, child);
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
         * Return all nodes matching custom CSS selector(s).
         * @param {array} selectors The custom query selector(s).
         * @param {array} nodes The input nodes.
         * @returns {array} The matching nodes.
         */
        _findByCustom(selectors, nodes = this._context) {

            const results = [];

            for (const node of nodes) {
                Core.merge(
                    results,
                    this.__findByCustom(selectors, node)
                );
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

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
                    DOMNode.findBySelector(selector, node)
                );
            }

            return nodes.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },

        /**
         * Return a single node matching custom CSS selector(s).
         * @param {array} selectors The custom query selector(s).
         * @param {array} nodes The input nodes.
         * @returns {HTMLElement} The matching node.
         */
        _findOneByCustom(selectors, nodes) {
            for (const node of nodes) {
                const result = this.__findOneByCustom(selectors, node);

                if (result) {
                    return result;
                }
            }

            return null;
        },

        /**
         * Return a single node matching a standard CSS selector.
         * @param {string} selector The query selector.
         * @param {array} nodes The input nodes.
         * @returns {HTMLElement} The matching node.
         */
        _findOneBySelector(selector, nodes) {
            for (const node of nodes) {
                const result = DOMNode.findOneBySelector(selector, node);
                if (result) {
                    return result;
                }
            }

            return null;
        },

        /**
         * Return all nodes matching a custom CSS selector.
         * @param {string} selectors The custom query selector.
         * @param {HTMLElement} node The input node.
         * @returns {NodeList} The matching nodes.
         */
        __findByCustom(selectors, node) {
            const nodeId = DOMNode.getAttribute(node, 'id');
            DOMNode.setAttribute(node, 'id', this._tempId);

            const parent = DOMNode.parent(node);

            const results = [];

            for (const selector of selectors) {
                Core.merge(
                    results,
                    DOMNode.findBySelector(selector, parent)
                );
            }

            if (nodeId) {
                DOMNode.setAttribute(node, 'id', nodeId);
            } else {
                DOMNode.removeAttribute(node, 'id');
            }

            return selectors.length > 1 && results.length > 1 ?
                Core.unique(results) :
                results;
        },


        /**
         * Return a single node matching a custom CSS selector.
         * @param {string} selectors The custom query selector.
         * @param {HTMLElement} node The input node.
         * @returns {HTMLElement} The matching node.
         */
        __findOneByCustom(selectors, node) {
            const nodeId = DOMNode.getAttribute(node, 'id');
            DOMNode.setAttribute(node, 'id', this._tempId);

            const parent = DOMNode.parent(node);

            if (!parent) {
                return null;
            }

            let result = null;

            for (const selector of selectors) {
                result = DOMNode.findOneBySelector(selector, parent);

                if (result) {
                    break;
                }
            }

            if (nodeId) {
                DOMNode.setAttribute(node, 'id', nodeId);
            } else {
                DOMNode.removeAttribute(node, 'id');
            }

            return result;
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
            const children = Core.wrap(
                elementsOnly ?
                    DOMNode.children(node) :
                    DOMNode.childNodes(node)
            );
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
                DOMNode.findBySelector('*', node)
            ).find(node =>
                !DOMNode.hasChildren(node)
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

            node = DOMNode.next(node);

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

            while (node = DOMNode.next(node)) {
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

            const parent = DOMNode.parent(node);

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

            while (node = DOMNode.parent(node)) {
                if (Core.isDocument(node)) {
                    break;
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
         * Return the previous sibling for a single node (optionally matching a filter).
         * @param {Node|HTMLElement} node The input node.
         * @param {DOM~filterCallback} [filter] The filter function.
         * @returns {array} The matching nodes.
         */
        _prev(node, filter) {
            const results = [];

            node = DOMNode.prev(node);

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

            while (node = DOMNode.prev(node)) {
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
         * Return all siblings for a single node (optionally matching a filter).
         * @param {Node|HTMLElement} node The input node.
         * @param {DOM~filterCallback} [filter] The filter function.
         * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
         * @returns {array} The matching nodes.
         */
        _siblings(node, filter, elementsOnly = true) {
            const results = [];

            const parent = DOMNode.parent(node);

            if (!parent) {
                return results;
            }

            const siblings = elementsOnly ?
                parent.children :
                parent.childNodes;

            let sibling;
            for (sibling of siblings) {
                if (DOMNode.isSame(node, sibling)) {
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
         * Returns true if a single node has an animation.
         * @param {HTMLElement} node The input node.
         * @returns {Boolean} TRUE if the node has an animation, otherwise FALSE.
         */
        _hasAnimation(node) {
            return this._animations.has(node);
        },

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
         * Returns true if a single node has a DocumentFragment.
         * @param {HTMLElement} node The input node.
         * @returns {Boolean} TRUE if the node has a DocumentFragment, otherwise FALSE.
         */
        _hasFragment(node) {
            return !!DOMNode.fragment(node);
        },

        /**
         * Returns true if a single node has a ShadowRoot.
         * @param {HTMLElement} node The input node.
         * @returns {Boolean} TRUE if the node has a ShadowRoot, otherwise FALSE.
         */
        _hasShadow(node) {
            return !!DOMNode.shadow(node);
        },

        /**
         * Returns true if a single node is visible.
         * @param {HTMLElement|Document|Window} node The input node.
         * @returns {Boolean} TRUE if the node is visible, otherwise FALSE.
         */
        _isVisible(node) {
            if (Core.isWindow(node)) {
                return DOMNode._isVisibleDocument(
                    DOMNode.document(node)
                );
            }

            if (Core.isDocument(node)) {
                return DOMNode.isVisibleDocument(node);
            }

            return !!DOMNode.offsetParent(node);
        }

    });

    /**
     * DOM (Static) Utility
     */

    Object.assign(DOM, {

        /**
         * Force a single node to be shown, and then execute a callback.
         * @param {Node|HTMLElement|Document|Window} node The input node.
         * @param {DOM~nodeCallback} callback The callback to execute.
         * @returns {*} The result of the callback.
         */
        _forceShow(node, callback) {
            if (Core.isDocument(node) || Core.isWindow(node) || this._isVisible(node)) {
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
                        Core.isElement(parent) && this._css(parent, 'display') === 'none'
                )
            );

            const hidden = new Map;

            for (const element of elements) {
                hidden.set(element, DOMNode.getAttribute(element, 'style'));

                DOMNode.setStyle(element, 'display', 'initial', true);
            }

            const result = callback(node);

            for (const [element, style] of hidden) {
                if (style) {
                    DOMNode.setAttribute(element, 'style', style);
                } else {
                    DOMNode.removeAttribute(element, 'style');
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
            const name = this._tagName(node);
            if (!(name in allowedTags)) {
                DOMNode.removeChild(parent, node);
                return;
            }

            // check node attributes
            const allowedAttributes = [
                ...allowedTags['*'],
                ...allowedTags[name]
            ];
            const attributes = this._getAttribute(node);
            for (const attribute in attributes) {
                const valid = !!allowedAttributes.find(test => attribute.match(test));

                if (!valid) {
                    DOMNode.removeAttribute(node, attribute);
                }
            }

            // check children
            const children = DOMNode.children(node);
            for (const child of children) {
                this._sanitize(child, node, allowedTags);
            }
        },

        /**
         * Return the tag name (lowercase) of a single node.
         * @param {HTMLElement} node The input node.
         * @returns {string} The elements tag name (lowercase).
         */
        _tagName(node) {
            return DOMNode.tagName(node).toLowerCase();
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

        _animating: false,
        _animations: new Map,
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

        INNER: 0,
        OUTER: 2,
        OUTER_MARGIN: 3,

        // Complex selector RegExp
        _complexRegExp: /(?:^\s*[\>\+\~]|\,(?=(?:(?:[^"']*["']){2})*[^"']*$)\s*[\>\+\~])/,

        // Fast selector RegExp
        _fastRegExp: /^([\#\.]?)([\w\-]+)$/,

        // Comma seperated selector RegExp
        _splitRegExp: /\,(?=(?:(?:[^"]*"){2})*[^"]*$)\s*/,

        // Temporary ID
        _tempId: `frost${Date.now().toString(16)}`

    });

    /**
     * DOMNode Class
     * @class
     */
    class DOMNode {

    }

    /**
     * DOMNode (Static) Attributes
     */

    Object.assign(DOMNode, {

        /**
         * Get attribute values for a single node.
         * @param {HTMLElement} node The input node.
         * @returns {NamedNodeMap} The dataset value.
         */
        attributes(node) {
            return node.attributes;
        },

        /**
         * Get dataset values for a single node.
         * @param {HTMLElement} node The input node.
         * @returns {DOMStringMap} The dataset value.
         */
        dataset(node) {
            return node.dataset;
        },

        /**
         * Get an attribute value for a single node.
         * @param {HTMLElement} node The input node.
         * @param {string} attribute The attribute name.
         * @returns {string} The attribute value.
         */
        getAttribute(node, attribute) {
            return node.getAttribute(attribute);
        },

        /**
         * Get a dataset value for a single node.
         * @param {HTMLElement} node The input node.
         * @param {string} [key] The dataset key.
         * @returns {string} The dataset value.
         */
        getDataset(node, key) {
            return this.dataset(node)[key];
        },

        /**
         * Get a property value for a single node.
         * @param {HTMLElement} node The input node.
         * @param {string} property The property name.
         * @returns {string} The property value.
         */
        getProperty(node, property) {
            return node[property];
        },

        /**
         * Remove an attribute from a single node.
         * @param {HTMLElement} node The input node.
         * @param {string} attribute The attribute name.
         */
        removeAttribute(node, attribute) {
            node.removeAttribute(attribute)
        },

        /**
         * Remove a dataset value from a single node.
         * @param {HTMLElement} node The input node.
         * @param {string} key The dataset key.
         */
        removeDataset(node, key) {
            delete node.dataset[key];
        },

        /**
         * Remove a property from a single node.
         * @param {HTMLElement} node The input node.
         * @param {string} property The property name.
         */
        removeProperty(node, property) {
            delete node[property];
        },

        /**
         * Set an attribute value for a single node.
         * @param {HTMLElement} node The input node.
         * @param {string} attribute The attribute name.
         * @param {string} value The attribute value.
         */
        setAttribute(node, attribute, value) {
            node.setAttribute(
                attribute,
                value
            );
        },

        /**
         * Set a dataset value for a single node.
         * @param {HTMLElement} node The input node.
         * @param {string} key The dataset key.
         * @param {string} value The dataset value.
         */
        setDataset(node, key, value) {
            this.dataset(node)[key] = value;
        },

        /**
         * Set a property value for a single node.
         * @param {HTMLElement} node The input node.
         * @param {string} property The property name.
         * @param {string} value The property value.
         */
        setProperty(node, property, value) {
            node[property] = value;
        }

    });

    /**
     * DOMNode (Static) Position
     */

    Object.assign(DOMNode, {

        /**
         * Get the left offset of a single node.
         * @param {HTMLElement} node The input node.
         * @returns {number} The left offset of the node (in pixels).
         */
        offsetLeft(node) {
            return node.offsetLeft;
        },

        /**
         * Get the top offset of a single node.
         * @param {HTMLElement} node The input node.
         * @returns {number} The top offset of the node (in pixels).
         */
        offsetTop(node) {
            return node.offsetTop;
        },

        /**
         * Get the computed bounding rectangle of a single node.
         * @param {HTMLElement} node The input node.
         * @returns {DOMRect} The computed bounding rectangle.
         */
        rect(node) {
            return node.getBoundingClientRect();
        }

    });

    /**
     * DOMNode (Static) Scroll
     */

    Object.assign(DOMNode, {

        /**
         * Get the scroll X position of a single node.
         * @param {HTMLElement} node The input node.
         * @returns {number} The scroll X position.
         */
        getScrollX(node) {
            return node.scrollLeft;
        },

        /**
         * Get the scroll X position of a Window.
         * @param {Window} node The input node.
         * @returns {number} The scroll X position.
         */
        getScrollXWindow(node) {
            return node.scrollX;
        },

        /**
         * Get the scroll Y position of a single node.
         * @param {HTMLElement} node The input node.
         * @returns {number} The scroll Y position.
         */
        getScrollY(node) {
            return node.scrollTop;
        },

        /**
         * Get the scroll Y position of a Window.
         * @param {Document} node The input node.
         * @returns {number} The scroll Y position.
         */
        getScrollYWindow(node) {
            return node.scrollY;
        },

        /**
         * Scroll a Window to an X,Y position.
         * @param {Window} node The input node.
         * @param {number} x The scroll X position.
         * @param {number} y The scroll Y position.
         */
        setScrollWindow(node, x, y) {
            return node.scroll(x, y);
        },

        /**
         * Scroll a single node to an X position.
         * @param {HTMLElement} node The input node.
         * @param {number} x The scroll X position.
         */
        setScrollX(node, x) {
            node.scrollLeft = x;
        },

        /**
         * Scroll a single node to a Y position.
         * @param {HTMLElement|Document|Window} node The input node.
         * @param {number} y The scroll Y position.
         */
        setScrollY(node, y) {
            node.scrollTop = y;
        }

    });

    /**
     * DOMNode (Static) Size
     */

    Object.assign(DOMNode, {

        /**
         * Get the client height of a single node.
         * @param {HTMLElement} node The input node.
         * @returns {number} The height.
         */
        height(node) {
            return node.clientHeight;
        },

        /**
         * Get the height of a Window.
         * @param {Window} node The input node.
         * @param {Boolean} [outer] Whether to use the outer height.
         * @returns {number} The height.
         */
        heightWindow(node, outer) {
            return outer ?
                node.outerHeight :
                node.innerHeight;
        },

        /**
         * Get the client width of a single node.
         * @param {HTMLElement} node The input node.
         * @returns {number} The width.
         */
        width(node) {
            return node.clientWidth;
        },

        /**
         * Get the width of a Window.
         * @param {Window} node The input node.
         * @param {Boolean} [outer] Whether to use the outer width.
         * @returns {number} The width.
         */
        widthWindow(node, outer) {
            return outer ?
                node.outerWidth :
                node.innerWidth;
        }

    });

    /**
     * DOMNode (Static) Styles
     */

    Object.assign(DOMNode, {

        /**
         * Add classes to a single node.
         * @param {HTMLElement} node The input node.
         * @param {...string} classes The classes.
         */
        addClass(node, ...classes) {
            node.classList.add(...classes)
        },

        /**
         * Get a CSSStyleDeclaration for a single node.
         * @param {HTMLElement} node The input node.
         * @returns {CSSStyleDeclaration} The CSSStyleDeclaration.
         */
        css(node) {
            return window.getComputedStyle(node);
        },

        /**
         * Get a style property for a single node.
         * @param {HTMLElement} node The input node.
         * @param {string} [style] The style name.
         * @returns {string} The style value.
         */
        getStyle(node, style) {
            return this.style(node)[style];
        },

        /**
         * Remove classes from a single node.
         * @param {HTMLElement} node The input node.
         * @param {...string} classes The classes.
         */
        removeClass(node, ...classes) {
            node.classList.remove(...classes)
        },

        /**
         * Set style properties for a single node.
         * @param {HTMLElement} node The input node.
         * @param {object} styles An object containing styles.
         * @param {Boolean} [important] Whether the style should be !important.
         */
        setStyle(node, style, value, important) {
            node.style.setProperty(
                style,
                value,
                important ?
                    'important' :
                    ''
            );
        },

        /**
         * Get style properties for a single node.
         * @param {HTMLElement} node The input node.
         * @returns {CSSStyleDeclaration} The style value.
         */
        style(node) {
            return node.style;
        },

        /**
         * Toggle classes for a single node.
         * @param {HTMLElement} node The input node.
         * @param {...string} classes The classes.
         */
        toggleClass(node, ...classes) {
            node.classList.toggle(...classes)
        }

    });

    /**
     * DOMNode (Static) Events
     */

    Object.assign(DOMNode, {

        /**
         * Trigger a blur event on a single node.
         * @param {HTMLElement} node The input node.
         */
        blur(node) {
            node.blur();
        },

        /**
         * Trigger a click event on a single node.
         * @param {HTMLElement} node The input node.
         */
        click(node) {
            node.click();
        },

        /**
         * Trigger a focus event on a single node.
         * @param {HTMLElement} node The input node.
         */
        focus(node) {
            node.focus();
        }

    });

    /**
     * DOMNode (Static) Event Handlers
     */

    Object.assign(DOMNode, {

        /**
         * Add an event to a single node.
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
         * @param {string} event The event name.
         * @param {DOM~eventCallback} callback The callback to execute.
         */
        addEvent(node, event, callback) {
            node.addEventListener(event, callback);
        },

        /**
         * Remove an event from a single node.
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} nodes The input node.
         * @param {string} event The event name.
         * @param {DOM~eventCallback} callback The callback to remove.
         */
        removeEvent(node, event, callback) {
            node.removeEventListener(event, callback);
        },

        /**
         * Trigger an event on a single node.
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
         * @param {string} event The event name.
         * @param {object} [data] Additional data to attach to the Event object.
         * @param {object} [options] The options to use for the Event.
         * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
         * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
         * @returns {Boolean} FALSE if the event was cancelled, otherwise TRUE.
         */
        triggerEvent(node, event, data, options) {
            const eventData = new Event(event, {
                bubbles: true,
                cancelable: true,
                ...options
            });

            if (data) {
                Object.assign(eventData, data);
            }

            return node.dispatchEvent(eventData);
        }

    });

    /**
     * DOMNode (Static) Create
     */

    Object.assign(DOMNode, {

        /**
         * Attach a shadow DOM tree to a single node.
         * @param {HTMLElement} node The input node.
         * @param {Boolean} [open=true] Whether the elements are accessible from JavaScript outside the root.
         * @returns {ShadowRoot} The new ShadowRoot.
         */
        attachShadow(node, open = true) {
            return node.attachShadow({
                mode: open ?
                    'open' :
                    'closed'
            });
        },

        /**
         * Create a new DOM element.
         * @param {Document} context The document context.
         * @param {string} tagName The type of HTML element to create.
         * @returns {HTMLElement} The new element.
         */
        create(context, tagName) {
            return context.createElement(tagName);
        },

        /**
         * Create a new comment node.
         * @param {Document} context The document context.
         * @param {string} comment The comment contents.
         * @returns {Node} The new comment node.
         */
        createComment(context, comment) {
            return context.createCommentNode(comment);
        },

        /**
         * Create a new document fragment.
         * @param {Document} context The document context.
         * @returns {DocumentFragment} The new DocumentFragment.
         */
        createFragment(context) {
            return context.createDocumentFragment();
        },

        /**
         * Create a new range object.
         * @param {Document} context The document context.
         * @returns {Range} The new range.
         */
        createRange(context) {
            return context.createRange();
        },

        /**
         * Create a new text node.
         * @param {Document} context The document context.
         * @param {string} text The text contents.
         * @returns {Node} The new text node.
         */
        createText(context, text) {
            return context.createTextNode(text);
        }

    });

    /**
     * DOMNode (Static) Manipulation
     */

    Object.assign(DOMNode, {

        /**
         * Create a clone of a node.
         * @param {Node} node The input node.
         * @param {Boolean} deep Whether to deep clone the node.
         * @returns {Node} The cloned node.
         */
        clone(node, deep) {
            return node.cloneNode(deep);
        },

        /**
         * Remove a child node from a parent node in the DOM.
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The parent node.
         * @param {Node} child The child node to remove.
         */
        removeChild(node, child) {
            node.removeChild(child);
        }

    });

    /**
     * DOMNode (Static) Move
     */

    Object.assign(DOMNode, {

        /**
         * Insert a new node into a parent node (optionally before a reference node).
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} parentNode The parent node.
         * @param {Node} newNode The new node to insert.
         * @param {Node} [referenceNode] The node to insert the new node before.
         */
        insertBefore(parentNode, newNode, referenceNode = null) {
            parentNode.insertBefore(newNode, referenceNode);
        }

    });

    /**
     * DOMNode (Static) Find
     */

    Object.assign(DOMNode, {

        /**
         * Return all nodes with a specific class.
         * @param {string} className The class name.
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
         * @returns {HTMLCollection} The matching nodes.
         */
        findByClass(className, node) {
            return node.getElementsByClassName(className);
        },

        /**
         * Return a single nodes with a specific ID.
         * @param {string} id The id.
         * @param {Document} node The input node.
         * @returns {HTMLElement} The matching node.
         */
        findById(id, node) {
            return node.getElementById(id);
        },

        /**
         * Return all nodes with a specific tag.
         * @param {string} tagName The tag name.
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
         * @returns {HTMLCollection} The matching nodes.
         */
        findByTag(tagName, node) {
            return node.getElementsByTagName(tagName);
        },

        /**
         * Return all nodes matching a standard CSS selector.
         * @param {string} selector The query selector.
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
         * @returns {NodeList} The matching nodes.
         */
        findBySelector(selector, node) {
            return node.querySelectorAll(selector);
        },

        /**
         * Return a single node matching a standard CSS selector.
         * @param {string} selector The query selector.
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
         * @returns {HTMLElement} The matching node.
         */
        findOneBySelector(selector, node) {
            return node.querySelector(selector);
        }

    });

    /**
     * DOMNode Traversal
     */

    Object.assign(DOMNode, {

        /**
         * Return all child nodes for a single node.
         * @param {HTMLElement} node The input node.
         * @returns {NodeList} The child nodes.
         */
        childNodes(node) {
            return node.childNodes;
        },

        /**
         * Return all child elements for a single node.
         * @param {ParentNode} node The input node.
         * @returns {HTMLCollection} The child elements.
         */
        children(node) {
            return node.children;
        },

        /**
         * Get the Document from a Window.
         * @param {Window} node The input node.
         * @returns {Document} The Document.
         */
        document(node) {
            return node.document;
        },

        /**
         * Get the document element from a Document.
         * @param {Document} node The input node.
         * @returns {HTMLElement} The document element.
         */
        documentElement(node) {
            return node.documentElement;
        },

        /**
         * Return the first child for a single node.
         * @param {Node} node The input node.
         * @returns {Node} The first child.
         */
        firstChild(node) {
            return node.firstChild;
        },

        /**
         * Return the DocumentFragment for a single node.
         * @param {HTMLElement} node The input node.
         * @returns {DocumentFragment} The DocumentFragment.
         */
        fragment(node) {
            return node.content;
        },

        /**
         * Return the next sibling node of a single node.
         * @param {Node} node The input node.
         * @returns {Node} The next sibling node.
         */
        next(node) {
            return node.nextSibling;
        },

        /**
         * Return the offset parent node of a single node.
         * @param {Node} node The input node.
         * @returns {HTMLElement|DocumentFragment|ShadowRoot|Document} The offset parent node.
         */
        offsetParent(node) {
            return node.offsetParent;
        },

        /**
         * Return the parent node of a single node.
         * @param {Node} node The input node.
         * @returns {HTMLElement|DocumentFragment|ShadowRoot|Document} The parent node.
         */
        parent(node) {
            return node.parentNode;
        },

        /**
         * Return the previous sibling node of a single node.
         * @param {Node} node The input node.
         * @returns {Node} The previous sibling node.
         */
        prev(node) {
            return node.previousSibling;
        },

        /**
         * Get the scrolling element from a Document.
         * @param {Document} node The input node.
         * @returns {HTMLElement} The scrolling element.
         */
        scrollingElement(node) {
            return node.scrollingElement;
        },

        /**
         * Return the ShadowRoot for a single node.
         * @param {HTMLElement} node The input node.
         * @returns {ShadowRoot} The ShadowRoot.
         */
        shadow(node) {
            return node.shadowRoot;
        }

    });

    /**
     * DOMNode (Static) Selection
     */

    Object.assign(DOMNode, {

        /**
         * Add a range to a selection.
         * @param {Selection} selection The input selection.
         * @param {Range} range The range to add.
         */
        addRange(selection, range) {
            selection.addRange(range);
        },

        /**
         * Collapse a range.
         * @param {Range} range The input range.
         */
        collapse(range) {
            range.collapse();
        },

        /**
         * Return the end container of a range.
         * @param {Range} range The input range.
         * @returns {HTMLElement} The end container of the range.
         */
        endContainer(range) {
            return range.endContainer;
        },

        /**
         * Extract the contents of a range.
         * @param {Range} range The input range.
         * @returns {DocumentFragment} A DocumentFragment containing the range contents.
         */
        extract(range) {
            return range.extractContents();
        },

        /**
         * Get a range from a selection.
         * @param {Selection} selection The input selection.
         * @param {number} [index=0] The index of the range to return.
         * @returns {Range} The selected range.
         */
        getRange(selection, index = 0) {
            return selection.getRangeAt(index);
        },

        /**
         * Get the current selection.
         * @returns {Selection} The current selection.
         */
        getSelection() {
            return window.getSelection();
        },

        /**
         * Insert a node into a range.
         * @param {Range} range The input range.
         * @param {Node|HTMLElement} node The node to insert.
         */
        insert(range, node) {
            range.insertNode(node);
        },

        /**
         * Return the range count for a selection.
         * @param {Selection} selection The input selection.
         */
        rangeCount(selection) {
            return selection.rangeCount;
        },

        /**
         * Remove all ranges from a selection.
         * @param {Selection} selection The input selection.
         */
        removeRanges(selection) {
            selection.removeAllRanges();
        },

        /**
         * Add a node to a range.
         * @param {Range} range The input range. 
         * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The node to select.
         */
        select(range, node) {
            range.selectNode(node);
        },

        /**
         * Set the end position of a range after a node.
         * @param {Range} range The input range.
         * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The node to end the range after.
         */
        setEndAfter(range, node) {
            range.setEndAfter(node);
        },

        /**
         * Set the start position of a range before a node.
         * @param {Range} range The input range.
         * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The node to start the range before.
         */
        setStartBefore(range, node) {
            range.setStartBefore(node);
        },

        /**
         * Return the start container of a range.
         * @param {Range} range The input range.
         * @returns {HTMLElement} The start container of the range.
         */
        startContainer(range) {
            return range.startContainer;
        }

    });

    /**
     * DOMNode (Static) Tests
     */

    Object.assign(DOMNode, {

        /**
         * Returns true if a single node has another node as a descendent.
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
         * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The other node.
         * @returns {Boolean} TRUE if the node has the other node as a descendent, otherwise FALSE.
         */
        contains(node, other) {
            return node.contains(other);
        },

        /**
         * Returns true if a single node has a specified attribute.
         * @param {HTMLElement} node The input node.
         * @param {string} attribute The attribute name.
         * @returns {Boolean} TRUE if the node has the attribute, otherwise FALSE.
         */
        hasAttribute(node, attribute) {
            return node.hasAttribute(attribute);
        },

        /**
         * Returns true if a single node has child elements.
         * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
         * @returns {Boolean} TRUE if the node has child elements, otherwise FALSE.
         */
        hasChildren(node) {
            return !!node.childElementCount;
        },

        /**
         * Returns true if a single node has any a specified class.
         * @param {HTMLElement} node The input node.
         * @param {string} className The class name.
         * @returns {Boolean} TRUE if the node has any of the classes, otherwise FALSE.
         */
        hasClass(node, className) {
            return node.classList.contains(className);
        },

        /**
         * Returns true if a single node has a specified property.
         * @param {HTMLElement} node The input node.
         * @param {string} property The property name.
         * @returns {Boolean} TRUE if the node has the property, otherwise FALSE.
         */
        hasProperty(node, property) {
            return node.hasOwnProperty(property);
        },

        /**
         * Returns true if a single node matches a query selector.
         * @param {HTMLElement} node The input node.
         * @param {string} selector The query selector.
         * @returns {Boolean} TRUE if the node matches the selector, otherwise FALSE.
         */
        is(node, selector) {
            return Core.isElement(node) &&
                node.matches(selector);
        },

        /**
         * Returns true if a single node is connected to the DOM.
         * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The input node.
         * @returns {Boolean} TRUE if the node is connected to the DOM, otherwise FALSE.
         */
        isConnected(node) {
            return node.isConnected;
        },

        /**
         * Returns true if a single node is equal to another node.
         * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
         * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The other node.
         * @returns {Boolean} TRUE if the node is equal to the other node, otherwise FALSE.
         */
        isEqual(node, other) {
            return node.isEqualNode(other);
        },

        /**
         * Returns true if a single node is the same as another node.
         * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
         * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The other node.
         * @returns {Boolean} TRUE if the node is the same as the other node, otherwise FALSE.
         */
        isSame(node, other) {
            return node.isSameNode(other);
        },

        /**
         * Returns true if a Document is visible.
         * @param {Document} node The input node.
         * @returns {Boolean} TRUE if the node is visible, otherwise FALSE.
         */
        isVisibleDocument(node) {
            return node.visibilityState === 'visible';
        }

    });

    /**
     * DOMNode (Static) Utility
     */

    Object.assign(DOMNode, {

        /**
         * Compare the position of two nodes in a Document.
         * @param {Node} node The input node.
         * @param {Node} other The node to compare against.
         * @returns {number} The bitmask representing the relationship of the nodes.
         */
        comparePosition(node, other) {
            return node.compareDocumentPosition(other);
        },

        /**
         * Normalize a single node (remove empty text nodes, and join neighbouring text nodes).
         * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
         */
        normalize(node) {
            node.normalize();
        },

        /**
         * Return the tag name of a single node.
         * @param {HTMLElement} node The input node.
         * @returns {string} The elements tag name.
         */
        tagName(node) {
            return node.tagName;
        }

    });

    return {
        AjaxRequest,
        DOM,
        DOMNode,
        dom: new DOM
    };

});