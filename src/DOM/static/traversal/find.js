/**
 * DOM (Static) Find
 */

Object.assign(DOM, {

    /**
     * Return all nodes with a specific class.
     * @param {string} className The class name.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @returns {HTMLCollection} The matching nodes.
     */
    _findByClass(className, node) {
        return node.getElementsByClassName(className);
    },

    /**
     * Return a single nodes with a specific ID.
     * @param {string} id The id.
     * @param {Document} node The input node.
     * @returns {HTMLElement} The matching node.
     */
    _findById(id, node) {
        return node.getElementById(id);
    },

    /**
     * Return all nodes with a specific tag.
     * @param {string} tagName The tag name.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @returns {HTMLCollection} The matching nodes.
     */
    _findByTag(tagName, node) {
        return node.getElementsByTagName(tagName);
    },

    /**
     * Return all nodes matching a standard CSS selector.
     * @param {string} selector The query selector.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @returns {NodeList} The matching nodes.
     */
    _findBySelector(selector, node) {
        return node.querySelectorAll(selector);
    },

    /**
     * Return a single node matching a standard CSS selector.
     * @param {string} selector The query selector.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} node The input node.
     * @returns {HTMLElement} The matching node.
     */
    _findOneBySelector(selector, node) {
        return node.querySelector(selector);
    }

});
