/**
 * DOM Tests
 */

Object.assign(DOM.prototype, {

    /**
     * Returns true if any of the elements contains a descendent matching a filter.
     * @param {string|HTMLElement|HTMLCollection|ShadowRoot|Document|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|HTMLElement[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {Boolean} TRUE if any of the nodes contains a descendent matching the filter, otherwise FALSE.
     */
    contains(nodes, filter) {
        filter = this._parseFilterContains(filter);

        return this._nodeFilter(nodes, { shadow: true, document: true })
            .some(node =>
                !filter ||
                filter(node)
            );
    },

    /**
     * Returns true if any of the elements has a CSS animation.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes has a CSS animation, otherwise FALSE.
     */
    hasAnimation(nodes) {
        return this._nodeFilter(nodes)
            .some(node =>
                !!parseFloat(
                    this._css(node, 'animation-duration')
                )
            );
    },

    /**
     * Returns true if any of the elements has a specified attribute.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} attribute The attribute name.
     * @returns {Boolean} TRUE if any of the nodes has the attribute, otherwise FALSE.
     */
    hasAttribute(nodes, attribute) {
        return this._nodeFilter(nodes)
            .some(node =>
                node.hasAttribute(attribute)
            );
    },

    /**
     * Returns true if any of the elements has any of the specified classes.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     * @returns {Boolean} TRUE if any of the nodes has any of the classes, otherwise FALSE.
     */
    hasClass(nodes, ...classes) {
        classes = DOM._parseClasses(classes);

        return this._nodeFilter(nodes)
            .some(node =>
                classes.some(className =>
                    node.classList.contains(className)
                )
            );
    },

    /**
     * Returns true if any of the nodes has custom data.
     * @param {string|Node|NodeList|HTMLCollection|Window|Node[]} nodes The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     * @returns {Boolean} TRUE if any of the nodes has custom data, otherwise FALSE.
     */
    hasData(nodes, key) {
        return this._nodeFilter(nodes, { node: true, shadow: true, document: true, window: true })
            .some(node =>
                this._data.has(node) &&
                (
                    !key ||
                    this._data.get(node)
                        .hasOwnProperty(key)
                )
            );
    },

    /**
     * Returns true if any of the elements has a specified property.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string} property The property name.
     * @returns {Boolean} TRUE if any of the nodes has the property, otherwise FALSE.
     */
    hasProperty(nodes, property) {
        return this._nodeFilter(nodes)
            .some(node =>
                node.hasOwnProperty(property)
            );
    },

    /**
     * Returns true if any of the elements has a CSS transition.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes has a CSS transition, otherwise FALSE.
     */
    hasTransition(nodes) {
        return this._nodeFilter(nodes)
            .some(node =>
                !!parseFloat(
                    this._css(node, 'transition-duration')
                )
            );
    },

    /**
     * Returns true if any of the elements matches a filter.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|HTMLElement[]|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {Boolean} TRUE if any of the nodes matches the filter, otherwise FALSE.
     */
    is(nodes, filter) {
        filter = this._parseFilter(filter);

        return this._nodeFilter(nodes)
            .some(node =>
                !filter ||
                filter(node)
            );
    },

    /**
     * Returns true if any of the nodes is connected to the DOM.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is connected to the DOM, otherwise FALSE.
     */
    isConnected(nodes) {
        return this._nodeFilter(nodes, {
            node: true,
            shadow: true
        }).some(node => DOM._isConnected(node));
    },

    /**
     * Returns true if any of the nodes is considered equal to any of the other nodes.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is considered equal to any of the other nodes, otherwise FALSE.
     */
    isEqual(nodes, others) {
        others = this._nodeFilter(others, { node: true, shadow: true });
        return this._nodeFilter(nodes, { node: true, shadow: true })
            .some(node =>
                others.some(other => DOM._isEqual(node, other))
            );
    },

    /**
     * Returns true if any of the elements or a parent of any of the elements is "fixed".
     * @param {string|Node|NodeList|HTMLCollection|HTMLElement[]} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is "fixed", otherwise FALSE.
     */
    isFixed(nodes) {
        return this._nodeFilter(nodes, { node: true, shadow: true })
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
     * @param {string|Node|NodeList|HTMLCollection|Document|Window|Node[]} nodes The input node(s), or a query selector string.
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
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} others The other node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is considered identical to any of the other nodes, otherwise FALSE.
     */
    isSame(nodes, others) {
        others = this._nodeFilter(others, { node: true, shadow: true });

        return this._nodeFilter(nodes, { node: true, shadow: true })
            .some(node =>
                others.find(other => DOM._isSame(node, other))
            );
    },

    /**
     * Returns true if any of the nodes is visible.
     * @param {string|Node|NodeList|HTMLCollection|Document|Window|Node[]} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is visible, otherwise FALSE.
     */
    isVisible(nodes) {
        return this._nodeFilter(nodes, { node: true, document: true, window: true })
            .some(node =>
                DOM._isVisible(node)
            );
    }

});
