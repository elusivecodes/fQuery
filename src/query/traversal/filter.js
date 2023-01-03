import QuerySet from './../query-set.js';
import { connected as _connected, equal as _equal, filter as _filter, filterOne as _filterOne, fixed as _fixed, hidden as _hidden, not as _not, notOne as _notOne, same as _same, visible as _visible, withAnimation as _withAnimation, withAttribute as _withAttribute, withChildren as _withChildren, withClass as _withClass, withCSSAnimation as _withCSSAnimation, withCSSTransition as _withCSSTransition, withData as _withData, withDescendent as _withDescendent, withProperty as _withProperty } from './../../traversal/filter.js';

/**
 * QuerySet Filter
 */

/**
 * Return all nodes connected to the DOM.
 * @return {QuerySet} The QuerySet object.
 */
export function connected() {
    return new QuerySet(_connected(this));
};

/**
 * Return all nodes considered equal to any of the other nodes.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
 * @return {QuerySet} The QuerySet object.
 */
export function equal(otherSelector) {
    return new QuerySet(_equal(this, otherSelector));
};

/**
 * Return all nodes matching a filter.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {QuerySet} The QuerySet object.
 */
export function filter(nodeFilter) {
    return new QuerySet(_filter(this, nodeFilter));
};

/**
 * Return the first node matching a filter.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {QuerySet} The QuerySet object.
 */
export function filterOne(nodeFilter) {
    const node = _filterOne(this, nodeFilter);

    return new QuerySet(node ? [node] : []);
};

/**
 * Return all "fixed" nodes.
 * @return {QuerySet} The QuerySet object.
 */
export function fixed() {
    return new QuerySet(_fixed(this));
};

/**
 * Return all hidden nodes.
 * @return {QuerySet} The QuerySet object.
 */
export function hidden() {
    return new QuerySet(_hidden(this));
};

/**
 * Return all nodes not matching a filter.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {QuerySet} The QuerySet object.
 */
export function not(nodeFilter) {
    return new QuerySet(_not(this, nodeFilter));
};

/**
 * Return the first node not matching a filter.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {QuerySet} The QuerySet object.
 */
export function notOne(nodeFilter) {
    const node = _notOne(this, nodeFilter);

    return new QuerySet(node ? [node] : []);
};

/**
 * Return all nodes considered identical to any of the other nodes.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
 * @return {QuerySet} The QuerySet object.
 */
export function same(otherSelector) {
    return new QuerySet(_same(this, otherSelector));
};

/**
 * Return all visible nodes.
 * @return {QuerySet} The QuerySet object.
 */
export function visible() {
    return new QuerySet(_visible(this));
};

/**
 * Return all nodes with an animation.
 * @return {QuerySet} The QuerySet object.
*/
export function withAnimation() {
    return new QuerySet(_withAnimation(this));
};

/**
 * Return all nodes with a specified attribute.
 * @param {string} attribute The attribute name.
 * @return {QuerySet} The QuerySet object.
 */
export function withAttribute(attribute) {
    return new QuerySet(_withAttribute(this, attribute));
};

/**
 * Return all nodes with child elements.
 * @return {QuerySet} The QuerySet object.
 */
export function withChildren() {
    return new QuerySet(_withChildren(this));
};

/**
 * Return all nodes with any of the specified classes.
 * @param {...string|string[]} classes The classes.
 * @return {QuerySet} The QuerySet object.
 */
export function withClass(classes) {
    return new QuerySet(_withClass(this, classes));
};

/**
 * Return all nodes with a CSS animation.
 * @return {QuerySet} The QuerySet object.
*/
export function withCSSAnimation() {
    return new QuerySet(_withCSSAnimation(this));
};

/**
 * Return all nodes with a CSS transition.
 * @return {QuerySet} The QuerySet object.
 */
export function withCSSTransition() {
    return new QuerySet(_withCSSTransition(this));
};

/**
 * Return all nodes with custom data.
 * @param {string} [key] The data key.
 * @return {QuerySet} The QuerySet object.
 */
export function withData(key) {
    return new QuerySet(_withData(this, key));
};

/**
 * Return all elements with a descendent matching a filter.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {QuerySet} The QuerySet object.
 */
export function withDescendent(nodeFilter) {
    return new QuerySet(_withDescendent(this, nodeFilter));
};

/**
 * Return all nodes with a specified property.
 * @param {string} property The property name.
 * @return {QuerySet} The QuerySet object.
 */
export function withProperty(property) {
    return new QuerySet(_withProperty(this, property));
};
