/**
 * DOM (Static) Selection
 */

Object.assign(DOM, {

    /**
     * Add a range to a selection.
     * @param {Selection} selection The input selection.
     * @param {Range} range The range to add.
     */
    _addRange(selection, range) {
        selection.addRange(range);
    },

    /**
     * Collapse a range.
     * @param {Range} range The input range.
     */
    _collapse(range) {
        range.collapse();
    },

    /**
     * Extract the contents of a range.
     * @param {Range} range The input range.
     * @returns {NodeList} The nodes in the range.
     */
    _extract(range) {
        return range.extractContents().childNodes;
    },

    /**
     * Get a range from a selection.
     * @param {Selection} selection The input selection.
     * @param {number} [index=0] The index of the range to return.
     * @returns {Range} The selected range.
     */
    _getRange(selection, index = 0) {
        return selection.getRangeAt(index);
    },

    /**
     * Get the current selection.
     * @returns {Selection} The current selection.
     */
    _getSelection() {
        return window.getSelection();
    },

    /**
     * Insert a node into a range.
     * @param {Range} range The input range.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The node to insert.
     */
    _insert(range, node) {
        range.insertNode(node);
    },

    /**
     * Remove all ranges from a selection.
     * @param {Selection} selection The input selection.
     */
    _removeRanges(selection) {
        selection.removeAllRanges();
    },

    /**
     * Add a node to a range.
     * @param {Range} range The input range. 
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The node to select.
     */
    _select(range, node) {
        range.selectNode(node);
    },

    /**
     * Set the end position of a range after a node.
     * @param {Range} range The input range.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The node to end the range after.
     */
    _setEndAfter(range, node) {
        range.setEndAfter(node);
    },

    /**
     * Set the start position of a range before a node.
     * @param {Range} range The input range.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The node to start the range before.
     */
    _setStartBefore(range, node) {
        range.setStartBefore(node);
    }

});
