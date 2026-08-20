import { merge } from '@fr0st/core';
import { closest } from './../traversal/traversal.js';

/**
 * DOM Event Wrappers
 */

/**
 * Return a function for matching a delegate target to a custom selector.
 * @param {HTMLElement|ShadowRoot|Document} node The input node.
 * @param {string} selector The delegate query selector.
 * @return {DOM~delegateCallback} The callback for finding the matching delegate.
 */
function getDelegateContainsFactory(node, selector) {
    return (target) => {
        const matches = merge([], node.querySelectorAll(selector));

        if (!matches.length) {
            return false;
        }

        if (matches.includes(target)) {
            return target;
        }

        return closest(
            target,
            (parent) => matches.includes(parent),
            (parent) => parent.isSameNode(node),
        ).shift();
    };
};

/**
 * Return a function for matching a delegate target to a standard selector.
 * @param {HTMLElement|ShadowRoot|Document} node The input node.
 * @param {string} selector The delegate query selector.
 * @return {DOM~delegateCallback} The callback for finding the matching delegate.
 */
function getDelegateMatchFactory(node, selector) {
    return (target) =>
        target.matches && target.matches(selector) ?
            target :
            closest(
                target,
                (parent) => parent.matches(selector),
                (parent) => parent.isSameNode(node),
            ).shift();
};

/**
 * Return a wrapped event callback that executes on a delegate selector.
 * @param {HTMLElement|ShadowRoot|Document} node The input node.
 * @param {string} selector The delegate query selector.
 * @param {function} callback The event callback.
 * @return {DOM~eventCallback} The delegated event callback.
 */
export function delegateFactory(node, selector, callback) {
    const getDelegate = selector.match(/(?:^\s*:scope|,(?=(?:(?:[^"']*["']){2})*[^"']*$)\s*:scope)/) ?
        getDelegateContainsFactory(node, selector) :
        getDelegateMatchFactory(node, selector);

    return (event) => {
        if (node.isSameNode(event.target)) {
            return;
        }

        const delegate = getDelegate(event.target);

        if (!delegate) {
            return;
        }

        Object.defineProperty(event, 'currentTarget', {
            configurable: true,
            enumerable: true,
            value: delegate,
        });
        Object.defineProperty(event, 'delegateTarget', {
            configurable: true,
            enumerable: true,
            value: node,
        });

        return callback(event);
    };
};

/**
 * Return a wrapped event callback that cleans up delegate events.
 * @param {HTMLElement|ShadowRoot|Document} node The input node.
 * @param {function} callback The event callback.
 * @return {DOM~eventCallback} The cleaned event callback.
 */
export function delegateFactoryClean(node, callback) {
    return (event) => {
        if (!event.delegateTarget) {
            return callback(event);
        }

        Object.defineProperty(event, 'currentTarget', {
            configurable: true,
            enumerable: true,
            value: node,
        });
        Object.defineProperty(event, 'delegateTarget', {
            writable: true,
        });

        delete event.delegateTarget;

        return callback(event);
    };
};

/**
 * Return a wrapped event callback that checks for a namespace match.
 * @param {string} eventName The namespaced event name.
 * @param {DOM~eventCallback} callback The callback to execute.
 * @return {DOM~eventCallback} The wrapped event callback.
 */
export function namespaceFactory(eventName, callback) {
    return (event) => {
        if ('namespaceRegExp' in event && !event.namespaceRegExp.test(eventName)) {
            return;
        }

        return callback(event);
    };
};

/**
 * Return a wrapped event callback that checks for a return false for preventing default.
 * @param {DOM~eventCallback} callback The callback to execute.
 * @return {DOM~eventCallback} The wrapped event callback.
 */
export function preventFactory(callback) {
    return (event) => {
        if (callback(event) === false) {
            event.preventDefault();
        }
    };
};

/**
 * Return a wrapped callback that performs cleanup before its first execution.
 * @param {DOM~eventCallback} callback The callback to execute.
 * @param {function} cleanup The cleanup callback.
 * @return {DOM~eventCallback} The wrapped event callback.
 */
export function selfDestructCallbackFactory(callback, cleanup) {
    return (event) => {
        cleanup();
        return callback(event);
    };
};
