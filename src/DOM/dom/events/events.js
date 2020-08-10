/**
 * DOM Events
 */

Object.assign(DOM.prototype, {

    /**
     * Trigger a blur event on the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    blur(nodes) {
        const node = this.parseNode(nodes);

        if (!node) {
            return;
        }

        node.blur();
    },

    /**
     * Trigger a click event on the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    click(nodes) {
        const node = this.parseNode(nodes);

        if (!node) {
            return;
        }

        node.click();
    },

    /**
     * Trigger a focus event on the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    focus(nodes) {
        const node = this.parseNode(nodes);

        if (!node) {
            return;
        }

        node.focus();
    },

    /**
     * Add a function to the ready queue.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    ready(callback) {
        if (this._context.readyState === 'complete') {
            callback();
            return;
        }

        this.constructor._addEvent(
            window,
            'DOMContentLoaded',
            callback
        );
    }

});
