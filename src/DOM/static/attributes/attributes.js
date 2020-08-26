/**
 * DOM (Static) Attributes
 */

Object.assign(DOM, {

    /**
     * Get attribute value(s) for a single node.
     * @param {HTMLElement} node The input node.
     * @returns {object} An object containing attributes.
     */
    _getAttributes(node) {
        const attributes = {};

        for (const attr of node.attributes) {
            attributes[attr.nodeName] = attr.nodeValue;
        }

        return attributes;
    },

    /**
     * Set an attribute value for a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} attributes An object containing attributes.
     */
    _setAttributes(node, attributes) {
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
