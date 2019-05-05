/**
 * DOM Tests
 */

Object.assign(DOM.prototype, {

    /**
     * Returns true if any of the nodes has a CSS animation.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes has a CSS animation, otherwise FALSE.
     */
    hasAnimation(nodes) {
        return this._nodeFilter(nodes)
            .some(node =>
                this._hasAnimation(node)
            );
    },

    /**
     * Returns true if any of the nodes has a specified attribute.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} attribute The attribute name.
     * @returns {Boolean} TRUE if any of the nodes has the attribute, otherwise FALSE.
     */
    hasAttribute(nodes, attribute) {
        return this._nodeFilter(nodes)
            .some(node =>
                DOM._hasAttribute(node, attribute)
            );
    },

    /**
     * Returns true if any of the nodes has child elements.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|HTMLCollection} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if the any of the nodes has child elements, otherwise FALSE.
     */
    hasChildren(nodes) {
        return this._nodeFilter(nodes, { fragment: true, shadow: true, document: true })
            .some(node =>
                DOM._hasChildren(node)
            );
    },

    /**
     * Returns true if any of the nodes has any of the specified classes.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     * @returns {Boolean} TRUE if any of the nodes has any of the classes, otherwise FALSE.
     */
    hasClass(nodes, ...classes) {
        classes = DOM._parseClasses(classes);

        return this._nodeFilter(nodes)
            .some(node =>
                DOM._hasClass(node, classes)
            );
    },

    /**
     * Returns true if any of the nodes has custom data.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     * @returns {Boolean} TRUE if any of the nodes has custom data, otherwise FALSE.
     */
    hasData(nodes, key) {
        return this._nodeFilter(nodes, { node: true, fragment: true, shadow: true, document: true, window: true })
            .some(node =>
                this._hasData(node, key)
            );
    },

    /**
     * Returns true if any of the nodes contains a descendent matching a filter.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {Boolean} TRUE if any of the nodes contains a descendent matching the filter, otherwise FALSE.
     */
    hasDescendent(nodes, filter) {
        filter = this._parseFilterContains(filter);

        return this._nodeFilter(nodes, { fragment: true, shadow: true, document: true })
            .some(node =>
                !filter ||
                filter(node)
            );
    },

    /**
     * Returns true if any of the nodes has a specified property.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string} property The property name.
     * @returns {Boolean} TRUE if any of the nodes has the property, otherwise FALSE.
     */
    hasProperty(nodes, property) {
        return this._nodeFilter(nodes)
            .some(node =>
                DOM._hasProperty(node, property)
            );
    },

    /**
     * Returns true if any of the nodes has a CSS transition.
     * @param {string|array|HTMLElement|HTMLCollection} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes has a CSS transition, otherwise FALSE.
     */
    hasTransition(nodes) {
        return this._nodeFilter(nodes)
            .some(node =>
                this._hasTransition(node)
            );
    },

    /**
     * Returns true if any of the nodes matches a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {Boolean} TRUE if any of the nodes matches the filter, otherwise FALSE.
     */
    is(nodes, filter) {
        filter = this._parseFilter(filter);

        return this._nodeFilter(nodes, { node: true, fragment: true, shadow: true })
            .some(node =>
                !filter ||
                filter(node)
            );
    },

    /**
     * Returns true if any of the nodes is connected to the DOM.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is connected to the DOM, otherwise FALSE.
     */
    isConnected(nodes) {
        return this._nodeFilter(nodes, { node: true, fragment: true, shadow: true })
            .some(node => DOM._isConnected(node));
    },

    /**
     * Returns true if any of the nodes is considered equal to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} others The other node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is considered equal to any of the other nodes, otherwise FALSE.
     */
    isEqual(nodes, others) {
        others = this._nodeFilter(others, { node: true, fragment: true, shadow: true });

        return this._nodeFilter(nodes, { node: true, fragment: true, shadow: true })
            .some(node =>
                others.some(other => DOM._isEqual(node, other))
            );
    },

    /**
     * Returns true if any of the nodes or a parent of any of the nodes is "fixed".
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is "fixed", otherwise FALSE.
     */
    isFixed(nodes) {
        return this._nodeFilter(nodes, { node: true, fragment: true, shadow: true })
            .some(node =>
                (Core.isElement(node) && this._css(node, 'position') === 'fixed') ||
                DOM._parents(
                    node,
                    parent =>
                        this._css(parent, 'position') === 'fixed',
                    false,
                    true
                ).length
            );
    },

    /**
     * Returns true if any of the nodes is hidden.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is hidden, otherwise FALSE.
     */
    isHidden(nodes) {
        return this._nodeFilter(nodes, { node: true, document: true, window: true })
            .some(node =>
                !DOM._isVisible(node)
            );
    },

    /**
     * Returns true if any of the nodes is considered identical to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} others The other node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is considered identical to any of the other nodes, otherwise FALSE.
     */
    isSame(nodes, others) {
        others = this._nodeFilter(others, { node: true, fragment: true, shadow: true });

        return this._nodeFilter(nodes, { node: true, fragment: true, shadow: true })
            .some(node =>
                others.some(other => DOM._isSame(node, other))
            );
    },

    /**
     * Returns true if any of the nodes is visible.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is visible, otherwise FALSE.
     */
    isVisible(nodes) {
        return this._nodeFilter(nodes, { node: true, fragment: true, shadow: true, document: true, window: true })
            .some(node =>
                DOM._isVisible(node)
            );
    },

    /**
     * Returns true if a single node has a CSS animation.
     * @param {HTMLElement} node The input node.
     * @returns {Boolean} TRUE if the node has a CSS animation, otherwise FALSE.
     */
    _hasAnimation(node) {
        return !!parseFloat(
            this._css(node, 'animation-duration')
        );
    },

    /**
     * Returns true if a single node has custom data.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
     * @param {string} [key] The data key.
     * @returns {Boolean} TRUE if the node has custom data, otherwise FALSE.
     */
    _hasData(node, key) {
        return this._data.has(node) &&
            (
                !key ||
                this._data.get(node)
                    .hasOwnProperty(key)
            );
    },

    /**
     * Returns true if a single node has a CSS transition.
     * @param {HTMLElement} node The input node.
     * @returns {Boolean} TRUE if the has a CSS transition, otherwise FALSE.
     */
    _hasTransiton(node) {
        return !!parseFloat(
            this._css(node, 'transition-duration')
        );
    }

});
