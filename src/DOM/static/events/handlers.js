/**
 * DOM (Static) Event Handlers
 */

Object.assign(DOM, {

    /**
     * Add events to a single node.
     * @param {HTMLElement|ShadowRoot|Document|Window} node The input node.
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

            DOMNode.addEvent(node, realEvent, realCallback);

            nodeEvents[realEvent].push(eventData);
        }
    },

    /**
     * Clone all events from a single node to other nodes.
     * @param {HTMLElement|ShadowRoot|Document|Window} nodes The input node.
     * @param {HTMLElement|ShadowRoot|Document|Window} other The other node.
     */
    _cloneEvents(node, other) {
        if (!this._events.has(node)) {
            return;
        }

        const nodeEvents = this._events.get(node);
        for (const event in nodeEvents) {
            for (const eventData of nodeEvents[event]) {
                this._addEvent(
                    other,
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
     * @param {HTMLElement|ShadowRoot|Document|Window} nodes The input node.
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

                DOMNode.removeEvent(node, eventData.realEvent, eventData.realCallback);

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
