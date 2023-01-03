import { isDocument, isWindow } from '@fr0st/core';
import { css } from './styles.js';
import { parseNode } from './../filters.js';
import { BORDER_BOX, CONTENT_BOX, MARGIN_BOX, PADDING_BOX, SCROLL_BOX } from './../vars.js';

/**
 * DOM Size
 */

/**
 * Get the computed height of the first node.
 * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {object} [options] The options for calculating the height.
 * @param {number} [options.boxSize=PADDING_BOX] The box sizing to calculate.
 * @param {Boolean} [options.outer] Whether to use the window outer height.
 * @return {number} The height.
 */
export function height(selector, { boxSize = PADDING_BOX, outer = false } = {}) {
    let node = parseNode(selector, {
        document: true,
        window: true,
    });

    if (!node) {
        return;
    }

    if (isWindow(node)) {
        return outer ?
            node.outerHeight :
            node.innerHeight;
    }

    if (isDocument(node)) {
        node = node.documentElement;
    }

    if (boxSize >= SCROLL_BOX) {
        return node.scrollHeight;
    }

    let result = node.clientHeight;

    if (boxSize <= CONTENT_BOX) {
        result -= parseInt(css(node, 'padding-top'));
        result -= parseInt(css(node, 'padding-bottom'));
    }

    if (boxSize >= BORDER_BOX) {
        result += parseInt(css(node, 'border-top-width'));
        result += parseInt(css(node, 'border-bottom-width'));
    }

    if (boxSize >= MARGIN_BOX) {
        result += parseInt(css(node, 'margin-top'));
        result += parseInt(css(node, 'margin-bottom'));
    }

    return result;
};

/**
 * Get the computed width of the first node.
 * @param {string|array|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {object} [options] The options for calculating the width.
 * @param {number} [options.boxSize=PADDING_BOX] The box sizing to calculate.
 * @param {Boolean} [options.outer] Whether to use the window outer width.
 * @return {number} The width.
 */
export function width(selector, { boxSize = PADDING_BOX, outer = false } = {}) {
    let node = parseNode(selector, {
        document: true,
        window: true,
    });

    if (!node) {
        return;
    }

    if (isWindow(node)) {
        return outer ?
            node.outerWidth :
            node.innerWidth;
    }

    if (isDocument(node)) {
        node = node.documentElement;
    }

    if (boxSize >= SCROLL_BOX) {
        return node.scrollWidth;
    }

    let result = node.clientWidth;

    if (boxSize <= CONTENT_BOX) {
        result -= parseInt(css(node, 'padding-left'));
        result -= parseInt(css(node, 'padding-right'));
    }

    if (boxSize >= BORDER_BOX) {
        result += parseInt(css(node, 'border-left-width'));
        result += parseInt(css(node, 'border-right-width'));
    }

    if (boxSize >= MARGIN_BOX) {
        result += parseInt(css(node, 'margin-left'));
        result += parseInt(css(node, 'margin-right'));
    }

    return result;
};
