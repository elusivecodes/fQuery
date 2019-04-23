/**
 * DOM Utility
 */

Object.assign(DOM.prototype, {

    /**
     * @callback DOM~nodeCallback
     * @param {HTMLElement} node The input node.
     */

    /**
     * Force an element to be shown, and then execute a callback.
     * @param {string|HTMLElement|HTMLCollection|Document|Window|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {DOM~nodeCallback} callback The callback to execute.
     * @returns {*} The result of the callback.
     */
    forceShow(nodes, callback) {
        const node = this._nodeFind(nodes, node => DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node));

        if (!node) {
            return;
        }

        if (this.isVisible(node)) {
            return callback(node);
        }

        const elements = [];
        const styles = [];

        if (this._css(node, 'display') === 'none') {
            elements.push(node);
            styles.push(DOM._getAttribute(node, 'style'));
        }

        this._parents(node, parent =>
            this._css(parent, 'display') === 'none'
        )
            .forEach(parent => {
                elements.push(parent);
                styles.push(
                    DOM._getAttribute(parent, 'style')
                );
            });

        DOM._setStyle(
            elements,
            {
                display: 'initial'
            },
            true
        );

        const result = callback(node);

        elements.forEach((node, index) =>
            styles[index] ?
                DOM._setStyle(
                    node,
                    {
                        display: styles[index]
                    }
                ) :
                DOM._removeAttribute(node, 'style')
        );

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
    }

});
