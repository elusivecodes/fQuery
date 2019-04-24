/**
 * DOM (Static) Event Handlers
 */

Object.assign(DOM, {

    /**
     * Trigger an event on a single element.
     * @param {HTMLElement|Document|Window} nodes The input node.
     * @param {string} events The event names.
     * @param {object} [data] Additional data to attach to the Event object.
     */
    _triggerEvent(node, events, data) {
        for (const event of this._parseEvents(events)) {
            const realEvent = this._parseEvent(event);

            const eventData = new Event(realEvent);

            if (data) {
                Object.assign(eventData, data);
            }

            node.dispatchEvent(eventData);
        }
    }

});
