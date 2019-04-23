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

        if (options.html) {
            this.setHTML(node, options.html);
        } else if (options.text) {
            this.setText(node, options.text);
        }

        if (options.class) {
            this.addClass(node, options.class);
        }

        if (options.style) {
            this.setStyle(node, options.style);
        }

        if (options.value) {
            this.setValue(node, options.value);
        }

        if (options.attributes) {
            this.setAttribute(node, options.attributes);
        }

        if (options.properties) {
            this.setProperty(node, options.properties);
        }

        if (options.dataset) {
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
