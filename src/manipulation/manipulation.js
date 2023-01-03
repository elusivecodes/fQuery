import { isElement, isFragment, isNode, isShadow, merge } from '@fr0st/core';
import { createFragment } from './create.js';
import { parseNodes } from './../filters.js';
import { animations as _animations, data as _data, events as _events, queues, styles } from './../vars.js';
import { addEvent } from './../events/event-handlers.js';

/**
 * DOM Manipulation
 */

/**
 * Clone each node.
 * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {object} options The options for cloning the node.
 * @param {Boolean} [options.deep=true] Whether to also clone all descendent nodes.
 * @param {Boolean} [options.events] Whether to also clone events.
 * @param {Boolean} [options.data] Whether to also clone custom data.
 * @param {Boolean} [options.animations] Whether to also clone animations.
 * @return {array} The cloned nodes.
 */
export function clone(selector, { deep = true, events = false, data = false, animations = false } = {}) {
    // ShadowRoot nodes can not be cloned
    const nodes = parseNodes(selector, {
        node: true,
        fragment: true,
    });

    return nodes.map((node) => {
        const clone = node.cloneNode(deep);

        if (events || data || animations) {
            deepClone(node, clone, { deep, events, data, animations });
        }

        return clone;
    });
};

/**
 * Deep clone a single node.
 * @param {Node|HTMLElement|DocumentFragment} node The node.
 * @param {Node|HTMLElement|DocumentFragment} clone The clone.
 * @param {object} options The options for cloning the node.
 * @param {Boolean} [options.deep=true] Whether to also clone all descendent nodes.
 * @param {Boolean} [options.events] Whether to also clone events.
 * @param {Boolean} [options.data] Whether to also clone custom data.
 * @param {Boolean} [options.animations] Whether to also clone animations.
 */
function deepClone(node, clone, { deep = true, events = false, data = false, animations = false } = {}) {
    if (events && _events.has(node)) {
        const nodeEvents = _events.get(node);

        for (const realEvents of Object.values(nodeEvents)) {
            for (const eventData of realEvents) {
                addEvent(
                    clone,
                    eventData.eventName,
                    eventData.callback,
                    {
                        capture: eventData.capture,
                        delegate: eventData.delegate,
                        selfDestruct: eventData.selfDestruct,
                    },
                );
            }
        }
    }

    if (data && _data.has(node)) {
        const nodeData = _data.get(node);
        _data.set(clone, { ...nodeData });
    }

    if (animations && _animations.has(node)) {
        const nodeAnimations = _animations.get(node);

        for (const animation of nodeAnimations) {
            animation.clone(clone);
        }
    }

    if (deep) {
        for (const [i, child] of node.childNodes.entries()) {
            const childClone = clone.childNodes.item(i);
            deepClone(child, childClone, { deep, events, data, animations });
        }
    }
};

/**
 * Detach each node from the DOM.
 * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @return {array} The detached nodes.
 */
export function detach(selector) {
    // DocumentFragment and ShadowRoot nodes can not be detached
    const nodes = parseNodes(selector, {
        node: true,
    });

    for (const node of nodes) {
        node.remove();
    }

    return nodes;
};

/**
 * Remove all children of each node from the DOM.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 */
export function empty(selector) {
    const nodes = parseNodes(selector, {
        fragment: true,
        shadow: true,
        document: true,
    });

    for (const node of nodes) {
        const childNodes = merge([], node.childNodes);

        // Remove descendent elements
        for (const child of childNodes) {
            if (isElement(node) || isFragment(node) || isShadow(node)) {
                removeNode(child);
            }

            child.remove();
        }

        // Remove ShadowRoot
        if (node.shadowRoot) {
            removeNode(node.shadowRoot);
        }

        // Remove DocumentFragment
        if (node.content) {
            removeNode(node.content);
        }
    }
};

/**
 * Remove each node from the DOM.
 * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 */
export function remove(selector) {
    const nodes = parseNodes(selector, {
        node: true,
        fragment: true,
        shadow: true,
    });

    for (const node of nodes) {
        if (isElement(node) || isFragment(node) || isShadow(node)) {
            removeNode(node);
        }

        // DocumentFragment and ShadowRoot nodes can not be removed
        if (isNode(node)) {
            node.remove();
        }
    }
};

/**
 * Remove all data for a single node.
 * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The node.
 */
export function removeNode(node) {
    if (_events.has(node)) {
        const nodeEvents = _events.get(node);

        if ('remove' in nodeEvents) {
            const eventData = new CustomEvent('remove', {
                bubbles: false,
                cancelable: false,
            });

            node.dispatchEvent(eventData);
        }

        for (const [realEventName, realEvents] of Object.entries(nodeEvents)) {
            for (const eventData of realEvents) {
                node.removeEventListener(realEventName, eventData.realCallback, { capture: eventData.capture });
            }
        }

        _events.delete(node);
    }

    if (queues.has(node)) {
        queues.delete(node);
    }

    if (_animations.has(node)) {
        const nodeAnimations = _animations.get(node);
        for (const animation of nodeAnimations) {
            animation.stop();
        }
    }

    if (styles.has(node)) {
        styles.delete(node);
    }

    if (_data.has(node)) {
        _data.delete(node);
    }

    // Remove descendent elements
    const childNodes = merge([], node.children);

    for (const child of childNodes) {
        removeNode(child);
    }

    // Remove ShadowRoot
    if (node.shadowRoot) {
        removeNode(node.shadowRoot);
    }

    // Remove DocumentFragment
    if (node.content) {
        removeNode(node.content);
    }
};

/**
 * Replace each other node with nodes.
 * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector or HTML string.
 * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} otherSelector The input node(s), or a query selector string.
 */
export function replaceAll(selector, otherSelector) {
    replaceWith(otherSelector, selector);
};

/**
 * Replace each node with other nodes.
 * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} otherSelector The input node(s), or a query selector or HTML string.
 */
export function replaceWith(selector, otherSelector) {
    // DocumentFragment and ShadowRoot nodes can not be removed
    let nodes = parseNodes(selector, {
        node: true,
    });

    // ShadowRoot nodes can not be cloned
    let others = parseNodes(otherSelector, {
        node: true,
        fragment: true,
        html: true,
    });

    // Move nodes to a fragment so they don't get removed
    const fragment = createFragment();

    for (const other of others) {
        fragment.insertBefore(other, null);
    }

    others = merge([], fragment.childNodes);

    nodes = nodes.filter((node) =>
        !others.includes(node) &&
        !nodes.some((other) =>
            !other.isSameNode(node) &&
            other.contains(node),
        ),
    );

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

    remove(nodes);
};
