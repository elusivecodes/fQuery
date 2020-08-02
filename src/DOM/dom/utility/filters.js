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
            return node => DOMNode.is(node, filter);
        }

        if (Core.isNode(filter) || Core.isFragment(filter) || Core.isShadow(filter)) {
            return node => DOMNode.isSame(node, filter);
        }

        filter = this.parseNodes(filter, { node: true, fragment: true, shadow: true });

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
                Core.merge(
                    [],
                    DOMNode.findBySelector('*', node)
                ).some(filter);
        }

        if (Core.isString(filter)) {
            return node => !!this.findOne(filter, node);
        }

        if (Core.isNode(filter) || Core.isFragment(filter) || Core.isShadow(filter)) {
            return node => DOMNode.contains(node, filter);
        }

        filter = this.parseNodes(filter, { node: true, fragment: true, shadow: true });

        if (filter.length) {
            return node => filter.some(other => DOMNode.contains(node, other));
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

        return this.parseNodesDeep(nodes, filter, options.html, true);
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

        return this.parseNodesDeep(nodes, filter, options.html);
    },

    /**
     * Recursively parse nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     * @param {DOM~nodeCallback} [filter] The callback to use for filtering nodes.
     * @param {Boolean} [first=false] Whether to only return the first result.
     * @returns {array|Node|DocumentFragment|ShadowRoot|Document|Window} The parsed node(s).
     */
    parseNodesDeep(nodes, filter, html = false, first = false) {

        // check nodes
        if (!nodes) {
            return !first ?
                [] :
                null;
        }

        // String
        if (Core.isString(nodes)) {
            // HTML string
            if (html && nodes.trim().charAt(0) === '<') {
                return this.parseHTML(nodes);
            }

            // query selector
            if (!first) {
                return this.find(nodes, this._context);
            }

            const node = this.findOne(nodes, this._context);
            return node ?
                node :
                null;
        }

        // Node/HTMLElement/Window/Document
        if (filter(nodes)) {
            if (!first) {
                return [nodes];
            }

            return nodes;
        }

        // QuerySet
        if (this.constructor.queryLoaded && nodes instanceof QuerySet) {
            if (!first) {
                return nodes.get().filter(filter);
            }

            const node = nodes.get(0);
            return node && filter(node) ?
                node :
                null;
        }

        // NodeList/HTMLCollection
        if (nodes instanceof NodeList || nodes instanceof HTMLCollection) {
            if (!first) {
                return Core.wrap(nodes);
            }

            return nodes.length ?
                nodes.item(0) :
                null;
        }

        // Array
        if (Core.isArray(nodes)) {
            nodes = nodes.flatMap(node => this.parseNodesDeep(node, filter));
            nodes = this.constructor._sort(nodes);

            if (!first) {
                return nodes;
            }

            return nodes.length ?
                nodes.shift() :
                null;
        }

        node = Core.wrap(nodes);
        nodes = nodes.filter(filter);

        if (!first) {
            nodes = nodes.filter(filter);
            return this.constructor._sort(nodes);
        }

        const node = this.constructor._sort(nodes).shift();
        return node && filter(node) ?
            node :
            null;
    }

});
