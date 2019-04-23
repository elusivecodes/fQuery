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
