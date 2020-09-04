/**
 * DOM Query
 */

Object.assign(DOM.prototype, {

    /**
     * Add a function to the ready queue or return a QuerySetImmutable.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet|function} query The input query.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
     * @param {Boolean} [mutable=false] Whether to create a mutable QuerySet.
     * @returns {QuerySet} The new QuerySet object.
     */
    query(query, context = null, mutable = false) {
        if (Core.isFunction(query)) {
            return this.ready(query);
        }

        const nodes = this.parseNodes(query, {
            node: true,
            fragment: true,
            shadow: true,
            document: true,
            window: true,
            html: true,
            context: context ?
                context :
                this._context
        });

        return mutable ?
            new QuerySet(nodes, this) :
            new QuerySetImmutable(nodes, this);
    },

    /**
     * Add a function to the ready queue or return a QuerySet.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet|function} query The input query.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
     * @returns {QuerySet} The new QuerySet object.
     */
    queryMutable(query, context = null) {
        return this.query(query, context, true);
    },

    /**
     * Return a QuerySetImmutable for the first node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} query The input query.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
     * @param {Boolean} [mutable=false] Whether to create a mutable QuerySet.
     * @returns {QuerySet} The new QuerySet object.
     */
    queryOne(query, context = null, mutable = false) {
        const node = this.parseNode(query, {
            node: true,
            fragment: true,
            shadow: true,
            document: true,
            window: true,
            html: true,
            context: context ?
                context :
                this._context
        });

        const nodes = [node].filter(v => v);

        return mutable ?
            new QuerySet(nodes, this) :
            new QuerySetImmutable(nodes, this);
    },

    /**
     * Return a QuerySet for the first node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} query The input query.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} [context] The context to search in.
     * @returns {QuerySet} The new QuerySet object.
     */
    queryOneMutable(query, context = null) {
        return this.queryOne(query, context, true);
    }

});
