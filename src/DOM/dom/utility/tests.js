/**
 * DOM Tests
 */

Object.assign(DOM.prototype, {

    /**
     * Returns true if any of the nodes has an animation.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes has an animation, otherwise FALSE.
     */
    hasAnimation(nodes) {
        return this.parseNodes(nodes)
            .some(node =>
                this.constructor._hasAnimation(node)
            );
    },

    /**
     * Returns true if any of the nodes has a specified attribute.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} attribute The attribute name.
     * @returns {Boolean} TRUE if any of the nodes has the attribute, otherwise FALSE.
     */
    hasAttribute(nodes, attribute) {
        return this.parseNodes(nodes)
            .some(node =>
                DOMNode.hasAttribute(node, attribute)
            );
    },

    /**
     * Returns true if any of the nodes has child nodes.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if the any of the nodes has child nodes, otherwise FALSE.
     */
    hasChildren(nodes) {
        return this.parseNodes(nodes, { fragment: true, shadow: true, document: true })
            .some(node =>
                DOMNode.hasChildren(node)
            );
    },

    /**
     * Returns true if any of the nodes has any of the specified classes.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     * @returns {Boolean} TRUE if any of the nodes has any of the classes, otherwise FALSE.
     */
    hasClass(nodes, ...classes) {
        classes = this.constructor._parseClasses(classes);

        return this.parseNodes(nodes)
            .some(node =>
                classes.some(className =>
                    DOMNode.hasClass(node, className)
                )
            );
    },

    /**
     * Returns true if any of the nodes has a CSS animation.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes has a CSS animation, otherwise FALSE.
     */
    hasCSSAnimation(nodes) {
        return this.parseNodes(nodes)
            .some(node =>
                this.constructor._hasCSSAnimation(node)
            );
    },

    /**
     * Returns true if any of the nodes has a CSS transition.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes has a CSS transition, otherwise FALSE.
     */
    hasCSSTransition(nodes) {
        return this.parseNodes(nodes)
            .some(node =>
                this.constructor._hasCSSTransition(node)
            );
    },

    /**
     * Returns true if any of the nodes has custom data.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     * @returns {Boolean} TRUE if any of the nodes has custom data, otherwise FALSE.
     */
    hasData(nodes, key) {
        return this.parseNodes(nodes, { fragment: true, shadow: true, document: true, window: true })
            .some(node =>
                this.constructor._hasData(node, key)
            );
    },

    /**
     * Returns true if any of the nodes contains a descendent matching a filter.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {Boolean} TRUE if any of the nodes contains a descendent matching the filter, otherwise FALSE.
     */
    hasDescendent(nodes, filter) {
        filter = this.parseFilterContains(filter);

        return this.parseNodes(nodes, { fragment: true, shadow: true, document: true })
            .some(node =>
                !filter ||
                filter(node)
            );
    },

    /**
     * Returns true if any of the nodes has a DocumentFragment.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes has a DocumentFragment, otherwise FALSE.
     */
    hasFragment(nodes) {
        return this.parseNodes(nodes)
            .some(node =>
                this.constructor._hasFragment(node)
            );
    },

    /**
     * Returns true if any of the nodes has a specified property.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} property The property name.
     * @returns {Boolean} TRUE if any of the nodes has the property, otherwise FALSE.
     */
    hasProperty(nodes, property) {
        return this.parseNodes(nodes)
            .some(node =>
                DOMNode.hasProperty(node, property)
            );
    },

    /**
     * Returns true if any of the nodes has a ShadowRoot.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes has a ShadowRoot, otherwise FALSE.
     */
    hasShadow(nodes) {
        return this.parseNodes(nodes)
            .some(node =>
                this.constructor._hasShadow(node)
            );
    },

    /**
     * Returns true if any of the nodes matches a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {Boolean} TRUE if any of the nodes matches the filter, otherwise FALSE.
     */
    is(nodes, filter) {
        filter = this.parseFilter(filter);

        return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
            .some(node =>
                !filter ||
                filter(node)
            );
    },

    /**
     * Returns true if any of the nodes is connected to the DOM.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is connected to the DOM, otherwise FALSE.
     */
    isConnected(nodes) {
        return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
            .some(node => DOMNode.isConnected(node));
    },

    /**
     * Returns true if any of the nodes is considered equal to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is considered equal to any of the other nodes, otherwise FALSE.
     */
    isEqual(nodes, others) {
        others = this.parseNodes(others, { node: true, fragment: true, shadow: true });

        return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
            .some(node =>
                others.some(other => DOMNode.isEqual(node, other))
            );
    },

    /**
     * Returns true if any of the nodes or a parent of any of the nodes is "fixed".
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is "fixed", otherwise FALSE.
     */
    isFixed(nodes) {
        return this.parseNodes(nodes, { node: true })
            .some(node =>
                (Core.isElement(node) && this.constructor._css(node, 'position') === 'fixed') ||
                this.constructor._parents(
                    node,
                    parent =>
                        Core.isElement(parent) && this.constructor._css(parent, 'position') === 'fixed',
                    false,
                    true
                ).length
            );
    },

    /**
     * Returns true if any of the nodes is hidden.
     * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is hidden, otherwise FALSE.
     */
    isHidden(nodes) {
        return this.parseNodes(nodes, { node: true, document: true, window: true })
            .some(node =>
                !this.constructor._isVisible(node)
            );
    },

    /**
     * Returns true if any of the nodes is considered identical to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is considered identical to any of the other nodes, otherwise FALSE.
     */
    isSame(nodes, others) {
        others = this.parseNodes(others, { node: true, fragment: true, shadow: true });

        return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
            .some(node =>
                others.some(other => DOMNode.isSame(node, other))
            );
    },

    /**
     * Returns true if any of the nodes is visible.
     * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {Boolean} TRUE if any of the nodes is visible, otherwise FALSE.
     */
    isVisible(nodes) {
        return this.parseNodes(nodes, { node: true, document: true, window: true })
            .some(node =>
                this.constructor._isVisible(node)
            );
    }

});
