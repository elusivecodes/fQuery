/**
 * DOM Utility
 */

Object.assign(DOM.prototype, {

    /**
     * Execute a command in the document context.
     * @param {string} command The command to execute.
     * @param {string} [value] The value to give the command.
     * @returns {Boolean} TRUE if the command was executed, otherwise FALSE.
     */
    exec(command, value = null) {
        return this._context.execCommand(command, false, value);
    },

    /**
     * Force a node to be shown, and then execute a callback.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot|Document|Window} nodes The input node(s), or a query selector string.
     * @param {DOM~nodeCallback} callback The callback to execute.
     * @returns {*} The result of the callback.
     */
    forceShow(nodes, callback) {
        const node = this._nodeFind(nodes, { node: true, shadow: true, document: true, window: true });

        if (!node) {
            return;
        }

        if (Core.isDocument(node) || Core.isWindow(node) || DOM._isVisible(node)) {
            return callback(node);
        }

        const elements = [];

        if (Core.isElement(node) && this._css(node, 'display') === 'none') {
            elements.push(node);
        }

        Core.merge(elements, DOM._parents(
            node,
            parent =>
                Core.isElement(parent) && this._css(parent, 'display') === 'none'
        ));

        const hidden = new Map;

        for (const element of elements) {
            hidden.set(element, DOM._getAttribute(element, 'style'));

            DOM._setStyle(element, { display: 'initial' }, true);
        }

        const result = callback(node);

        for (const [element, style] of hidden) {
            if (style) {
                DOM._setAttribute(element, { style });
            } else {
                DOM._removeAttribute(element, 'style');
            }
        }

        return result;
    },

    /**
     * Get the index of the first node matching a filter.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {number} The index.
     */
    index(nodes, filter) {
        filter = this._parseFilter(filter);

        return this._nodeFilter(nodes, { node: true, shadow: true })
            .findIndex(node =>
                !filter || filter(node)
            );
    },

    /**
     * Get the index of the first node relative to it's parent.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot} nodes The input node(s), or a query selector string.
     * @returns {number} The index.
     */
    indexOf(nodes) {
        const node = this._nodeFind(nodes, { node: true, shadow: true });

        if (!node) {
            return;
        }

        return DOM._children(
            DOM._parent(node).shift()
        ).indexOf(node);
    },

    /**
     * Normalize nodes (remove empty text nodes, and join neighbouring text nodes).
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot|Document} nodes The input node(s), or a query selector string.
     */
    normalize(nodes) {
        nodes = this._nodeFilter(nodes, { node: true, shadow: true, document: true });

        for (const node of nodes) {
            DOM._normalize(node);
        }
    },

    /**
     * Return a serialized string containing names and values of all form nodes.
     * @param {string|array|HTMLElement|HTMLCollection|ShadowRoot} nodes The input node(s), or a query selector string.
     * @returns {string} The serialized string.
     */
    serialize(nodes) {
        return DOM._parseParams(
            this.serializeArray(nodes)
        );
    },

    /**
     * Return a serialized array containing names and values of all form nodes.
     * @param {string|array|HTMLElement|HTMLCollection|ShadowRoot} nodes The input node(s), or a query selector string.
     * @returns {array} The serialized array.
     */
    serializeArray(nodes) {
        return this._nodeFilter(nodes, { shadow: true })
            .reduce(
                (values, node) => {
                    if (Core.isShadow(node) || DOM._is(node, 'form')) {
                        return values.concat(
                            this.serializeArray(
                                DOM._findBySelector(
                                    'input, select, textarea',
                                    node
                                )
                            )
                        );
                    }

                    if (DOM._is(node, '[disabled], input[type=submit], input[type=reset], input[type=file], input[type=radio]:not(:checked), input[type=checkbox]:not(:checked)')) {
                        return values;
                    }

                    const name = DOM._getAttribute(node, 'name');
                    if (!name) {
                        return values;
                    }

                    const value = DOM._getAttribute(node, 'value') || '';

                    values.push(
                        {
                            name,
                            value
                        }
                    );

                    return values;
                },
                []
            );
    },

    /**
     * Sort nodes by their position in the document.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot} nodes The input node(s), or a query selector string.
     * @returns {array} The sorted array of nodes.
     */
    sort(nodes) {
        return this._nodeFilter(nodes, { node: true, shadow: true })
            .sort((node, other) => DOM._compareNodes(node, other));
    }

});
