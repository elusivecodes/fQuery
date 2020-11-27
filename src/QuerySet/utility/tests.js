/**
 * QuerySet Tests
 */

Object.assign(QuerySet.prototype, {

    /**
     * Returns true if any of the nodes has an animation.
     * @returns {Boolean} TRUE if any of the nodes has an animation, otherwise FALSE.
     */
    hasAnimation() {
        return this._dom.hasAnimation(this);
    },

    /**
     * Returns true if any of the nodes has a specified attribute.
     * @param {string} attribute The attribute name.
     * @returns {Boolean} TRUE if any of the nodes has the attribute, otherwise FALSE.
     */
    hasAttribute(attribute) {
        return this._dom.hasAttribute(this, attribute);
    },

    /**
     * Returns true if any of the nodes has child nodes.
     * @returns {Boolean} TRUE if the any of the nodes has child nodes, otherwise FALSE.
     */
    hasChildren() {
        return this._dom.hasChildren(this);
    },

    /**
     * Returns true if any of the nodes has any of the specified classes.
     * @param {...string|string[]} classes The classes.
     * @returns {Boolean} TRUE if any of the nodes has any of the classes, otherwise FALSE.
     */
    hasClass(...classes) {
        return this._dom.hasClass(this, ...classes);
    },

    /**
     * Returns true if any of the nodes has a CSS animation.
     * @returns {Boolean} TRUE if any of the nodes has a CSS animation, otherwise FALSE.
     */
    hasCSSAnimation() {
        return this._dom.hasCSSAnimation(this);
    },

    /**
     * Returns true if any of the nodes has a CSS transition.
     * @returns {Boolean} TRUE if any of the nodes has a CSS transition, otherwise FALSE.
     */
    hasCSSTransition() {
        return this._dom.hasCSSTransition(this);
    },

    /**
     * Returns true if any of the nodes has custom data.
     * @param {string} [key] The data key.
     * @returns {Boolean} TRUE if any of the nodes has custom data, otherwise FALSE.
     */
    hasData(key) {
        return this._dom.hasData(this, key);
    },

    /**
     * Returns true if any of the nodes has the specified dataset value.
     * @param {string} [key] The dataset key.
     * @returns {Boolean} TRUE if any of the nodes has the dataset value, otherwise FALSE.
     */
    hasDataset(key) {
        return this._dom.hasDataset(this, key);
    },

    /**
     * Returns true if any of the nodes contains a descendent matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {Boolean} TRUE if any of the nodes contains a descendent matching the filter, otherwise FALSE.
     */
    hasDescendent(filter) {
        return this._dom.hasDescendent(this, filter);
    },

    /**
     * Returns true if any of the nodes has a DocumentFragment.
     * @returns {Boolean} TRUE if any of the nodes has a DocumentFragment, otherwise FALSE.
     */
    hasFragment() {
        return this._dom.hasFragment(this);
    },

    /**
     * Returns true if any of the nodes has a specified property.
     * @param {string} property The property name.
     * @returns {Boolean} TRUE if any of the nodes has the property, otherwise FALSE.
     */
    hasProperty(property) {
        return this._dom.hasProperty(this, property);
    },

    /**
     * Returns true if any of the nodes has a ShadowRoot.
     * @returns {Boolean} TRUE if any of the nodes has a ShadowRoot, otherwise FALSE.
     */
    hasShadow() {
        return this._dom.hasShadow(this);
    },

    /**
     * Returns true if any of the nodes matches a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {Boolean} TRUE if any of the nodes matches the filter, otherwise FALSE.
     */
    is(filter) {
        return this._dom.is(this, filter);
    },

    /**
     * Returns true if any of the nodes is connected to the DOM.
     * @returns {Boolean} TRUE if any of the nodes is connected to the DOM, otherwise FALSE.
     */
    isConnected() {
        return this._dom.isConnected(this);
    },

    /**
     * Returns true if any of the nodes is considered equal to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is considered equal to any of the other nodes, otherwise FALSE.
     */
    isEqual(others) {
        return this._dom.isEqual(this, others);
    },

    /**
     * Returns true if any of the elements or a parent of any of the elements is "fixed".
     * @returns {Boolean} TRUE if any of the nodes is "fixed", otherwise FALSE.
     */
    isFixed() {
        return this._dom.isFixed(this);
    },

    /**
     * Returns true if any of the nodes is hidden.
     * @returns {Boolean} TRUE if any of the nodes is hidden, otherwise FALSE.
     */
    isHidden() {
        return this._dom.isHidden(this);
    },

    /**
     * Returns true if any of the nodes is considered identical to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is considered identical to any of the other nodes, otherwise FALSE.
     */
    isSame(others) {
        return this._dom.isSame(this, others);
    },

    /**
     * Returns true if any of the nodes is visible.
     * @returns {Boolean} TRUE if any of the nodes is visible, otherwise FALSE.
     */
    isVisible() {
        return this._dom.isVisible(this);
    }

});
