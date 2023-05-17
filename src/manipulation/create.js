import { camelCase, isNumeric, kebabCase, wrap } from '@fr0st/core';
import { getContext } from './../config.js';
import { parseNode } from './../filters.js';
import { parseClasses, parseData } from './../helpers.js';

/**
 * DOM Create
 */

/**
 * Attach a shadow DOM tree to the first node.
 * @param {string|array|HTMLElement|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {object} [options] The options for attaching the shadow DOM.
 * @param {Boolean} [options.open=true] Whether the elements are accessible from JavaScript outside the root.
 * @return {ShadowRoot} The new ShadowRoot.
 */
export function attachShadow(selector, { open = true } = {}) {
    const node = parseNode(selector);

    if (!node) {
        return;
    }

    return node.attachShadow({
        mode: open ?
            'open' :
            'closed',
    });
};

/**
 * Create a new DOM element.
 * @param {string} [tagName=div] The type of HTML element to create.
 * @param {object} [options] The options to use for creating the element.
 * @param {string} [options.html] The HTML contents.
 * @param {string} [options.text] The text contents.
 * @param {string|array} [options.class] The classes.
 * @param {object} [options.style] An object containing style properties.
 * @param {string} [options.value] The value.
 * @param {object} [options.attributes] An object containing attributes.
 * @param {object} [options.properties] An object containing properties.
 * @param {object} [options.dataset] An object containing dataset values.
 * @return {HTMLElement} The new HTMLElement.
 */
export function create(tagName = 'div', options = {}) {
    const node = getContext().createElement(tagName);

    if ('html' in options) {
        node.innerHTML = options.html;
    } else if ('text' in options) {
        node.textContent = options.text;
    }

    if ('class' in options) {
        const classes = parseClasses(wrap(options.class));

        node.classList.add(...classes);
    }

    if ('style' in options) {
        for (let [style, value] of Object.entries(options.style)) {
            style = kebabCase(style);

            // if value is numeric and property doesn't support number values, add px
            if (value && isNumeric(value) && !CSS.supports(style, value)) {
                value += 'px';
            }

            node.style.setProperty(style, value);
        }
    }

    if ('value' in options) {
        node.value = options.value;
    }

    if ('attributes' in options) {
        for (const [key, value] of Object.entries(options.attributes)) {
            node.setAttribute(key, value);
        }
    }

    if ('properties' in options) {
        for (const [key, value] of Object.entries(options.properties)) {
            node[key] = value;
        }
    }

    if ('dataset' in options) {
        const dataset = parseData(options.dataset, null, { json: true });

        for (let [key, value] of Object.entries(dataset)) {
            key = camelCase(key);
            node.dataset[key] = value;
        }
    }

    return node;
};

/**
 * Create a new comment node.
 * @param {string} comment The comment contents.
 * @return {Node} The new comment node.
 */
export function createComment(comment) {
    return getContext().createComment(comment);
};

/**
 * Create a new document fragment.
 * @return {DocumentFragment} The new DocumentFragment.
 */
export function createFragment() {
    return getContext().createDocumentFragment();
};

/**
 * Create a new range object.
 * @return {Range} The new Range.
 */
export function createRange() {
    return getContext().createRange();
};

/**
 * Create a new text node.
 * @param {string} text The text contents.
 * @return {Node} The new text node.
 */
export function createText(text) {
    return getContext().createTextNode(text);
};
