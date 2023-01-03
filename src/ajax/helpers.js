import { isArray, isObject, isUndefined } from '@fr0st/core';
import { getWindow } from './../config.js';

/**
 * Ajax Helpers
 */

/**
 * Append a query string to a URL.
 * @param {string} url The input URL.
 * @param {string} key The query string key.
 * @param {string} value The query string value.
 * @return {string} The new URL.
 */
export function appendQueryString(url, key, value) {
    const searchParams = getSearchParams(url);

    searchParams.append(key, value);

    return setSearchParams(url, searchParams);
};

/**
 * Get the URLSearchParams from a URL string.
 * @param {string} url The URL.
 * @return {URLSearchParams} The URLSearchParams.
 */
export function getSearchParams(url) {
    return getURL(url).searchParams;
};

/**
 * Get the URL from a URL string.
 * @param {string} url The URL.
 * @return {URL} The URL.
 */
function getURL(url) {
    const window = getWindow();
    const baseHref = (window.location.origin + window.location.pathname).replace(/\/$/, '');

    return new URL(url, baseHref);
};

/**
 * Return a FormData object from an array or object.
 * @param {array|object} data The input data.
 * @return {FormData} The FormData object.
 */
export function parseFormData(data) {
    const values = parseValues(data);

    const formData = new FormData;

    for (const [key, value] of values) {
        if (key.substring(key.length - 2) === '[]') {
            formData.append(key, value);
        } else {
            formData.set(key, value);
        }
    }

    return formData;
};

/**
 * Return a URI-encoded attribute string from an array or object.
 * @param {array|object} data The input data.
 * @return {string} The URI-encoded attribute string.
 */
export function parseParams(data) {
    const values = parseValues(data);

    const paramString = values
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

    return encodeURI(paramString);
};

/**
 * Return an attributes array, or a flat array of attributes from a key and value.
 * @param {string} key The input key.
 * @param {array|object|string} [value] The input value.
 * @return {array} The parsed attributes.
 */
function parseValue(key, value) {
    if (value === null || isUndefined(value)) {
        return [];
    }

    if (isArray(value)) {
        if (key.substring(key.length - 2) !== '[]') {
            key += '[]';
        }

        return value.flatMap((val) => parseValue(key, val));
    }

    if (isObject(value)) {
        return Object.entries(value)
            .flatMap(([subKey, val]) => parseValue(`${key}[${subKey}]`, val));
    }

    return [[key, value]];
};

/**
 * Return an attributes array from a data array or data object.
 * @param {array|object} data The input data.
 * @return {array} The parsed attributes.
 */
function parseValues(data) {
    if (isArray(data)) {
        return data.flatMap((value) => parseValue(value.name, value.value));
    }

    if (isObject(data)) {
        return Object.entries(data)
            .flatMap(([key, value]) => parseValue(key, value));
    }

    return data;
};

/**
 * Set the URLSearchParams for a URL string.
 * @param {string} url The URL.
 * @param {URLSearchParams} searchParams The URLSearchParams.
 * @return {string} The new URL string.
 */
export function setSearchParams(url, searchParams) {
    const urlData = getURL(url);

    urlData.search = searchParams.toString();

    const newUrl = urlData.toString();

    const pos = newUrl.indexOf(url);
    return newUrl.substring(pos);
};
