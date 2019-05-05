/**
 * DOM Selection
 */

Object.assign(DOM.prototype, {

    /**
     * Insert each node after the selection.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector or HTML string.
     */
    afterSelection(nodes) {
        nodes = this._nodeFilter(nodes, { node: true, fragment: true, shadow: true, html: true });

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
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector or HTML string.
     */
    beforeSelection(nodes) {
        nodes = this._nodeFilter(nodes, { node: true, fragment: true, shadow: true, html: true });

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
     * @returns {array} The selected nodes.
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
     * @returns {array} The selected nodes.
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
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
     */
    select(nodes) {
        const node = this._nodeFind(nodes, { node: true, fragment: true, shadow: true });

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
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection} nodes The input node(s), or a query selector string.
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
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|HTMLCollection} nodes The input node(s), or a query selector or HTML string.
     */
    wrapSelection(nodes) {
        nodes = this._nodeFilter(nodes, { fragment: true, shadow: true, html: true });

        const selection = window.getSelection();

        if (!selection.rangeCount) {
            return;
        }

        const range = selection.getRangeAt(0);

        selection.removeAllRanges();

        const deepest = DOM._deepest(nodes.slice().shift()),
            children = Core.merge([], DOM._extract(range));

        DOM._append(deepest, children);

        for (const node of nodes) {
            DOM._insert(range, node);
        }
    }

});
