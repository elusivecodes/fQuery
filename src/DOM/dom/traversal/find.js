/**
 * DOM Find
 */

Object.assign(DOM.prototype, {

    /**
     * Return all nodes matching a selector.
     * @param {string} selector The query selector.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {array} The matching nodes.
     */
    find(selector, nodes = this._context) {
        // fast selector
        const match = selector.match(DOM._fastRegExp);
        if (match) {
            if (match[1] === '#') {
                return this.findById(match[2], nodes);
            }

            if (match[1] === '.') {
                return this.findByClass(match[2], nodes);
            }

            return this.findByTag(match[2], nodes);
        }

        // custom selector
        if (selector.match(DOM._complexRegExp)) {
            const selectors = DOM._prefixSelectors(selector, `#${DOM._tempId} `);

            if (Core.isElement(nodes)) {
                return DOM.__findByCustom(selectors, nodes);
            }

            nodes = this.parseNodes(nodes);

            return DOM._findByCustom(selectors, nodes);
        }

        // standard selector
        if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return Core.wrap(
                DOMNode.findBySelector(selector, nodes)
            );
        }

        nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

        return DOM._findBySelector(selector, nodes);
    },

    /**
     * Return all nodes with a specific class.
     * @param {string} className The class name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {array} The matching nodes.
     */
    findByClass(className, nodes = this._context) {
        if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return Core.wrap(DOMNode.findByClass(className, nodes));
        }

        nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                DOMNode.findByClass(className, node)
            )
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return all nodes with a specific ID.
     * @param {string} id The id.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {array} The matching nodes.
     */
    findById(id, nodes = this._context) {
        const result = this.findOneById(id, nodes);

        if (result) {
            return [result];
        }

        return [];
    },

    /**
     * Return all nodes with a specific tag.
     * @param {string} tagName The tag name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {array} The matching nodes.
     */
    findByTag(tagName, nodes = this._context) {
        if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return Core.wrap(DOMNode.findByTag(tagName, nodes));
        }

        nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                DOMNode.findByTag(tagName, node)
            )
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return a single node matching a selector.
     * @param {string} selector The query selector.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    findOne(selector, nodes = this._context) {
        // fast selector
        const match = selector.match(DOM._fastRegExp);
        if (match) {
            if (match[1] === '#') {
                return this.findOneById(match[2], nodes);
            }

            if (match[1] === '.') {
                return this.findOneByClass(match[2], nodes);
            }

            return this.findOneByTag(match[2], nodes);
        }

        // custom selector
        if (selector.match(DOM._complexRegExp)) {
            const selectors = DOM._prefixSelectors(selector, `#${DOM._tempId} `);

            if (Core.isElement(nodes)) {
                return DOM.__findOneByCustom(selectors, nodes);
            }

            nodes = this.parseNodes(nodes);

            return DOM._findOneByCustom(selectors, nodes);
        }

        // standard selector
        if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return DOMNode.findOneBySelector(selector, nodes);
        }

        nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

        return DOM._findOneBySelector(selector, nodes);
    },

    /**
     * Return a single node with a specific class.
     * @param {string} className The class name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    findOneByClass(className, nodes = this._context) {
        if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return DOMNode.findByClass(className, nodes).item(0);
        }

        nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

        for (const node of nodes) {
            const result = DOMNode.findByClass(className, node).item(0);
            if (result) {
                return result;
            }
        }

        return null;
    },

    /**
     * Return a single node with a specific ID.
     * @param {string} id The id.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching element.
     */
    findOneById(id, nodes = this._context) {
        const result = DOMNode.findById(id, this._context);

        if (!result) {
            return null;
        }

        if (Core.isDocument(nodes)) {
            return result;
        }

        if (Core.isElement(nodes)) {
            if (DOMNode.contains(nodes, result)) {
                return result;
            }

            return null;
        }

        nodes = this.parseNodes(nodes);

        if (nodes.some(node => DOMNode.contains(node, result))) {
            return result;
        }

        return null;
    },

    /**
     * Return a single node with a specific tag.
     * @param {string} tagName The tag name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    findOneByTag(tagName, nodes = this._context) {
        if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return DOMNode.findByTag(tagName, nodes).item(0);
        }

        nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

        for (const node of nodes) {
            const result = DOMNode.findByTag(tagName, node).item(0);
            if (result) {
                return result;
            }
        }

        return null;
    }

});
