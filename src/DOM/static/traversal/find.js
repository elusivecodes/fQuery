/**
 * DOM (Static) Find
 */

Object.assign(DOM, {

    /**
     * Return all nodes matching custom CSS selector(s).
     * @param {array} selectors The custom query selector(s).
     * @param {array} nodes The input nodes.
     * @returns {array} The matching nodes.
     */
    _findByCustom(selectors, nodes = this._context) {

        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                this.__findByCustom(selectors, node)
            );
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return all nodes matching a standard CSS selector.
     * @param {string} selector The query selector.
     * @param {array} nodes The input nodes.
     * @returns {array} The matching nodes.
     */
    _findBySelector(selector, nodes) {
        const results = [];

        for (const node of nodes) {
            Core.merge(
                results,
                DOMNode.findBySelector(selector, node)
            );
        }

        return nodes.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },

    /**
     * Return a single node matching custom CSS selector(s).
     * @param {array} selectors The custom query selector(s).
     * @param {array} nodes The input nodes.
     * @returns {HTMLElement} The matching node.
     */
    _findOneByCustom(selectors, nodes) {
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
     * @param {array} nodes The input nodes.
     * @returns {HTMLElement} The matching node.
     */
    _findOneBySelector(selector, nodes) {
        for (const node of nodes) {
            const result = DOMNode.findOneBySelector(selector, node);
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
    __findByCustom(selectors, node) {
        const nodeId = DOMNode.getAttribute(node, 'id');
        DOMNode.setAttribute(node, 'id', this.tempId);

        const parent = DOMNode.parent(node);

        const results = [];

        for (const selector of selectors) {
            Core.merge(
                results,
                DOMNode.findBySelector(selector, parent)
            );
        }

        if (nodeId) {
            DOMNode.setAttribute(node, 'id', nodeId);
        } else {
            DOMNode.removeAttribute(node, 'id');
        }

        return selectors.length > 1 && results.length > 1 ?
            Core.unique(results) :
            results;
    },


    /**
     * Return a single node matching a custom CSS selector.
     * @param {string} selectors The custom query selector.
     * @param {HTMLElement} node The input node.
     * @returns {HTMLElement} The matching node.
     */
    __findOneByCustom(selectors, node) {
        const nodeId = DOMNode.getAttribute(node, 'id');
        DOMNode.setAttribute(node, 'id', this.tempId);

        const parent = DOMNode.parent(node);

        if (!parent) {
            return null;
        }

        let result = null;

        for (const selector of selectors) {
            result = DOMNode.findOneBySelector(selector, parent);

            if (result) {
                break;
            }
        }

        if (nodeId) {
            DOMNode.setAttribute(node, 'id', nodeId);
        } else {
            DOMNode.removeAttribute(node, 'id');
        }

        return result;
    }

});
