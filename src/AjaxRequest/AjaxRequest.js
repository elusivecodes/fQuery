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
            AjaxRequest.defaults,
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

        this._isLocal = AjaxRequest._localRegExp.test(location.protocol);

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

        try {
            this._xhr.abort();
        } catch (error) {
            this._reject(error);
        }

        this._isCancelled = true;

        if (this._settings.rejectOnCancel) {
            this._reject(new Error(reason));
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
