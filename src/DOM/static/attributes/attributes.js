/**
 * DOM (Static) Attributes
 */

Object.assign(DOM, {

    /**
     * Get attribute value(s) for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} [attribute] The attribute name.
     * @returns {string|object} The attribute value, or an object containing attributes.
     */
    _getAttribute(node, attribute) {
        if (attribute) {
            return node.getAttribute(attribute);
        }

        const attributes = {};

        for (const attr of node.attributes) {
            attributes[attr.nodeName] = attr.nodeValue;
        }

        return attributes;
    },

    /**
     * Get dataset value(s) for a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} [key] The dataset key.
     * @returns {string|object} The dataset value, or an object containing the dataset.
     */
    _getDataset(node, key) {
        if (key) {
            key = Core.camelCase(key);

            return this._parseDataset(
                node.dataset[key]
            );
        }

        const dataset = {};

        for (const k in node.dataset) {
            dataset[k] = this._parseDataset(node.dataset[k]);
        }

        return dataset;
    },

    /**
     * Remove a dataset value from a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} key The dataset key.
     */
    _removeDataset(node, key) {
        key = Core.camelCase(key);

        delete node.dataset[key];
    },

    /**
     * Set an attribute value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} attributes An object containing attributes.
     */
    _setAttribute(node, attributes) {
        for (const key in attributes) {
            node.setAttribute(key, attributes[key]);
        }
    },

    /**
     * Set dataset values for a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} dataset An object containing dataset values.
     */
    _setDataset(node, dataset) {
        for (const key in dataset) {
            const realKey = Core.camelCase(key);
            node.dataset[realKey] = dataset[key];
        }
    }

});
