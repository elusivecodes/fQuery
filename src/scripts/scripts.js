import { isString } from '@fr0st/core';
import { appendQueryString } from './../ajax/helpers.js';
import { getContext } from './../config.js';

/**
 * DOM AJAX Scripts
 */

/**
 * Return whether a boolean attribute should be enabled.
 * @param {*} value The attribute value.
 * @return {Boolean} True if the attribute should be enabled.
 */
function isEnabled(value) {
    return value !== false && value !== null && typeof value !== 'undefined';
};

/**
 * Apply a script attribute if it should be serialized.
 * @param {HTMLScriptElement} script The script element.
 * @param {string} key The attribute key.
 * @param {*} value The attribute value.
 */
function setScriptAttribute(script, key, value) {
    if (key === 'async' || !isEnabled(value)) {
        return;
    }

    script.setAttribute(key, value === true ? '' : value);
};

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

    if (!cache) {
        attributes.src = appendQueryString(attributes.src, '_', Date.now());
    }

    const script = context.createElement('script');

    // Dynamically inserted scripts execute in insertion order only when async is disabled.
    script.async = 'async' in attributes ?
        isEnabled(attributes.async) :
        false;

    for (const [key, value] of Object.entries(attributes)) {
        setScriptAttribute(script, key, value);
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
