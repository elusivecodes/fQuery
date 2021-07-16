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
     * Get the index of the first node relative to it's parent.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {number} The index.
     */
    index(nodes) {
        const node = this.parseNode(nodes, {
            node: true
        });

        if (!node) {
            return;
        }

        return Core.wrap(
            node.parentNode.children
        ).indexOf(node);
    },

    /**
     * Get the index of the first node matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {number} The index.
     */
    indexOf(nodes, filter) {
        filter = this.parseFilter(filter);

        return this.parseNodes(nodes, {
            node: true,
            fragment: true,
            shadow: true
        }).findIndex(node =>
            !filter || filter(node)
        );
    },

    /**
     * Normalize nodes (remove empty text nodes, and join adjacent text nodes).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    normalize(nodes) {
        nodes = this.parseNodes(nodes, {
            node: true,
            fragment: true,
            shadow: true,
            document: true
        });

        for (const node of nodes) {
            node.normalize();
        }
    },

    /**
     * Sanitize a HTML string.
     * @param {string} html The input HTML string.
     * @param {object} [allowedTags] An object containing allowed tags and attributes.
     * @returns {string} The sanitized HTML string.
     */
    sanitize(html, allowedTags = DOM.allowedTags) {
        const template = this.create('template', { html }),
            fragment = template.content,
            children = this.constructor._children(fragment, null, false, true);

        for (const child of children) {
            this.constructor._sanitize(child, allowedTags);
        }

        return this.getHTML(template);
    },

    /**
     * Return a serialized string containing names and values of all form nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {string} The serialized string.
     */
    serialize(nodes) {
        return AjaxRequest._parseParams(
            this.serializeArray(nodes)
        );
    },

    /**
     * Return a serialized array containing names and values of all form nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The serialized array.
     */
    serializeArray(nodes) {
        return this.parseNodes(nodes, {
            fragment: true,
            shadow: true
        }).reduce(
            (values, node) => {
                if (
                    (
                        Core.isElement(node) &&
                        node.matches('form')
                    ) ||
                    Core.isFragment(node) ||
                    Core.isShadow(node)
                ) {
                    return values.concat(
                        this.serializeArray(
                            node.querySelectorAll(
                                'input, select, textarea'
                            )
                        )
                    );
                }

                if (
                    Core.isElement(node) &&
                    node.matches('[disabled], input[type=submit], input[type=reset], input[type=file], input[type=radio]:not(:checked), input[type=checkbox]:not(:checked)')
                ) {
                    return values;
                }

                const name = node.getAttribute('name');
                if (!name) {
                    return values;
                }

                if (
                    Core.isElement(node) &&
                    node.matches('select[multiple]')
                ) {
                    for (const option of node.selectedOptions) {
                        values.push(
                            {
                                name,
                                value: option.value || ''
                            }
                        );
                    }
                } else {
                    values.push(
                        {
                            name,
                            value: node.value || ''
                        }
                    );
                }

                return values;
            },
            []
        );
    },

    /**
     * Sort nodes by their position in the document.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The sorted array of nodes.
     */
    sort(nodes) {
        nodes = this.parseNodes(nodes, {
            node: true,
            fragment: true,
            shadow: true,
            document: true,
            window: true
        });

        return nodes.sort((node, other) => {
            if (Core.isWindow(node)) {
                return 1;
            }

            if (Core.isWindow(other)) {
                return -1;
            }

            if (Core.isDocument(node)) {
                return 1;
            }

            if (Core.isDocument(other)) {
                return -1;
            }

            if (Core.isFragment(other)) {
                return 1;
            }

            if (Core.isFragment(node)) {
                return -1;
            }

            if (Core.isShadow(node)) {
                node = node.host;
            }

            if (Core.isShadow(other)) {
                other = other.host;
            }

            if (node.isSameNode(other)) {
                return 0;
            }

            const pos = node.compareDocumentPosition(other);

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
    },

    /**
     * Return the tag name (lowercase) of the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {string} The nodes tag name (lowercase).
     */
    tagName(nodes) {
        const node = this.parseNode(nodes);

        if (!node) {
            return;
        }

        return node.tagName.toLowerCase();
    }

});
