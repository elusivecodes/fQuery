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
     */
    addEvent(nodes, events, callback) {
        for (const node of this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))) {
            this._addEvent(node, events, callback);
        }
    },

    /**
     * Add a delegated event to each element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventDelegate(nodes, events, delegate, callback) {
        for (const node of this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))) {
            this._addEvent(node, events, callback, delegate);
        }
    },

    /**
     * Add a self-destructing delegated event to each element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventDelegateOnce(nodes, events, delegate, callback) {
        for (const node of this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))) {
            this._addEvent(node, events, callback, delegate, true);
        }
    },

    /**
     * Add a self-destructing event to each element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEventOnce(nodes, events, callback) {
        for (const node of this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))) {
            this._addEvent(node, events, callback, null, true);
        }
    },

    /**
     * Clone all events from each element to other elements.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} others The other node(s), or a query selector string.
     */
    cloneEvents(nodes, others) {
        for (const node of this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))) {
            this._cloneEvents(node, others);
        }
    },

    /**
     * Remove events from each element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} [events] The event names.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     */
    removeEvent(nodes, events, callback) {
        for (const node of this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))) {
            this._removeEvent(node, events, callback);
        }
    },

    /**
     * Remove delegated events from each element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} [events] The event names.
     * @param {string} [delegate] The delegate selector.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     */
    removeEventDelegate(nodes, events, delegate, callback) {
        for (const node of this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))) {
            this._removeEvent(node, events, callback, delegate);
        }
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

        if (!this._events.has(node)) {
            this._events.set(node, {});
        }

        const nodeEvents = this._events.get(node);

        const eventData = {
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

            node.addEventListener(realEvent, realCallback);

            nodeEvents[realEvent].push(eventData);
        }
    },

    /**
     * Clone all events from a single element to other elements.
     * @param {HTMLElement|Document|Window} nodes The input node.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} others The other node(s), or a query selector string.
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
     * Remove events from a single element.
     * @param {HTMLElement|Document|Window} nodes The input node.
     * @param {string} [events] The event names.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {string} [delegate] The delegate selector.
     */
    _removeEvent(node, events, callback, delegate) {
        if (!this._events.has(node)) {
            return;
        }

        const nodeEvents = this._events.get(node);

        const eventArray = events ?
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

                node.removeEventListener(eventData.realEvent, eventData.realCallback);

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
