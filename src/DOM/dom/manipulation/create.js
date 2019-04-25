/**
 * DOM Create
 */

Object.assign(DOM.prototype, {

    /**
     * Clone each node.
     * @param {string|Node|NodeList|HTMLCollection|Node[]} nodes The input node(s), or a query selector string.
     * @param {Boolean} [deep=true] Whether to also clone all descendent nodes.
     * @param {Boolean} [cloneEvents=false] Whether to also clone events.
     * @param {Boolean} [cloneData=false] Whether to also clone custom data.
     * @returns {Node[]} The cloned nodes.
     */
    clone(nodes, deep = true, cloneEvents = false, cloneData = false) {
        return this._nodeFilter(nodes, Core.isNode)
            .map(node =>
                this._clone(node, deep, cloneEvents, cloneData)
            );
    },

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
        return this.context.createComment(comment);
    },

    /**
     * Create a new range object.
     * @returns {Range} The new range.
     */
    createRange() {
        return this.context.createRange();
    },

    /**
     * Create a new text node.
     * @param {string} text The text contents.
     * @returns {Node} The new text node.
     */
    createText(text) {
        return this.context.createTextNode(text);
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
    },

    /**
     * Clone a single node.
     * @param {Node} node The input node.
     * @param {Boolean} [deep=true] Whether to also clone all descendent nodes.
     * @param {Boolean} [cloneEvents=false] Whether to also clone events.
     * @param {Boolean} [cloneData=false] Whether to also clone custom data.
     * @returns {Node} The cloned node.
     */
    _clone(node, deep, cloneEvents, cloneData) {
        const clone = DOM._clone(node, deep);

        if (!cloneEvents && !cloneData) {
            return clone;
        }

        if (cloneEvents) {
            this._cloneEvents(node, clone);
        }

        if (cloneData) {
            this._cloneData(node, clone);
        }

        if (deep) {
            this._deepClone(node, clone, cloneEvents, cloneData);
        }

        return clone;
    },

    /**
     * Deep clone a node.
     * @param {Node} node The input node.
     * @param {Node} clone The cloned node.
     * @param {Boolean} [cloneEvents=false] Whether to also clone events.
     * @param {Boolean} [cloneData=false] Whether to also clone custom data.
     */
    _deepClone(node, clone, cloneEvents, cloneData) {
        const children = DOM._children(node, false, false, false);
        const cloneChildren = DOM._children(clone, false, false, false);

        for (let i = 0; i < children.length; i++) {
            if (cloneEvents) {
                this._cloneEvents(children[i], cloneChildren[i]);
            }

            if (cloneData) {
                this._cloneData(children[i], cloneChildren[i]);
            }

            this._deepClone(children[i], cloneChildren[i]);
        }
    }

});
