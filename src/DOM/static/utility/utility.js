/**
 * DOM (Static) Utility
 */

Object.assign(DOM, {

    /**
     * Sanitize a single node.
     * @param {HTMLElement} node The input node.
     * @param {HTMLElement} parent The parent node.
     * @param {object} [allowedTags] An object containing allowed tags and attributes.
     */
    _sanitize(node, allowedTags = this.allowedTags) {
        // check node
        const name = node.tagName.toLowerCase();

        if (!(name in allowedTags)) {
            return node.remove();
        }

        // check node attributes
        const allowedAttributes = [];

        if ('*' in allowedTags && allowedTags['*'].length) {
            allowedAttributes.push(...allowedTags['*']);
        }

        if (allowedTags[name].length) {
            allowedAttributes.push(...allowedTags[name]);
        }

        const attributes = this._getAttributes(node);
        for (const attribute in attributes) {
            const valid = !!allowedAttributes.find(test => attribute.match(test));

            if (!valid) {
                node.removeAttribute(attribute);
            }
        }

        // check children
        const children = this._children(node, null, false, true);
        for (const child of children) {
            this._sanitize(child, allowedTags);
        }
    }

});
