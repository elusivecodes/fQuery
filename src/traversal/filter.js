import { isDocument, isElement, isWindow } from '@fr0st/core';
import { parseFilter, parseFilterContains, parseNodes } from './../filters.js';
import { parseClasses } from './../helpers.js';
import { animations, data } from './../vars.js';
import { css } from './../attributes/styles.js';
import { closest } from './../traversal/traversal.js';

/**
 * DOM Filter
 */

/**
 * Return all nodes connected to the DOM.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {array} The filtered nodes.
 */
export function connected(selector) {
    return parseNodes(selector, {
        node: true,
        fragment: true,
        shadow: true,
    }).filter((node) => node.isConnected);
};

/**
 * Return all nodes considered equal to any of the other nodes.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
 * @return {array} The filtered nodes.
 */
export function equal(selector, otherSelector) {
    const others = parseNodes(otherSelector, {
        node: true,
        fragment: true,
        shadow: true,
    });

    return parseNodes(selector, {
        node: true,
        fragment: true,
        shadow: true,
    }).filter((node) =>
        others.some((other) =>
            node.isEqualNode(other),
        ),
    );
};

/**
 * Return all nodes matching a filter.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {array} The filtered nodes.
 */
export function filter(selector, nodeFilter) {
    nodeFilter = parseFilter(nodeFilter);

    return parseNodes(selector, {
        node: true,
        fragment: true,
        shadow: true,
    }).filter(nodeFilter);
};

/**
 * Return the first node matching a filter.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {Node|HTMLElement|DocumentFragment|ShadowRoot} The filtered node.
 */
export function filterOne(selector, nodeFilter) {
    nodeFilter = parseFilter(nodeFilter);

    return parseNodes(selector, {
        node: true,
        fragment: true,
        shadow: true,
    }).find(nodeFilter) || null;
};

/**
 * Return all "fixed" nodes.
 * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {array} The filtered nodes.
 */
export function fixed(selector) {
    return parseNodes(selector, {
        node: true,
    }).filter((node) =>
        (isElement(node) && css(node, 'position') === 'fixed') ||
        closest(
            node,
            (parent) => isElement(parent) && css(parent, 'position') === 'fixed',
        ).length,
    );
};

/**
 * Return all hidden nodes.
 * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {array} The filtered nodes.
 */
export function hidden(selector) {
    return parseNodes(selector, {
        node: true,
        document: true,
        window: true,
    }).filter((node) => {
        if (isWindow(node)) {
            return node.document.visibilityState !== 'visible';
        }

        if (isDocument(node)) {
            return node.visibilityState !== 'visible';
        }

        return !node.offsetParent;
    });
};

/**
 * Return all nodes not matching a filter.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {array} The filtered nodes.
 */
export function not(selector, nodeFilter) {
    nodeFilter = parseFilter(nodeFilter);

    return parseNodes(selector, {
        node: true,
        fragment: true,
        shadow: true,
    }).filter((node, index) => !nodeFilter(node, index));
};

/**
 * Return the first node not matching a filter.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {Node|HTMLElement|DocumentFragment|ShadowRoot} The filtered node.
 */
export function notOne(selector, nodeFilter) {
    nodeFilter = parseFilter(nodeFilter);

    return parseNodes(selector, {
        node: true,
        fragment: true,
        shadow: true,
    }).find((node, index) => !nodeFilter(node, index)) || null;
};

/**
 * Return all nodes considered identical to any of the other nodes.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
 * @return {array} The filtered nodes.
 */
export function same(selector, otherSelector) {
    const others = parseNodes(otherSelector, {
        node: true,
        fragment: true,
        shadow: true,
    });

    return parseNodes(selector, {
        node: true,
        fragment: true,
        shadow: true,
    }).filter((node) =>
        others.some((other) =>
            node.isSameNode(other),
        ),
    );
};

/**
 * Return all visible nodes.
 * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {array} The filtered nodes.
 */
export function visible(selector) {
    return parseNodes(selector, {
        node: true,
        document: true,
        window: true,
    }).filter((node) => {
        if (isWindow(node)) {
            return node.document.visibilityState === 'visible';
        }

        if (isDocument(node)) {
            return node.visibilityState === 'visible';
        }

        return node.offsetParent;
    });
};

/**
 * Return all nodes with an animation.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {array} The filtered nodes.
 */
export function withAnimation(selector) {
    return parseNodes(selector)
        .filter((node) =>
            animations.has(node),
        );
};

/**
 * Return all nodes with a specified attribute.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string} attribute The attribute name.
 * @return {array} The filtered nodes.
 */
export function withAttribute(selector, attribute) {
    return parseNodes(selector)
        .filter((node) =>
            node.hasAttribute(attribute),
        );
};

/**
 * Return all nodes with child elements.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {array} The filtered nodes.
 */
export function withChildren(selector) {
    return parseNodes(selector, {
        fragment: true,
        shadow: true,
        document: true,
    }).filter((node) =>
        !!node.childElementCount,
    );
};

/**
 * Return all nodes with any of the specified classes.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {...string|string[]} classes The classes.
 * @return {array} The filtered nodes.
 */
export function withClass(selector, ...classes) {
    classes = parseClasses(classes);

    return parseNodes(selector)
        .filter((node) =>
            classes.some((className) =>
                node.classList.contains(className),
            ),
        );
};

/**
 * Return all nodes with a CSS animation.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {array} The filtered nodes.
 */
export function withCSSAnimation(selector) {
    return parseNodes(selector)
        .filter((node) =>
            parseFloat(css(node, 'animation-duration')),
        );
};

/**
 * Return all nodes with a CSS transition.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {array} The filtered nodes.
 */
export function withCSSTransition(selector) {
    return parseNodes(selector)
        .filter((node) =>
            parseFloat(css(node, 'transition-duration')),
        );
};

/**
 * Return all nodes with custom data.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string} [key] The data key.
 * @return {array} The filtered nodes.
 */
export function withData(selector, key) {
    return parseNodes(selector, {
        node: true,
        fragment: true,
        shadow: true,
        document: true,
        window: true,
    }).filter((node) => {
        if (!data.has(node)) {
            return false;
        }

        if (!key) {
            return true;
        }

        const nodeData = data.get(node);

        return nodeData.hasOwnProperty(key);
    });
};

/**
 * Return all nodes with a descendent matching a filter.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {array} The filtered nodes.
 */
export function withDescendent(selector, nodeFilter) {
    nodeFilter = parseFilterContains(nodeFilter);

    return parseNodes(selector, {
        fragment: true,
        shadow: true,
        document: true,
    }).filter(nodeFilter);
};

/**
 * Return all nodes with a specified property.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string} property The property name.
 * @return {array} The filtered nodes.
 */
export function withProperty(selector, property) {
    return parseNodes(selector)
        .filter((node) =>
            node.hasOwnProperty(property),
        );
};
