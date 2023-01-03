import { after as _after, append as _append, appendTo as _appendTo, before as _before, insertAfter as _insertAfter, insertBefore as _insertBefore, prepend as _prepend, prependTo as _prependTo } from './../../manipulation/move.js';

/**
 * QuerySet Move
 */

/**
 * Insert each other node after the first node.
 * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
 * @return {QuerySet} The QuerySet object.
 */
export function after(otherSelector) {
    _after(this, otherSelector);

    return this;
};

/**
 * Append each other node to the first node.
 * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
 * @return {QuerySet} The QuerySet object.
 */
export function append(otherSelector) {
    _append(this, otherSelector);

    return this;
};

/**
 * Append each node to the first other node.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
 * @return {QuerySet} The QuerySet object.
 */
export function appendTo(otherSelector) {
    _appendTo(this, otherSelector);

    return this;
};

/**
 * Insert each other node before the first node.
 * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
 * @return {QuerySet} The QuerySet object.
 */
export function before(otherSelector) {
    _before(this, otherSelector);

    return this;
};

/**
 * Insert each node after the first other node.
 * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
 * @return {QuerySet} The QuerySet object.
 */
export function insertAfter(otherSelector) {
    _insertAfter(this, otherSelector);

    return this;
};

/**
 * Insert each node before the first other node.
 * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
 * @return {QuerySet} The QuerySet object.
 */
export function insertBefore(otherSelector) {
    _insertBefore(this, otherSelector);

    return this;
};

/**
 * Prepend each other node to the first node.
 * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
 * @return {QuerySet} The QuerySet object.
 */
export function prepend(otherSelector) {
    _prepend(this, otherSelector);

    return this;
};

/**
 * Prepend each node to the first other node.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
 * @return {QuerySet} The QuerySet object.
 */
export function prependTo(otherSelector) {
    _prependTo(this, otherSelector);

    return this;
};
