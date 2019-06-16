/**
 * DOM Events
 */

Object.assign(DOM.prototype, {

    /**
     * Trigger a blur event on the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     */
    blur(nodes) {
        const node = this.parseNode(nodes);

        if (!node) {
            return;
        }

        DOMNode.blur(node);
    },

    /**
     * Trigger a click event on the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     */
    click(nodes) {
        const node = this.parseNode(nodes);

        if (!node) {
            return;
        }

        DOMNode.click(node);
    },

    /**
     * Trigger a focus event on the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     */
    focus(nodes) {
        const node = this.parseNode(nodes);

        if (!node) {
            return;
        }

        DOMNode.focus(node);
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

        DOM._addEvent(
            window,
            'DOMContentLoaded',
            callback
        );
    }

});
