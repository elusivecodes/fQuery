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
        return this.context.execCommand(command, false, value);
    },

    /**
     * @callback DOM~nodeCallback
     * @param {HTMLElement} node The input node.
     */

    /**
     * Force an element to be shown, and then execute a callback.
     * @param {string|Node|NodeList|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {DOM~nodeCallback} callback The callback to execute.
     * @returns {*} The result of the callback.
     */
    forceShow(nodes, callback) {
        const node = this._nodeFind(nodes, node => Core.isNode(node) || Core.isDocument(node) || Core.isWindow(node));

        if (!node) {
            return;
        }

        if (this.isVisible(node)) {
            return callback(node);
        }

        const elements = new Map;

        if (this._css(node, 'display') === 'none') {
            elements.set(node, DOM._getAttribute(node, 'style'));
        }

        const parents = DOM._parents(
            node,
            parent =>
                this._css(parent, 'display') === 'none',
            parent =>
                !Core.isElement(parent)
        );

        for (const parent of parents) {
            elements.set(parent, DOM._getAttribute(parent, 'style'));
        }

        for (const element of elements.keys()) {
            DOM._setStyle(
                element,
                {
                    display: 'initial'
                },
                true
            );
        }

        const result = callback(node);

        for (const [element, style] of elements) {
            if (style) {
                DOM._setStyle(
                    element,
                    {
                        display: style
                    }
                )
            } else {
                DOM._removeAttribute(element, 'style');
            }
        }

        return result;
    },

    /**
     * Get the index of the first element matching a filter.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|HTMLElement[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {number} The index.
     */
    index(nodes, filter) {
        filter = this._parseFilter(filter);

        return this._nodeFilter(nodes)
            .findIndex(node =>
                !filter || filter(node)
            );
    },

    /**
     * Get the index of the first element relative to it's parent element.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {number} The index.
     */
    indexOf(nodes) {
        const node = this._nodeFind(nodes);

        if (!node) {
            return;
        }

        return this.children(
            this.parent(node)
        ).indexOf(node);
    },

    /**
     * Normalize nodes (remove empty text nodes, and join neighbouring text nodes).
     * @param {string|Node|NodeList|HTMLCollection|Document|Node[]} nodes The input node(s), or a query selector string.
     */
    normalize(nodes) {
        for (const node of this._nodeFilter(nodes, Core.isNode)) {
            DOM._normalize(node);
        }
    },

    /**
     * Return a serialized string containing names and values of all form elements.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {string} The serialized string.
     */
    serialize(nodes) {
        return DOM._parseParams(
            this.serializeArray(nodes)
        );
    },

    /**
     * Return a serialized array containing names and values of all form elements.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {Array} The serialized array.
     */
    serializeArray(nodes) {
        return this._nodeFilter(nodes)
            .reduce(
                (values, node) => {
                    if (DOM._is(node, 'form')) {
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
     * Sort nodes by their position in the document
     * @param {string|Node|NodeList|HTMLCollection|Document|Node[]} nodes The input node(s), or a query selector string.
     * @returns {Node[]} The sorted array of nodes.
     */
    sort(nodes) {
        return this._nodeFilter(nodes, Core.isNode)
            .sort((node, other) => DOM._compareNodes(node, other));
    }

});
