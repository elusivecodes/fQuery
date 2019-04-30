/**
 * DOM Create
 */

Object.assign(DOM.prototype, {

    /**
     * Create a new DOM element.
     * @param {string} tagName The type of HTML element to create.
     * @param {object} options The options to use for creating the element.
     * @param {string} [options.html] The HTML contents.
     * @param {string} [options.text] The text contents.
     * @param {string|array} [options.class] The classes.
     * @param {object} [options.style] An object containing style properties.
     * @param {string} [options.value] The value.
     * @param {object} [options.attributes] An object containing attributes.
     * @param {object} [options.properties] An object containing properties.
     * @param {object} [options.dataset] An object containing dataset values.
     * @returns {HTMLElement} The new element.
     */
    create(tagName, options) {
        const node = DOM._create(this._context, tagName);

        if (!options) {
            return node;
        }

        if ('html' in options) {
            DOM._setProperty(node, {
                innerHTML: options.html
            });
        } else if ('text' in options) {
            DOM._setProperty(node, {
                innerText: options.text
            });
        }

        if ('class' in options) {
            DOM._addClass(
                node,
                DOM._parseClasses(options.class)
            );
        }

        if ('style' in options) {
            DOM._setStyle(node, options.style);
        }

        if ('value' in options) {
            DOM._setProperty(node, {
                value: options.value
            });
        }

        if ('attributes' in options) {
            DOM._setAttribute(node, options.attributes);
        }

        if ('properties' in options) {
            DOM._setProperty(node, options.properties);
        }

        if ('dataset' in options) {
            DOM._setDataset(node, options.dataset);
        }

        return node;
    },

    /**
     * Create a new comment node.
     * @param {string} comment The comment contents.
     * @returns {Node} The new comment node.
     */
    createComment(comment) {
        return DOM._createComment(this._context, comment);
    },

    /**
     * Create a new range object.
     * @returns {Range} The new range.
     */
    createRange() {
        return DOM._createRange(this._context);
    },

    /**
     * Create a new text node.
     * @param {string} text The text contents.
     * @returns {Node} The new text node.
     */
    createText(text) {
        return DOM._createText(this._context, text);
    },

    /**
     * Create an Array containing nodes parsed from a HTML string.
     * @param {string} html The HTML input string.
     * @returns {Node[]} An array of nodes.
     */
    parseHTML(html) {
        return Core.merge(
            [],
            this.createRange()
                .createContextualFragment(html)
                .childNodes
        );
    }

});
