import { cloneData as _cloneData, getData as _getData, removeData as _removeData, setData as _setData } from './../../attributes/data.js';

/**
 * QuerySet Data
 */

/**
 * Clone custom data from each node to each other node.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
 * @return {QuerySet} The QuerySet object.
 */
export function cloneData(otherSelector) {
    _cloneData(this, otherSelector);

    return this;
};

/**
 * Get custom data for the first node.
 * @param {string} [key] The data key.
 * @return {*} The data value.
 */
export function getData(key) {
    return _getData(this, key);
};

/**
 * Remove custom data from each node.
 * @param {string} [key] The data key.
 * @return {QuerySet} The QuerySet object.
 */
export function removeData(key) {
    _removeData(this, key);

    return this;
};

/**
 * Set custom data for each node.
 * @param {string|object} key The data key, or an object containing data.
 * @param {*} [value] The data value.
 * @return {QuerySet} The QuerySet object.
 */
export function setData(key, value) {
    _setData(this, key, value);

    return this;
};
