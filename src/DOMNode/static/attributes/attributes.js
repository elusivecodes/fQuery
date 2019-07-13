/**
 * DOMNode (Static) Attributes
 */

Object.assign(DOMNode, {

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
     * @param {object} attributes An object containing attributes.
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
     * @param {object} dataset An object containing dataset values.
     */
    setDataset(node, dataset) {
        Object.assign(
            node.dataset,
            dataset
        );
    },

    /**
     * Set a property value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} properties An object containing properties.
     */
    setProperty(node, properties) {
        Object.assign(
            node,
            properties
        );
    }

});
