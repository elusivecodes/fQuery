/**
 * QuerySet Filter
 */

Object.assign(QuerySet.prototype, {

    /**
     * Return all nodes connected to the DOM.
     * @returns {QuerySet} The QuerySet object.
     */
    connected() {
        return this.pushStack(
            this._dom.connected(this)
        );
    },

    /**
     * Return all nodes considered equal to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     * @returns {QuerySet} The QuerySet object.
     */
    equal(others) {
        return this.pushStack(
            this._dom.equal(this, others)
        );
    },

    /**
     * Return all nodes matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {QuerySet} The QuerySet object.
     */
    filter(filter) {
        return this.pushStack(
            this._dom.filter(this, filter)
        );
    },

    /**
     * Return the first node matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {QuerySet} The QuerySet object.
     */
    filterOne(filter) {
        return this.pushNode(
            this._dom.filterOne(this, filter)
        );
    },

    /**
     * Return all "fixed" nodes.
     * @returns {QuerySet} The QuerySet object.
     */
    fixed() {
        return this.pushStack(
            this._dom.fixed(this)
        );
    },

    /**
     * Return all hidden nodes.
     * @returns {QuerySet} The QuerySet object.
     */
    hidden() {
        return this.pushStack(
            this._dom.hidden(this)
        );
    },

    /**
     * Return all nodes not matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {QuerySet} The QuerySet object.
     */
    not(filter) {
        return this.pushStack(
            this._dom.not(this, filter)
        );
    },

    /**
     * Return the first node not matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {QuerySet} The QuerySet object.
     */
    notOne(filter) {
        return this.pushNode(
            this._dom.notOne(this, filter)
        );
    },

    /**
     * Return all nodes considered identical to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     * @returns {QuerySet} The QuerySet object.
     */
    same(others) {
        return this.pushStack(
            this._dom.same(this, others)
        );
    },

    /**
     * Return all visible nodes.
     * @returns {QuerySet} The QuerySet object.
     */
    visible() {
        return this.pushStack(
            this._dom.visible(this)
        );
    },

    /**
     * Return all nodes with an animation.
     * @returns {QuerySet} The QuerySet object.
    */
    withAnimation() {
        return this.pushStack(
            this._dom.withAnimation(this)
        );
    },

    /**
     * Return all nodes with a specified attribute.
     * @param {string} attribute The attribute name.
     * @returns {QuerySet} The QuerySet object.
     */
    withAttribute(attribute) {
        return this.pushStack(
            this._dom.withAttribute(this, attribute)
        );
    },

    /**
     * Return all nodes with child elements.
     * @returns {QuerySet} The QuerySet object.
     */
    withChildren() {
        return this.pushStack(
            this._dom.withChildren(this)
        );
    },

    /**
     * Return all nodes with any of the specified classes.
     * @param {...string|string[]} classes The classes.
     * @returns {QuerySet} The QuerySet object.
     */
    withClass(classes) {
        return this.pushStack(
            this._dom.withClass(this, classes)
        );
    },

    /**
     * Return all nodes with a CSS animation.
     * @returns {QuerySet} The QuerySet object.
    */
    withCSSAnimation() {
        return this.pushStack(
            this._dom.withCSSAnimation(this)
        );
    },

    /**
     * Return all nodes with a CSS transition.
     * @returns {QuerySet} The QuerySet object.
     */
    withCSSTransition() {
        return this.pushStack(
            this._dom.withCSSTransition(this)
        );
    },

    /**
     * Return all nodes with custom data.
     * @param {string} [key] The data key.
     * @returns {QuerySet} The QuerySet object.
     */
    withData(key) {
        return this.pushStack(
            this._dom.withData(this, key)
        );
    },

    /**
     * Return all elements with a descendent matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {QuerySet} The QuerySet object.
     */
    withDescendent(filter) {
        return this.pushStack(
            this._dom.withDescendent(this, filter)
        );
    },

    /**
     * Return all nodes with a specified property.
     * @param {string} property The property name.
     * @returns {QuerySet} The QuerySet object.
     */
    withProperty(property) {
        return this.pushStack(
            this._dom.withProperty(this, property)
        );
    }

});
