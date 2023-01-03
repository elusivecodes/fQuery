import { isDocument, isElement, isFragment, isShadow, merge, unique } from '@fr0st/core';
import { getContext } from './../config.js';
import { parseNodes } from './../filters.js';

/**
 * DOM Find
 */

/**
 * Return all nodes matching a selector.
 * @param {string} selector The query selector.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
 * @return {array} The matching nodes.
 */
export function find(selector, context = getContext()) {
    if (!selector) {
        return [];
    }

    // fast selector
    const match = selector.match(/^([\#\.]?)([\w\-]+)$/);

    if (match) {
        if (match[1] === '#') {
            return findById(match[2], context);
        }

        if (match[1] === '.') {
            return findByClass(match[2], context);
        }

        return findByTag(match[2], context);
    }

    if (isDocument(context) || isElement(context) || isFragment(context) || isShadow(context)) {
        return merge([], context.querySelectorAll(selector));
    }

    const nodes = parseNodes(context, {
        fragment: true,
        shadow: true,
        document: true,
    });

    const results = [];

    for (const node of nodes) {
        const newNodes = node.querySelectorAll(selector);

        results.push(...newNodes);
    }

    return nodes.length > 1 && results.length > 1 ?
        unique(results) :
        results;
};

/**
 * Return all nodes with a specific class.
 * @param {string} className The class name.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
 * @return {array} The matching nodes.
 */
export function findByClass(className, context = getContext()) {
    if (isDocument(context) || isElement(context)) {
        return merge([], context.getElementsByClassName(className));
    }

    if (isFragment(context) || isShadow(context)) {
        return merge([], context.querySelectorAll(`.${className}`));
    }

    const nodes = parseNodes(context, {
        fragment: true,
        shadow: true,
        document: true,
    });

    const results = [];

    for (const node of nodes) {
        const newNodes = isFragment(node) || isShadow(node) ?
            node.querySelectorAll(`.${className}`) :
            node.getElementsByClassName(className);

        results.push(...newNodes);
    }

    return nodes.length > 1 && results.length > 1 ?
        unique(results) :
        results;
};

/**
 * Return all nodes with a specific ID.
 * @param {string} id The id.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
 * @return {array} The matching nodes.
 */
export function findById(id, context = getContext()) {
    if (isDocument(context) || isElement(context) || isFragment(context) || isShadow(context)) {
        return merge([], context.querySelectorAll(`#${id}`));
    }

    const nodes = parseNodes(context, {
        fragment: true,
        shadow: true,
        document: true,
    });

    const results = [];

    for (const node of nodes) {
        const newNodes = node.querySelectorAll(`#${id}`);

        results.push(...newNodes);
    }

    return nodes.length > 1 && results.length > 1 ?
        unique(results) :
        results;
};

/**
 * Return all nodes with a specific tag.
 * @param {string} tagName The tag name.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
 * @return {array} The matching nodes.
 */
export function findByTag(tagName, context = getContext()) {
    if (isDocument(context) || isElement(context)) {
        return merge([], context.getElementsByTagName(tagName));
    }

    if (isFragment(context) || isShadow(context)) {
        return merge([], context.querySelectorAll(tagName));
    }

    const nodes = parseNodes(context, {
        fragment: true,
        shadow: true,
        document: true,
    });

    const results = [];

    for (const node of nodes) {
        const newNodes = isFragment(node) || isShadow(node) ?
            node.querySelectorAll(tagName) :
            node.getElementsByTagName(tagName);

        results.push(...newNodes);
    }

    return nodes.length > 1 && results.length > 1 ?
        unique(results) :
        results;
};

/**
 * Return a single node matching a selector.
 * @param {string} selector The query selector.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
 * @return {HTMLElement} The matching node.
 */
export function findOne(selector, context = getContext()) {
    if (!selector) {
        return null;
    }

    // fast selector
    const match = selector.match(/^([\#\.]?)([\w\-]+)$/);

    if (match) {
        if (match[1] === '#') {
            return findOneById(match[2], context);
        }

        if (match[1] === '.') {
            return findOneByClass(match[2], context);
        }

        return findOneByTag(match[2], context);
    }

    if (isDocument(context) || isElement(context) || isFragment(context) || isShadow(context)) {
        return context.querySelector(selector);
    }

    const nodes = parseNodes(context, {
        fragment: true,
        shadow: true,
        document: true,
    });

    if (!nodes.length) {
        return;
    }

    for (const node of nodes) {
        const result = node.querySelector(selector);

        if (result) {
            return result;
        }
    }

    return null;
};

/**
 * Return a single node with a specific class.
 * @param {string} className The class name.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
 * @return {HTMLElement} The matching node.
 */
export function findOneByClass(className, context = getContext()) {
    if (isDocument(context) || isElement(context)) {
        return context.getElementsByClassName(className).item(0);
    }

    if (isFragment(context) || isShadow(context)) {
        return context.querySelector(`.${className}`);
    }

    const nodes = parseNodes(context, {
        fragment: true,
        shadow: true,
        document: true,
    });

    if (!nodes.length) {
        return;
    }

    for (const node of nodes) {
        const result = isFragment(node) || isShadow(node) ?
            node.querySelector(`.${className}`) :
            node.getElementsByClassName(className).item(0);

        if (result) {
            return result;
        }
    }

    return null;
};

/**
 * Return a single node with a specific ID.
 * @param {string} id The id.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
 * @return {HTMLElement} The matching element.
 */
export function findOneById(id, context = getContext()) {
    if (isDocument(context)) {
        return context.getElementById(id);
    }

    if (isElement(context) || isFragment(context) || isShadow(context)) {
        return context.querySelector(`#${id}`);
    }

    const nodes = parseNodes(context, {
        fragment: true,
        shadow: true,
        document: true,
    });

    if (!nodes.length) {
        return;
    }

    for (const node of nodes) {
        const result = isDocument(node) ?
            node.getElementById(id) :
            node.querySelector(`#${id}`);

        if (result) {
            return result;
        }
    }

    return null;
};

/**
 * Return a single node with a specific tag.
 * @param {string} tagName The tag name.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [context=getContext()] The input node(s), or a query selector string.
 * @return {HTMLElement} The matching node.
 */
export function findOneByTag(tagName, context = getContext()) {
    if (isDocument(context) || isElement(context)) {
        return context.getElementsByTagName(tagName).item(0);
    }

    if (isFragment(context) || isShadow(context)) {
        return context.querySelector(tagName);
    }

    const nodes = parseNodes(context, {
        fragment: true,
        shadow: true,
        document: true,
    });

    if (!nodes.length) {
        return;
    }

    for (const node of nodes) {
        const result = isFragment(node) || isShadow(node) ?
            node.querySelector(tagName) :
            node.getElementsByTagName(tagName).item(0);

        if (result) {
            return result;
        }
    }

    return null;
};
