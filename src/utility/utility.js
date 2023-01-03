import { isDocument, isElement, isFragment, isShadow, isWindow, merge } from '@fr0st/core';
import { getContext } from './../config.js';
import { parseFilter, parseNode, parseNodes } from './../filters.js';
import { parseParams } from './../ajax/helpers.js';

/**
 * DOM Utility
 */

/**
 * Execute a command in the document context.
 * @param {string} command The command to execute.
 * @param {string} [value] The value to give the command.
 * @return {Boolean} TRUE if the command was executed, otherwise FALSE.
 */
export function exec(command, value = null) {
    return getContext().execCommand(command, false, value);
};

/**
 * Get the index of the first node relative to it's parent.
 * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {number} The index.
 */
export function index(selector) {
    const node = parseNode(selector, {
        node: true,
    });

    if (!node || !node.parentNode) {
        return;
    }

    return merge([], node.parentNode.children).indexOf(node);
};

/**
 * Get the index of the first node matching a filter.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {number} The index.
 */
export function indexOf(selector, nodeFilter) {
    nodeFilter = parseFilter(nodeFilter);

    return parseNodes(selector, {
        node: true,
        fragment: true,
        shadow: true,
    }).findIndex(nodeFilter);
};

/**
 * Normalize nodes (remove empty text nodes, and join adjacent text nodes).
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 */
export function normalize(selector) {
    const nodes = parseNodes(selector, {
        node: true,
        fragment: true,
        shadow: true,
        document: true,
    });

    for (const node of nodes) {
        node.normalize();
    }
};

/**
 * Return a serialized string containing names and values of all form nodes.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {string} The serialized string.
 */
export function serialize(selector) {
    return parseParams(
        serializeArray(selector),
    );
};

/**
 * Return a serialized array containing names and values of all form nodes.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {array} The serialized array.
 */
export function serializeArray(selector) {
    return parseNodes(selector, {
        fragment: true,
        shadow: true,
    }).reduce(
        (values, node) => {
            if (
                (isElement(node) && node.matches('form')) ||
                isFragment(node) ||
                isShadow(node)
            ) {
                return values.concat(
                    serializeArray(
                        node.querySelectorAll(
                            'input, select, textarea',
                        ),
                    ),
                );
            }

            if (
                isElement(node) &&
                node.matches('[disabled], input[type=submit], input[type=reset], input[type=file], input[type=radio]:not(:checked), input[type=checkbox]:not(:checked)')
            ) {
                return values;
            }

            const name = node.getAttribute('name');
            if (!name) {
                return values;
            }

            if (
                isElement(node) &&
                node.matches('select[multiple]')
            ) {
                for (const option of node.selectedOptions) {
                    values.push(
                        {
                            name,
                            value: option.value || '',
                        },
                    );
                }
            } else {
                values.push(
                    {
                        name,
                        value: node.value || '',
                    },
                );
            }

            return values;
        },
        [],
    );
}

/**
 * Sort nodes by their position in the document.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {array} The sorted array of nodes.
 */
export function sort(selector) {
    return parseNodes(selector, {
        node: true,
        fragment: true,
        shadow: true,
        document: true,
        window: true,
    }).sort((node, other) => {
        if (isWindow(node)) {
            return 1;
        }

        if (isWindow(other)) {
            return -1;
        }

        if (isDocument(node)) {
            return 1;
        }

        if (isDocument(other)) {
            return -1;
        }

        if (isFragment(other)) {
            return 1;
        }

        if (isFragment(node)) {
            return -1;
        }

        if (isShadow(node)) {
            node = node.host;
        }

        if (isShadow(other)) {
            other = other.host;
        }

        if (node.isSameNode(other)) {
            return 0;
        }

        const pos = node.compareDocumentPosition(other);

        if (pos & Node.DOCUMENT_POSITION_FOLLOWING || pos & Node.DOCUMENT_POSITION_CONTAINED_BY) {
            return -1;
        }

        if (pos & Node.DOCUMENT_POSITION_PRECEDING || pos & Node.DOCUMENT_POSITION_CONTAINS) {
            return 1;
        }

        return 0;
    });
};

/**
 * Return the tag name (lowercase) of the first node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {string} The nodes tag name (lowercase).
 */
export function tagName(selector) {
    const node = parseNode(selector);

    if (!node) {
        return;
    }

    return node.tagName.toLowerCase();
};
