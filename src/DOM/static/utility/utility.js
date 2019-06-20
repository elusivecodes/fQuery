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
        if (Core.isDocument(node) || Core.isWindow(node) || DOM._isVisible(node)) {
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
    }

});
