import { isArray, isDocument, isElement, isFragment, isFunction, isNode, isShadow, isString, isWindow, merge, unique } from '@fr0st/core';
import { getContext } from './config.js';
import { resolveNode, resolveNodes } from './helpers.js';
import { parseHTML } from './parser/parser.js';
import { find, findOne } from './traversal/find.js';

/**
 * DOM Filters
 */

/**
 * Return a node filter callback.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
 * @param {Boolean} [defaultValue=true] The default return value.
 * @return {DOM~filterCallback} The node filter callback.
 */
export function parseFilter(filter, defaultValue = true) {
    if (!filter) {
        return (_) => defaultValue;
    }

    if (isFunction(filter)) {
        return filter;
    }

    if (isString(filter)) {
        return (node) => isElement(node) && node.matches(filter);
    }

    if (isNode(filter) || isFragment(filter) || isShadow(filter)) {
        return (node) => node.isSameNode(filter);
    }

    filter = parseNodes(filter, {
        node: true,
        fragment: true,
        shadow: true,
    });

    if (filter.length) {
        return (node) => filter.includes(node);
    }

    return (_) => !defaultValue;
};

/**
 * Return a node contains filter callback.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
 * @param {Boolean} [defaultValue=true] The default return value.
 * @return {DOM~filterCallback} The node contains filter callback.
 */
export function parseFilterContains(filter, defaultValue = true) {
    if (!filter) {
        return (_) => defaultValue;
    }

    if (isFunction(filter)) {
        return (node) => merge([], node.querySelectorAll('*')).some(filter);
    }

    if (isString(filter)) {
        return (node) => !!findOne(filter, node);
    }

    if (isNode(filter) || isFragment(filter) || isShadow(filter)) {
        return (node) => node.contains(filter);
    }

    filter = parseNodes(filter, {
        node: true,
        fragment: true,
        shadow: true,
    });

    if (filter.length) {
        return (node) => filter.some((other) => node.contains(other));
    }

    return (_) => !defaultValue;
};

/**
 * Return the first node matching a filter.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
 * @param {object} [options] The options for filtering.
 * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
 * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
 * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
 * @param {Boolean} [options.document=false] Whether to allow Document.
 * @param {Boolean} [options.window=false] Whether to allow Window.
 * @param {Boolean} [options.html=false] Whether to allow HTML strings.
 * @param {HTMLElement|Document} [options.context=getContext()] The Document context.
 * @return {Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window} The matching node.
 */
export function parseNode(nodes, options = {}) {
    const filter = parseNodesFilter(options);
    const context = options.context || getContext();
    const stringCallback = (node) => options.html && node.trim().charAt(0) === '<' ?
        parseHTML(node).shift() :
        findOne(node, context);

    if (!isArray(nodes)) {
        return resolveNode(nodes, stringCallback, filter);
    }

    for (const node of nodes) {
        const result = resolveNode(node, stringCallback, filter);

        if (result) {
            return result;
        }
    }
};

/**
 * Return a filtered array of nodes.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
 * @param {object} [options] The options for filtering.
 * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
 * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
 * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
 * @param {Boolean} [options.document=false] Whether to allow Document.
 * @param {Boolean} [options.window=false] Whether to allow Window.
 * @param {Boolean} [options.html=false] Whether to allow HTML strings.
 * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} [options.context=getContext()] The Document context.
 * @return {array} The filtered array of nodes.
 */
export function parseNodes(nodes, options = {}) {
    const filter = parseNodesFilter(options);
    const context = options.context || getContext();
    const stringCallback = (node) => options.html && node.trim().charAt(0) === '<' ?
        parseHTML(node) :
        find(node, context);

    if (!isArray(nodes)) {
        return resolveNodes(nodes, stringCallback, filter);
    }

    const results = nodes.flatMap((node) => resolveNodes(node, stringCallback, filter));

    return nodes.length > 1 && results.length > 1 ?
        unique(results) :
        results;
};

/**
 * Return a function for filtering nodes.
 * @param {object} [options] The options for filtering.
 * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
 * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
 * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
 * @param {Boolean} [options.document=false] Whether to allow Document.
 * @param {Boolean} [options.window=false] Whether to allow Window.
 * @return {DOM~nodeCallback} The node filter function.
 */
function parseNodesFilter(options) {
    if (!options) {
        return isElement;
    }

    const callbacks = [];

    if (options.node) {
        callbacks.push(isNode);
    } else {
        callbacks.push(isElement);
    }

    if (options.document) {
        callbacks.push(isDocument);
    }

    if (options.window) {
        callbacks.push(isWindow);
    }

    if (options.fragment) {
        callbacks.push(isFragment);
    }

    if (options.shadow) {
        callbacks.push(isShadow);
    }

    return (node) => callbacks.some((callback) => callback(node));
};
