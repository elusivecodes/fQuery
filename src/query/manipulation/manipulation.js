import QuerySet from './../query-set.js';
import { clone as _clone, detach as _detach, empty as _empty, remove as _remove, replaceAll as _replaceAll, replaceWith as _replaceWith } from './../../manipulation/manipulation.js';

/**
 * QuerySet Manipulation
 */

/**
 * Clone each node.
 * @param {object} options The options for cloning the node.
 * @param {Boolean} [options.deep=true] Whether to also clone all descendent nodes.
 * @param {Boolean} [options.events] Whether to also clone events.
 * @param {Boolean} [options.data] Whether to also clone custom data.
 * @param {Boolean} [options.animations] Whether to also clone animations.
 * @return {QuerySet} A new QuerySet object.
 */
export function clone(options) {
    const clones = _clone(this, options);

    return new QuerySet(clones);
};

/**
 * Detach each node from the DOM.
 * @return {QuerySet} The QuerySet object.
 */
export function detach() {
    _detach(this);

    return this;
};

/**
 * Remove all children of each node from the DOM.
 * @return {QuerySet} The QuerySet object.
 */
export function empty() {
    _empty(this);

    return this;
};

/**
 * Remove each node from the DOM.
 * @return {QuerySet} The QuerySet object.
 */
export function remove() {
    _remove(this);

    return this;
};

/**
 * Replace each other node with nodes.
 * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The input node(s), or a query selector string.
 * @return {QuerySet} The QuerySet object.
 */
export function replaceAll(otherSelector) {
    _replaceAll(this, otherSelector);

    return this;
};

/**
 * Replace each node with other nodes.
 * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The input node(s), or a query selector or HTML string.
 * @return {QuerySet} The QuerySet object.
 */
export function replaceWith(otherSelector) {
    _replaceWith(this, otherSelector);

    return this;
};
