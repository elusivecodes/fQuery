import { isFunction } from '@fr0st/core';
import QuerySet from './proto.js';
import { getContext } from './../config.js';
import { parseNode, parseNodes } from './../filters.js';
import { ready } from './../events/events.js';

/**
 * DOM Query
 */

/**
 * Add a function to the ready queue or return a QuerySet.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet|function} selector The input selector.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
 * @return {QuerySet} The new QuerySet object.
 */
export function query(selector, context = null) {
    if (isFunction(selector)) {
        return ready(selector);
    }

    const nodes = parseNodes(selector, {
        node: true,
        fragment: true,
        shadow: true,
        document: true,
        window: true,
        html: true,
        context: context || getContext(),
    });

    return new QuerySet(nodes);
};

/**
 * Return a QuerySet for the first node.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input selector.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
 * @return {QuerySet} The new QuerySet object.
 */
export function queryOne(selector, context = null) {
    const node = parseNode(selector, {
        node: true,
        fragment: true,
        shadow: true,
        document: true,
        window: true,
        html: true,
        context: context || getContext(),
    });

    return new QuerySet(node ? [node] : []);
};
