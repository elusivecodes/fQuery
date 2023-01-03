import { clampPercent, dist } from '@fr0st/core';
import { css } from './styles.js';
import { getContext, getWindow } from './../config.js';
import { parseNode, parseNodes } from './../filters.js';

/**
 * DOM Position
 */

/**
 * Get the X,Y co-ordinates for the center of the first node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {object} [options] The options for calculating the co-ordinates.
 * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
 * @return {object} An object with the x and y co-ordinates.
 */
export function center(selector, { offset = false } = {}) {
    const nodeBox = rect(selector, { offset });

    if (!nodeBox) {
        return;
    }

    return {
        x: nodeBox.left + nodeBox.width / 2,
        y: nodeBox.top + nodeBox.height / 2,
    };
};

/**
 * Contrain each node to a container node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} containerSelector The container node, or a query selector string.
 */
export function constrain(selector, containerSelector) {
    const containerBox = rect(containerSelector);

    if (!containerBox) {
        return;
    }

    const nodes = parseNodes(selector);

    const context = getContext();
    const window = getWindow();
    const getScrollX = (_) => context.documentElement.scrollHeight > window.outerHeight;
    const getScrollY = (_) => context.documentElement.scrollWidth > window.outerWidth;

    const preScrollX = getScrollX();
    const preScrollY = getScrollY();

    for (const node of nodes) {
        const nodeBox = rect(node);

        if (nodeBox.height > containerBox.height) {
            node.style.setProperty('height', `${containerBox.height}px`);
        }

        if (nodeBox.width > containerBox.width) {
            node.style.setProperty('width', `${containerBox.width}px`);
        }

        let leftOffset;
        if (nodeBox.left - containerBox.left < 0) {
            leftOffset = nodeBox.left - containerBox.left;
        } else if (nodeBox.right - containerBox.right > 0) {
            leftOffset = nodeBox.right - containerBox.right;
        }

        if (leftOffset) {
            const oldLeft = css(node, 'left');
            const trueLeft = oldLeft && oldLeft !== 'auto' ? parseFloat(oldLeft) : 0;
            node.style.setProperty('left', `${trueLeft - leftOffset}px`);
        }

        let topOffset;
        if (nodeBox.top - containerBox.top < 0) {
            topOffset = nodeBox.top - containerBox.top;
        } else if (nodeBox.bottom - containerBox.bottom > 0) {
            topOffset = nodeBox.bottom - containerBox.bottom;
        }

        if (topOffset) {
            const oldTop = css(node, 'top');
            const trueTop = oldTop && oldTop !== 'auto' ? parseFloat(oldTop) : 0;
            node.style.setProperty('top', `${trueTop - topOffset}px`);
        }

        if (css(node, 'position') === 'static') {
            node.style.setProperty('position', 'relative');
        }
    }

    const postScrollX = getScrollX();
    const postScrollY = getScrollY();

    if (preScrollX !== postScrollX || preScrollY !== postScrollY) {
        constrain(nodes, containerSelector);
    }
};

/**
 * Get the distance of a node to an X,Y position in the Window.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {number} x The X co-ordinate.
 * @param {number} y The Y co-ordinate.
 * @param {object} [options] The options for calculating the distance.
 * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
 * @return {number} The distance to the element.
 */
export function distTo(selector, x, y, { offset = false } = {}) {
    const nodeCenter = center(selector, { offset });

    if (!nodeCenter) {
        return;
    }

    return dist(nodeCenter.x, nodeCenter.y, x, y);
};

/**
 * Get the distance between two nodes.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The node to compare, or a query selector string.
 * @return {number} The distance between the nodes.
 */
export function distToNode(selector, otherSelector) {
    const otherCenter = center(otherSelector);

    if (!otherCenter) {
        return;
    }

    return distTo(selector, otherCenter.x, otherCenter.y);
};

/**
 * Get the nearest node to an X,Y position in the Window.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {number} x The X co-ordinate.
 * @param {number} y The Y co-ordinate.
 * @param {object} [options] The options for calculating the distance.
 * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
 * @return {HTMLElement} The nearest node.
 */
export function nearestTo(selector, x, y, { offset = false } = {}) {
    let closest;
    let closestDistance = Number.MAX_VALUE;

    const nodes = parseNodes(selector);

    for (const node of nodes) {
        const dist = distTo(node, x, y, { offset });
        if (dist && dist < closestDistance) {
            closestDistance = dist;
            closest = node;
        }
    }

    return closest;
};

/**
 * Get the nearest node to another node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The node to compare, or a query selector string.
 * @return {HTMLElement} The nearest node.
 */
export function nearestToNode(selector, otherSelector) {
    const otherCenter = center(otherSelector);

    if (!otherCenter) {
        return;
    }

    return nearestTo(selector, otherCenter.x, otherCenter.y);
};

/**
 * Get the percentage of an X co-ordinate relative to a node's width.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {number} x The X co-ordinate.
 * @param {object} [options] The options for calculating the percentage.
 * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
 * @param {Boolean} [options.clamp=true] Whether to clamp the percent between 0 and 100.
 * @return {number} The percent.
 */
export function percentX(selector, x, { offset = false, clamp = true } = {}) {
    const nodeBox = rect(selector, { offset });

    if (!nodeBox) {
        return;
    }

    const percent = (x - nodeBox.left) /
        nodeBox.width *
        100;

    return clamp ?
        clampPercent(percent) :
        percent;
};

/**
 * Get the percentage of a Y co-ordinate relative to a node's height.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {number} y The Y co-ordinate.
 * @param {object} [options] The options for calculating the percentage.
 * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
 * @param {Boolean} [options.clamp=true] Whether to clamp the percent between 0 and 100.
 * @return {number} The percent.
 */
export function percentY(selector, y, { offset = false, clamp = true } = {}) {
    const nodeBox = rect(selector, { offset });

    if (!nodeBox) {
        return;
    }

    const percent = (y - nodeBox.top) /
        nodeBox.height *
        100;

    return clamp ?
        clampPercent(percent) :
        percent;
};

/**
 * Get the position of the first node relative to the Window or Document.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {object} [options] The options for calculating the position.
 * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
 * @return {object} An object with the X and Y co-ordinates.
 */
export function position(selector, { offset = false } = {}) {
    const node = parseNode(selector);

    if (!node) {
        return;
    }

    const result = {
        x: node.offsetLeft,
        y: node.offsetTop,
    };

    if (offset) {
        let offsetParent = node;

        while (offsetParent = offsetParent.offsetParent) {
            result.x += offsetParent.offsetLeft;
            result.y += offsetParent.offsetTop;
        }
    }

    return result;
};

/**
 * Get the computed bounding rectangle of the first node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {object} [options] The options for calculating the bounding rectangle.
 * @param {Boolean} [options.offset] Whether to offset from the top-left of the Document.
 * @return {DOMRect} The computed bounding rectangle.
 */
export function rect(selector, { offset = false } = {}) {
    const node = parseNode(selector);

    if (!node) {
        return;
    }

    const result = node.getBoundingClientRect();

    if (offset) {
        const window = getWindow();
        result.x += window.scrollX;
        result.y += window.scrollY;
    }

    return result;
};
