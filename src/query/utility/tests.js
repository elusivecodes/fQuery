import { hasAnimation as _hasAnimation, hasAttribute as _hasAttribute, hasChildren as _hasChildren, hasClass as _hasClass, hasCSSAnimation as _hasCSSAnimation, hasCSSTransition as _hasCSSTransition, hasData as _hasData, hasDataset as _hasDataset, hasDescendent as _hasDescendent, hasFragment as _hasFragment, hasProperty as _hasProperty, hasShadow as _hasShadow, is as _is, isConnected as _isConnected, isEqual as _isEqual, isFixed as _isFixed, isHidden as _isHidden, isSame as _isSame, isVisible as _isVisible } from './../../utility/tests.js';

/**
 * QuerySet Tests
 */

/**
 * Returns true if any of the nodes has an animation.
 * @return {Boolean} TRUE if any of the nodes has an animation, otherwise FALSE.
 */
export function hasAnimation() {
    return _hasAnimation(this);
};

/**
 * Returns true if any of the nodes has a specified attribute.
 * @param {string} attribute The attribute name.
 * @return {Boolean} TRUE if any of the nodes has the attribute, otherwise FALSE.
 */
export function hasAttribute(attribute) {
    return _hasAttribute(this, attribute);
};

/**
 * Returns true if any of the nodes has child nodes.
 * @return {Boolean} TRUE if the any of the nodes has child nodes, otherwise FALSE.
 */
export function hasChildren() {
    return _hasChildren(this);
};

/**
 * Returns true if any of the nodes has any of the specified classes.
 * @param {...string|string[]} classes The classes.
 * @return {Boolean} TRUE if any of the nodes has any of the classes, otherwise FALSE.
 */
export function hasClass(...classes) {
    return _hasClass(this, ...classes);
};

/**
 * Returns true if any of the nodes has a CSS animation.
 * @return {Boolean} TRUE if any of the nodes has a CSS animation, otherwise FALSE.
 */
export function hasCSSAnimation() {
    return _hasCSSAnimation(this);
};

/**
 * Returns true if any of the nodes has a CSS transition.
 * @return {Boolean} TRUE if any of the nodes has a CSS transition, otherwise FALSE.
 */
export function hasCSSTransition() {
    return _hasCSSTransition(this);
};

/**
 * Returns true if any of the nodes has custom data.
 * @param {string} [key] The data key.
 * @return {Boolean} TRUE if any of the nodes has custom data, otherwise FALSE.
 */
export function hasData(key) {
    return _hasData(this, key);
};

/**
 * Returns true if any of the nodes has the specified dataset value.
 * @param {string} [key] The dataset key.
 * @return {Boolean} TRUE if any of the nodes has the dataset value, otherwise FALSE.
 */
export function hasDataset(key) {
    return _hasDataset(this, key);
};

/**
 * Returns true if any of the nodes contains a descendent matching a filter.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {Boolean} TRUE if any of the nodes contains a descendent matching the filter, otherwise FALSE.
 */
export function hasDescendent(nodeFilter) {
    return _hasDescendent(this, nodeFilter);
};

/**
 * Returns true if any of the nodes has a DocumentFragment.
 * @return {Boolean} TRUE if any of the nodes has a DocumentFragment, otherwise FALSE.
 */
export function hasFragment() {
    return _hasFragment(this);
};

/**
 * Returns true if any of the nodes has a specified property.
 * @param {string} property The property name.
 * @return {Boolean} TRUE if any of the nodes has the property, otherwise FALSE.
 */
export function hasProperty(property) {
    return _hasProperty(this, property);
};

/**
 * Returns true if any of the nodes has a ShadowRoot.
 * @return {Boolean} TRUE if any of the nodes has a ShadowRoot, otherwise FALSE.
 */
export function hasShadow() {
    return _hasShadow(this);
};

/**
 * Returns true if any of the nodes matches a filter.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {Boolean} TRUE if any of the nodes matches the filter, otherwise FALSE.
 */
export function is(nodeFilter) {
    return _is(this, nodeFilter);
};

/**
 * Returns true if any of the nodes is connected to the DOM.
 * @return {Boolean} TRUE if any of the nodes is connected to the DOM, otherwise FALSE.
 */
export function isConnected() {
    return _isConnected(this);
};

/**
 * Returns true if any of the nodes is considered equal to any of the other nodes.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
 * @return {Boolean} TRUE if any of the nodes is considered equal to any of the other nodes, otherwise FALSE.
 */
export function isEqual(otherSelector) {
    return _isEqual(this, otherSelector);
};

/**
 * Returns true if any of the elements or a parent of any of the elements is "fixed".
 * @return {Boolean} TRUE if any of the nodes is "fixed", otherwise FALSE.
 */
export function isFixed() {
    return _isFixed(this);
};

/**
 * Returns true if any of the nodes is hidden.
 * @return {Boolean} TRUE if any of the nodes is hidden, otherwise FALSE.
 */
export function isHidden() {
    return _isHidden(this);
};

/**
 * Returns true if any of the nodes is considered identical to any of the other nodes.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
 * @return {Boolean} TRUE if any of the nodes is considered identical to any of the other nodes, otherwise FALSE.
 */
export function isSame(otherSelector) {
    return _isSame(this, otherSelector);
};

/**
 * Returns true if any of the nodes is visible.
 * @return {Boolean} TRUE if any of the nodes is visible, otherwise FALSE.
 */
export function isVisible() {
    return _isVisible(this);
};
