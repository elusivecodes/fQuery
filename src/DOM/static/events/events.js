/**
 * DOM (Static) Events
 */

Object.assign(DOM, {

    /**
     * Trigger a blur event on a single node.
     * @param {HTMLElement} node The input node.
     */
    _blur(node) {
        node.blur();
    },

    /**
     * Trigger a click event on a single node.
     * @param {HTMLElement} node The input node.
     */
    _click(node) {
        node.click();
    },

    /**
     * Trigger a focus event on a single node.
     * @param {HTMLElement} node The input node.
     */
    _focus(node) {
        node.focus();
    },

    /**
     * Trigger an event on a single node.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} nodes The input node.
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
