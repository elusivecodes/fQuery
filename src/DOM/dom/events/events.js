/**
 * DOM Events
 */

Object.assign(DOM.prototype, {

    /**
     * Trigger a blur event on the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     */
    blur(nodes) {
        const node = this._nodeFind(nodes);

        if (!node) {
            return;
        }

        DOM._blur(node);
    },

    /**
     * Trigger a click event on the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     */
    click(nodes) {
        const node = this._nodeFind(nodes);

        if (!node) {
            return;
        }

        DOM._click(node);
    },

    /**
     * Trigger a focus event on the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
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
        if (this._context.readyState === 'complete') {
            callback();
            return;
        }

        this._addEvent(
            window,
            'DOMContentLoaded',
            callback
        );
    }

});
