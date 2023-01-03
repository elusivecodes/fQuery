import { isString } from '@fr0st/core';
import { getContext } from './../config.js';
import { appendQueryString } from './../ajax/helpers.js';

/**
 * DOM AJAX Scripts
 */

/**
 * Load and execute a JavaScript file.
 * @param {string} url The URL of the script.
 * @param {object} [attributes] Additional attributes to set on the script tag.
 * @param {object} [options] The options for loading the script.
 * @param {Boolean} [options.cache=true] Whether to cache the request.
 * @param {Document} [options.context=getContext()] The document context.
 * @return {Promise} A new Promise that resolves when the script is loaded, or rejects on failure.
 */
export function loadScript(url, attributes, { cache = true, context = getContext() } = {}) {
    attributes = {
        src: url,
        type: 'text/javascript',
        ...attributes,
    };

    if (!('async' in attributes)) {
        attributes.defer = '';
    }

    if (!cache) {
        attributes.src = appendQueryString(attributes.src, '_', Date.now());
    }

    const script = context.createElement('script');

    for (const [key, value] of Object.entries(attributes)) {
        script.setAttribute(key, value);
    }

    context.head.appendChild(script);

    return new Promise((resolve, reject) => {
        script.onload = (_) => resolve();
        script.onerror = (error) => reject(error);
    });
};

/**
 * Load and executes multiple JavaScript files (in order).
 * @param {array} urls An array of script URLs or attribute objects.
 * @param {object} [options] The options for loading the scripts.
 * @param {Boolean} [options.cache=true] Whether to cache the request.
 * @param {Document} [options.context=getContext()] The document context.
 * @return {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
 */
export function loadScripts(urls, { cache = true, context = getContext() } = {}) {
    return Promise.all(
        urls.map((url) =>
            isString(url) ?
                loadScript(url, null, { cache, context }) :
                loadScript(null, url, { cache, context }),
        ),
    );
};
