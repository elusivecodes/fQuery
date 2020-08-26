/**
 * DOM (Static) Utility
 */

Object.assign(DOM, {

    /**
     * Force a single node to be shown, and then execute a callback.
     * @param {Node|HTMLElement} node The input node.
     * @param {DOM~nodeCallback} callback The callback to execute.
     * @returns {*} The result of the callback.
     */
    _forceShow(node, callback) {
        if (this._isVisible(node)) {
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
                    Core.isElement(parent) &&
                    this._css(parent, 'display') === 'none'
            )
        );

        const hidden = new Map;

        for (const element of elements) {
            hidden.set(element, element.getAttribute('style'));
            element.style.setProperty('display', 'initial', 'important');
        }

        const result = callback(node);

        for (const [element, style] of hidden) {
            if (style) {
                element.setAttribute('style', style);
            } else {
                // force DOM to update
                element.getAttribute('style');
                element.removeAttribute('style');
            }
        }

        return result;
    },

    /**
     * Sanitize a single node.
     * @param {HTMLElement} node The input node.
     * @param {HTMLElement} parent The parent node.
     * @param {object} [allowedTags] An object containing allowed tags and attributes.
     */
    _sanitize(node, parent, allowedTags = this.allowedTags) {
        // check node
        const name = node.tagName.toLowerCase();

        if (!(name in allowedTags)) {
            parent.removeChild(node);
            return;
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
            this._sanitize(child, node, allowedTags);
        }
    }

});
