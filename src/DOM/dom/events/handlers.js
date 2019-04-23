/**
 * DOM Event Handlers
 */

Object.assign(DOM.prototype, {

    /**
     * @callback DOM~eventCallback
     * @param {Event} event The event object.
     */

    /**
     * Add an event to each element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {string} [delegate] The delegate selector.
     * @param {Boolean} [selfDestruct] Whether to remove the event after triggering.
     */
    addEvent(nodes, events, callback, delegate, selfDestruct) {
        this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))
            .forEach(node => this._addEvent(node, events, callback, delegate, selfDestruct));
    },

    /**
     * Add a delegated event to each element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {string} [delegate] The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventDelegate(nodes, events, delegate, callback) {
        return this.addEvent(nodes, events, callback, delegate);
    },

    /**
     * Add a self-destructing delegated event to each element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {string} [delegate] The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventDelegateOnce(nodes, events, delegate, callback) {
        return this.addEvent(nodes, events, callback, delegate, true);
    },

    /**
     * Add a self-destructing event to each element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventOnce(nodes, events, callback) {
        return this.addEvent(
            nodes,
            events,
            callback,
            null,
            true
        );
    },

    /**
     * Clone all events from each element to other elements.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} others The other node(s), or a query selector string.
     */
    cloneEvents(nodes, others) {
        this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))
            .forEach(node => this._cloneEvents(node, others));
    },

    /**
     * Remove events from each element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} [events] The event names.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {string} [delegate] The delegate selector.
     */
    removeEvent(nodes, events, callback, delegate) {
        this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))
            .forEach(node => this._removeEvent(node, events, callback, delegate));
    },

    /**
     * Remove delegated events from each element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} [events] The event names.
     * @param {string} [delegate] The delegate selector.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     */
    removeEventDelegate(nodes, events, delegate, callback) {
        return this.removeEvent(nodes, events, callback, delegate);
    },

    /**
     * Trigger an event on each element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {object} [data] Additional data to attach to the event.
     */
    triggerEvent(nodes, events, data) {
        this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))
            .forEach(node => this._triggerEvent(node, events, data));
    },

    /**
     * Add an event to a single element.
     * @param {HTMLElement|Document|Window} node The input node.
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

        if (!this.nodeEvents.has(node)) {
            this.nodeEvents.set(node, {});
        }

        const nodeEvents = this.nodeEvents.get(node);

        const eventData = {
            delegate,
            callback,
            realCallback,
            selfDestruct
        };

        DOM._parseEvents(events).forEach(event => {
            const realEvent = DOM._parseEvent(event);
            eventData.event = event;
            eventData.realEvent = realEvent;

            if (!nodeEvents[realEvent]) {
                nodeEvents[realEvent] = [];
            } else if (nodeEvents[realEvent].includes(eventData)) {
                return;
            }

            node.addEventListener(realEvent, realCallback);

            nodeEvents[realEvent].push(eventData);
        });
    },

    /**
     * Clone all events from a single element to other elements.
     * @param {HTMLElement|Document|Window} nodes The input node.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} others The other node(s), or a query selector string.
     */
    _cloneEvents(node, others) {
        if (!this.nodeEvents.has(node)) {
            return;
        }

        const nodeEvents = this.nodeEvents.get(node);
        Object.keys(nodeEvents)
            .forEach(event => {
                const realEvent = DOM._parseEvent(event);
                nodeEvents[realEvent].forEach(eventData => {
                    this.addEvent(
                        others,
                        eventData.event,
                        eventData.callback,
                        eventData.delegate,
                        eventData.selfDestruct
                    );
                });
            });
    },

    /**
     * Remove events from a single element.
     * @param {HTMLElement|Document|Window} nodes The input node.
     * @param {string} [events] The event names.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {string} [delegate] The delegate selector.
     */
    _removeEvent(node, events, callback, delegate) {
        if (!this.nodeEvents.has(node)) {
            return;
        }

        const nodeEvents = this.nodeEvents.get(node);

        const eventArray = events ?
            DOM._parseEvents(events) :
            Object.keys(nodeEvents);

        eventArray.forEach(event => {
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

                node.removeEventListener(eventData.realEvent, eventData.realCallback);

                return false;
            });

            if (!nodeEvents[realEvent].length) {
                delete nodeEvents[realEvent];
            }
        });

        if (!Object.keys(nodeEvents).length) {
            this.nodeEvents.delete(node);
        }
    },

    /**
     * Trigger an event on a single element.
     * @param {HTMLElement|Document|Window} nodes The input node.
     * @param {string} events The event names.
     * @param {object} [data] Additional data to attach to the Event object.
     */
    _triggerEvent(node, events, data) {
        DOM._parseEvents(events)
            .forEach(event => {
                const realEvent = DOM._parseEvent(event);

                const eventData = new Event(realEvent);

                if (data) {
                    Object.assign(eventData, data);
                }

                node.dispatchEvent(eventData);
            });
    }

});
