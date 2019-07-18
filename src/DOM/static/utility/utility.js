/**
 * DOM (Static) Utility
 */

Object.assign(DOM, {

    /**
     * Force a single node to be shown, and then execute a callback.
     * @param {Node|HTMLElement|Document|Window} node The input node.
     * @param {DOM~nodeCallback} callback The callback to execute.
     * @returns {*} The result of the callback.
     */
    _forceShow(node, callback) {
        if (Core.isDocument(node) || Core.isWindow(node) || this._isVisible(node)) {
            return callback(node);
        }

        const elements = [];

        if (Core.isElement(node) && this._css(node, 'display') === 'none') {
            elements.push(node);
        }

        Core.merge(
            elements,
            this._parents(
                node,
                parent =>
                    Core.isElement(parent) && this._css(parent, 'display') === 'none'
            )
        );

        const hidden = new Map;

        for (const element of elements) {
            hidden.set(element, DOMNode.getAttribute(element, 'style'));

            DOMNode.setStyle(element, 'display', 'initial', true);
        }

        const result = callback(node);

        for (const [element, style] of hidden) {
            if (style) {
                DOMNode.setAttribute(element, 'style', style);
            } else {
                DOMNode.removeAttribute(element, 'style');
            }
        }

        return result;
    },

    /**
     * Sanitize a single node.
     * @param {HTMLElement} node The input node.
     * @param {object} [allowedTags] An object containing allowed tags and attributes.
     */
    _sanitize(node, allowedTags = this.allowedTags) {
        // check node
        const name = this._tagName(node);
        if (!(name in allowedTags)) {
            this._remove(node);
            return;
        }

        // check node attributes
        const allowedAttributes = [
            ...allowedTags['*'],
            ...allowedTags[name]
        ];
        const attributes = this._getAttribute(node);
        for (const attribute in attributes) {
            const valid = !!allowedAttributes.find(test => attribute.match(test));

            if (!valid) {
                DOMNode.removeAttribute(node, attribute);
            }
        }

        // check children
        const children = DOMNode.children(node);
        for (const child of children) {
            this._sanitize(child, allowedTags);
        }
    },

    /**
     * Return the tag name (lowercase) of a single node.
     * @param {HTMLElement} node The input node.
     * @returns {string} The elements tag name (lowercase).
     */
    _tagName(node) {
        return DOMNode.tagName(node).toLowerCase();
    }

});
