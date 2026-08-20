import { escapeRegExp, isArray, isNumeric, isObject, isString, isUndefined, merge } from '@fr0st/core';
import QuerySet from './query/query-set.js';

/**
 * DOM Helpers
 */

/**
 * Resolve a single node.
 * @param {string|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
 * @param {function} stringCallback The callback used to resolve strings.
 * @param {DOM~nodeCallback} nodeFilter The callback used to filter nodes.
 * @return {Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window} The resolved node.
 */
export function resolveNode(nodes, stringCallback, nodeFilter) {
    if (isString(nodes)) {
        return stringCallback(nodes);
    }

    if (nodeFilter(nodes)) {
        return nodes;
    }

    if (nodes instanceof QuerySet) {
        const node = nodes.get(0);

        return nodeFilter(node) ? node : undefined;
    }

    if (nodes instanceof HTMLCollection || nodes instanceof NodeList) {
        const node = nodes.item(0);

        return nodeFilter(node) ? node : undefined;
    }
};

/**
 * Resolve multiple nodes.
 * @param {string|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
 * @param {function} stringCallback The callback used to resolve strings.
 * @param {DOM~nodeCallback} nodeFilter The callback used to filter nodes.
 * @return {array} The resolved nodes.
 */
export function resolveNodes(nodes, stringCallback, nodeFilter) {
    if (isString(nodes)) {
        return stringCallback(nodes);
    }

    if (nodeFilter(nodes)) {
        return [nodes];
    }

    if (nodes instanceof QuerySet) {
        return nodes.get().filter(nodeFilter);
    }

    if (nodes instanceof HTMLCollection || nodes instanceof NodeList) {
        return merge([], nodes).filter(nodeFilter);
    }

    return [];
};

/**
 * Create a wrapped version of a function that executes once per tick.
 * @param {function} callback Callback function to debounce.
 * @return {function} The wrapped function.
 */
export function debounce(callback) {
    let running;

    return (...args) => {
        if (running) {
            return;
        }

        running = true;

        Promise.resolve().then((_) => {
            callback(...args);
            running = false;
        });
    };
};

/**
 * Return a RegExp for testing a namespaced event.
 * @param {string} event The namespaced event.
 * @return {RegExp} The namespaced event RegExp.
 */
export function eventNamespacedRegExp(event) {
    return new RegExp(`^${escapeRegExp(event)}(?:\\.|$)`, 'i');
};

/**
 * Return a single dimensional array of classes (from a multi-dimensional array or space-separated strings).
 * @param {array} classList The classes to parse.
 * @return {string[]} The parsed classes.
 */
export function parseClasses(classList) {
    return classList
        .flat()
        .flatMap((val) => val.split(' '))
        .filter((val) => !!val);
};

/**
 * Return a data object from a key and value, or a data object.
 * @param {string|object} key The data key, or an object containing data.
 * @param {*} [value] The data value.
 * @param {object} [options] The options for parsing data.
 * @param {Boolean} [options.json=false] Whether to JSON encode the values.
 * @return {object} The data object.
 */
export function parseData(key, value, { json = false } = {}) {
    const result = isString(key) ?
        { [key]: value } :
        key;

    if (!json) {
        return result;
    }

    return Object.fromEntries(
        Object.entries(result)
            .map(([key, value]) => [key, isObject(value) || isArray(value) ? JSON.stringify(value) : value]),
    );
};

/**
 * Return a JS primitive from a dataset string.
 * @param {string} value The input value.
 * @return {*} The parsed value.
 */
export function parseDataset(value) {
    if (isUndefined(value)) {
        return value;
    }

    const lower = value.toLowerCase().trim();

    if (['true', 'on'].includes(lower)) {
        return true;
    }

    if (['false', 'off'].includes(lower)) {
        return false;
    }

    if (lower === 'null') {
        return null;
    }

    if (isNumeric(lower)) {
        return parseFloat(lower);
    }

    if (['{', '['].includes(lower.charAt(0))) {
        try {
            const result = JSON.parse(value);
            return result;
        } catch {
            // Ignore malformed JSON-like strings.
        }
    }

    return value;
};

/**
 * Return a "real" event from a namespaced event.
 * @param {string} event The namespaced event.
 * @return {string} The real event.
 */
export function parseEvent(event) {
    return event.split('.')
        .shift();
};

/**
 * Return an array of events from a space-separated string.
 * @param {string} events The events.
 * @return {array} The parsed events.
 */
export function parseEvents(events) {
    return events.split(' ');
};
