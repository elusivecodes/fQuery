import { isNumeric, kebabCase } from '@fr0st/core';
import { getWindow } from './../config.js';
import { parseNode, parseNodes } from './../filters.js';
import { parseClasses, parseData } from './../helpers.js';
import { styles } from './../vars.js';

/**
 * DOM Styles
 */

/**
 * Add classes to each node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {...string|string[]} classes The classes.
 */
export function addClass(selector, ...classes) {
    const nodes = parseNodes(selector);

    classes = parseClasses(classes);

    if (!classes.length) {
        return;
    }

    for (const node of nodes) {
        node.classList.add(...classes);
    }
};

/**
 * Get computed CSS style value(s) for the first node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string} [style] The CSS style name.
 * @return {string|object} The CSS style value, or an object containing the computed CSS style properties.
 */
export function css(selector, style) {
    const node = parseNode(selector);

    if (!node) {
        return;
    }

    if (!styles.has(node)) {
        styles.set(
            node,
            getWindow().getComputedStyle(node),
        );
    }

    const nodeStyles = styles.get(node);

    if (!style) {
        return { ...nodeStyles };
    }

    style = kebabCase(style);

    return nodeStyles.getPropertyValue(style);
};

/**
 * Get style properties for the first node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string} [style] The style name.
 * @return {string|object} The style value, or an object containing the style properties.
 */
export function getStyle(selector, style) {
    const node = parseNode(selector);

    if (!node) {
        return;
    }

    if (style) {
        style = kebabCase(style);

        return node.style[style];
    }

    const styles = {};

    for (const style of node.style) {
        styles[style] = node.style[style];
    }

    return styles;
};

/**
 * Hide each node from display.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 */
export function hide(selector) {
    const nodes = parseNodes(selector);

    for (const node of nodes) {
        node.style.setProperty('display', 'none');
    }
};

/**
 * Remove classes from each node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {...string|string[]} classes The classes.
 */
export function removeClass(selector, ...classes) {
    const nodes = parseNodes(selector);

    classes = parseClasses(classes);

    if (!classes.length) {
        return;
    }

    for (const node of nodes) {
        node.classList.remove(...classes);
    }
};

/**
 * Set style properties for each node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|object} style The style name, or an object containing styles.
 * @param {string} [value] The style value.
 * @param {object} [options] The options for setting the style.
 * @param {Boolean} [options.important] Whether the style should be !important.
 */
export function setStyle(selector, style, value, { important = false } = {}) {
    const nodes = parseNodes(selector);

    const styles = parseData(style, value);

    for (let [style, value] of Object.entries(styles)) {
        style = kebabCase(style);

        // if value is numeric and property doesn't support number values, add px
        if (value && isNumeric(value) && !CSS.supports(style, value)) {
            value += 'px';
        }

        for (const node of nodes) {
            node.style.setProperty(
                style,
                value,
                important ?
                    'important' :
                    '',
            );
        }
    }
};

/**
 * Display each hidden node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 */
export function show(selector) {
    const nodes = parseNodes(selector);

    for (const node of nodes) {
        node.style.setProperty('display', '');
    }
};

/**
 * Toggle the visibility of each node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 */
export function toggle(selector) {
    const nodes = parseNodes(selector);

    for (const node of nodes) {
        node.style.setProperty(
            'display',
            node.style.display === 'none' ?
                '' :
                'none',
        );
    }
};

/**
 * Toggle classes for each node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {...string|string[]} classes The classes.
 */
export function toggleClass(selector, ...classes) {
    const nodes = parseNodes(selector);

    classes = parseClasses(classes);

    if (!classes.length) {
        return;
    }

    for (const node of nodes) {
        for (const className of classes) {
            node.classList.toggle(className);
        }
    }
};
