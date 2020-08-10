/**
 * DOM Create
 */

Object.assign(DOM.prototype, {

    /**
     * Attach a shadow DOM tree to the first node.
     * @param {string|array|HTMLElement|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {Boolean} [open=true] Whether the elements are accessible from JavaScript outside the root.
     * @returns {ShadowRoot} The new ShadowRoot.
     */
    attachShadow(nodes, open = true) {
        const node = this.parseNode(nodes);

        if (!node) {
            return;
        }

        return node.attachShadow({
            mode: open ?
                'open' :
                'closed'
        });
    },

    /**
     * Create a new DOM element.
     * @param {string} [tagName=div] The type of HTML element to create.
     * @param {object} [options] The options to use for creating the element.
     * @param {string} [options.html] The HTML contents.
     * @param {string} [options.text] The text contents.
     * @param {string|array} [options.class] The classes.
     * @param {object} [options.style] An object containing style properties.
     * @param {string} [options.value] The value.
     * @param {object} [options.attributes] An object containing attributes.
     * @param {object} [options.properties] An object containing properties.
     * @param {object} [options.dataset] An object containing dataset values.
     * @returns {HTMLElement} The new HTMLElement.
     */
    create(tagName = 'div', options) {
        const node = this._context.createElement(tagName);

        if (!options) {
            return node;
        }

        if ('html' in options) {
            node.innerHTML = options.html;
        } else if ('text' in options) {
            node.innerText = options.text;
        }

        if ('class' in options) {
            node.classList.add(
                ...this.constructor._parseClasses(
                    Core.wrap(options.class)
                )
            );
        }

        if ('style' in options) {
            this.constructor._setStyle(node, options.style);
        }

        if ('value' in options) {
            node.value = options.value;
        }

        if ('attributes' in options) {
            this.constructor._setAttribute(node, options.attributes);
        }

        if ('properties' in options) {
            for (const key in options.properties) {
                node[key] = options.properties[key];
            }
        }

        if ('dataset' in options) {
            const dataset = this.constructor._parseData(options.dataset, null, true);

            this.constructor._setDataset(node, dataset);
        }

        return node;
    },

    /**
     * Create a new comment node.
     * @param {string} comment The comment contents.
     * @returns {Node} The new comment node.
     */
    createComment(comment) {
        return this._context.createComment(comment);
    },

    /**
     * Create a new document fragment.
     * @returns {DocumentFragment} The new DocumentFragment.
     */
    createFragment() {
        return this._context.createDocumentFragment();
    },

    /**
     * Create a new range object.
     * @returns {Range} The new Range.
     */
    createRange() {
        return this._context.createRange();
    },

    /**
     * Create a new text node.
     * @param {string} text The text contents.
     * @returns {Node} The new text node.
     */
    createText(text) {
        return this._context.createTextNode(text);
    },

    /**
     * Create an Array containing nodes parsed from a HTML string.
     * @param {string} html The HTML input string.
     * @returns {array} An array of nodes.
     */
    parseHTML(html) {
        return Core.wrap(
            this.createRange()
                .createContextualFragment(html)
                .children
        );
    }

});
