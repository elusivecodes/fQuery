import { clone } from './manipulation.js';
import { parseNodes } from './../filters.js';

/**
 * DOM Move
 */

/**
 * Insert each other node after each node.
 * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
 */
export function after(selector, otherSelector) {
    // DocumentFragment and ShadowRoot nodes can not have siblings
    const nodes = parseNodes(selector, {
        node: true,
    });

    // ShadowRoot nodes can not be moved
    const others = parseNodes(otherSelector, {
        node: true,
        fragment: true,
        html: true,
    }).reverse();

    for (const [i, node] of nodes.entries()) {
        const parent = node.parentNode;

        if (!parent) {
            continue;
        }

        let clones;
        if (i === nodes.length - 1) {
            clones = others;
        } else {
            clones = clone(others, {
                events: true,
                data: true,
                animations: true,
            });
        }

        for (const clone of clones) {
            parent.insertBefore(clone, node.nextSibling);
        }
    }
};

/**
 * Append each other node to each node.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
 */
export function append(selector, otherSelector) {
    const nodes = parseNodes(selector, {
        fragment: true,
        shadow: true,
        document: true,
    });

    // ShadowRoot nodes can not be moved
    const others = parseNodes(otherSelector, {
        node: true,
        fragment: true,
        html: true,
    });

    for (const [i, node] of nodes.entries()) {
        let clones;
        if (i === nodes.length - 1) {
            clones = others;
        } else {
            clones = clone(others, {
                events: true,
                data: true,
                animations: true,
            });
        }

        for (const clone of clones) {
            node.insertBefore(clone, null);
        }
    }
};

/**
 * Append each node to each other node.
 * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector or HTML string.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
 */
export function appendTo(selector, otherSelector) {
    append(otherSelector, selector);
};

/**
 * Insert each other node before each node.
 * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector or HTML string.
 */
export function before(selector, otherSelector) {
    // DocumentFragment and ShadowRoot nodes can not have siblings
    const nodes = parseNodes(selector, {
        node: true,
    });

    // ShadowRoot nodes can not be moved
    const others = parseNodes(otherSelector, {
        node: true,
        fragment: true,
        html: true,
    });

    for (const [i, node] of nodes.entries()) {
        const parent = node.parentNode;

        if (!parent) {
            continue;
        }

        let clones;
        if (i === nodes.length - 1) {
            clones = others;
        } else {
            clones = clone(others, {
                events: true,
                data: true,
                animations: true,
            });
        }

        for (const clone of clones) {
            parent.insertBefore(clone, node);
        }
    }
};

/**
 * Insert each node after each other node.
 * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector or HTML string.
 * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
 */
export function insertAfter(selector, otherSelector) {
    after(otherSelector, selector);
};

/**
 * Insert each node before each other node.
 * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector or HTML string.
 * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
 */
export function insertBefore(selector, otherSelector) {
    before(otherSelector, selector);
};

/**
 * Prepend each other node to each node.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection} otherSelector The other node(s), or a query selector or HTML string.
 */
export function prepend(selector, otherSelector) {
    const nodes = parseNodes(selector, {
        fragment: true,
        shadow: true,
        document: true,
    });

    // ShadowRoot nodes can not be moved
    const others = parseNodes(otherSelector, {
        node: true,
        fragment: true,
        html: true,
    });

    for (const [i, node] of nodes.entries()) {
        const firstChild = node.firstChild;

        let clones;
        if (i === nodes.length - 1) {
            clones = others;
        } else {
            clones = clone(others, {
                events: true,
                data: true,
                animations: true,
            });
        }

        for (const clone of clones) {
            node.insertBefore(clone, firstChild);
        }
    }
};

/**
 * Prepend each node to each other node.
 * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector or HTML string.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
 */
export function prependTo(selector, otherSelector) {
    prepend(otherSelector, selector);
};
