/**
 * DOM Selection
 */

Object.assign(DOM.prototype, {

    /**
     * Insert each node after the selection.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     */
    afterSelection(nodes) {
        const selection = DOM._getSelection();

        if (!selection.rangeCount) {
            return;
        }

        const range = DOM._getRange(selection);

        DOM._removeRanges(selection);
        DOM._collapseRange(range);

        for (const node of this._parseQuery(nodes, Core.isNode)) {
            DOM._insert(range, node);
        }
    },

    /**
     * Insert each node before the selection.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     */
    beforeSelection(nodes) {
        const selection = DOM._getSelection();

        if (!selection.rangeCount) {
            return;
        }

        const range = DOM._getRange(selection);

        DOM._removeRanges(selection);

        for (const node of this._parseQuery(nodes, Core.isNode)) {
            DOM._insert(range, node);
        }
    },

    /**
     * Extract selected nodes from the DOM.
     * @returns {Node[]} The selected nodes.
     */
    extractSelection() {
        const selection = DOM._getSelection();

        if (!selection.rangeCount) {
            return [];
        }

        const range = DOM._getRange(selection);

        DOM._removeRanges(selection);

        return Core.merge([], DOM._extract(range));
    },

    /**
     * Return all selected nodes.
     * @returns {Node[]} The selected nodes.
     */
    getSelection() {
        const selection = DOM._getSelection();

        if (!selection.rangeCount) {
            return [];
        }

        const range = DOM._getRange(selection);

        const nodes = Core.merge(
            [],
            DOM._findBySelector('*', range.commonAncestorContainer)
        );

        if (!nodes.length) {
            return [range.commonAncestorContainer];
        }

        if (nodes.length === 1) {
            return nodes;
        }

        const start = Core.isElement(range.startContainer) ?
            range.startContainer :
            DOM._parent(range.startContainer).shift();

        const end = Core.isElement(range.endContainer) ?
            range.endContainer :
            DOM._parent(range.endContainer).shift();

        return nodes.slice(
            nodes.indexOf(start),
            nodes.indexOf(end) + 1
        );
    },

    /**
     * Create a selection on the first node.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     */
    select(nodes) {
        const node = this._nodeFind(nodes, Core.isNode);

        if (node && 'select' in node) {
            return node.select();
        }

        const selection = DOM._getSelection();

        if (selection.rangeCount > 0) {
            DOM._removeRanges(selection);
        }

        if (!node) {
            return;
        }

        const range = this.createRange();
        DOM._select(range, node);
        DOM._addRange(selection, range);
    },

    /**
     * Create a selection containing all of the nodes.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     */
    selectAll(nodes) {
        const selection = DOM._getSelection();

        if (selection.rangeCount) {
            DOM._removeRanges(selection);
        }

        nodes = this.sort(nodes);

        if (!nodes.length) {
            return;
        }

        const range = this.createRange();

        if (nodes.length == 1) {
            DOM._select(range, nodes.shift());
        } else {
            DOM._setStartBefore(nodes.shift());
            DOM._setEndAfter(nodes.pop());
        }

        DOM._addRange(selection, range);
    }

});
