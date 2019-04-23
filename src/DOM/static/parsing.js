/**
 * DOM (Static) Parsing
 */

Object.assign(DOM, {

    /**
     * Create a Document object from a HTML string.
     * @param {string} html The HTML input string.
     * @returns {Document} A new Document object.
     */
    parseHTML(html) {
        return new DOMParser()
            .parseFromString(html, 'text/html');
    },

    /**
     * Create a Document object from an XML string.
     * @param {string} xml The XML input string.
     * @returns {Document} A new Document object.
     */
    parseXML(xml) {
        return new DOMParser()
            .parseFromString(xml, 'application/xml');
    }

});
