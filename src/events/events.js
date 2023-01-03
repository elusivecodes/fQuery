import { getContext, getWindow } from './../config.js';
import { parseNode } from './../filters.js';

/**
 * DOM Events
 */

/**
 * Trigger a blur event on the first node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 */
export function blur(selector) {
    const node = parseNode(selector);

    if (!node) {
        return;
    }

    node.blur();
};

/**
 * Trigger a click event on the first node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 */
export function click(selector) {
    const node = parseNode(selector);

    if (!node) {
        return;
    }

    node.click();
};

/**
 * Trigger a focus event on the first node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 */
export function focus(selector) {
    const node = parseNode(selector);

    if (!node) {
        return;
    }

    node.focus();
};

/**
 * Add a function to the ready queue.
 * @param {DOM~eventCallback} callback The callback to execute.
 */
export function ready(callback) {
    if (getContext().readyState === 'complete') {
        callback();
    } else {
        getWindow().addEventListener('DOMContentLoaded', callback, { once: true });
    }
};
