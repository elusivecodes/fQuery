/**
 * DOM Selection
 */

Object.assign(DOM.prototype, {

    /**
     * Return all selected nodes.
     * @returns {Node[]} The selected nodes.
     */
    getSelection() {
        const selection = window.getSelection();

        if (!selection.rangeCount) {
            return [];
        }

        const range = selection.getRangeAt(0);

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

        const start = DOM.isElement(range.startContainer) ?
            range.startContainer :
            DOM._parent(range.startContainer).shift();

        const end = DOM.isElement(range.endContainer) ?
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
        const node = this._nodeFind(nodes, DOM.isNode);

        if (node && node.select) {
            return node.select();
        }

        const selection = window.getSelection();

        if (selection.rangeCount > 0) {
            selection.removeAllRanges();
        }

        if (!node) {
            return;
        }

        const range = this.context.createRange();
        range.selectNode(node);
        selection.addRange(range);
    },

    /**
     * Create a selection containing all of the nodes.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     */
    selectAll(nodes) {
        const selection = window.getSelection();

        if (selection.rangeCount) {
            selection.removeAllRanges();
        }

        nodes = this.sortNodes(nodes);

        if (!nodes.length) {
            return;
        }

        const range = this.context.createRange();

        if (nodes.length == 1) {
            range.selectNode(nodes.shift());
        } else {
            range.setStartBefore(nodes.shift());
            range.setEndAfter(nodes.pop());
        }

        selection.addRange(range);
    }

});
