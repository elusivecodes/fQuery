/**
 * DOM Filters
 */

Object.assign(DOM.prototype, {

    /**
     * Return a filtered array of nodes.
     * @param {string|Node|NodeList|HTMLCollection|Document|Node[]} nodes The input node(s), or a query selector or HTML string.
     * @param {object} [options] The options for filtering.
     * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
     * @param {Boolean} [options.document=false] Whether to allow Document.
     * @param {Boolean} [options.window=false] Whether to allow Window.
     * @param {Boolean} [options.html=false] Whether to allow HTML strings.
     * @param {HTMLElement|Document} [options.context=this._context] The Document context.
     * @returns {Node[]} The filtered array of nodes.
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
     * @param {Boolean} [options.document=false] Whether to allow Document.
     * @param {Boolean} [options.window=false] Whether to allow Window.
     * @returns {DOM~nodeCallback} The node filter function.
     */
    _nodeFilterFactory(options) {
        options = {
            node: false,
            document: false,
            window: false,
            ...options
        };

        if (options.window && options.document) {
            return options.node ?
                node => Core.isNode(node) || Core.isDocument(node) || Core.isWindow(node) :
                node => Core.isElement(node) || Core.isDocument(node) || Core.isWindow(node);
        }

        if (options.window) {
            return options.node ?
                node => Core.isNode(node) || Core.isWindow(node) :
                node => Core.isElement(node) || Core.isWindow(node);
        }

        if (options.document) {
            return options.node ?
                node => Core.isNode(node) || Core.isDocument(node) :
                node => Core.isElement(node) || Core.isDocument(node);
        }

        return options.node ?
            Core.isNode :
            Core.isElement;
    },

    /**
     * Return the first node matching a filter.
     * @param {string|Node|NodeList|HTMLCollection|Document|Node[]} nodes The input node(s), or a query selector or HTML string.
     * @param {object} [options] The options for filtering.
     * @param {Boolean} [options.node=false] Whether to allow text and comment nodes.
     * @param {Boolean} [options.document=false] Whether to allow Document.
     * @param {Boolean} [options.window=false] Whether to allow Window.
     * @param {Boolean} [options.html=false] Whether to allow HTML strings.
     * @param {HTMLElement|Document} [options.context=this._context] The Document context.
     * @returns {Node} The matching node.
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
     * Return an element filter callback.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
     * @returns {DOM~filterCallback} The element filter callback.
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

        if (Core.isNode(filter)) {
            return node => DOM._isSame(node, filter);
        }

        filter = this._nodeFilter(filter);
        if (filter.length) {
            return node => filter.includes(node);
        }

        return false;
    },

    /**
     * Return an element contains filter callback.
     * @param {string|Node|NodeList|HTMLCollection|Node[]|DOM~filterCallback} filter The filter node(s), a query selector string or custom filter function.
     * @returns {DOM~filterCallback} The element contains filter callback.
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

        if (Core.isElement(filter)) {
            return node => DOM._has(node, filter);
        }

        filter = this._nodeFilter(filter);
        if (filter.length) {
            return node => filter.some(other => DOM._has(node, other));
        }

        return false;
    }

});
