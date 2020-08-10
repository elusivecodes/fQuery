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
        nodes = this.parseNodes(nodes, { node: true, fragment: true, html: true }).reverse();

        const selection = window.getSelection();

        if (!selection.rangeCount) {
            return;
        }

        const range = selection.getRangeAt(0);

        selection.removeAllRanges();
        range.collapse();

        for (const node of nodes) {
            range.insertNode(node);
        }
    },

    /**
     * Insert each node before the selection.
     * @param {string|array|Node|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     */
    beforeSelection(nodes) {

        // ShadowRoot nodes can not be moved
        nodes = this.parseNodes(nodes, { node: true, fragment: true, html: true }).reverse();

        const selection = window.getSelection();

        if (!selection.rangeCount) {
            return;
        }

        const range = selection.getRangeAt(0);

        selection.removeAllRanges();

        for (const node of nodes) {
            range.insertNode(node);
        }
    },

    /**
     * Extract selected nodes from the DOM.
     * @returns {array} The selected nodes.
     */
    extractSelection() {
        const selection = window.getSelection();

        if (!selection.rangeCount) {
            return [];
        }

        const range = selection.getRangeAt(0);

        selection.removeAllRanges();

        const fragment = range.extractContents();

        return Core.wrap(fragment.childNodes);
    },

    /**
     * Return all selected nodes.
     * @returns {array} The selected nodes.
     */
    getSelection() {
        const selection = window.getSelection();

        if (!selection.rangeCount) {
            return [];
        }

        const range = selection.getRangeAt(0),
            nodes = Core.wrap(
                range.commonAncestorContainer.querySelectorAll('*')
            );

        if (!nodes.length) {
            return [range.commonAncestorContainer];
        }

        if (nodes.length === 1) {
            return nodes;
        }

        const startContainer = range.startContainer,
            endContainer = range.endContainer,
            start = (Core.isElement(startContainer) ?
                startContainer :
                startContainer.parentNode),
            end = (Core.isElement(endContainer) ?
                endContainer :
                endContainer.parentNode);

        const selectedNodes = nodes.slice(
            nodes.indexOf(start),
            nodes.indexOf(end) + 1
        );
        const results = [];

        let lastNode;
        for (const node of selectedNodes) {
            if (lastNode && lastNode.contains(node)) {
                continue;
            }

            lastNode = node;
            results.push(node);
        }

        return results;
    },

    /**
     * Create a selection on the first node.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    select(nodes) {
        const node = this.parseNode(nodes, { node: true });

        if (node && 'select' in node) {
            return node.select();
        }

        const selection = window.getSelection();

        if (selection.rangeCount > 0) {
            selection.removeAllRanges();
        }

        if (!node) {
            return;
        }

        const range = this.createRange();
        range.selectNode(node);
        selection.addRange(range);
    },

    /**
     * Create a selection containing all of the nodes.
     * @param {string|array|Node|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    selectAll(nodes) {
        nodes = this.sort(nodes);

        const selection = window.getSelection();

        if (selection.rangeCount) {
            selection.removeAllRanges();
        }

        if (!nodes.length) {
            return;
        }

        const range = this.createRange();

        if (nodes.length == 1) {
            range.selectNode(nodes.shift());
        } else {
            range.setStartBefore(nodes.shift());
            range.setEndAfter(nodes.pop());
        }

        selection.addRange(range);
    },

    /**
     * Wrap selected nodes with other nodes.
     * @param {string|array|HTMLElement|DocumentFragment|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector or HTML string.
     */
    wrapSelection(nodes) {

        // ShadowRoot nodes can not be cloned
        nodes = this.parseNodes(nodes, { fragment: true, html: true });

        const selection = window.getSelection();

        if (!selection.rangeCount) {
            return;
        }

        const range = selection.getRangeAt(0);

        selection.removeAllRanges();

        const fragment = range.extractContents(),
            deepest = this.constructor._deepest(nodes.slice().shift()),
            children = Core.wrap(fragment.childNodes);

        for (const child of children) {
            deepest.insertBefore(child, null);
        }

        for (const node of nodes) {
            range.insertNode(node);
        }
    }

});
