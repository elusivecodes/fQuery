/**
 * DOM Attributes
 */

Object.assign(DOM.prototype, {

    /**
     * Get an attribute value for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} attribute The attribute name.
     * @returns {string} The attribute value.
     */
    getAttribute(nodes, attribute) {
        const node = this._nodeFind(nodes);

        if (!node) {
            return;
        }

        return DOM._getAttribute(node, attribute);
    },

    /**
     * Get a dataset value for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} [key] The dataset key.
     * @returns {string|DOMStringMap} The dataset value.
     */
    getDataset(nodes, key) {
        const node = this._nodeFind(nodes);

        if (!node) {
            return;
        }

        return DOM._getDataset(node, key);
    },

    /**
     * Get the HTML contents of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @returns {string} The HTML contents.
     */
    getHTML(nodes) {
        return this.getProperty(
            nodes,
            'innerHTML'
        );
    },

    /**
     * Get a property value for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} property The property name.
     * @returns {string} The property value.
     */
    getProperty(nodes, property) {
        const node = this._nodeFind(nodes);

        if (!node) {
            return;
        }

        return DOM._getProperty(node, property);
    },

    /**
     * Get the text contents of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @returns {string} The text contents.
     */
    getText(nodes) {
        return this.getProperty(
            nodes,
            'innerText'
        );
    },

    /**
     * Get the value property of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @returns {string} The value.
     */
    getValue(nodes) {
        return this.getProperty(
            nodes,
            'value'
        );
    },

    /**
     * Remove an attribute from each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} attribute The attribute name.
     */
    removeAttribute(nodes, attribute) {
        nodes = this._nodeFilter(nodes);

        for (const node of nodes) {
            DOM._removeAttribute(node, attribute);
        }
    },

    /**
     * Remove a property from each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} property The property name.
     */
    removeProperty(nodes, property) {
        nodes = this._nodeFilter(nodes);

        for (const node of nodes) {
            DOM._removeProperty(node, property);
        }
    },

    /**
     * Set an attribute value for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|object} attribute The attribute name, or an object containing attributes.
     * @param {string} [value] The attribute value.
     */
    setAttribute(nodes, attribute, value) {
        nodes = this._nodeFilter(nodes);

        const attributes = DOM._parseData(attribute, value);

        for (const node of nodes) {
            this._setAttribute(node, attributes);
        }
    },

    /**
     * Set a dataset value for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|object} key The dataset key, or an object containing dataset values.
     * @param {string} [value] The dataset value.
     */
    setDataset(nodes, key, value) {
        nodes = this._nodeFilter(nodes);

        const dataset = DOM._parseData(key, value);

        for (const node of nodes) {
            DOM._setDataset(node, dataset);
        }
    },

    /**
     * Set the HTML contents of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} html The HTML contents.
     */
    setHTML(nodes, html) {
        this.empty(nodes);

        this.setProperty(
            nodes,
            'innerHTML',
            html
        );
    },

    /**
     * Set a property value for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|object} property The property name, or an object containing properties.
     * @param {string} [value] The property value.
     */
    setProperty(nodes, property, value) {
        nodes = this._nodeFilter(nodes);

        const properties = DOM._parseData(property, value);

        for (const node of nodes) {
            DOM._setProperty(node, properties);
        }
    },

    /**
     * Set the text contents of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} text The text contents.
     */
    setText(nodes, text) {
        this.empty(nodes);

        this.setProperty(
            nodes,
            'innerText',
            text
        );
    },

    /**
     * Set the value property of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} value The value.
     */
    setValue(nodes, value) {
        this.setProperty(
            nodes,
            'value',
            value
        );
    },

    /**
     * Set an attribute value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} attributes An object containing attributes.
     */
    _setAttribute(node, attributes) {
        for (const key in attributes) {
            DOM._setAttribute(
                node,
                key,
                attributes[key]
            );
        }
    }

});
