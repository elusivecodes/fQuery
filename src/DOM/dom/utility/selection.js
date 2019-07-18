/**
 * DOM Selection
 */

Object.assign(DOM.prototype, {

    /**
     * Insert each node after the selection.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     */
    afterSelection(nodes) {

        // ShadowRoot nodes can not be moved
        nodes = this.parseNodes(nodes, { node: true, fragment: true, html: true });

        const selection = DOMNode.getSelection();

        if (!DOMNode.rangeCount(selection)) {
            return;
        }

        const range = DOMNode.getRange(selection);

        DOMNode.removeRanges(selection);
        DOMNode.collapse(range);

        for (const node of nodes) {
            DOMNode.insert(range, node);
        }
    },

    /**
     * Insert each node before the selection.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     */
    beforeSelection(nodes) {

        // ShadowRoot nodes can not be moved
        nodes = this.parseNodes(nodes, { node: true, fragment: true, html: true });

        const selection = DOMNode.getSelection();

        if (!DOMNode.rangeCount(selection)) {
            return;
        }

        const range = DOMNode.getRange(selection);

        DOMNode.removeRanges(selection);

        for (const node of nodes) {
            DOMNode.insert(range, node);
        }
    },

    /**
     * Extract selected nodes from the DOM.
     * @returns {array} The selected nodes.
     */
    extractSelection() {
        const selection = DOMNode.getSelection();

        if (!DOMNode.rangeCount(selection)) {
            return [];
        }

        const range = DOMNode.getRange(selection);

        DOMNode.removeRanges(selection);

        const fragment = DOMNode.extract(range);

        return Core.wrap(DOMNode.childNodes(fragment));
    },

    /**
     * Return all selected nodes.
     * @returns {array} The selected nodes.
     */
    getSelection() {
        const selection = DOMNode.getSelection();

        if (!DOMNode.rangeCount(selection)) {
            return [];
        }

        const range = DOMNode.getRange(selection),
            nodes = Core.wrap(
                DOMNode.findBySelector('*', range.commonAncestorContainer)
            );

        if (!nodes.length) {
            return [range.commonAncestorContainer];
        }

        if (nodes.length === 1) {
            return nodes;
        }

        const startContainer = DOMNode.startContainer(range),
            endContainer = DOMNode.endContainer(range),
            start = (Core.isElement(startContainer) ?
                startContainer :
                DOMNode.parent(startContainer)),
            end = (Core.isElement(endContainer) ?
                endContainer :
                DOMNode.parent(endContainer));

        return nodes.slice(
            nodes.indexOf(start),
            nodes.indexOf(end) + 1
        );
    },

    /**
     * Create a selection on the first node.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    select(nodes) {
        const node = this.parseNode(nodes, { node: true, fragment: true, shadow: true });

        if (node && 'select' in node) {
            return node.select();
        }

        const selection = DOMNode.getSelection();

        if (DOMNode.rangeCount(selection) > 0) {
            DOMNode.removeRanges(selection);
        }

        if (!node) {
            return;
        }

        const range = this.createRange();
        DOMNode.select(range, node);
        DOMNode.addRange(selection, range);
    },

    /**
     * Create a selection containing all of the nodes.
     * @param {string|array|Node|HTMLElement|DocumentFragment|ShadowRoot|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    selectAll(nodes) {
        nodes = this.sort(nodes);

        const selection = DOMNode.getSelection();

        if (DOMNode.rangeCount(selection)) {
            DOMNode.removeRanges(selection);
        }

        if (!nodes.length) {
            return;
        }

        const range = this.createRange();

        if (nodes.length == 1) {
            DOMNode.select(range, nodes.shift());
        } else {
            DOMNode.setStartBefore(range, nodes.shift());
            DOMNode.setEndAfter(range, nodes.pop());
        }

        DOMNode.addRange(selection, range);
    },

    /**
     * Wrap selected nodes with other nodes.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     */
    wrapSelection(nodes) {

        // ShadowRoot nodes can not be cloned
        nodes = this.parseNodes(nodes, { fragment: true, html: true });

        const selection = DOMNode.getSelection();

        if (!DOMNode.rangeCount(selection)) {
            return;
        }

        const range = DOMNode.getRange(selection);

        DOMNode.removeRanges(selection);

        const fragment = DOMNode.extract(range),
            deepest = DOM._deepest(nodes.slice().shift()),
            children = Core.wrap(DOMNode.childNodes(fragment));

        for (const child of children) {
            DOMNode.insertBefore(deepest, child);
        }

        for (const node of nodes) {
            DOMNode.insert(range, node);
        }
    }

});
