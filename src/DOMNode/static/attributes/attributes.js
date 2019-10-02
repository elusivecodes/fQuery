/**
 * DOMNode (Static) Attributes
 */

Object.assign(DOMNode, {

    /**
     * Get attribute values for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {NamedNodeMap} The dataset value.
     */
    attributes(node) {
        return node.attributes;
    },

    /**
     * Get dataset values for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {DOMStringMap} The dataset value.
     */
    dataset(node) {
        return node.dataset;
    },

    /**
     * Get an attribute value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} attribute The attribute name.
     * @returns {string} The attribute value.
     */
    getAttribute(node, attribute) {
        return node.getAttribute(attribute);
    },

    /**
     * Get a dataset value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} [key] The dataset key.
     * @returns {string} The dataset value.
     */
    getDataset(node, key) {
        return this.dataset(node)[key];
    },

    /**
     * Get a property value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} property The property name.
     * @returns {string} The property value.
     */
    getProperty(node, property) {
        return node[property];
    },

    /**
     * Remove an attribute from a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} attribute The attribute name.
     */
    removeAttribute(node, attribute) {
        node.removeAttribute(attribute)
    },

    /**
     * Remove a dataset value from a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} key The dataset key.
     */
    removeDataset(node, key) {
        delete node.dataset[key];
    },

    /**
     * Remove a property from a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} property The property name.
     */
    removeProperty(node, property) {
        delete node[property];
    },

    /**
     * Set an attribute value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} attribute The attribute name.
     * @param {string} value The attribute value.
     */
    setAttribute(node, attribute, value) {
        node.setAttribute(
            attribute,
            value
        );
    },

    /**
     * Set a dataset value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} key The dataset key.
     * @param {string} value The dataset value.
     */
    setDataset(node, key, value) {
        this.dataset(node)[key] = value;
    },

    /**
     * Set a property value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} property The property name.
     * @param {string} value The property value.
     */
    setProperty(node, property, value) {
        node[property] = value;
    }

});
