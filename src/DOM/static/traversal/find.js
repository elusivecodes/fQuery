/**
 * DOM (Static) Find
 */

Object.assign(DOM, {

    /**
     * Return all elements with a specific class.
     * @param {string} className The class name.
     * @param {HTMLElement|ShadowRoot|Document} node The input node.
     * @returns {HTMLElement[]} The matching nodes.
     */
    _findByClass(className, node) {
        return node.getElementsByClassName(className);
    },

    /**
     * Return a single elements with a specific ID.
     * @param {string} id The id.
     * @param {Document} node The input node.
     * @returns {HTMLElement} The matching node.
     */
    _findById(id, node) {
        return node.getElementById(id);
    },

    /**
     * Return all elements with a specific tag.
     * @param {string} tagName The tag name.
     * @param {HTMLElement|ShadowRoot|Document} node The input node.
     * @returns {HTMLElement[]} The matching nodes.
     */
    _findByTag(tagName, node) {
        return node.getElementsByTagName(tagName);
    },

    /**
     * Return all elements matching a standard CSS selector.
     * @param {string} selector The query selector.
     * @param {HTMLElement|ShadowRoot|Document} node The input node.
     * @returns {HTMLElement[]} The matching nodes.
     */
    _findBySelector(selector, node) {
        return node.querySelectorAll(selector);
    },

    /**
     * Return a single element matching a standard CSS selector.
     * @param {string} selector The query selector.
     * @param {HTMLElement|ShadowRoot|Document} node The input node.
     * @returns {HTMLElement} The matching node.
     */
    _findOneBySelector(selector, node) {
        return node.querySelector(selector);
    },

    /**
     * Return all elements matching a custom CSS selector.
     * @param {string} selector The custom query selector.
     * @param {HTMLElement} node The input node.
     * @returns {HTMLElement[]} The matching nodes.
     */
    _findByCustom(selector, node) {
        const nodeId = this._getAttribute(node, 'id');
        this._setAttribute(node, { id: this.tempId });

        const results = this._findBySelector(selector, node);

        if (nodeId) {
            this._setAttribute(node, { id: nodeId });
        } else {
            this._removeAttribute(node, 'id');
        }

        return results;
    },

    /**
     * Return a single element matching a custom CSS selector.
     * @param {string} selector The custom query selector.
     * @param {HTMLElement} node The input node.
     * @returns {HTMLElement} The matching node.
     */
    _findOneByCustom(selector, node) {
        const nodeId = this._getAttribute(node, 'id');
        this._setAttribute(node, { id: this.tempId });

        const result = this._findOneBySelector(selector, node);

        if (nodeId) {
            this._setAttribute(node, { id: nodeId });
        } else {
            this._removeAttribute(node, 'id');
        }

        return result;
    }

});
