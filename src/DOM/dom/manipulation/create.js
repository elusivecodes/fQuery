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
        const node = this.context.createElement(tagName);

        if (!options) {
            return node;
        }

        if ('html' in options) {
            this.setHTML(node, options.html);
        } else if ('text' in options) {
            this.setText(node, options.text);
        }

        if ('class' in options) {
            this.addClass(node, options.class);
        }

        if ('style' in options) {
            this.setStyle(node, options.style);
        }

        if ('value' in options) {
            this.setValue(node, options.value);
        }

        if ('attributes' in options) {
            this.setAttribute(node, options.attributes);
        }

        if ('properties' in options) {
            this.setProperty(node, options.properties);
        }

        if ('dataset' in options) {
            this.setDataset(node, options.dataset);
        }

        return node;
    },

    /**
     * Create a new comment node.
     * @param {string} comment The comment contents.
     * @returns {Node} The new comment node.
     */
    createComment(comment) {
        return this.context.createComment(comment);
    },

    /**
     * Create a new text node.
     * @param {string} text The text contents.
     * @returns {Node} The new text node.
     */
    createText(text) {
        return this.context.createTextNode(text);
    }

});
