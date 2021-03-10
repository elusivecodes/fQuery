/**
 * DOM Event Handlers
 */

Object.assign(DOM.prototype, {

    /**
     * Add events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {Boolean} [useCapture] Whether to use a capture event.
     * @param {string} [delegate] The delegate selector.
     * @param {Boolean} [selfDestruct] Whether to remove the event after triggering.
     */
    addEvent(nodes, events, callback, useCapture = false, delegate, selfDestruct) {
        nodes = this.parseNodes(nodes, {
            shadow: true,
            document: true,
            window: !delegate
        });

        for (const node of nodes) {
            for (const event of this.constructor._parseEvents(events)) {
                this.constructor._addEvent(node, event, callback, useCapture, delegate, selfDestruct);
            }
        }
    },

    /**
     * Add delegated events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {Boolean} [useCapture] Whether to use a capture event.
     */
    addEventDelegate(nodes, events, delegate, callback, useCapture = false) {
        this.addEvent(nodes, events, callback, useCapture, delegate);
    },

    /**
     * Add self-destructing delegated events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {Boolean} [useCapture] Whether to use a capture event.
     */
    addEventDelegateOnce(nodes, events, delegate, callback, useCapture = false) {
        this.addEvent(nodes, events, callback, useCapture, delegate, true);
    },

    /**
     * Add self-destructing events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {Boolean} [useCapture] Whether to use a capture event.
     */
    addEventOnce(nodes, events, callback, useCapture = false) {
        this.addEvent(nodes, events, callback, useCapture, null, true);
    },

    /**
     * Clone all events from each node to other nodes.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     */
    cloneEvents(nodes, others) {
        nodes = this.parseNodes(nodes, {
            shadow: true,
            document: true,
            window: true
        });

        others = this.parseNodes(others, {
            shadow: true,
            document: true,
            window: true
        });

        for (const node of nodes) {
            for (const other of others) {
                this.constructor._cloneEvents(node, other);
            }
        }
    },

    /**
     * Remove events from each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [events] The event names.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {Boolean} [useCapture] Whether to use a capture event.
     * @param {string} [delegate] The delegate selector.
     */
    removeEvent(nodes, events, callback, useCapture = null, delegate) {
        nodes = this.parseNodes(nodes, {
            shadow: true,
            document: true,
            window: !delegate
        });

        events = events ?
            this.constructor._parseEvents(events) :
            false;

        for (const node of nodes) {
            if (!this.constructor._events.has(node)) {
                continue;
            }

            if (!events) {
                this.constructor._removeEvent(node, events, callback, useCapture, delegate);
                continue;
            }

            for (const event of events) {
                this.constructor._removeEvent(node, event, callback, useCapture, delegate);
            }
        }
    },

    /**
     * Remove delegated events from each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [events] The event names.
     * @param {string} [delegate] The delegate selector.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {Boolean} [useCapture] Whether to use a capture event.
     */
    removeEventDelegate(nodes, events, delegate, callback, useCapture = null) {
        this.removeEvent(nodes, events, callback, useCapture, delegate);
    },

    /**
     * Trigger events on each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {object} [options] The options to use for the Event.
     * @param {*} [options.detail] Additional data to attach to the event.
     * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
     * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
     */
    triggerEvent(nodes, events, options) {
        nodes = this.parseNodes(nodes, {
            shadow: true,
            document: true,
            window: true
        });

        events = this.constructor._parseEvents(events);

        for (const node of nodes) {
            for (const event of events) {
                this.constructor._triggerEvent(node, event, options);
            }
        }
    },

    /**
     * Trigger an event for the first node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} event The event name.
     * @param {object} [options] The options to use for the Event.
     * @param {*} [options.detail] Additional data to attach to the event.
     * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
     * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
     */
    triggerOne(nodes, event, options) {
        const node = this.parseNode(nodes, {
            shadow: true,
            document: true,
            window: true
        });

        return this.constructor._triggerEvent(node, event, options);
    }

});
