/**
 * DOM Find
 */

Object.assign(DOM.prototype, {

    /**
     * Return all nodes matching a selector.
     * @param {string} selector The query selector.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {array} The matching nodes.
     */
    find(selector, nodes = this._context) {
        // fast selector
        const match = selector.match(DOM.fastRegex);
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
        if (selector.match(DOM.complexRegex)) {
            return this._findByCustom(selector, nodes);
        }

        // standard selector
        return this._findBySelector(selector, nodes);
    },

    /**
     * Return all nodes with a specific class.
     * @param {string} className The class name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {array} The matching nodes.
     */
    findByClass(className, nodes = this._context) {
        if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return Core.merge([], DOM._findByClass(className, nodes));
        }

        nodes = this._nodeFilter(nodes, { fragment: true, shadow: true, document: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                DOM._findByClass(className, node)
            )
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return all nodes with a specific ID.
     * @param {string} id The id.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection} [nodes=this._context] The input node(s), or a query selector string.
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
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {array} The matching nodes.
     */
    findByTag(tagName, nodes = this._context) {
        if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return Core.merge([], DOM._findByTag(tagName, nodes));
        }

        nodes = this._nodeFilter(nodes, { fragment: true, shadow: true, document: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                DOM._findByTag(tagName, node)
            )
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return a single node matching a selector.
     * @param {string} selector The query selector.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    findOne(selector, nodes = this._context) {
        // fast selector
        const match = selector.match(DOM.fastRegex);
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
        if (selector.match(DOM.complexRegex)) {
            return this._findOneByCustom(selector, nodes);
        }

        // standard selector
        return this._findOneBySelector(selector, nodes);
    },

    /**
     * Return a single node with a specific class.
     * @param {string} className The class name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    findOneByClass(className, nodes = this._context) {
        if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return DOM._findByClass(className, nodes).item(0);
        }

        nodes = this._nodeFilter(nodes, { fragment: true, shadow: true, document: true });

        for (const node of nodes) {
            const result = DOM._findByClass(className, node).item(0);
            if (result) {
                return result;
            }
        }

        return null;
    },

    /**
     * Return a single node with a specific ID.
     * @param {string} id The id.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching element.
     */
    findOneById(id, nodes = this._context) {
        const result = DOM._findById(id, this._context);

        if (!result) {
            return null;
        }

        if (Core.isDocument(nodes)) {
            return result;
        }

        if (Core.isElement(nodes)) {
            if (DOM._contains(nodes, result)) {
                return result;
            }

            return null;
        }

        nodes = DOM._nodeFilter(nodes);

        if (nodes.some(node => DOM._contains(node, result))) {
            return result;
        }

        return null;
    },

    /**
     * Return a single node with a specific tag.
     * @param {string} tagName The tag name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    findOneByTag(tagName, nodes = this._context) {
        if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return DOM._findByTag(tagName, nodes).item(0);
        }

        nodes = this._nodeFilter(nodes, { fragment: true, shadow: true, document: true });

        for (const node of nodes) {
            const result = DOM._findByTag(tagName, node).item(0);
            if (result) {
                return result;
            }
        }

        return null;
    },

    /**
     * Return all nodes matching a custom CSS selector.
     * @param {string} selector The custom query selector.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {array} The matching nodes.
     */
    _findByCustom(selector, nodes = this._context) {
        const selectors = DOM._prefixSelectors(selector, `#${DOM.tempId} `);

        const results = [];

        if (Core.isElement(nodes)) {
            this.__findByCustom(selectors, nodes, results);
        } else {
            nodes = this._nodeFilter(nodes);

            for (const node of nodes) {
                this.__findByCustom(selectors, node, results);
            }
        }

        return (nodes.length > 1 || selectors.length > 1) && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return all nodes matching a standard CSS selector.
     * @param {string} selector The query selector.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {array} The matching nodes.
     */
    _findBySelector(selector, nodes = this._context) {
        if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return Core.merge([], DOM._findBySelector(selector, nodes));
        }

        nodes = this._nodeFilter(nodes, { fragment: true, shadow: true, document: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                DOM._findBySelector(selector, node)
            );
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return a single node matching a custom CSS selector.
     * @param {string} selector The custom query selector.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    _findOneByCustom(selector, nodes = this._context) {
        const selectors = DOM._prefixSelectors(selector, `#${DOM.tempId} `);

        if (Core.isElement(nodes)) {
            return this.__findOneByCustom(selectors, nodes);
        }

        nodes = this._nodeFilter(nodes);

        for (const node of nodes) {
            const result = this.__findOneByCustom(selectors, node);

            if (result) {
                return result;
            }
        }

        return null;
    },

    /**
     * Return a single node matching a standard CSS selector.
     * @param {string} selector The query selector.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    _findOneBySelector(selector, nodes = this._context) {
        if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return DOM._findBySelector(selector, nodes).item(0);
        }

        nodes = this._nodeFilter(nodes, { fragment: true, shadow: true, document: true });

        for (const node of nodes) {
            const result = DOM._findOneBySelector(selector, node);
            if (result) {
                return result;
            }
        }

        return null;
    },

    /**
     * Return all nodes matching a custom CSS selector.
     * @param {string} selectors The custom query selector.
     * @param {HTMLElement} node The input node.
     * @returns {NodeList} The matching nodes.
     */
    __findByCustom(selectors, node, results = []) {
        const nodeId = DOM._getAttribute(node, 'id');
        DOM._setAttribute(node, 'id', DOM.tempId);

        const parent = DOM._parent(node);

        for (const selector of selectors) {
            Core.merge(
                results,
                DOM._findBySelector(selector, parent)
            );
        }

        if (nodeId) {
            DOM._setAttribute(node, 'id', nodeId);
        } else {
            DOM._removeAttribute(node, 'id');
        }

        return results;
    },


    /**
     * Return a single node matching a custom CSS selector.
     * @param {string} selectors The custom query selector.
     * @param {HTMLElement} node The input node.
     * @returns {HTMLElement} The matching node.
     */
    __findOneByCustom(selectors, node) {
        const nodeId = DOM._getAttribute(node, 'id');
        DOM._setAttribute(node, 'id', DOM.tempId);

        const parent = DOM._parent(node);

        if (!parent) {
            return null;
        }

        let result = null;

        for (const selector of selectors) {
            result = DOM._findOneBySelector(selector, parent);

            if (result) {
                break;
            }
        }

        if (nodeId) {
            DOM._setAttribute(node, 'id', nodeId);
        } else {
            DOM._removeAttribute(node, 'id');
        }

        return result;
    }

});
