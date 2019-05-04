/**
 * DOM Filters
 */

Object.assign(DOM.prototype, {

    /**
     * Return a filtered array of nodes.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot|Document|Window} nodes The input node(s), or a query selector or HTML string.
     * @param {object} [options] The options for filtering.
     * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
     * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
     * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
     * @param {Boolean} [options.document=false] Whether to allow Document.
     * @param {Boolean} [options.window=false] Whether to allow Window.
     * @param {Boolean} [options.html=false] Whether to allow HTML strings.
     * @param {HTMLElement|ShadowRoot|Document} [options.context=this._context] The Document context.
     * @returns {array} The filtered array of nodes.
     */
    _nodeFilter(nodes, options = {}) {
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

        const nodeFilter = this._nodeFilterFactory(options);

        if (nodeFilter(nodes)) {
            return [nodes];
        }

        return Core.wrap(nodes)
            .filter(nodeFilter);
    },

    /**
     * Return a function for filtering nodes.
     * @param {object} [options] The options for filtering.
     * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
     * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
     * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
     * @param {Boolean} [options.document=false] Whether to allow Document.
     * @param {Boolean} [options.window=false] Whether to allow Window.
     * @returns {DOM~nodeCallback} The node filter function.
     */
    _nodeFilterFactory(options) {
        return options ?
            node =>
                (options.node ? Core.isNode(node) : Core.isElement(node)) ||
                (options.fragment && Core.isFragment(node)) ||
                (options.shadow && Core.isShadow(node)) ||
                (options.document && Core.isDocument(node)) ||
                (options.window && Core.isWindow(node)) :
            Core.isElement;
    },

    /**
     * Return the first node matching a filter.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot|Document|Window} nodes The input node(s), or a query selector or HTML string.
     * @param {object} [options] The options for filtering.
     * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
     * @param {Boolean} [options.fragment=false] Whether to allow DocumentFragment.
     * @param {Boolean} [options.shadow=false] Whether to allow ShadowRoot.
     * @param {Boolean} [options.document=false] Whether to allow Document.
     * @param {Boolean} [options.window=false] Whether to allow Window.
     * @param {Boolean} [options.html=false] Whether to allow HTML strings.
     * @param {HTMLElement|Document} [options.context=this._context] The Document context.
     * @returns {Node|HTMLElement|ShadowRoot|Document|Window} The matching node.
     */
    _nodeFind(nodes, options = {}) {
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

        const nodeFilter = this._nodeFilterFactory(options);

        if (nodeFilter(nodes)) {
            return nodes;
        }

        const node = Core.wrap(nodes).slice().shift();

        return node && nodeFilter(node) ?
            node :
            null;
    },

    /**
     * Return a node filter callback.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
     * @returns {DOM~filterCallback} The node filter callback.
     */
    _parseFilter(filter) {
        if (!filter) {
            return false;
        }

        if (Core.isFunction(filter)) {
            return filter;
        }

        if (Core.isString(filter)) {
            return node =>
                Core.isElement(node) &&
                DOM._is(node, filter);
        }

        if (Core.isNode(filter) || Core.isShadow(filter)) {
            return node => DOM._isSame(node, filter);
        }

        filter = this._nodeFilter(filter, { node: true, shadow: true });
        if (filter.length) {
            return node => filter.includes(node);
        }

        return false;
    },

    /**
     * Return a node contains filter callback.
     * @param {string|array|Node|NodeList|HTMLElement|HTMLCollection|ShadowRoot|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
     * @returns {DOM~filterCallback} The node contains filter callback.
     */
    _parseFilterContains(filter) {
        if (!filter) {
            return false;
        }

        if (Core.isFunction(filter)) {
            return filter;
        }

        if (Core.isString(filter)) {
            return node => !!this.findOne(filter, node);
        }

        if (Core.isNode(filter) || Core.isShadow(filter)) {
            return node => DOM._has(node, filter);
        }

        filter = this._nodeFilter(filter, { node: true, shadow: true });
        if (filter.length) {
            return node => filter.some(other => DOM._has(node, other));
        }

        return false;
    }

});
