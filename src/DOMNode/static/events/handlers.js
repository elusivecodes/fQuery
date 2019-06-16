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
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} nodes The input node.
     * @param {string} event The event name.
     * @param {object} [data] Additional data to attach to the Event object.
     */
    triggerEvent(node, event, data) {
        const eventData = new Event(event);

        if (data) {
            Object.assign(eventData, data);
        }

        node.dispatchEvent(eventData);
    }

});
