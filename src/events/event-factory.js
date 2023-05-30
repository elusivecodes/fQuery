import { merge } from '@fr0st/core';
import { addEvent, removeEvent } from './event-handlers.js';
import { debounce as _debounce } from './../helpers.js';
import { closest } from './../traversal/traversal.js';
import { eventLookup } from './../vars.js';

/**
 * DOM Event Factory
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
    const getDelegate = selector.match(/(?:^\s*\:scope|\,(?=(?:(?:[^"']*["']){2})*[^"']*$)\s*\:scope)/) ?
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
            value: delegate,
            configurable: true,
        });
        Object.defineProperty(event, 'delegateTarget', {
            value: node,
            configurable: true,
        });

        return callback(event);
    };
};

/**
 * Return a wrapped mouse drag event (optionally debounced).
 * @param {DOM~eventCallback} down The callback to execute on mousedown.
 * @param {DOM~eventCallback} move The callback to execute on mousemove.
 * @param {DOM~eventCallback} up The callback to execute on mouseup.
 * @param {object} [options] The options for the mouse drag event.
 * @param {Boolean} [options.debounce=true] Whether to debounce the move event.
 * @param {Boolean} [options.passive=true] Whether to use passive event listeners.
 * @param {Boolean} [options.preventDefault=true] Whether to prevent the default event.
 * @param {number} [options.touches=1] The number of touches to trigger the event for.
 * @return {DOM~eventCallback} The mouse drag event callback.
 */
export function mouseDragFactory(down, move, up, { debounce = true, passive = true, preventDefault = true, touches = 1 } = {}) {
    if (move && debounce) {
        move = _debounce(move);

        // needed to make sure up callback executes after final move callback
        if (up) {
            up = _debounce(up);
        }
    }

    return (event) => {
        const isTouch = event.type === 'touchstart';

        if (isTouch && event.touches.length !== touches) {
            return;
        }

        if (down && down(event) === false) {
            return;
        }

        if (preventDefault) {
            event.preventDefault();
        }

        if (!move && !up) {
            return;
        }

        const [moveEvent, upEvent] = event.type in eventLookup ?
            eventLookup[event.type] :
            eventLookup.mousedown;

        const realMove = (event) => {
            if (isTouch && event.touches.length !== touches) {
                return;
            }

            if (preventDefault && !passive) {
                event.preventDefault();
            }

            if (!move) {
                return;
            }

            move(event);
        };

        const realUp = (event) => {
            if (isTouch && event.touches.length !== touches - 1) {
                return;
            }

            if (up && up(event) === false) {
                return;
            }

            if (preventDefault) {
                event.preventDefault();
            }

            removeEvent(window, moveEvent, realMove);
            removeEvent(window, upEvent, realUp);
        };

        addEvent(window, moveEvent, realMove, { passive });
        addEvent(window, upEvent, realUp);
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
 * Return a wrapped event callback that removes itself after execution.
 * @param {HTMLElement|ShadowRoot|Document|Window} node The input node.
 * @param {string} eventName The event name.
 * @param {DOM~eventCallback} callback The callback to execute.
 * @param {object} [options] The options for the event.
 * @param {Boolean} [options.capture] Whether to use a capture event.
 * @param {string} [optoins.delegate] The delegate selector.
 * @return {DOM~eventCallback} The wrapped event callback.
 */
export function selfDestructFactory(node, eventName, callback, { capture = null, delegate = null } = {}) {
    return (event) => {
        removeEvent(node, eventName, callback, { capture, delegate });
        return callback(event);
    };
};
