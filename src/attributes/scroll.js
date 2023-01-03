import { isDocument, isWindow } from '@fr0st/core';
import { parseNode, parseNodes } from './../filters.js';

/**
 * DOM Scroll
 */

/**
 * Get the scroll X position of the first node.
 * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {number} The scroll X position.
 */
export function getScrollX(selector) {
    const node = parseNode(selector, {
        document: true,
        window: true,
    });

    if (!node) {
        return;
    }

    if (isWindow(node)) {
        return node.scrollX;
    }

    if (isDocument(node)) {
        return node.scrollingElement.scrollLeft;
    }

    return node.scrollLeft;
};

/**
 * Get the scroll Y position of the first node.
 * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {number} The scroll Y position.
 */
export function getScrollY(selector) {
    const node = parseNode(selector, {
        document: true,
        window: true,
    });

    if (!node) {
        return;
    }

    if (isWindow(node)) {
        return node.scrollY;
    }

    if (isDocument(node)) {
        return node.scrollingElement.scrollTop;
    }

    return node.scrollTop;
};

/**
 * Scroll each node to an X,Y position.
 * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {number} x The scroll X position.
 * @param {number} y The scroll Y position.
 */
export function setScroll(selector, x, y) {
    const nodes = parseNodes(selector, {
        document: true,
        window: true,
    });

    for (const node of nodes) {
        if (isWindow(node)) {
            node.scroll(x, y);
        } else if (isDocument(node)) {
            node.scrollingElement.scrollLeft = x;
            node.scrollingElement.scrollTop = y;
        } else {
            node.scrollLeft = x;
            node.scrollTop = y;
        }
    }
};

/**
 * Scroll each node to an X position.
 * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {number} x The scroll X position.
 */
export function setScrollX(selector, x) {
    const nodes = parseNodes(selector, {
        document: true,
        window: true,
    });

    for (const node of nodes) {
        if (isWindow(node)) {
            node.scroll(x, node.scrollY);
        } else if (isDocument(node)) {
            node.scrollingElement.scrollLeft = x;
        } else {
            node.scrollLeft = x;
        }
    }
};

/**
 * Scroll each node to a Y position.
 * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {number} y The scroll Y position.
 */
export function setScrollY(selector, y) {
    const nodes = parseNodes(selector, {
        document: true,
        window: true,
    });

    for (const node of nodes) {
        if (isWindow(node)) {
            node.scroll(node.scrollX, y);
        } else if (isDocument(node)) {
            node.scrollingElement.scrollTop = y;
        } else {
            node.scrollTop = y;
        }
    }
};
