import { delegateFactory, delegateFactoryClean, namespaceFactory, preventFactory, selfDestructFactory } from './event-factory.js';
import { parseNode, parseNodes } from './../filters.js';
import { eventNamespacedRegExp, parseEvent, parseEvents } from './../helpers.js';
import { events } from './../vars.js';

/**
 * DOM Event Handlers
 */

/**
 * Add events to each node.
 * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string} eventNames The event names.
 * @param {DOM~eventCallback} callback The callback to execute.
 * @param {object} [options] The options for the event.
 * @param {Boolean} [options.capture] Whether to use a capture event.
 * @param {string} [options.delegate] The delegate selector.
 * @param {Boolean} [options.passive] Whether to use a passive event.
 * @param {Boolean} [options.selfDestruct] Whether to use a self-destructing event.
 */
export function addEvent(selector, eventNames, callback, { capture = false, delegate = null, passive = false, selfDestruct = false } = {}) {
    const nodes = parseNodes(selector, {
        shadow: true,
        document: true,
        window: true,
    });

    eventNames = parseEvents(eventNames);

    for (const eventName of eventNames) {
        const realEventName = parseEvent(eventName);

        const eventData = {
            callback,
            delegate,
            selfDestruct,
            capture,
            passive,
        };

        for (const node of nodes) {
            if (!events.has(node)) {
                events.set(node, {});
            }

            const nodeEvents = events.get(node);

            let realCallback = callback;

            if (selfDestruct) {
                realCallback = selfDestructFactory(node, eventName, realCallback, { capture, delegate });
            }

            realCallback = preventFactory(realCallback);

            if (delegate) {
                realCallback = delegateFactory(node, delegate, realCallback);
            } else {
                realCallback = delegateFactoryClean(node, realCallback);
            }

            realCallback = namespaceFactory(eventName, realCallback);

            eventData.realCallback = realCallback;
            eventData.eventName = eventName;
            eventData.realEventName = realEventName;

            if (!nodeEvents[realEventName]) {
                nodeEvents[realEventName] = [];
            }

            nodeEvents[realEventName].push({ ...eventData });

            node.addEventListener(realEventName, realCallback, { capture, passive });
        }
    }
};

/**
 * Add delegated events to each node.
 * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string} events The event names.
 * @param {string} delegate The delegate selector.
 * @param {DOM~eventCallback} callback The callback to execute.
 * @param {object} [options] The options for the event.
 * @param {Boolean} [options.capture] Whether to use a capture event.
 * @param {Boolean} [options.passive] Whether to use a passive event.
 */
export function addEventDelegate(selector, events, delegate, callback, { capture = false, passive = false } = {}) {
    addEvent(selector, events, callback, { capture, delegate, passive });
};

/**
 * Add self-destructing delegated events to each node.
 * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string} events The event names.
 * @param {string} delegate The delegate selector.
 * @param {DOM~eventCallback} callback The callback to execute.
 * @param {object} [options] The options for the event.
 * @param {Boolean} [options.capture] Whether to use a capture event.
 * @param {Boolean} [options.passive] Whether to use a passive event.
 */
export function addEventDelegateOnce(selector, events, delegate, callback, { capture = false, passive = false } = {}) {
    addEvent(selector, events, callback, { capture, delegate, passive, selfDestruct: true });
};

/**
 * Add self-destructing events to each node.
 * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string} events The event names.
 * @param {DOM~eventCallback} callback The callback to execute.
 * @param {object} [options] The options for the event.
 * @param {Boolean} [options.capture] Whether to use a capture event.
 * @param {Boolean} [options.passive] Whether to use a passive event.
 */
export function addEventOnce(selector, events, callback, { capture = false, passive = false } = {}) {
    addEvent(selector, events, callback, { capture, passive, selfDestruct: true });
};

/**
 * Clone all events from each node to other nodes.
 * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
 */
export function cloneEvents(selector, otherSelector) {
    const nodes = parseNodes(selector, {
        shadow: true,
        document: true,
        window: true,
    });

    for (const node of nodes) {
        const nodeEvents = events.get(node);

        for (const realEvents of Object.values(nodeEvents)) {
            for (const eventData of realEvents) {
                addEvent(
                    otherSelector,
                    eventData.eventName,
                    eventData.callback,
                    {
                        capture: eventData.capture,
                        delegate: eventData.delegate,
                        passive: eventData.passive,
                        selfDestruct: eventData.selfDestruct,
                    },
                );
            }
        }
    }
};

