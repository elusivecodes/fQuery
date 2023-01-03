import { merge, unique } from '@fr0st/core';
import { query } from './../query.js';
import QuerySet from './../query-set.js';
import { index as _index, indexOf as _indexOf, normalize as _normalize, serialize as _serialize, serializeArray as _serializeArray, sort as _sort, tagName as _tagName } from './../../utility/utility.js';

/**
 * QuerySet Utility
 */

/**
 * Merge with new nodes and sort the results.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input selector.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
 * @return {QuerySet} The QuerySet object.
 */
export function add(selector, context = null) {
    const nodes = _sort(unique(merge([], this.get(), query(selector, context).get())));

    return new QuerySet(nodes);
};

/**
 * Reduce the set of nodes to the one at the specified index.
 * @param {number} index The index of the node.
 * @return {QuerySet} The QuerySet object.
 */
export function eq(index) {
    const node = this.get(index);

    return new QuerySet(node ? [node] : []);
};

/**
 * Reduce the set of nodes to the first.
 * @return {QuerySet} The QuerySet object.
 */
export function first() {
    return this.eq(0);
};

/**
 * Get the index of the first node relative to it's parent node.
 * @return {number} The index.
 */
export function index() {
    return _index(this);
};

/**
 * Get the index of the first node matching a filter.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {number} The index.
 */
export function indexOf(nodeFilter) {
    return _indexOf(this, nodeFilter);
};

/**
 * Reduce the set of nodes to the last.
 * @return {QuerySet} The QuerySet object.
 */
export function last() {
    return this.eq(-1);
};

/**
 * Normalize nodes (remove empty text nodes, and join adjacent text nodes).
 * @return {QuerySet} The QuerySet object.
 */
export function normalize() {
    _normalize(this);

    return this;
};

/**
 * Return a serialized string containing names and values of all form nodes.
 * @return {string} The serialized string.
 */
export function serialize() {
    return _serialize(this);
};

/**
 * Return a serialized array containing names and values of all form nodes.
 * @return {array} The serialized array.
 */
export function serializeArray() {
    return _serializeArray(this);
};

/**
 * Sort nodes by their position in the document.
 * @return {QuerySet} The QuerySet object.
 */
export function sort() {
    return new QuerySet(_sort(this));
};

/**
 * Return the tag name (lowercase) of the first node.
 * @return {string} The nodes tag name (lowercase).
 */
export function tagName() {
    return _tagName(this);
};
