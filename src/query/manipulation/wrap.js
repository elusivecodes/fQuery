import { unwrap as _unwrap, wrap as _wrap, wrapAll as _wrapAll, wrapInner as _wrapInner } from './../../manipulation/wrap.js';

/**
 * QuerySet Wrap
 */

/**
 * Unwrap each node.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {QuerySet} The QuerySet object.
 */
export function unwrap(nodeFilter) {
    _unwrap(this, nodeFilter);

    return this;
};

/**
 * Wrap each nodes with other nodes.
 * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
 * @return {QuerySet} The QuerySet object.
 */
export function wrap(otherSelector) {
    _wrap(this, otherSelector);

    return this;
};

/**
 * Wrap all nodes with other nodes.
 * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
 * @return {QuerySet} The QuerySet object.
 */
export function wrapAll(otherSelector) {
    _wrapAll(this, otherSelector);

    return this;
};

/**
 * Wrap the contents of each node with other nodes.
 * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
 * @return {QuerySet} The QuerySet object.
 */
export function wrapInner(otherSelector) {
    _wrapInner(this, otherSelector);

    return this;
};
