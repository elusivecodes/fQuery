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
     * Return all nodes matching a custom CSS selector.
     * @param {string} selector The custom query selector.
     * @param {HTMLElement} node The input node.
     * @returns {NodeList} The matching nodes.
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
     * Return a single node matching a custom CSS selector.
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