/**
 * Remove events from each node.
 * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string} [eventNames] The event names.
 * @param {DOM~eventCallback} [callback] The callback to remove.
 * @param {object} [options] The options for the event.
 * @param {Boolean} [options.capture] Whether to use a capture event.
 * @param {string} [options.delegate] The delegate selector.
 */
export function removeEvent(selector, eventNames, callback, { capture = null, delegate = null } = {}) {
    const nodes = parseNodes(selector, {
        shadow: true,
        document: true,
        window: true,
    });

    let eventLookup;
    if (eventNames) {
        eventNames = parseEvents(eventNames);

        eventLookup = {};

        for (const eventName of eventNames) {
            const realEventName = parseEvent(eventName);

            if (!(realEventName in eventLookup)) {
                eventLookup[realEventName] = [];
            }

            eventLookup[realEventName].push(eventName);
        }
    }

    for (const node of nodes) {
        if (!events.has(node)) {
            continue;
        }

        const nodeEvents = events.get(node);

        for (const [realEventName, realEvents] of Object.entries(nodeEvents)) {
            if (eventLookup && !(realEventName in eventLookup)) {
                continue;
            }

            const otherEvents = realEvents.filter((eventData) => {
                if (eventLookup && !eventLookup[realEventName].some((eventName) => {
                    if (eventName === realEventName) {
                        return true;
                    }

                    const regExp = eventNamespacedRegExp(eventName);

                    return eventData.eventName.match(regExp);
                })) {
                    return true;
                }

                if (callback && callback !== eventData.callback) {
                    return true;
                }

                if (delegate && delegate !== eventData.delegate) {
                    return true;
                }

                if (capture !== null && capture !== eventData.capture) {
                    return true;
                }

                node.removeEventListener(realEventName, eventData.realCallback, eventData.capture);

                return false;
            });

            if (!otherEvents.length) {
                delete nodeEvents[realEventName];
            }
        }

        if (!Object.keys(nodeEvents).length) {
            events.delete(node);
        }
    }
};

/**
 * Remove delegated events from each node.
 * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string} [events] The event names.
 * @param {string} [delegate] The delegate selector.
 * @param {DOM~eventCallback} [callback] The callback to remove.
 * @param {object} [options] The options for the event.
 * @param {Boolean} [options.capture] Whether to use a capture event.
 */
export function removeEventDelegate(selector, events, delegate, callback, { capture = null } = {}) {
    removeEvent(selector, events, callback, { capture, delegate });
};

/**
 * Trigger events on each node.
 * @param {string|array|HTMLElement|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string} events The event names.
 * @param {object} [options] The options to use for the Event.
 * @param {object} [options.data] Additional data to attach to the event.
 * @param {*} [options.detail] Additional details to attach to the event.
 * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
 * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
 */
export function triggerEvent(selector, events, { data = null, detail = null, bubbles = true, cancelable = true } = {}) {
    const nodes = parseNodes(selector, {
        shadow: true,
        document: true,
        window: true,
    });

    events = parseEvents(events);

    for (const event of events) {
        const realEvent = parseEvent(event);

        const eventData = new CustomEvent(realEvent, {
            detail,
            bubbles,
            cancelable,
        });

        if (data) {
            Object.assign(eventData, data);
        }

        if (realEvent !== event) {
            eventData.namespace = event.substring(realEvent.length + 1);
            eventData.namespaceRegExp = eventNamespacedRegExp(event);
        }

        for (const node of nodes) {
            node.dispatchEvent(eventData);
        }
    }
};

/**
 * Trigger an event for the first node.
 * @param {string|array|HTMLElement|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string} event The event name.
 * @param {object} [options] The options to use for the Event.
 * @param {object} [options.data] Additional data to attach to the event.
 * @param {*} [options.detail] Additional details to attach to the event.
 * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
 * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
 * @return {Boolean} FALSE if the event was cancelled, otherwise TRUE.
 */
export function triggerOne(selector, event, { data = null, detail = null, bubbles = true, cancelable = true } = {}) {
    const node = parseNode(selector, {
        shadow: true,
        document: true,
        window: true,
    });

    const realEvent = parseEvent(event);

    const eventData = new CustomEvent(realEvent, {
        detail,
        bubbles,
        cancelable,
    });

    if (data) {
        Object.assign(eventData, data);
    }

    if (realEvent !== event) {
        eventData.namespace = event.substring(realEvent.length + 1);
        eventData.namespaceRegExp = eventNamespacedRegExp(event);
    }

    return node.dispatchEvent(eventData);
};
