/**
 * DOM Filter
 */

Object.assign(DOM.prototype, {

    /**
     * Return all nodes connected to the DOM.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    connected(nodes) {
        return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
            .filter(node => DOMNode.isConnected(node));
    },

    /**
     * Return all nodes considered equal to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    equal(nodes, others) {
        others = this.parseNodes(others, { node: true, fragment: true, shadow: true });

        return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
            .filter(node =>
                others.some(other => DOMNode.isEqual(node, other))
            );
    },

    /**
     * Return all nodes matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {array} The filtered nodes.
     */
    filter(nodes, filter) {
        filter = this.parseFilter(filter);

        return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
            .filter((node, index) => !filter || filter(node, index));
    },

    /**
     * Return the first node matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {Node|HTMLElement|DocumentFragment|ShadowRoot} The filtered node.
     */
    filterOne(nodes, filter) {
        filter = this.parseFilter(filter);

        return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
            .find((node, index) => !filter || filter(node, index)) || null;
    },

    /**
     * Return all "fixed" nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    fixed(nodes) {
        return this.parseNodes(nodes, { node: true })
            .filter(node =>
                (Core.isElement(node) && DOM._css(node, 'position') === 'fixed') ||
                DOM._parents(
                    node,
                    parent =>
                        Core.isElement(parent) && DOM._css(parent, 'position') === 'fixed',
                    false,
                    true
                ).length
            );
    },

    /**
     * Return all hidden nodes.
     * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    hidden(nodes) {
        return this.parseNodes(nodes, { node: true, document: true, window: true })
            .filter(node => !DOM._isVisible(node));
    },

    /**
     * Return all nodes not matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {array} The filtered nodes.
     */
    not(nodes, filter) {
        filter = this.parseFilter(filter);

        return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
            .filter((node, index) => filter && !filter(node, index));
    },

    /**
     * Return the first node not matching a filter.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {array} The filtered nodes.
     */
    notOne(nodes, filter) {
        filter = this.parseFilter(filter);

        return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
            .find((node, index) => filter && !filter(node, index));
    },

    /**
     * Return all nodes considered identical to any of the other nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    same(nodes, others) {
        others = this.parseNodes(others, { node: true, fragment: true, shadow: true });

        return this.parseNodes(nodes, { node: true, fragment: true, shadow: true })
            .filter(node =>
                others.some(other => DOMNode.isSame(node, other))
            );
    },

    /**
     * Return all visible nodes.
     * @param {string|array|Node|HTMLElement|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    visible(nodes) {
        return this.parseNodes(nodes, { node: true, document: true, window: true })
            .filter(node => DOM._isVisible(node));
    },

    /**
     * Return all nodes with an animation.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    withAnimation(nodes) {
        return this.parseNodes(nodes)
            .filter(node =>
                DOM._hasAnimation(node)
            );
    },

    /**
     * Return all nodes with a specified attribute.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} attribute The attribute name.
     * @returns {array} The filtered nodes.
     */
    withAttribute(nodes, attribute) {
        return this.parseNodes(nodes)
            .filter(node =>
                DOMNode.hasAttribute(node, attribute)
            );
    },

    /**
     * Return all nodes with child elements.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    withChildren(nodes) {
        return this.parseNodes(nodes, { fragment: true, shadow: true, document: true })
            .filter(node =>
                DOMNode.hasChildren(node)
            );
    },

    /**
     * Return all nodes with any of the specified classes.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     * @returns {array} The filtered nodes.
     */
    withClass(nodes, ...classes) {
        classes = DOM._parseClasses(classes);

        return this.parseNodes(nodes)
            .filter(node =>
                classes.some(className =>
                    DOMNode.hasClass(node, className)
                )
            );
    },

    /**
     * Return all nodes with a CSS animation.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    withCSSAnimation(nodes) {
        return this.parseNodes(nodes)
            .filter(node =>
                DOM._hasCSSAnimation(node)
            );
    },

    /**
     * Return all nodes with a CSS transition.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @returns {array} The filtered nodes.
     */
    withCSSTransition(nodes) {
        return this.parseNodes(nodes)
            .filter(node =>
                DOM._hasCSSTransition(node)
            );
    },

    /**
     * Return all nodes with custom data.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     * @returns {array} The filtered nodes.
     */
    withData(nodes, key) {
        return this.parseNodes(nodes, { node: true, fragment: true, shadow: true, document: true, window: true })
            .filter(node =>
                DOM._hasData(node, key)
            );
    },

    /**
     * Return all nodes with a descendent matching a filter.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet|DOM~filterCallback} [filter] The filter node(s), a query selector string or custom filter function.
     * @returns {array} The filtered nodes.
     */
    withDescendent(nodes, filter) {
        filter = this.parseFilterContains(filter);

        return this.parseNodes(nodes, { fragment: true, shadow: true, document: true })
            .filter((node, index) => !filter || filter(node, index));
    },

    /**
     * Return all nodes with a specified property.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} property The property name.
     * @returns {array} The filtered nodes.
     */
    withProperty(nodes, property) {
        return this.parseNodes(nodes)
            .filter(node =>
                DOMNode.hasProperty(node, property)
            );
    }

});
