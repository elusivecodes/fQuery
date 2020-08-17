/**
 * DOM Styles
 */

Object.assign(DOM.prototype, {

    /**
     * Add classes to each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    addClass(nodes, ...classes) {
        nodes = this.parseNodes(nodes);

        classes = this.constructor._parseClasses(classes);

        if (!classes.length) {
            return;
        }

        for (const node of nodes) {
            node.classList.add(...classes);
        }
    },

    /**
     * Get computed CSS style value(s) for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [style] The CSS style name.
     * @returns {string|object} The CSS style value, or an object containing the computed CSS style properties.
     */
    css(nodes, style) {
        const node = this.parseNode(nodes);

        if (!node) {
            return;
        }

        return this.constructor._css(node, style);
    },

    /**
     * Get style properties for the first node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [style] The style name.
     * @returns {string|object} The style value, or an object containing the style properties.
     */
    getStyle(nodes, style) {
        const node = this.parseNode(nodes);

        if (!node) {
            return;
        }

        return this.constructor._getStyle(node, style);
    },

    /**
     * Hide each node from display.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    hide(nodes) {
        this.setStyle(nodes, 'display', 'none');
    },

    /**
     * Remove classes from each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    removeClass(nodes, ...classes) {
        nodes = this.parseNodes(nodes);

        classes = this.constructor._parseClasses(classes);

        if (!classes.length) {
            return;
        }

        for (const node of nodes) {
            node.classList.remove(...classes);
        }
    },

    /**
     * Set style properties for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|object} style The style name, or an object containing styles.
     * @param {string} [value] The style value.
     * @param {Boolean} [important] Whether the style should be !important.
     */
    setStyle(nodes, style, value, important) {
        nodes = this.parseNodes(nodes);

        const styles = this.constructor._parseData(style, value);

        for (const node of nodes) {
            this.constructor._setStyle(node, styles, important);
        }
    },

    /**
     * Display each hidden node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    show(nodes) {
        this.setStyle(nodes, 'display', '');
    },

    /**
     * Toggle the visibility of each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     */
    toggle(nodes) {
        nodes = this.parseNodes(nodes);

        for (const node of nodes) {
            node.style.setProperty(
                'display',
                node.style.display === 'none' ?
                    '' :
                    'none'
            );
        }
    },

    /**
     * Toggle classes for each node.
     * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {...string|string[]} classes The classes.
     */
    toggleClass(nodes, ...classes) {
        nodes = this.parseNodes(nodes);

        classes = this.constructor._parseClasses(classes);

        if (!classes.length) {
            return;
        }

        for (const node of nodes) {
            for (const className of classes) {
                node.classList.toggle(className);
            }
        }
    }

});
