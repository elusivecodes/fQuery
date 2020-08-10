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
        const match = selector.match(this.constructor._fastRegExp);
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
        if (selector.match(this.constructor._complexRegExp)) {
            selector = this.constructor._prefixSelectors(selector, ':scope ');
        }

        // standard selector
        if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return Core.wrap(
                nodes.querySelectorAll(selector)
            );
        }

        nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

        return this.constructor._findBySelector(selector, nodes);
    },

    /**
     * Return all nodes with a specific class.
     * @param {string} className The class name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {array} The matching nodes.
     */
    findByClass(className, nodes = this._context) {
        if (Core.isDocument(nodes) || Core.isElement(nodes)) {
            return Core.wrap(
                nodes.getElementsByClassName(className)
            );
        }

        if (Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return Core.wrap(
                nodes.querySelectorAll(`.${className}`)
            );
        }

        nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                Core.isFragment(node) || Core.isShadow(node) ?
                    node.querySelectorAll(`.${className}`) :
                    node.getElementsByClassName(className)
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
        nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

        return this.constructor._findBySelector(`#${id}`, nodes);
    },

    /**
     * Return all nodes with a specific tag.
     * @param {string} tagName The tag name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {array} The matching nodes.
     */
    findByTag(tagName, nodes = this._context) {
        if (Core.isDocument(nodes) || Core.isElement(nodes)) {
            return Core.wrap(
                nodes.getElementsByTagName(tagName)
            );
        }

        if (Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return Core.wrap(
                nodes.querySelectorAll(tagName)
            );
        }

        nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                Core.isFragment(node) || Core.isShadow(node) ?
                    node.querySelectorAll(tagName) :
                    node.getElementsByTagName(tagName)
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
        const match = selector.match(this.constructor._fastRegExp);
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
        if (selector.match(this.constructor._complexRegExp)) {
            selector = this.constructor._prefixSelectors(selector, ':scope ');
        }

        // standard selector
        if (Core.isDocument(nodes) || Core.isElement(nodes) || Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return nodes.querySelector(selector);
        }

        nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

        if (!nodes.length) {
            return;
        }

        return this.constructor._findOneBySelector(selector, nodes);
    },

    /**
     * Return a single node with a specific class.
     * @param {string} className The class name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    findOneByClass(className, nodes = this._context) {
        if (Core.isDocument(nodes) || Core.isElement(nodes)) {
            return nodes.getElementsByClassName(className).item(0);
        }

        if (Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return nodes.querySelector(`.${className}`);
        }

        nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

        if (!nodes.length) {
            return;
        }

        for (const node of nodes) {
            const result = Core.isFragment(node) || Core.isShadow(node) ?
                node.querySelector(`.${className}`) :
                node.getElementsByClassName(className).item(0);
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
        if (Core.isDocument(nodes)) {
            return nodes.getElementById(id);
        }

        nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

        if (!nodes.length) {
            return;
        }

        return this.constructor._findOneBySelector(`#${id}`, nodes);
    },

    /**
     * Return a single node with a specific tag.
     * @param {string} tagName The tag name.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|NodeList|HTMLCollection|QuerySet} [nodes=this._context] The input node(s), or a query selector string.
     * @returns {HTMLElement} The matching node.
     */
    findOneByTag(tagName, nodes = this._context) {
        if (Core.isDocument(nodes) || Core.isElement(nodes)) {
            return nodes.getElementsByTagName(tagName).item(0);
        }

        if (Core.isFragment(nodes) || Core.isShadow(nodes)) {
            return nodes.querySelector(tagName);
        }

        nodes = this.parseNodes(nodes, { fragment: true, shadow: true, document: true });

        if (!nodes.length) {
            return;
        }

        for (const node of nodes) {
            const result = Core.isFragment(node) || Core.isShadow(node) ?
                node.querySelector(tagName) :
                node.getElementsByTagName(tagName).item(0);
            if (result) {
                return result;
            }
        }

        return null;
    }

});
