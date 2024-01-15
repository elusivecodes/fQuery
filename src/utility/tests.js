import { camelCase, isDocument, isElement, isWindow } from '@fr0st/core';
import { parseFilter, parseFilterContains, parseNodes } from './../filters.js';
import { parseClasses } from './../helpers.js';
import { animations, data } from './../vars.js';
import { css } from './../attributes/styles.js';
import { closest } from './../traversal/traversal.js';

/**
 * DOM Tests
 */

/**
 * Returns true if any of the nodes has an animation.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {Boolean} TRUE if any of the nodes has an animation, otherwise FALSE.
 */
export function hasAnimation(selector) {
    return parseNodes(selector)
        .some((node) => animations.has(node));
};

/**
 * Returns true if any of the nodes has a specified attribute.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string} attribute The attribute name.
 * @return {Boolean} TRUE if any of the nodes has the attribute, otherwise FALSE.
 */
export function hasAttribute(selector, attribute) {
    return parseNodes(selector)
        .some((node) => node.hasAttribute(attribute));
};

/**
 * Returns true if any of the nodes has child nodes.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {Boolean} TRUE if the any of the nodes has child nodes, otherwise FALSE.
 */
export function hasChildren(selector) {
    return parseNodes(selector, {
        fragment: true,
        shadow: true,
        document: true,
    }).some((node) => node.childElementCount);
};

/**
 * Returns true if any of the nodes has any of the specified classes.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {...string|string[]} classes The classes.
 * @return {Boolean} TRUE if any of the nodes has any of the classes, otherwise FALSE.
 */
export function hasClass(selector, ...classes) {
    classes = parseClasses(classes);

    return parseNodes(selector)
        .some((node) =>
            classes.some((className) => node.classList.contains(className)),
        );
};

/**
 * Returns true if any of the nodes has a CSS animation.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {Boolean} TRUE if any of the nodes has a CSS animation, otherwise FALSE.
 */
export function hasCSSAnimation(selector) {
    return parseNodes(selector)
        .some((node) =>
            parseFloat(css(node, 'animation-duration')),
        );
};

/**
 * Returns true if any of the nodes has a CSS transition.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {Boolean} TRUE if any of the nodes has a CSS transition, otherwise FALSE.
 */
export function hasCSSTransition(selector) {
    return parseNodes(selector)
        .some((node) =>
            parseFloat(css(node, 'transition-duration')),
        );
};

/**
 * Returns true if any of the nodes has custom data.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string} [key] The data key.
 * @return {Boolean} TRUE if any of the nodes has custom data, otherwise FALSE.
 */
