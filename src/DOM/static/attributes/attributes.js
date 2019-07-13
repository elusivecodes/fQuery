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

        const attributes = {};

        for (const attr of DOMNode.attributes(node)) {
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
            return DOMNode.getDataset(node, key);
        }

        return {
            ...DOMNode.dataset(node)
        };
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
    }

});
