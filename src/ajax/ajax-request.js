import { extend, isObject } from '@fr0st/core';
import { appendQueryString, getSearchParams, parseFormData, parseParams, setSearchParams } from './helpers.js';
import { getAjaxDefaults, getWindow } from './../config.js';

/**
 * AjaxRequest Class
 * @class
 */
export default class AjaxRequest {
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
        this._options = extend(
            {},
            getAjaxDefaults(),
            options,
        );

        if (!this._options.url) {
            this._options.url = getWindow().location.href;
        }

        if (!this._options.cache) {
            this._options.url = appendQueryString(this._options.url, '_', Date.now());
        }

        if (!('Content-Type' in this._options.headers) && this._options.contentType) {
            this._options.headers['Content-Type'] = this._options.contentType;
        }

        if (this._options.isLocal === null) {
            this._options.isLocal = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(location.protocol);
        }

        if (!this._options.isLocal && !('X-Requested-With' in this._options.headers)) {
            this._options.headers['X-Requested-With'] = 'XMLHttpRequest';
        }

        this._promise = new Promise((resolve, reject) => {
            this._resolve = (value) => {
                this._isResolved = true;
                resolve(value);
            };

            this._reject = (error) => {
                this._isRejected = true;
                reject(error);
            };
        });

        this.xhr = this._options.xhr();

        if (this._options.data) {
            if (this._options.processData && isObject(this._options.data)) {
                if (this._options.contentType === 'application/json') {
                    this._options.data = JSON.stringify(this._options.data);
                } else if (this._options.contentType === 'application/x-www-form-urlencoded') {
                    this._options.data = parseParams(this._options.data);
                } else {
                    this._options.data = parseFormData(this._options.data);
                }
            }

            if (this._options.method === 'GET') {
                const dataParams = new URLSearchParams(this._options.data);

                const searchParams = getSearchParams(this._options.url);
                for (const [key, value] of dataParams.entries()) {
                    searchParams.append(key, value);
                }

                this._options.url = setSearchParams(this._options.url, searchParams);
                this._options.data = null;
            }
        }

        this.xhr.open(this._options.method, this._options.url, true, this._options.username, this._options.password);

        for (const [key, value] of Object.entries(this._options.headers)) {
            this.xhr.setRequestHeader(key, value);
        }

        if (this._options.responseType) {
            this.xhr.responseType = this._options.responseType;
        }

        if (this._options.mimeType) {
            this.xhr.overrideMimeType(this._options.mimeType);
        }

        if (this._options.timeout) {
            this.xhr.timeout = this._options.timeout;
        }

        this.xhr.onload = (e) => {
            if (this.xhr.status > 400) {
                this._reject({
                    status: this.xhr.status,
                    xhr: this.xhr,
                    event: e,
                });
            } else {
                this._resolve({
                    response: this.xhr.response,
                    xhr: this.xhr,
                    event: e,
                });
            }
        };

        if (!this._options.isLocal) {
            this.xhr.onerror = (e) =>
                this._reject({
                    status: this.xhr.status,
                    xhr: this.xhr,
                    event: e,
                });
        }

        if (this._options.onProgress) {
            this.xhr.onprogress = (e) =>
                this._options.onProgress(e.loaded / e.total, this.xhr, e);
        }

        if (this._options.onUploadProgress) {
            this.xhr.upload.onprogress = (e) =>
                this._options.onUploadProgress(e.loaded / e.total, this.xhr, e);
        }

        if (this._options.beforeSend) {
            this._options.beforeSend(this.xhr);
        }

        this.xhr.send(this._options.data);

        if (this._options.afterSend) {
            this._options.afterSend(this.xhr);
        }
    }

    /**
     * Cancel a pending request.
     * @param {string} [reason=Request was cancelled] The reason for cancelling the request.
     */
    cancel(reason = 'Request was cancelled') {
        if (this._isResolved || this._isRejected || this._isCancelled) {
            return;
        }

        this.xhr.abort();

        this._isCancelled = true;

        if (this._options.rejectOnCancel) {
            this._reject({
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
        return this._promise.catch(onRejected);
    }

    /**
     * Execute a callback once the request is settled (resolved or rejected).
     * @param {function} [onFinally] The callback to execute once the request is settled.
     * @return {Promise} The promise.
     */
    finally(onFinally) {
        return this._promise.finally(onFinally);
    }

    /**
     * Execute a callback once the request is resolved (or optionally rejected).
     * @param {function} onFulfilled The callback to execute if the request is resolved.
     * @param {function} [onRejected] The callback to execute if the request is rejected.
     * @return {Promise} The promise.
     */
    then(onFulfilled, onRejected) {
        return this._promise.then(onFulfilled, onRejected);
    }
}

Object.setPrototypeOf(AjaxRequest.prototype, Promise.prototype);
