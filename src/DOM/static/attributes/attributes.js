/**
 * DOM (Static) Attributes
 */

Object.assign(DOM, {

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
