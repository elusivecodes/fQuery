/**
 * DOM Event Handlers
 */

Object.assign(DOM.prototype, {

    /**
     * Add events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEvent(nodes, events, callback) {
        nodes = this.parseNodes(nodes, { shadow: true, document: true, window: true });

        for (const node of nodes) {
            DOM._addEvent(node, events, callback);
        }
    },

    /**
     * Add delegated events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventDelegate(nodes, events, delegate, callback) {
        nodes = this.parseNodes(nodes, { shadow: true, document: true, window: true });

        for (const node of nodes) {
            DOM._addEvent(node, events, callback, delegate);
        }
    },

    /**
     * Add self-destructing delegated events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventDelegateOnce(nodes, events, delegate, callback) {
        nodes = this.parseNodes(nodes, { shadow: true, document: true, window: true });

        for (const node of nodes) {
            DOM._addEvent(node, events, callback, delegate, true);
        }
    },

    /**
     * Add self-destructing events to each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventOnce(nodes, events, callback) {
        nodes = this.parseNodes(nodes, { shadow: true, document: true, window: true });

        for (const node of nodes) {
            DOM._addEvent(node, events, callback, null, true);
        }
    },

    /**
     * Clone all events from each node to other nodes.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection} others The other node(s), or a query selector string.
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
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} [events] The event names.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     */
    removeEvent(nodes, events, callback) {
        nodes = this.parseNodes(nodes, { shadow: true, document: true, window: true });

        for (const node of nodes) {
            DOM._removeEvent(node, events, callback);
        }
    },

    /**
     * Remove delegated events from each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} [events] The event names.
     * @param {string} [delegate] The delegate selector.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     */
    removeEventDelegate(nodes, events, delegate, callback) {
        nodes = this.parseNodes(nodes, { shadow: true, document: true, window: true });

        for (const node of nodes) {
            DOM._removeEvent(node, events, callback, delegate);
        }
    },

    /**
     * Trigger events on each node.
     * @param {string|array|HTMLElement|ShadowRoot|Document|Window|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {object} [data] Additional data to attach to the event.
     */
    triggerEvent(nodes, events, data) {
        nodes = this.parseNodes(nodes, { shadow: true, document: true, window: true });

        events = DOM._parseEvents(events)
            .map(event => DOM._parseEvent(event));

        for (const node of nodes) {
            for (const event of events) {
                DOMNode.triggerEvent(node, event, data);
            }
        }
    }

});
