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
            return DOMNode.getAttribute(node, attribute);
        }

        const nodeAttributes = DOMNode.attributes(node),
            attributes = {};

        for (const attr of nodeAttributes) {
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

            return DOM._parseDataset(
                DOMNode.getDataset(node, key)
            );
        }

        const dataset = DOMNode.dataset(node);

        const result = {};

        for (const k in dataset) {
            result[k] = DOM._parseDataset(dataset[k]);
        }

        return result;
    },

    /**
     * Remove a dataset value from a single node.
     * @param {HTMLElement} node The input node.
     * @param {string} key The dataset key.
     */
    _removeDataset(node, key) {
        key = Core.camelCase(key);

        DOMNode.removeDataset(node, key);
    },

    /**
     * Set an attribute value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} attributes An object containing attributes.
     */
    _setAttribute(node, attributes) {
        for (const key in attributes) {
            DOMNode.setAttribute(
                node,
                key,
                attributes[key]
            );
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

            DOMNode.setDataset(
                node,
                realKey,
                dataset[key]
            );
        }
    }

});
