/**
 * QuerySet Traversal
 */

Object.assign(QuerySet.prototype, {

    /**
     * Return the first child of each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {QuerySet} The QuerySet object.
     */
    child(filter) {
        return this.pushStack(
            this._dom.child(this, filter)
        );
    },

    /**
     * Return all children of each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {QuerySet} The QuerySet object.
     */
    children(filter) {
        return this.pushStack(
            this._dom.children(this, filter)
        );
    },

    /**
     * Return the closest ancestor to each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @returns {QuerySet} The QuerySet object.
     */
    closest(filter, limit) {
        return this.pushStack(
            this._dom.closest(this, filter, limit)
        );
    },

    /**
     * Return the common ancestor of all nodes.
     * @returns {QuerySet} The QuerySet object.
     */
    commonAncestor() {
        return this.pushNode(
            this._dom.commonAncestor(this)
        );
    },

    /**
     * Return all children of each node (including text and comment nodes).
     * @returns {QuerySet} The QuerySet object.
     */
    contents() {
        return this.pushStack(
            this._dom.contents(this)
        );
    },

    /**
     * Return the DocumentFragment of the first node.
     * @returns {QuerySet} The QuerySet object.
     */
    fragment() {
        return this.pushNode(
            this._dom.fragment(this)
        );
    },

    /**
     * Return the next sibling for each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {QuerySet} The QuerySet object.
     */
    next(filter) {
        return this.pushStack(
            this._dom.next(this, filter)
        );
    },

    /**
     * Return all next siblings for each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @returns {QuerySet} The QuerySet object.
     */
    nextAll(filter, limit) {
        return this.pushStack(
            this._dom.nextAll(this, filter, limit)
        );
    },

    /**
     * Return the offset parent (relatively positioned) of the first node.
     * @returns {QuerySet} The QuerySet object.
     */
    offsetParent() {
        return this.pushNode(
            this._dom.offsetParent(this)
        );
    },

    /**
     * Return the parent of each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {QuerySet} The QuerySet object.
     */
    parent(filter) {
        return this.pushStack(
            this._dom.parent(this, filter)
        );
    },

    /**
     * Return all parents of each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @returns {QuerySet} The QuerySet object.
     */
    parents(filter, limit) {
        return this.pushStack(
            this._dom.parents(this, filter, limit)
        );
    },

    /**
     * Return the previous sibling for each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {QuerySet} The QuerySet object.
     */
    prev(filter) {
        return this.pushStack(
            this._dom.prev(this, filter)
        );
    },

    /**
     * Return all previous siblings for each node (optionally matching a filter, and before a limit).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [limit] The limit node(s), a query selector string or custom filter function.
     * @returns {QuerySet} The QuerySet object.
     */
    prevAll(filter, limit) {
        return this.pushStack(
            this._dom.prevAll(this, filter, limit)
        );
    },

    /**
     * Return the ShadowRoot of the first node.
     * @returns {QuerySet} The QuerySet object.
     */
    shadow() {
        return this.pushNode(
            this._dom.shadow(this)
        );
    },

    /**
     * Return all siblings for each node (optionally matching a filter).
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @param {Boolean} [elementsOnly=true] Whether to only return element nodes.
     * @returns {QuerySet} The QuerySet object.
     */
    siblings(filter) {
        return this.pushStack(
            this._dom.siblings(this, filter)
        );
    }

});
