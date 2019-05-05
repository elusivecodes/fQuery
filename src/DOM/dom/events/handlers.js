/**
 * DOM Event Handlers
 */

Object.assign(DOM.prototype, {

    /**
     * Add events to each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEvent(nodes, events, callback) {
        nodes = this._nodeFilter(nodes, { fragment: true, shadow: true, document: true, window: true });

        for (const node of nodes) {
            this._addEvent(node, events, callback);
        }
    },

    /**
     * Add delegated events to each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventDelegate(nodes, events, delegate, callback) {
        nodes = this._nodeFilter(nodes, { fragment: true, shadow: true, document: true, window: true });

        for (const node of nodes) {
            this._addEvent(node, events, callback, delegate);
        }
    },

    /**
     * Add self-destructing delegated events to each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventDelegateOnce(nodes, events, delegate, callback) {
        nodes = this._nodeFilter(nodes, { fragment: true, shadow: true, document: true, window: true });

        for (const node of nodes) {
            this._addEvent(node, events, callback, delegate, true);
        }
    },

    /**
     * Add self-destructing events to each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventOnce(nodes, events, callback) {
        nodes = this._nodeFilter(nodes, { fragment: true, shadow: true, document: true, window: true });

        for (const node of nodes) {
            this._addEvent(node, events, callback, null, true);
        }
    },

    /**
     * Clone all events from each node to other nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|HTMLCollection} others The other node(s), or a query selector string.
     */
    cloneEvents(nodes, others) {
        nodes = this._nodeFilter(nodes, { fragment: true, shadow: true, document: true, window: true });

        for (const node of nodes) {
            this._cloneEvents(node, others);
        }
    },

    /**
     * Remove events from each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} [events] The event names.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     */
    removeEvent(nodes, events, callback) {
        nodes = this._nodeFilter(nodes, { fragment: true, shadow: true, document: true, window: true });

        for (const node of nodes) {
            this._removeEvent(node, events, callback);
        }
    },

    /**
     * Remove delegated events from each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} [events] The event names.
     * @param {string} [delegate] The delegate selector.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     */
    removeEventDelegate(nodes, events, delegate, callback) {
        nodes = this._nodeFilter(nodes, { fragment: true, shadow: true, document: true, window: true });

        for (const node of nodes) {
            this._removeEvent(node, events, callback, delegate);
        }
    },

    /**
     * Add events to a single node.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {string} [delegate] The delegate selector.
     * @param {Boolean} [selfDestruct] Whether to remove the event after triggering.
     */
    _addEvent(node, events, callback, delegate, selfDestruct) {
        let realCallback = callback;

        if (selfDestruct) {
            realCallback = this._selfDestructFactory(node, events, delegate, realCallback);
        }

        if (delegate) {
            realCallback = this._delegateFactory(node, delegate, realCallback);
        }

        if (!this._events.has(node)) {
            this._events.set(node, {});
        }

        const nodeEvents = this._events.get(node),
            eventData = {
                delegate,
                callback,
                realCallback,
                selfDestruct
            };

        for (const event of DOM._parseEvents(events)) {
            const realEvent = DOM._parseEvent(event);

            eventData.event = event;
            eventData.realEvent = realEvent;

            if (!nodeEvents[realEvent]) {
                nodeEvents[realEvent] = [];
            } else if (nodeEvents[realEvent].includes(eventData)) {
                return;
            }

            DOM._addEvent(node, realEvent, realCallback);

            nodeEvents[realEvent].push(eventData);
        }
    },

    /**
     * Clone all events from a single node to other nodes.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} nodes The input node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|HTMLCollection} others The other node(s), or a query selector string.
     */
    _cloneEvents(node, others) {
        if (!this._events.has(node)) {
            return;
        }

        const nodeEvents = this._events.get(node);
        for (const event in nodeEvents) {
            for (const eventData of nodeEvents[event]) {
                this.addEvent(
                    others,
                    eventData.event,
                    eventData.callback,
                    eventData.delegate,
                    eventData.selfDestruct
                );
            }
        }
    },

    /**
     * Remove events from a single node.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} nodes The input node.
     * @param {string} [events] The event names.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {string} [delegate] The delegate selector.
     */
    _removeEvent(node, events, callback, delegate) {
        if (!this._events.has(node)) {
            return;
        }

        const nodeEvents = this._events.get(node),
            eventArray = events ?
                DOM._parseEvents(events) :
                Object.keys(nodeEvents);

        for (const event of eventArray) {
            const realEvent = DOM._parseEvent(event);

            if (!nodeEvents[realEvent]) {
                return;
            }

            nodeEvents[realEvent] = nodeEvents[realEvent].filter(eventData => {
                if (
                    (
                        realEvent === event &&
                        realEvent !== eventData.realEvent
                    ) ||
                    (
                        realEvent !== event &&
                        event !== eventData.event
                    ) ||
                    (
                        delegate &&
                        (
                            delegate !== eventData.delegate ||
                            (
                                callback &&
                                callback !== eventData.callback
                            )
                        )
                    ) ||
                    (
                        !delegate &&
                        callback &&
                        callback !== eventData.realCallback
                    )
                ) {
                    return true;
                }

                DOM._removeEvent(node, eventData.realEvent, eventData.realCallback);

                return false;
            });

            if (!nodeEvents[realEvent].length) {
                delete nodeEvents[realEvent];
            }
        }

        if (Object.keys(nodeEvents).length) {
            return;
        }

        this._events.delete(node);
    }

});
