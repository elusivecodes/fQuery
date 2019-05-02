/**
 * DOM Selection
 */

Object.assign(DOM.prototype, {

    /**
     * Insert each node after the selection.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     */
    afterSelection(nodes) {
        nodes = this._nodeFilter(nodes, { node: true, html: true });

        const selection = DOM._getSelection();

        if (!selection.rangeCount) {
            return;
        }

        const range = DOM._getRange(selection);

        DOM._removeRanges(selection);
        DOM._collapse(range);

        for (const node of nodes) {
            DOM._insert(range, node);
        }
    },

    /**
     * Insert each node before the selection.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     */
    beforeSelection(nodes) {
        nodes = this._nodeFilter(nodes, { node: true, html: true });

        const selection = DOM._getSelection();

        if (!selection.rangeCount) {
            return;
        }

        const range = DOM._getRange(selection);

        DOM._removeRanges(selection);

        for (const node of nodes) {
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
        const node = this._nodeFind(nodes, { node: true });

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
        nodes = this.sort(nodes);

        const selection = DOM._getSelection();

        if (selection.rangeCount) {
            DOM._removeRanges(selection);
        }

        if (!nodes.length) {
            return;
        }

        const range = this.createRange();

        if (nodes.length == 1) {
            DOM._select(range, nodes.shift());
        } else {
            DOM._setStartBefore(range, nodes.shift());
            DOM._setEndAfter(range, nodes.pop());
        }

        DOM._addRange(selection, range);
    },

    /**
     * Wrap selected nodes with other nodes.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     */
    wrapSelection(nodes) {
        nodes = this._nodeFilter(nodes, { html: true });

        const selection = window.getSelection();

        if (!selection.rangeCount) {
            return;
        }

        const range = selection.getRangeAt(0);

        selection.removeAllRanges();

        const first = nodes.slice().shift(),
            deepest = Core.merge(
                [],
                DOM._findBySelector('*', first)
            ).find(node =>
                !DOM._hasChildren(node)
            ) || first,
            children = Core.merge([], range.extractContents().childNodes);

        DOM._append(deepest, children);

        for (const node of nodes) {
            range.insertNode(node);
        }
    }

});
