/**
 * QuerySet Move
 */

Object.assign(QuerySet.prototype, {

    /**
     * Insert each other node after the first node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     * @returns {QuerySet} The QuerySet object.
     */
    after(others) {
        this._dom.after(this, others);

        return this;
    },

    /**
     * Append each other node to the first node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     * @returns {QuerySet} The QuerySet object.
     */
    append(others) {
        this._dom.append(this, others);

        return this;
    },

    /**
     * Append each node to the first other node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     * @returns {QuerySet} The QuerySet object.
     */
    appendTo(others) {
        this._dom.appendTo(this, others);

        return this;
    },

    /**
     * Insert each other node before the first node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     * @returns {QuerySet} The QuerySet object.
     */
    before(others) {
        this._dom.before(this, others);

        return this;
    },

    /**
     * Insert each node after the first other node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     * @returns {QuerySet} The QuerySet object.
     */
    insertAfter(others) {
        this._dom.insertAfter(this, others);

        return this;
    },

    /**
     * Insert each node before the first other node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     * @returns {QuerySet} The QuerySet object.
     */
    insertBefore(others) {
        this._dom.insertBefore(this, others);

        return this;
    },

    /**
     * Prepend each other node to the first node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector or HTML string.
     * @returns {QuerySet} The QuerySet object.
     */
    prepend(others) {
        this._dom.prepend(this, others);

        return this;
    },

    /**
     * Prepend each node to the first other node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     * @returns {QuerySet} The QuerySet object.
     */
    prependTo(others) {
        this._dom.prependTo(this, others);

        return this;
    },

});
