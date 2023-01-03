import { isFragment, merge } from '@fr0st/core';
import { clone, remove } from './manipulation.js';
import { parseFilter, parseNodes } from './../filters.js';

/**
 * DOM Wrap
 */

/**
 * Unwrap each node.
 * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 */
export function unwrap(selector, nodeFilter) {
    // DocumentFragment and ShadowRoot nodes can not be unwrapped
    const nodes = parseNodes(selector, {
        node: true,
    });

    nodeFilter = parseFilter(nodeFilter);

    const parents = [];

    for (const node of nodes) {
        const parent = node.parentNode;

        if (!parent) {
            continue;
        }

        if (parents.includes(parent)) {
            continue;
        }

        if (!nodeFilter(parent)) {
            continue;
        }

        parents.push(parent);
    }

    for (const parent of parents) {
        const outerParent = parent.parentNode;

        if (!outerParent) {
            continue;
        }

        const children = merge([], parent.childNodes);

        for (const child of children) {
            outerParent.insertBefore(child, parent);
        }
    }

    remove(parents);
};

/**
 * Wrap each nodes with other nodes.
 * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
 */
export function wrap(selector, otherSelector) {
    // DocumentFragment and ShadowRoot nodes can not be wrapped
    const nodes = parseNodes(selector, {
        node: true,
    });

    // ShadowRoot nodes can not be cloned
    const others = parseNodes(otherSelector, {
        fragment: true,
        html: true,
    });

    for (const node of nodes) {
        const parent = node.parentNode;

        if (!parent) {
            continue;
        }

        const clones = clone(others, {
            events: true,
            data: true,
            animations: true,
        });

        const firstClone = clones.slice().shift();

        const firstCloneNode = isFragment(firstClone) ?
            firstClone.firstChild :
            firstClone;
        const deepest = merge([], firstCloneNode.querySelectorAll('*')).find((node) => !node.childElementCount) || firstCloneNode;

        for (const clone of clones) {
            parent.insertBefore(clone, node);
        }

        deepest.insertBefore(node, null);
    }
};

/**
 * Wrap all nodes with other nodes.
 * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
 */
export function wrapAll(selector, otherSelector) {
    // DocumentFragment and ShadowRoot nodes can not be wrapped
    const nodes = parseNodes(selector, {
        node: true,
    });

    // ShadowRoot nodes can not be cloned
    const others = parseNodes(otherSelector, {
        fragment: true,
        html: true,
    });

    const clones = clone(others, {
        events: true,
        data: true,
        animations: true,
    });

    const firstNode = nodes[0];

    if (!firstNode) {
        return;
    }

    const parent = firstNode.parentNode;

    if (!parent) {
        return;
    }

    const firstClone = clones[0];

    const firstCloneNode = isFragment(firstClone) ?
        firstClone.firstChild :
        firstClone;
    const deepest = merge([], firstCloneNode.querySelectorAll('*')).find((node) => !node.childElementCount) || firstCloneNode;

    for (const clone of clones) {
        parent.insertBefore(clone, firstNode);
    }

    for (const node of nodes) {
        deepest.insertBefore(node, null);
    }
};

/**
 * Wrap the contents of each node with other nodes.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
 */
export function wrapInner(selector, otherSelector) {
    const nodes = parseNodes(selector, {
        node: true,
        fragment: true,
        shadow: true,
    });

    // ShadowRoot nodes can not be cloned
    const others = parseNodes(otherSelector, {
        fragment: true,
        html: true,
    });

    for (const node of nodes) {
        const children = merge([], node.childNodes);

        const clones = clone(others, {
            events: true,
            data: true,
            animations: true,
        });

        const firstClone = clones.slice().shift();

        const firstCloneNode = isFragment(firstClone) ?
            firstClone.firstChild :
            firstClone;
        const deepest = merge([], firstCloneNode.querySelectorAll('*')).find((node) => !node.childElementCount) || firstCloneNode;

        for (const clone of clones) {
            node.insertBefore(clone, null);
        }

        for (const child of children) {
            deepest.insertBefore(child, null);
        }
    }
};
