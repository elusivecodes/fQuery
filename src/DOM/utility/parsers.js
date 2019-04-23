/**
 * DOM Parsers
 */

Object.assign(DOM.prototype, {

    /**
     * Create an Array containing nodes parsed from a HTML string.
     * @param {string} html The HTML input string.
     * @returns {array} An array of nodes.
     */
    parseHTML(html) {
        return Core.merge(
            [],
            this.context
                .createRange()
                .createContextualFragment(html)
                .childNodes
        );
    }

});
