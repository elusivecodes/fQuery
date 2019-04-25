/**
 * DOM Events
 */

Object.assign(DOM.prototype, {

    /**
     * Trigger a blur event on the first element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     */
    blur(nodes) {
        const node = this._nodeFind(nodes);

        if (!node) {
            return;
        }

        DOM._blur(node);
    },

    /**
     * Trigger a click event on the first element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     */
    click(nodes) {
        const node = this._nodeFind(nodes);

        if (!node) {
            return;
        }

        DOM._click(node);
    },

    /**
     * Trigger a focus event on the first element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     */
    focus(nodes) {
        const node = this._nodeFind(nodes);

        if (!node) {
            return;
        }

        DOM._focus(node);
    },

    /**
     * Add a function to the ready queue.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    ready(callback) {
        if (this.context.readyState === 'complete') {
            callback();
            return;
        }

        this._addEvent(
            window,
            'DOMContentLoaded',
            callback
        );
    },

    /**
     * Trigger events on each element.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} events The event names.
     * @param {object} [data] Additional data to attach to the event.
     */
    triggerEvent(nodes, events, data) {
        for (const node of this._nodeFilter(nodes, node => DOM.isElement(node) || DOM.isDocument(node) || Core.isWindow(node))) {
            DOM._triggerEvent(node, events, data);
        }
    }

});
