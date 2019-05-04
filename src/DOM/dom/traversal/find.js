/**
 * DOM Find
 */

Object.assign(DOM.prototype, {

    /**
     * Return all elements matching a selector.
     * @param {string} selector The query selector.
     * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement[]} The matching nodes.
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
     * Return all elements with a specific class.
     * @param {string} className The class name.
     * @param {string|HTMLElement|HTMLCollection|ShadowRoot|Document|HTMLElement[]} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement[]} The matching nodes.
     */
    findByClass(className, nodes = this._context) {
        if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isShadowRoot(nodes)) {
            return Core.merge([], DOM._findByClass(className, nodes));
        }

        nodes = this._nodeFilter(nodes, { shadow: true, document: true });

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
     * Return all elements with a specific ID.
     * @param {string} id The id.
     * @param {string|HTMLElement|HTMLCollection|ShadowRoot|Document|HTMLElement[]} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement[]} The matching nodes.
     */
    findById(id, nodes = this._context) {
        const result = DOM._findById(id, this._context);

        if (!result) {
            return [];
        }

        if (Core.isDocument(nodes)) {
            return [result];
        }

        if (Core.isElement(nodes) || Core.isShadowRoot(nodes)) {
            return DOM._has(nodes, result) ?
                [result] :
                [];
        }

        return this.contains(nodes, result) ?
            [result] :
            [];
    },

    /**
     * Return all elements with a specific tag.
     * @param {string} tagName The tag name.
     * @param {string|HTMLElement|HTMLCollection|ShadowRoot|Document|HTMLElement[]} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement[]} The matching nodes.
     */
    findByTag(tagName, nodes = this._context) {
        if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isShadowRoot(nodes)) {
            return Core.merge([], DOM._findByTag(tagName, nodes));
        }

        nodes = this._nodeFilter(nodes, { shadow: true, document: true });

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
     * Return a single element matching a selector.
     * @param {string} selector The query selector.
     * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes=this._context] The input node(s), or a query selector string.
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
     * Return a single element with a specific class.
     * @param {string} className The class name.
     * @param {string|HTMLElement|HTMLCollection|ShadowRoot|Document|HTMLElement[]} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    findOneByClass(className, nodes = this._context) {
        if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isShadowRoot(nodes)) {
            return DOM._findByClass(className, nodes).item(0);
        }

        nodes = this._nodeFilter(nodes, { shadow: true, document: true });

        for (const node of nodes) {
            const result = DOM._findByClass(className, node).item(0);
            if (result) {
                return result;
            }
        }

        return null;
    },

    /**
     * Return a single element with a specific ID.
     * @param {string} id The id.
     * @param {string|HTMLElement|HTMLCollection|ShadowRoot|Document|HTMLElement[]} [nodes=this._context] The input node(s), or a query selector string.
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

        if (Core.isElement(nodes) || Core.isShadowRoot(nodes)) {
            return DOM._has(nodes, result) ?
                result :
                null;
        }

        return this.contains(nodes, result) ?
            result :
            null;
    },

    /**
     * Return a single element with a specific tag.
     * @param {string} tagName The tag name.
     * @param {string|HTMLElement|HTMLCollection|ShadowRoot|Document|HTMLElement[]} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    findOneByTag(tagName, nodes = this._context) {
        if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isShadowRoot(nodes)) {
            return DOM._findByTag(tagName, nodes).item(0);
        }

        nodes = this._nodeFilter(nodes, { shadow: true, document: true });

        for (const node of nodes) {
            const result = DOM._findByTag(tagName, node).item(0);
            if (result) {
                return result;
            }
        }

        return null;
    },

    /**
     * Return all elements matching a custom CSS selector.
     * @param {string} selector The custom query selector.
     * @param {string|HTMLElement|HTMLCollection|Document|HTMLElement[]} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement[]} The matching nodes.
     */
    _findByCustom(selector, nodes = this._context) {
        // string case
        if (Core.isString(nodes)) {
            return DOM._findBySelector(
                DOM._prefixSelectors(selector, `${nodes} `),
                this._context
            );
        }

        const selectors = DOM._prefixSelectors(selector, `#${DOM.tempId} `);

        if (Core.isElement(nodes)) {
            return Core.merge([], DOM._findByCustom(selectors, nodes));
        }

        nodes = this._nodeFilter(nodes);

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                DOM._findByCustom(selectors, node)
            );
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return all elements matching a standard CSS selector.
     * @param {string} selector The query selector.
     * @param {string|HTMLElement|HTMLCollection|ShadowRoot|Document|HTMLElement[]} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement[]} The matching nodes.
     */
    _findBySelector(selector, nodes = this._context) {
        if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isShadowRoot(nodes)) {
            return Core.merge([], DOM._findBySelector(selector, nodes));
        }

        nodes = this._nodeFilter(nodes, { shadow: true, document: true });

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
     * Return a single element matching a custom CSS selector.
     * @param {string} selector The custom query selector.
     * @param {string|HTMLElement|HTMLCollection|HTMLElement[]} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    _findOneByCustom(selector, nodes = this._context) {
        // string case
        if (Core.isString(nodes)) {
            return DOM._findOneBySelector(
                DOM._prefixSelectors(selector, `${nodes} `),
                this._context
            );
        }

        const selectors = DOM._prefixSelectors(selector, `#${DOM.tempId} `);

        if (Core.isElement(nodes)) {
            return DOM._findOneByCustom(selectors, nodes);
        }

        nodes = this._nodeFilter(nodes);

        for (const node of nodes) {
            const result = DOM._findOneByCustom(selectors, node);

            if (result) {
                return result;
            }
        }

        return null;
    },

    /**
     * Return a single element matching a standard CSS selector.
     * @param {string} selector The query selector.
     * @param {string|HTMLElement|HTMLCollection|ShadowRoot|Document|HTMLElement[]} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    _findOneBySelector(selector, nodes = this._context) {
        if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isShadowRoot(nodes)) {
            return DOM._findBySelector(selector, nodes).item(0);
        }

        nodes = this._nodeFilter(nodes, { shadow: true, document: true });

        for (const node of nodes) {
            const result = DOM._findOneBySelector(selector, node);
            if (result) {
                return result;
            }
        }

        return null;
    }

});
