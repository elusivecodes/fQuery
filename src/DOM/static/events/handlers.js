/**
 * DOM (Static) Event Handlers
 */

Object.assign(DOM, {

    /**
     * Add an event to a single node.
     * @param {HTMLElement|ShadowRoot|Document|Window} node The input node.
     * @param {string} event The event name.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @param {string} [delegate] The delegate selector.
     * @param {Boolean} [selfDestruct] Whether to remove the event after triggering.
     */
    _addEvent(node, event, callback, delegate, selfDestruct) {
        if (!this._events.has(node)) {
            this._events.set(node, {});
        }

        const nodeEvents = this._events.get(node),
            eventData = {
                delegate,
                callback,
                selfDestruct
            },
            realEvent = this._parseEvent(event);

        let realCallback = callback;

        if (selfDestruct) {
            realCallback = this._selfDestructFactory(node, event, delegate, realCallback);
        }

        if (delegate) {
            realCallback = this._delegateFactory(node, delegate, realCallback);
        }

        if (event !== realEvent) {
            realCallback = this._namespaceFactory(event, realCallback);
        }

        eventData.realCallback = realCallback;
        eventData.event = event;
        eventData.realEvent = realEvent;

        if (!nodeEvents[realEvent]) {
            nodeEvents[realEvent] = [];
        } else if (nodeEvents[realEvent].includes(eventData)) {
            return;
        }

        nodeEvents[realEvent].push(eventData);

        DOMNode.addEvent(node, realEvent, realCallback);
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
     * @param {string} event The event name.
     * @param {DOM~eventCallback} [callback] The callback to remove.
     * @param {string} [delegate] The delegate selector.
     */
    _removeEvent(node, event, callback, delegate) {
        if (!this._events.has(node)) {
            return;
        }

        const nodeEvents = this._events.get(node),
            realEvent = this._parseEvent(event);

        if (!nodeEvents[realEvent]) {
            return;
        }

        nodeEvents[realEvent] = nodeEvents[realEvent].filter(eventData => {
            if (
                (
                    delegate &&
                    delegate !== eventData.delegate
                ) ||
                (
                    callback &&
                    callback !== eventData.callback
                )
            ) {
                return true;
            }

            if (realEvent !== event) {
                const regExp = DOM._eventNamespacedRegExp(event);

                if (!eventData.event.match(regExp)) {
                    return true;
                }
            }

            DOMNode.removeEvent(node, eventData.realEvent, eventData.realCallback);

            return false;
        });

        if (!nodeEvents[realEvent].length) {
            delete nodeEvents[realEvent];
        }

        if (Object.keys(nodeEvents).length) {
            return;
        }

        this._events.delete(node);
    },

    /**
     * Trigger events on a single node.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
     * @param {string} event The event name.
     * @param {object} [data] Additional data to attach to the Event object.
     * @param {object} [options] The options to use for the Event.
     * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
     * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
     * @returns {Boolean} FALSE if the event was cancelled, otherwise TRUE.
     */
    _triggerEvent(node, event, data, options) {
        const realEvent = DOM._parseEvent(event),
            eventData = {
                ...data
            };

        if (realEvent !== event) {
            eventData.namespace = event.substring(realEvent.length + 1);
            eventData.namespaceRegExp = DOM._eventNamespacedRegExp(event);
        }

        return DOMNode.triggerEvent(node, realEvent, eventData, options);
    }

});
