/**
 * QuerySet Manipulation
 */

Object.assign(QuerySet.prototype, {

    /**
     * Clone each node.
     * @param {object} options Options for cloning the node.
     * @param {Boolean} [options.deep=true] Whether to also clone all descendent nodes.
     * @param {Boolean} [options.events] Whether to also clone events.
     * @param {Boolean} [options.data] Whether to also clone custom data.
     * @param {Boolean} [options.animations] Whether to also clone animations.
     * @returns {QuerySet} A new QuerySet object.
     */
    clone(options) {
        return new this.constructor(
            this._dom.clone(this, options)
        );
    },

    /**
     * Detach each node from the DOM.
     * @returns {QuerySet} The QuerySet object.
     */
    detach() {
        this._dom.detach(this);

        return this;
    },

    /**
     * Remove all children of each node from the DOM.
     * @returns {QuerySet} The QuerySet object.
     */
    empty() {
        this._dom.empty(this);

        return this;
    },

    /**
     * Remove each node from the DOM.
     * @returns {QuerySet} The QuerySet object.
     */
    remove() {
        this._dom.remove(this);

        return this.pushStack([]);
    },

    /**
     * Replace each other node with nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The input node(s), or a query selector string.
     * @returns {QuerySet} The QuerySet object.
     */
    replaceAll(others) {
        this._dom.replaceAll(this, others);

        return this;
    },

    /**
     * Replace each node with other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The input node(s), or a query selector or HTML string.
     * @returns {QuerySet} The QuerySet object.
     */
    replaceWith(others) {
        this._dom.replaceWith(this, others);

        return this;
    }

});
