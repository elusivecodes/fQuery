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
