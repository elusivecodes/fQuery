import { extend, isObject } from '@fr0st/core';
import { appendQueryString, getSearchParams, parseFormData, parseParams, setSearchParams } from './helpers.js';
import { getAjaxDefaults, getWindow } from './../config.js';

/**
 * AjaxRequest Class
 * @class
 */
export default class AjaxRequest {
    #options;
    #promise;
    #resolve;
    #reject;

    #isResolved = false;
    #isRejected = false;
    #isCancelled = false;

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
     */
    constructor(options) {
        this.#options = extend(
            {},
            getAjaxDefaults(),
            options,
        );

        if (!this.#options.url) {
            this.#options.url = getWindow().location.href;
        }

        if (!this.#options.cache) {
            this.#options.url = appendQueryString(this.#options.url, '_', Date.now());
        }

        if (!('Content-Type' in this.#options.headers) && this.#options.contentType) {
            this.#options.headers['Content-Type'] = this.#options.contentType;
        }

        if (this.#options.isLocal === null) {
            this.#options.isLocal = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(location.protocol);
        }

        if (!this.#options.isLocal && !('X-Requested-With' in this.#options.headers)) {
            this.#options.headers['X-Requested-With'] = 'XMLHttpRequest';
        }

        this.#promise = new Promise((resolve, reject) => {
            this.#resolve = (value) => {
                this.#isResolved = true;
                resolve(value);
            };

            this.#reject = (error) => {
                this.#isRejected = true;
                reject(error);
            };
        });

        this.xhr = this.#options.xhr();

        if (this.#options.data) {
            if (this.#options.processData && isObject(this.#options.data)) {
                if (this.#options.contentType === 'application/json') {
                    this.#options.data = JSON.stringify(this.#options.data);
                } else if (this.#options.contentType === 'application/x-www-form-urlencoded') {
                    this.#options.data = parseParams(this.#options.data);
                } else {
                    this.#options.data = parseFormData(this.#options.data);
                }
            }

            if (this.#options.method === 'GET') {
                const dataParams = new URLSearchParams(this.#options.data);

                const searchParams = getSearchParams(this.#options.url);
                for (const [key, value] of dataParams.entries()) {
                    searchParams.append(key, value);
                }

                this.#options.url = setSearchParams(this.#options.url, searchParams);
                this.#options.data = null;
            }
        }

        this.xhr.open(this.#options.method, this.#options.url, true, this.#options.username, this.#options.password);

        for (const [key, value] of Object.entries(this.#options.headers)) {
            this.xhr.setRequestHeader(key, value);
        }

        if (this.#options.responseType) {
            this.xhr.responseType = this.#options.responseType;
        }

        if (this.#options.mimeType) {
            this.xhr.overrideMimeType(this.#options.mimeType);
        }

        if (this.#options.timeout) {
            this.xhr.timeout = this.#options.timeout;
        }

        this.xhr.onload = (e) => {
            if (this.xhr.status > 400) {
                this.#reject({
                    status: this.xhr.status,
                    xhr: this.xhr,
                    event: e,
                });
            } else {
                this.#resolve({
                    response: this.xhr.response,
                    xhr: this.xhr,
                    event: e,
                });
            }
        };

        if (!this.#options.isLocal) {
            this.xhr.onerror = (e) =>
                this.#reject({
                    status: this.xhr.status,
                    xhr: this.xhr,
                    event: e,
                });
        }

        if (this.#options.onProgress) {
            this.xhr.onprogress = (e) =>
                this.#options.onProgress(e.loaded / e.total, this.xhr, e);
        }

        if (this.#options.onUploadProgress) {
            this.xhr.upload.onprogress = (e) =>
                this.#options.onUploadProgress(e.loaded / e.total, this.xhr, e);
        }

        if (this.#options.beforeSend) {
            this.#options.beforeSend(this.xhr);
        }

        this.xhr.send(this.#options.data);

        if (this.#options.afterSend) {
            this.#options.afterSend(this.xhr);
        }
    }

    /**
     * Cancel a pending request.
     * @param {string} [reason=Request was cancelled] The reason for cancelling the request.
     */
    cancel(reason = 'Request was cancelled') {
        if (this.#isResolved || this.#isRejected || this.#isCancelled) {
            return;
        }

        this.xhr.abort();

        this.#isCancelled = true;

        if (this.#options.rejectOnCancel) {
            this.#reject({
                status: this.xhr.status,
                xhr: this.xhr,
                reason,
            });
        }
    }

    /**
     * Execute a callback if the request is rejected.
     * @param {function} [onRejected] The callback to execute if the request is rejected.
     * @return {Promise} The promise.
     */
    catch(onRejected) {
        return this.#promise.catch(onRejected);
    }

    /**
     * Execute a callback once the request is settled (resolved or rejected).
     * @param {function} [onFinally] The callback to execute once the request is settled.
     * @return {Promise} The promise.
     */
    finally(onFinally) {
        return this.#promise.finally(onFinally);
    }

    /**
     * Execute a callback once the request is resolved (or optionally rejected).
     * @param {function} onFulfilled The callback to execute if the request is resolved.
     * @param {function} [onRejected] The callback to execute if the request is rejected.
     * @return {Promise} The promise.
     */
    then(onFulfilled, onRejected) {
        return this.#promise.then(onFulfilled, onRejected);
    }
}

Object.setPrototypeOf(AjaxRequest.prototype, Promise.prototype);
