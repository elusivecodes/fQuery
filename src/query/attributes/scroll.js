import { getScrollX as _getScrollX, getScrollY as _getScrollY, setScroll as _setScroll, setScrollX as _setScrollX, setScrollY as _setScrollY } from './../../attributes/scroll.js';

/**
 * QuerySet Scroll
 */

/**
 * Get the scroll X position of the first node.
 * @return {number} The scroll X position.
 */
export function getScrollX() {
    return _getScrollX(this);
};

/**
 * Get the scroll Y position of the first node.
 * @return {number} The scroll Y position.
 */
export function getScrollY() {
    return _getScrollY(this);
};

/**
 * Scroll each node to an X,Y position.
 * @param {number} x The scroll X position.
 * @param {number} y The scroll Y position.
 * @return {QuerySet} The QuerySet object.
 */
export function setScroll(x, y) {
    _setScroll(this, x, y);

    return this;
};

/**
 * Scroll each node to an X position.
 * @param {number} x The scroll X position.
 * @return {QuerySet} The QuerySet object.
 */
export function setScrollX(x) {
    _setScrollX(this, x);

    return this;
};

/**
 * Scroll each node to a Y position.
 * @param {number} y The scroll Y position.
 * @return {QuerySet} The QuerySet object.
 */
export function setScrollY(y) {
    _setScrollY(this, y);

    return this;
};
