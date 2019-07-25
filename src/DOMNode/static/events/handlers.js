/**
 * DOMNode (Static) Event Handlers
 */

Object.assign(DOMNode, {

    /**
     * Add an event to a single node.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
     * @param {string} event The event name.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    addEvent(node, event, callback) {
        node.addEventListener(event, callback);
    },

    /**
     * Remove an event from a single node.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} nodes The input node.
     * @param {string} event The event name.
     * @param {DOM~eventCallback} callback The callback to remove.
     */
    removeEvent(node, event, callback) {
        node.removeEventListener(event, callback);
    },

    /**
     * Trigger an event on a single node.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
     * @param {string} event The event name.
     * @param {object} [data] Additional data to attach to the Event object.
     * @param {object} [options] The options to use for the Event.
     * @param {Boolean} [options.bubbles=true] Whether the event will bubble.
     * @param {Boolean} [options.cancelable=true] Whether the event is cancelable.
     * @returns {Boolean} FALSE if the event was cancelled, otherwise TRUE.
     */
    triggerEvent(node, event, data, options) {
        const eventData = new Event(event, {
            bubbles: true,
            cancelable: true,
            ...options
        });

        if (data) {
            Object.assign(eventData, data);
        }

        return node.dispatchEvent(eventData);
    }

});
