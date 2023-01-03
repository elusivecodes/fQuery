import AjaxRequest from './ajax-request.js';

/**
 * DOM Ajax
 */

/**
 * Perform an XHR DELETE request.
 * @param {string} url The URL of the request.
 * @param {object} [options] The options to use for the request.
 * @param {string} [options.method=DELETE] The HTTP method of the request.
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
 * @return {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
 */
export function _delete(url, options) {
    return new AjaxRequest({
        url,
        method: 'DELETE',
        ...options,
    });
};

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
 * @return {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
 */
export function ajax(options) {
    return new AjaxRequest(options);
};

/**
 * Perform an XHR GET request.
 * @param {string} url The URL of the request.
 * @param {string|array|object} data The data to send with the request.
 * @param {object} [options] The options to use for the request.
 * @param {string} [options.method=GET] The HTTP method of the request.
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
 * @return {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
 */
export function get(url, data, options) {
    return new AjaxRequest({
        url,
        data,
        ...options,
    });
};

/**
 * Perform an XHR PATCH request.
 * @param {string} url The URL of the request.
 * @param {string|array|object|FormData} data The data to send with the request.
 * @param {object} [options] The options to use for the request.
 * @param {string} [options.method=PATCH] The HTTP method of the request.
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
 * @return {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
 */
export function patch(url, data, options) {
    return new AjaxRequest({
        url,
        data,
        method: 'PATCH',
        ...options,
    });
};

/**
 * Perform an XHR POST request.
 * @param {string} url The URL of the request.
 * @param {string|array|object|FormData} data The data to send with the request.
 * @param {object} [options] The options to use for the request.
 * @param {string} [options.method=POST] The HTTP method of the request.
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
 * @return {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
 */
export function post(url, data, options) {
    return new AjaxRequest({
        url,
        data,
        method: 'POST',
        ...options,
    });
};

/**
 * Perform an XHR PUT request.
 * @param {string} url The URL of the request.
 * @param {string|array|object|FormData} data The data to send with the request.
 * @param {object} [options] The options to use for the request.
 * @param {string} [options.method=PUT] The HTTP method of the request.
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
 * @return {AjaxRequest} A new AjaxRequest that resolves when the request is completed, or rejects on failure.
 */
export function put(url, data, options) {
    return new AjaxRequest({
        url,
        data,
        method: 'PUT',
        ...options,
    });
};
