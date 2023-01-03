import QuerySet from './../query-set.js';
import { center as _center, constrain as _constrain, distTo as _distTo, distToNode as _distToNode, nearestTo as _nearestTo, nearestToNode as _nearestToNode, percentX as _percentX, percentY as _percentY, position as _position, rect as _rect } from './../../attributes/position.js';

/**
 * QuerySet Position
 */

/**
 * Get the X,Y co-ordinates for the center of the first node.
 * @param {object} [options] The options for calculating the co-ordinates.
 * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
 * @return {object} An object with the x and y co-ordinates.
 */
export function center({ offset = false } = {}) {
    return _center(this, { offset });
};

/**
 * Contrain each node to a container node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} container The container node, or a query selector string.
 * @return {QuerySet} The QuerySet object.
 */
export function constrain(container) {
    _constrain(this, container);

    return this;
};

/**
 * Get the distance of a node to an X,Y position in the Window.
 * @param {number} x The X co-ordinate.
 * @param {number} y The Y co-ordinate.
 * @param {object} [options] The options for calculating the distance.
 * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
 * @return {number} The distance to the node.
 */
export function distTo(x, y, { offset = false } = {}) {
    return _distTo(this, x, y, { offset });
};

/**
 * Get the distance between two nodes.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The node to compare, or a query selector string.
 * @return {number} The distance between the nodes.
 */
export function distToNode(otherSelector) {
    return _distToNode(this, otherSelector);
};

/**
 * Get the nearest node to an X,Y position in the Window.
 * @param {number} x The X co-ordinate.
 * @param {number} y The Y co-ordinate.
 * @param {object} [options] The options for calculating the distance.
 * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
 * @return {QuerySet} A new QuerySet object.
 */
export function nearestTo(x, y, { offset = false } = {}) {
    const node = _nearestTo(this, x, y, { offset });

    return new QuerySet(node ? [node] : []);
};

/**
 * Get the nearest node to another node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The node to compare, or a query selector string.
 * @return {QuerySet} A new QuerySet object.
 */
export function nearestToNode(otherSelector) {
    const node = _nearestToNode(this, otherSelector);

    return new QuerySet(node ? [node] : []);
};

/**
 * Get the percentage of an X co-ordinate relative to a node's width.
 * @param {number} x The X co-ordinate.
 * @param {object} [options] The options for calculating the percentage.
 * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
 * @param {Boolean} [options.clamp=true] Whether to clamp the percent between 0 and 100.
 * @return {number} The percent.
 */
export function percentX(x, { offset = false, clamp = true } = {}) {
    return _percentX(this, x, { offset, clamp });
};

/**
 * Get the percentage of a Y co-ordinate relative to a node's height.
 * @param {number} y The Y co-ordinate.
 * @param {object} [options] The options for calculating the percentage.
 * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
 * @param {Boolean} [options.clamp=true] Whether to clamp the percent between 0 and 100.
 * @return {number} The percent.
 */
export function percentY(y, { offset = false, clamp = true } = {}) {
    return _percentY(this, y, { offset, clamp });
};

/**
 * Get the position of the first node relative to the Window or Document.
 * @param {object} [options] The options for calculating the position.
 * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
 * @return {object} An object with the x and y co-ordinates.
 */
export function position({ offset = false } = {}) {
    return _position(this, { offset });
};

/**
 * Get the computed bounding rectangle of the first node.
 * @param {object} [options] The options for calculating the bounding rectangle.
 * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
 * @return {DOMRect} The computed bounding rectangle.
 */
export function rect({ offset = false } = {}) {
    return _rect(this, { offset });
};
