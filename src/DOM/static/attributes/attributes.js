/**
 * DOM (Static) Attributes
 */

Object.assign(DOM, {

    /**
     * Get an attribute value for a single element.
     * @param {HTMLElement} node The input node.
     * @param {string} attribute The attribute name.
     * @returns {string} The attribute value.
     */
    _getAttribute(node, attribute) {
        return node.getAttribute(attribute);
    },

    /**
     * Get a dataset value for a single element.
     * @param {HTMLElement} node The input node.
     * @param {string} [key] The dataset key.
     * @returns {string|object} The dataset value.
     */
    _getDataset(node, key) {
        if (!key) {
            return node.dataset;
        }

        return node.dataset[key];
    },

    /**
     * Get a property value for a single element.
     * @param {HTMLElement} node The input node.
     * @param {string} property The property name.
     * @returns {string} The property value.
     */
    _getProperty(node, property) {
        return node[property];
    },

    /**
     * Remove an attribute from a single element.
     * @param {HTMLElement} node The input node.
     * @param {string} attribute The attribute name.
     */
    _removeAttribute(node, attribute) {
        node.removeAttribute(attribute)
    },

    /**
     * Remove a property from a single element.
     * @param {HTMLElement} node The input node.
     * @param {string} property The property name.
     */
    _removeProperty(node, property) {
        delete node[property];
    },

    /**
     * Set an attribute value for a single element.
     * @param {HTMLElement} node The input node.
     * @param {object} attributes An object containing attributes.
     */
    _setAttribute(node, attributes) {
        for (const key in attributes) {
            node.setAttribute(
                key,
                attributes[key]
            );
        }
    },

    /**
     * Set a dataset value for a single element.
     * @param {HTMLElement} node The input node.
     * @param {object} dataset An object containing dataset values.
     */
    _setDataset(node, dataset) {
        Object.assign(
            node.dataset,
            dataset
        );
    },

    /**
     * Set a property value for a single element.
     * @param {HTMLElement} node The input node.
     * @param {object} properties An object containing properties.
     */
    _setProperty(node, properties) {
        Object.assign(
            node,
            properties
        );
    }

});
