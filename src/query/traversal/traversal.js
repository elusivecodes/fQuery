import QuerySet from './../query-set.js';
import { child as _child, children as _children, closest as _closest, commonAncestor as _commonAncestor, contents as _contents, fragment as _fragment, next as _next, nextAll as _nextAll, offsetParent as _offsetParent, parent as _parent, parents as _parents, prev as _prev, prevAll as _prevAll, shadow as _shadow, siblings as _siblings } from './../../traversal/traversal.js';

/**
 * QuerySet Traversal
 */

/**
 * Return the first child of each node (optionally matching a filter).
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {QuerySet} The QuerySet object.
 */
export function child(nodeFilter) {
    return new QuerySet(_child(this, nodeFilter));
};

/**
 * Return all children of each node (optionally matching a filter).
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {QuerySet} The QuerySet object.
 */
export function children(nodeFilter, { elementsOnly = true } = {}) {
    return new QuerySet(_children(this, nodeFilter, { elementsOnly }));
};

/**
 * Return the closest ancestor to each node (optionally matching a filter, and before a limit).
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limitFilter] The limit node(s), a query selector string or custom filter function.
 * @return {QuerySet} The QuerySet object.
 */
export function closest(nodeFilter, limitFilter) {
    return new QuerySet(_closest(this, nodeFilter, limitFilter));
};

/**
 * Return the common ancestor of all nodes.
 * @return {QuerySet} The QuerySet object.
 */
export function commonAncestor() {
    const node = _commonAncestor(this);

    return new QuerySet(node ? [node] : []);
};

/**
 * Return all children of each node (including text and comment nodes).
 * @return {QuerySet} The QuerySet object.
 */
export function contents() {
    return new QuerySet(_contents(this));
};

/**
 * Return the DocumentFragment of the first node.
 * @return {QuerySet} The QuerySet object.
 */
export function fragment() {
    const node = _fragment(this);

    return new QuerySet(node ? [node] : []);
};

/**
 * Return the next sibling for each node (optionally matching a filter).
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {QuerySet} The QuerySet object.
 */
export function next(nodeFilter) {
    return new QuerySet(_next(this, nodeFilter));
};

/**
 * Return all next siblings for each node (optionally matching a filter, and before a limit).
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limitFilter] The limit node(s), a query selector string or custom filter function.
 * @return {QuerySet} The QuerySet object.
 */
export function nextAll(nodeFilter, limitFilter) {
    return new QuerySet(_nextAll(this, nodeFilter, limitFilter));
};

/**
 * Return the offset parent (relatively positioned) of the first node.
 * @return {QuerySet} The QuerySet object.
 */
export function offsetParent() {
    const node = _offsetParent(this);

    return new QuerySet(node ? [node] : []);
};

/**
 * Return the parent of each node (optionally matching a filter).
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {QuerySet} The QuerySet object.
 */
export function parent(nodeFilter) {
    return new QuerySet(_parent(this, nodeFilter));
};

/**
 * Return all parents of each node (optionally matching a filter, and before a limit).
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limitFilter] The limit node(s), a query selector string or custom filter function.
 * @return {QuerySet} The QuerySet object.
 */
export function parents(nodeFilter, limitFilter) {
    return new QuerySet(_parents(this, nodeFilter, limitFilter));
};

/**
 * Return the previous sibling for each node (optionally matching a filter).
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {QuerySet} The QuerySet object.
 */
export function prev(nodeFilter) {
    return new QuerySet(_prev(this, nodeFilter));
};

/**
 * Return all previous siblings for each node (optionally matching a filter, and before a limit).
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limitFilter] The limit node(s), a query selector string or custom filter function.
 * @return {QuerySet} The QuerySet object.
 */
export function prevAll(nodeFilter, limitFilter) {
    return new QuerySet(_prevAll(this, nodeFilter, limitFilter));
};

/**
 * Return the ShadowRoot of the first node.
 * @return {QuerySet} The QuerySet object.
 */
export function shadow() {
    const node = _shadow(this);

    return new QuerySet(node ? [node] : []);
};

/**
 * Return all siblings for each node (optionally matching a filter).
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
 * @return {QuerySet} The QuerySet object.
 */
export function siblings(nodeFilter, { elementsOnly = true } = {}) {
    return new QuerySet(_siblings(this, nodeFilter, { elementsOnly }));
};
