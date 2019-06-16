/**
 * DOMNode (Static) Events
 */

Object.assign(DOMNode, {

    /**
     * Trigger a blur event on a single node.
     * @param {HTMLElement} node The input node.
     */
    blur(node) {
        node.blur();
    },

    /**
     * Trigger a click event on a single node.
     * @param {HTMLElement} node The input node.
     */
    click(node) {
        node.click();
    },

    /**
     * Trigger a focus event on a single node.
     * @param {HTMLElement} node The input node.
     */
    focus(node) {
        node.focus();
    }

});
