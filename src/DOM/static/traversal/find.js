/**
 * DOM (Static) Find
 */

Object.assign(DOM, {

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
    }

});
