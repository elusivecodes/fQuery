import { extend, isObject } from '@fr0st/core';
import { getAjaxDefaults, getWindow } from './../config.js';
import { appendQueryString, createSearchParams, getSearchParams, parseFormData, parseParams, setSearchParams } from './helpers.js';

/**
 * @typedef {boolean|string|Array<*>|Record<string, *>|FormData|null} AjaxData
 */

/**
 * @callback AjaxHook
 * @param {XMLHttpRequest} xhr The request object.
 * @returns {void} Nothing.
 */

/**
 * @callback AjaxProgressCallback
 * @param {number} progress The completion ratio from 0 to 1.
 * @param {XMLHttpRequest} xhr The request object.
 * @param {ProgressEvent} event The progress event.
 * @returns {void} Nothing.
 */

/**
 * @typedef {object} AjaxOptions
 * @property {string} [url] The request URL. Defaults to the current location.
 * @property {string} [method='GET'] The HTTP method.
 * @property {AjaxData} [data=null] The request data.
 * @property {string|false} [contentType='application/x-www-form-urlencoded'] The request content type, or false to omit it.
 * @property {XMLHttpRequestResponseType|null} [responseType=null] The response type.
 * @property {string} [mimeType] The MIME type override.
 * @property {string} [username] The authentication username.
 * @property {string} [password] The authentication password.
 * @property {number} [timeout=0] The timeout in milliseconds.
 * @property {boolean|null} [isLocal=null] Whether to treat the request as local. Null enables automatic detection.
 * @property {boolean} [cache=true] Whether to cache the request.
 * @property {boolean} [processData=true] Whether to encode the request data.
 * @property {boolean} [rejectOnCancel=true] Whether cancellation rejects the request promise.
 * @property {Record<string, string>} [headers={}] Additional request headers.
 * @property {AjaxHook|null} [afterSend=null] The callback invoked after sending.
 * @property {AjaxHook|null} [beforeSend=null] The callback invoked before sending.
 * @property {AjaxProgressCallback|null} [onProgress=null] The download progress callback.
 * @property {AjaxProgressCallback|null} [onUploadProgress=null] The upload progress callback.
 * @property {() => XMLHttpRequest} [xhr] The request factory.
 */

/**
 * @typedef {object} AjaxResult
 * @property {*} response The response value.
 * @property {XMLHttpRequest} xhr The request object.
 * @property {ProgressEvent} event The load event.
 */

/**
 * @typedef {object} AjaxError
 * @property {number} status The HTTP status.
 * @property {XMLHttpRequest} xhr The request object.
 * @property {ProgressEvent} [event] The failure event.
 * @property {string} [reason] The cancellation reason.
 */

/**
 * Represents a cancellable XMLHttpRequest with Promise-compatible methods.
 */
export default class AjaxRequest {
    /**
     * Creates an AJAX request.
     * @param {AjaxOptions} [options] The request options.
     */
    constructor(options) {
        const { location } = getWindow();

        this._options = extend(
            {},
            getAjaxDefaults(),
            options,
        );
        this._options.method = this._options.method.toUpperCase();

        const isFormData = Object.prototype.toString.call(this._options.data) === '[object FormData]';

        if (!this._options.url) {
            this._options.url = location.href;
        }

        if (!this._options.cache) {
            this._options.url = appendQueryString(this._options.url, '_', Date.now());
        }

        if (!isFormData && !('Content-Type' in this._options.headers) && this._options.contentType) {
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

        if (this._options.data !== null && this._options.data !== undefined) {
            if (!isFormData && this._options.processData && isObject(this._options.data)) {
                if (this._options.contentType === 'application/json') {
                    this._options.data = JSON.stringify(this._options.data);
                } else if (this._options.contentType === 'application/x-www-form-urlencoded') {
                    this._options.data = parseParams(this._options.data);
                } else {
                    this._options.data = parseFormData(this._options.data);
                }
            }

            if (this._options.method === 'GET') {
                const dataParams = createSearchParams(this._options.data);

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
            if (this.xhr.status >= 400) {
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

        this.xhr.ontimeout = (e) =>
            this._reject({
                status: this.xhr.status,
                xhr: this.xhr,
                event: e,
            });

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
     * Cancels a pending request.
     * @param {string} [reason='Request was cancelled'] The cancellation reason.
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
     * Executes a callback if the request is rejected.
     * @param {((reason: AjaxError) => *)} [onRejected] The callback to execute if the request is rejected.
     * @returns {Promise<*>} The resulting promise.
     */
    catch(onRejected) {
        return this._promise.catch(onRejected);
    }

    /**
     * Executes a callback once the request is settled (resolved or rejected).
     * @param {(() => void)} [onFinally] The callback to execute once the request is settled.
     * @returns {Promise<AjaxResult>} The resulting promise.
     */
    finally(onFinally) {
        return this._promise.finally(onFinally);
    }

    /**
     * Executes a callback once the request is resolved (or optionally rejected).
     * @param {((value: AjaxResult) => *)} onFulfilled The callback to execute if the request is resolved.
     * @param {((reason: AjaxError) => *)} [onRejected] The callback to execute if the request is rejected.
     * @returns {Promise<*>} The resulting promise.
     */
    then(onFulfilled, onRejected) {
        return this._promise.then(onFulfilled, onRejected);
    }
}

Object.setPrototypeOf(AjaxRequest.prototype, Promise.prototype);
