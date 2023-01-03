import { isString } from '@fr0st/core';
import { getContext } from './../config.js';
import { appendQueryString } from './../ajax/helpers.js';

/**
 * DOM AJAX Styles
 */

/**
 * Import a CSS Stylesheet file.
 * @param {string} url The URL of the stylesheet.
 * @param {object} [attributes] Additional attributes to set on the style tag.
 * @param {object} [options] The options for loading the stylesheet.
 * @param {Boolean} [options.cache=true] Whether to cache the request.
 * @param {Document} [options.context=getContext()] The document context.
 * @return {Promise} A new Promise that resolves when the stylesheet is loaded, or rejects on failure.
 */
export function loadStyle(url, attributes, { cache = true, context = getContext() } = {}) {
    attributes = {
        href: url,
        rel: 'stylesheet',
        ...attributes,
    };

    if (!cache) {
        attributes.href = appendQueryString(attributes.href, '_', Date.now());
    }

    const link = context.createElement('link');

    for (const [key, value] of Object.entries(attributes)) {
        link.setAttribute(key, value);
    }

    context.head.appendChild(link);

    return new Promise((resolve, reject) => {
        link.onload = (_) => resolve();
        link.onerror = (error) => reject(error);
    });
};

/**
 * Import multiple CSS Stylesheet files.
 * @param {array} urls An array of stylesheet URLs or attribute objects.
 * @param {object} [options] The options for loading the stylesheets.
 * @param {Boolean} [options.cache=true] Whether to cache the request.
 * @param {Document} [options.context=getContext()] The document context.
 * @return {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
 */
export function loadStyles(urls, { cache = true, context = getContext() } = {}) {
    return Promise.all(
        urls.map((url) =>
            isString(url) ?
                loadStyle(url, null, { cache, context }) :
                loadStyle(null, url, { cache, context }),
        ),
    );
};
