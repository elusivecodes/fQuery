/**
 * DOM Filters
 */

Object.assign(DOM.prototype, {

    /**
     * Return a node filter callback.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
     * @returns {DOM~filterCallback} The node filter callback.
     */
    parseFilter(filter) {
        if (!filter) {
            return false;
        }

        if (Core.isFunction(filter)) {
            return filter;
        }

        if (Core.isString(filter)) {
            return node => Core.isElement(node) && node.matches(filter);
        }

        if (Core.isNode(filter) || Core.isFragment(filter) || Core.isShadow(filter)) {
            return node => node.isSameNode(filter);
        }

        filter = this.parseNodes(filter, {
            node: true,
            fragment: true,
            shadow: true
        });

        if (filter.length) {
            return node => filter.includes(node);
        }

        return false;
    },

    /**
     * Return a node contains filter callback.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
     * @returns {DOM~filterCallback} The node contains filter callback.
     */
    parseFilterContains(filter) {
        if (!filter) {
            return false;
        }

        if (Core.isFunction(filter)) {
            return node =>
                Core.wrap(
                    node.querySelectorAll('*')
                ).some(filter);
        }

        if (Core.isString(filter)) {
            return node => !!this.findOne(filter, node);
        }

        if (Core.isNode(filter) || Core.isFragment(filter) || Core.isShadow(filter)) {
            return node => node.contains(filter);
        }

        filter = this.parseNodes(filter, {
            node: true,
            fragment: true,
            shadow: true
        });

        if (filter.length) {
            return node => filter.some(other => node.contains(other));
        }

        return false;
    },

    /**
     * Return the first node matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {object} [options] The options for filtering.
     * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
     * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
     * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
     * @param {Boolean} [options.document=false] Whether to allow Document.
     * @param {Boolean} [options.window=false] Whether to allow Window.
     * @param {Boolean} [options.html=false] Whether to allow HTML strings.
     * @param {HTMLElement|Document} [options.context=this._context] The Document context.
     * @returns {Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window} The matching node.
     */
    parseNode(nodes, options = {}) {
        const filter = this.constructor.parseNodesFactory(options);

        return this._parseNodesDeep(
            nodes,
            options.context || this._context,
            filter,
            options.html,
            true
        );
    },

    /**
     * Return a filtered array of nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {object} [options] The options for filtering.
     * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
     * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
     * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
     * @param {Boolean} [options.document=false] Whether to allow Document.
     * @param {Boolean} [options.window=false] Whether to allow Window.
     * @param {Boolean} [options.html=false] Whether to allow HTML strings.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document} [options.context=this._context] The Document context.
     * @returns {array} The filtered array of nodes.
     */
    parseNodes(nodes, options = {}) {
        const filter = this.constructor.parseNodesFactory(options);

        return this._parseNodesDeep(
            nodes,
            options.context || this._context,
            filter,
            options.html
        );
    },

    /**
     * Recursively parse nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} context The context node(s), or a query selector string.
     * @param {DOM~nodeCallback} [filter] The callback to use for filtering nodes.
     * @param {Boolean} [first=false] Whether to only return the first result.
     * @returns {array|Node|DocumentFragment|ShadowRoot|Document|Window} The parsed node(s).
     */
    _parseNodesDeep(nodes, context, filter, html = false, first = false) {

        // check nodes
        if (!nodes) {
            return first ?
                null :
                [];
        }

        // String
        if (Core.isString(nodes)) {
            // HTML string
            if (html && nodes.trim().charAt(0) === '<') {
                return this.parseHTML(nodes);
            }

            // query selector
            if (!first) {
                return this.find(nodes, context);
            }

            const node = this.findOne(nodes, context);
            return node ?
                node :
                null;
        }

        // Node/HTMLElement/Window/Document
        if (filter(nodes)) {
            return first ?
                nodes :
                [nodes];
        }

        // QuerySet
        if (nodes instanceof QuerySet) {
            if (!first) {
                return nodes.get().filter(filter);
            }

            const node = nodes.get(0);
            return node && filter(node) ?
                node :
                null;
        }

        // HTMLCollection
        if (nodes instanceof HTMLCollection) {
            if (!first) {
                return Core.wrap(nodes);
            }

            return nodes.length ?
                nodes.item(0) :
                null;
        }

        // Array
        if (Core.isArray(nodes)) {
            const subFilter = this.constructor.parseNodesFactory({
                node: true,
                fragment: true,
                shadow: true,
                document: true,
                window: true
            });
            nodes = nodes.flatMap(node =>
                this._parseNodesDeep(node, context, subFilter, html)
            );
        } else {
            nodes = Core.wrap(nodes);
        }

        if (nodes.length) {
            nodes = Core.unique(nodes);
        }

        if (!first) {
            return nodes.filter(filter);
        }

        const node = nodes.shift();
        return node && filter(node) ?
            node :
            null;
    }

});
