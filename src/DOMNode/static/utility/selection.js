/**
 * DOMNode (Static) Selection
 */

Object.assign(DOMNode, {

    /**
     * Add a range to a selection.
     * @param {Selection} selection The input selection.
     * @param {Range} range The range to add.
     */
    addRange(selection, range) {
        selection.addRange(range);
    },

    /**
     * Collapse a range.
     * @param {Range} range The input range.
     */
    collapse(range) {
        range.collapse();
    },

    /**
     * Return the end container of a range.
     * @param {Range} range The input range.
     * @returns {HTMLElement} The end container of the range.
     */
    endContainer(range) {
        return range.endContainer;
    },

    /**
     * Extract the contents of a range.
     * @param {Range} range The input range.
     * @returns {DocumentFragment} A DocumentFragment containing the range contents.
     */
    extract(range) {
        return range.extractContents();
    },

    /**
     * Get a range from a selection.
     * @param {Selection} selection The input selection.
     * @param {number} [index=0] The index of the range to return.
     * @returns {Range} The selected range.
     */
    getRange(selection, index = 0) {
        return selection.getRangeAt(index);
    },

    /**
     * Get the current selection.
     * @returns {Selection} The current selection.
     */
    getSelection() {
        return window.getSelection();
    },

    /**
     * Insert a node into a range.
     * @param {Range} range The input range.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The node to insert.
     */
    insert(range, node) {
        range.insertNode(node);
    },

    /**
     * Return the range count for a selection.
     * @param {Selection} selection The input selection.
     */
    rangeCount(selection) {
        return selection.rangeCount;
    },

    /**
     * Remove all ranges from a selection.
     * @param {Selection} selection The input selection.
     */
    removeRanges(selection) {
        selection.removeAllRanges();
    },

    /**
     * Add a node to a range.
     * @param {Range} range The input range. 
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The node to select.
     */
    select(range, node) {
        range.selectNode(node);
    },

    /**
     * Set the end position of a range after a node.
     * @param {Range} range The input range.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The node to end the range after.
     */
    setEndAfter(range, node) {
        range.setEndAfter(node);
    },

    /**
     * Set the start position of a range before a node.
     * @param {Range} range The input range.
     * @param {Node|HTMLElement|DocumentFragment|ShadowRoot} node The node to start the range before.
     */
    setStartBefore(range, node) {
        range.setStartBefore(node);
    },

    /**
     * Return the start container of a range.
     * @param {Range} range The input range.
     * @returns {HTMLElement} The start container of the range.
     */
    startContainer(range) {
        return range.startContainer;
    }

});
