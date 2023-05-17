import { addEvent as _addEvent, addEventDelegate as _addEventDelegate, addEventDelegateOnce as _addEventDelegateOnce, addEventOnce as _addEventOnce, cloneEvents as _cloneEvents, removeEvent as _removeEvent, removeEventDelegate as _removeEventDelegate, triggerEvent as _triggerEvent, triggerOne as _triggerOne } from './../../events/event-handlers.js';

/**
 * QuerySet Event Handlers
 */

/**
 * Add an event to each node.
 * @param {string} events The event names.
 * @param {DOM~eventCallback} callback The callback to execute.
 * @param {Boolean} [capture] Whether to use a capture event.
 * @return {QuerySet} The QuerySet object.
 */
export function addEvent(events, callback, { capture = false } = {}) {
    _addEvent(this, events, callback, { capture });

    return this;
};

/**
 * Add a delegated event to each node.
 * @param {string} events The event names.
 * @param {string} delegate The delegate selector.
 * @param {DOM~eventCallback} callback The callback to execute.
 * @param {Boolean} [capture] Whether to use a capture event.
 * @return {QuerySet} The QuerySet object.
 */
export function addEventDelegate(events, delegate, callback, { capture = false } = {}) {
    _addEventDelegate(this, events, delegate, callback, { capture });

    return this;
};

/**
 * Add a self-destructing delegated event to each node.
 * @param {string} events The event names.
 * @param {string} delegate The delegate selector.
 * @param {DOM~eventCallback} callback The callback to execute.
 * @param {Boolean} [capture] Whether to use a capture event.
 * @return {QuerySet} The QuerySet object.
 */
export function addEventDelegateOnce(events, delegate, callback, { capture = false } = {}) {
    _addEventDelegateOnce(this, events, delegate, callback, { capture });

    return this;
};

/**
 * Add a self-destructing event to each node.
 * @param {string} events The event names.
 * @param {DOM~eventCallback} callback The callback to execute.
 * @param {Boolean} [capture] Whether to use a capture event.
 * @return {QuerySet} The QuerySet object.
 */
export function addEventOnce(events, callback, { capture = false } = {}) {
    _addEventOnce(this, events, callback, { capture });

    return this;
};

/**
 * Clone all events from each node to other nodes.
 * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
 * @return {QuerySet} The QuerySet object.
 */
export function cloneEvents(otherSelector) {
    _cloneEvents(this, otherSelector);

    return this;
};

/**
 * Remove events from each node.
 * @param {string} [events] The event names.
 * @param {DOM~eventCallback} [callback] The callback to remove.
 * @param {Boolean} [capture] Whether to use a capture event.
 * @return {QuerySet} The QuerySet object.
 */
export function removeEvent(events, callback, { capture = false } = {}) {
    _removeEvent(this, events, callback, { capture });

    return this;
};

/**
 * Remove delegated events from each node.
 * @param {string} [events] The event names.
 * @param {string} [delegate] The delegate selector.
 * @param {DOM~eventCallback} [callback] The callback to remove.
 * @param {Boolean} [capture] Whether to use a capture event.
 * @return {QuerySet} The QuerySet object.
 */
export function removeEventDelegate(events, delegate, callback, { capture = false } = {}) {
    _removeEventDelegate(this, events, delegate, callback, { capture });

    return this;
};

/**
 * Trigger events on each node.
 * @param {string} events The event names.
 * @param {object} [options] The options to use for the Event.
 * @param {object} [options.data] Additional data to attach to the event.
 * @param {*} [options.detail] Additional details to attach to the event.
 * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
 * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
 * @return {QuerySet} The QuerySet object.
 */
export function triggerEvent(events, { data = null, detail = null, bubbles = true, cancelable = true } = {}) {
    _triggerEvent(this, events, { data, detail, bubbles, cancelable });

    return this;
};

/**
 * Trigger an event for the first node.
 * @param {string} event The event name.
 * @param {object} [options] The options to use for the Event.
 * @param {object} [options.data] Additional data to attach to the event.
 * @param {*} [options.detail] Additional details to attach to the event.
 * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
 * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
 * @return {Boolean} FALSE if the event was cancelled, otherwise TRUE.
 */
export function triggerOne(event, { data = null, detail = null, bubbles = true, cancelable = true } = {}) {
    return _triggerOne(this, event, { data, detail, bubbles, cancelable });
};
