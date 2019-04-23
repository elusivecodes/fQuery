/**
 * DOM (Static) Events
 */

Object.assign(DOM, {

    /**
     * Trigger a blur event on a single element.
     * @param {HTMLElement} node The input node.
     */
    _blur(node) {
        node.blur();
    },

    /**
     * Trigger a click event on a single element.
     * @param {HTMLElement} node The input node.
     */
    _click(node) {
        node.click();
    },

    /**
     * Trigger a focus event on a single element.
     * @param {HTMLElement} node The input node.
     */
    _focus(node) {
        node.focus();
    }

});
