import { addClass as _addClass, css as _css, getStyle as _getStyle, hide as _hide, removeClass as _removeClass, removeStyle as _removeStyle, setStyle as _setStyle, show as _show, toggle as _toggle, toggleClass as _toggleClass } from './../../attributes/styles.js';

/**
 * QuerySet Styles
 */

/**
 * Add classes to each node.
 * @param {...string|string[]} classes The classes.
 * @return {QuerySet} The QuerySet object.
 */
export function addClass(...classes) {
    _addClass(this, ...classes);

    return this;
};

/**
 * Get computed CSS style values for the first node.
 * @param {string} [style] The CSS style name.
 * @return {string|object} The CSS style value, or an object containing the computed CSS style properties.
 */
export function css(style) {
    return _css(this, style);
};

/**
 * Get style properties for the first node.
 * @param {string} [style] The style name.
 * @return {string|object} The style value, or an object containing the style properties.
 */
export function getStyle(style) {
    return _getStyle(this, style);
};

/**
 * Hide each node from display.
 * @return {QuerySet} The QuerySet object.
 */
export function hide() {
    _hide(this);

    return this;
};

/**
 * Remove classes from each node.
 * @param {...string|string[]} classes The classes.
 * @return {QuerySet} The QuerySet object.
 */
export function removeClass(...classes) {
    _removeClass(this, ...classes);

    return this;
};

/**
 * Remove a style property from each node.
 * @param {string} style The style name.
 * @return {QuerySet} The QuerySet object.
 */
export function removeStyle(style) {
    _removeStyle(this, style);

    return this;
};

/**
 * Set style properties for each node.
 * @param {string|object} style The style name, or an object containing styles.
 * @param {string} [value] The style value.
 * @param {object} [options] The options for setting the style.
 * @param {Boolean} [options.important] Whether the style should be !important.
 * @return {QuerySet} The QuerySet object.
 */
export function setStyle(style, value, { important = false } = {}) {
    _setStyle(this, style, value, { important });

    return this;
};

/**
 * Display each hidden node.
 * @return {QuerySet} The QuerySet object.
 */
export function show() {
    _show(this);

    return this;
};

/**
 * Toggle the visibility of each node.
 * @return {QuerySet} The QuerySet object.
 */
export function toggle() {
    _toggle(this);

    return this;
};

/**
 * Toggle classes for each node.
 * @param {...string|string[]} classes The classes.
 * @return {QuerySet} The QuerySet object.
 */
export function toggleClass(...classes) {
    _toggleClass(this, ...classes);

    return this;
};
