/**
 * DOM Event Handlers
 */

Object.assign(DOM.prototype, {

    /**
     * Add events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {string} [delegate] The delegate selector.
     * @param {Boolean} [selfDestruct] Whether to remove the event after triggering.
     */
    addEvent(nodes, events, callback, delegate, selfDestruct) {
        nodes = this.parseNodes(nodes, { shadow: true, document: true, window: true });

        for (const node of nodes) {
            for (const event of DOM._parseEvents(events)) {
                DOM._addEvent(node, event, callback, delegate, selfDestruct);
            }
        }
    },

    /**
     * Add delegated events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventDelegate(nodes, events, delegate, callback) {
        this.addEvent(nodes, events, callback, delegate);
    },

    /**
     * Add self-destructing delegated events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventDelegateOnce(nodes, events, delegate, callback) {
        this.addEvent(nodes, events, callback, delegate, true);
    },

    /**
     * Add self-destructing events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventOnce(nodes, events, callback) {
        this.addEvent(nodes, events, callback, null, true);
    },

    /**
     * Clone all events from each node to other nodes.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     */
    cloneEvents(nodes, others) {
        nodes = this.parseNodes(nodes, { shadow: true, document: true, window: true });
        others = this.parseNodes(others, { shadow: true, document: true, window: true });

        for (const node of nodes) {
            for (const other of others) {
                DOM._cloneEvents(node, other);
            }
        }
    },

    /**
     * Remove events from each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [events] The event names.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {string} [delegate] The delegate selector.
     */
    removeEvent(nodes, events, callback, delegate) {
        nodes = this.parseNodes(nodes, { shadow: true, document: true, window: true });

        events = events ?
            DOM._parseEvents(events) :
            false;

        for (const node of nodes) {
            if (!DOM._events.has(node)) {
                continue;
            }

            if (!events) {
                DOM._removeEvent(node, events, callback, delegate);
                continue;
            }

            for (const event of events) {
                DOM._removeEvent(node, event, callback, delegate);
            }
        }
    },

    /**
     * Remove delegated events from each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [events] The event names.
     * @param {string} [delegate] The delegate selector.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     */
    removeEventDelegate(nodes, events, delegate, callback) {
        this.removeEvent(nodes, events, callback, delegate);
    },

    /**
     * Trigger events on each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {object} [data] Additional data to attach to the event.
     * @param {object} [options] The options to use for the Event.
     * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
     * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
     */
    triggerEvent(nodes, events, data, options) {
        nodes = this.parseNodes(nodes, { shadow: true, document: true, window: true });

        events = DOM._parseEvents(events);

        for (const node of nodes) {
            for (const event of events) {
                DOM._triggerEvent(node, event, data, options);
            }
        }
    }

});