export function hasData(selector, key) {
    return parseNodes(selector, {
        fragment: true,
        shadow: true,
        document: true,
        window: true,
    }).some((node) => {
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
 * Returns true if any of the nodes has the specified dataset value.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string} [key] The dataset key.
 * @return {Boolean} TRUE if any of the nodes has the dataset value, otherwise FALSE.
 */
export function hasDataset(selector, key) {
    key = camelCase(key);

    return parseNodes(selector)
        .some((node) => !!node.dataset[key]);
};

/**
 * Returns true if any of the nodes contains a descendent matching a filter.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {Boolean} TRUE if any of the nodes contains a descendent matching the filter, otherwise FALSE.
 */
export function hasDescendent(selector, nodeFilter) {
    nodeFilter = parseFilterContains(nodeFilter);

    return parseNodes(selector, {
        fragment: true,
        shadow: true,
        document: true,
    }).some(nodeFilter);
};

/**
 * Returns true if any of the nodes has a DocumentFragment.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {Boolean} TRUE if any of the nodes has a DocumentFragment, otherwise FALSE.
 */
export function hasFragment(selector) {
    return parseNodes(selector)
        .some((node) => node.content);
};

/**
 * Returns true if any of the nodes has a specified property.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string} property The property name.
 * @return {Boolean} TRUE if any of the nodes has the property, otherwise FALSE.
 */
export function hasProperty(selector, property) {
    return parseNodes(selector)
        .some((node) => node.hasOwnProperty(property));
};

/**
 * Returns true if any of the nodes has a ShadowRoot.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {Boolean} TRUE if any of the nodes has a ShadowRoot, otherwise FALSE.
 */
export function hasShadow(selector) {
    return parseNodes(selector)
        .some((node) => node.shadowRoot);
};

/**
 * Returns true if any of the nodes matches a filter.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [nodeFilter] The filter node(s), a query selector string or custom filter function.
 * @return {Boolean} TRUE if any of the nodes matches the filter, otherwise FALSE.
 */
export function is(selector, nodeFilter) {
    nodeFilter = parseFilter(nodeFilter);

    return parseNodes(selector, {
        node: true,
        fragment: true,
        shadow: true,
    }).some(nodeFilter);
};

/**
 * Returns true if any of the nodes is connected to the DOM.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {Boolean} TRUE if any of the nodes is connected to the DOM, otherwise FALSE.
 */
export function isConnected(selector) {
    return parseNodes(selector, {
        node: true,
        fragment: true,
        shadow: true,
    }).some((node) => node.isConnected);
};

/**
 * Returns true if any of the nodes is considered equal to any of the other nodes.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
 * @param {object} options The options for performing the comparison.
 * @param {Boolean} [options.shallow=true] Whether to do a shallow comparison.
 * @return {Boolean} TRUE if any of the nodes is considered equal to any of the other nodes, otherwise FALSE.
 */
export function isEqual(selector, otherSelector, { shallow = false } = {}) {
    let nodes = parseNodes(selector, {
        node: true,
        fragment: true,
        shadow: true,
    });

    let others = parseNodes(otherSelector, {
        node: true,
        fragment: true,
        shadow: true,
    });

    if (shallow) {
        nodes = $.clone(nodes, { deep: false });
        others = $.clone(others, { deep: false });
    }

    return nodes.some((node) =>
        others.some((other) => node.isEqualNode(other)),
    );
};

/**
 * Returns true if any of the nodes or a parent of any of the nodes is "fixed".
 * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {Boolean} TRUE if any of the nodes is "fixed", otherwise FALSE.
 */
export function isFixed(selector) {
    return parseNodes(selector, {
        node: true,
    }).some((node) =>
        (isElement(node) && css(node, 'position') === 'fixed') ||
        closest(
            node,
            (parent) => isElement(parent) && css(parent, 'position') === 'fixed',
        ).length,
    );
};

/**
 * Returns true if any of the nodes is hidden.
 * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {Boolean} TRUE if any of the nodes is hidden, otherwise FALSE.
 */
export function isHidden(selector) {
    return parseNodes(selector, {
        node: true,
        document: true,
        window: true,
    }).some((node) => {
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
 * Returns true if any of the nodes is considered identical to any of the other nodes.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
 * @return {Boolean} TRUE if any of the nodes is considered identical to any of the other nodes, otherwise FALSE.
 */
export function isSame(selector, otherSelector) {
    const others = parseNodes(otherSelector, {
        node: true,
        fragment: true,
        shadow: true,
    });

    return parseNodes(selector, {
        node: true,
        fragment: true,
        shadow: true,
    }).some((node) =>
        others.some((other) => node.isSameNode(other)),
    );
};

/**
 * Returns true if any of the nodes is visible.
 * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {Boolean} TRUE if any of the nodes is visible, otherwise FALSE.
 */
export function isVisible(selector) {
    return parseNodes(selector, {
        node: true,
        document: true,
        window: true,
    }).some((node) => {
        if (isWindow(node)) {
            return node.document.visibilityState === 'visible';
        }

        if (isDocument(node)) {
            return node.visibilityState === 'visible';
        }

        return node.offsetParent;
    });
};
