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
     * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {DOM~nodeCallback} callback The callback to execute.
     * @returns {*} The result of the callback.
     */
    forceShow(nodes, callback) {

        // DocumentFragment and ShadowRoot nodes have no parent
        const node = this.parseNode(nodes, { node: true, document: true, window: true });

        if (!node) {
            return;
        }

        return DOM._forceShow(node, callback);
    },

    /**
     * Get the index of the first node matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {number} The index.
     */
    index(nodes, filter) {
        filter = this.parseFilter(filter);

        return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
            .findIndex(node =>
                !filter || filter(node)
            );
    },

    /**
     * Get the index of the first node relative to it's parent.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {number} The index.
     */
    indexOf(nodes) {
        const node = this.parseNode(nodes, { node: true });

        if (!node) {
            return;
        }

        return Core.wrap(
            DOMNode.children(
                DOMNode.parent(node)
            )
        ).indexOf(node);
    },

    /**
     * Normalize nodes (remove empty text nodes, and join adjacent text nodes).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    normalize(nodes) {
        nodes = this.parseNodes(nodes, { node: true, fragment: true, shadow: true, document: true });

        for (const node of nodes) {
            DOMNode.normalize(node);
        }
    },

    /**
     * Return a serialized string containing names and values of all form nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {string} The serialized string.
     */
    serialize(nodes) {
        return DOM._parseParams(
            this.serializeArray(nodes)
        );
    },

    /**
     * Return a serialized array containing names and values of all form nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The serialized array.
     */
    serializeArray(nodes) {
        return this.parseNodes(nodes, { fragment: true, shadow: true })
            .reduce(
                (values, node) => {
                    if (DOMNode.is(node, 'form') || Core.isFragment(node) || Core.isShadow(node)) {
                        return values.concat(
                            this.serializeArray(
                                DOMNode.findBySelector(
                                    'input, select, textarea',
                                    node
                                )
                            )
                        );
                    }

                    if (DOMNode.is(node, '[disabled], input[type=submit], input[type=reset], input[type=file], input[type=radio]:not(:checked), input[type=checkbox]:not(:checked)')) {
                        return values;
                    }

                    const name = DOMNode.getAttribute(node, 'name');
                    if (!name) {
                        return values;
                    }

                    const value = DOMNode.getAttribute(node, 'value') || '';

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
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The sorted array of nodes.
     */
    sort(nodes) {
        return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
            .sort((node, other) => {
                if (DOMNode.isSame(node, other)) {
                    return 0;
                }

                const pos = DOMNode.comparePosition(node, other);

                if (pos & Node.DOCUMENT_POSITION_FOLLOWING ||
                    pos & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                    return -1;
                }

                if (pos & Node.DOCUMENT_POSITION_PRECEDING ||
                    pos & Node.DOCUMENT_POSITION_CONTAINS) {
                    return 1;
                }

                return 0;
            });
    }

});
