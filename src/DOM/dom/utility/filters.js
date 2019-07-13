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
            return filter;
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
        if (Core.isString(nodes)) {
            if ('html' in options && options.html && nodes.trim().charAt(0) === '<') {
                return this.parseHTML(nodes).shift();
            }

            const node = this.findOne(
                nodes,
                'context' in options ?
                    options.context :
                    this._context
            );

            return node ?
                node :
                null;
        }

        const nodeFilter = DOM.parseNodesFactory(options);

        if (nodeFilter(nodes)) {
            return nodes;
        }

        const node = Core.wrap(nodes).slice().shift();

        return node && nodeFilter(node) ?
            node :
            null;
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
        if (Core.isString(nodes)) {
            if ('html' in options && options.html && nodes.trim().charAt(0) === '<') {
                return this.parseHTML(nodes);
            }

            return this.find(
                nodes,
                'context' in options ?
                    options.context :
                    this._context
            );
        }

        const nodeFilter = DOM.parseNodesFactory(options);

        if (nodeFilter(nodes)) {
            return [nodes];
        }

        return Core.wrap(nodes)
            .filter(nodeFilter);
    }

});
