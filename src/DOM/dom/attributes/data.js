/**
 * DOM Data
 */

Object.assign(DOM.prototype, {

    /**
     * Clone custom data from each node to each other node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} others The other node(s), or a query selector string.
     */
    cloneData(nodes, others) {
        nodes = this.parseNodes(nodes, {
            fragment: true,
            shadow: true,
            document: true,
            window: true
        });

        others = this.parseNodes(others, {
            fragment: true,
            shadow: true,
            document: true,
            window: true
        });

        for (const node of nodes) {
            for (const other of others) {
                this.constructor._cloneData(node, other);
            }
        }
    },

    /**
     * Get custom data for the first node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     * @returns {*} The data value.
     */
    getData(nodes, key) {
        const node = this.parseNode(nodes, {
            fragment: true,
            shadow: true,
            document: true,
            window: true
        });

        if (!node) {
            return;
        }

        return this.constructor._getData(node, key);
    },

    /**
     * Remove custom data from each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     */
    removeData(nodes, key) {
        nodes = this.parseNodes(nodes, {
            fragment: true,
            shadow: true,
            document: true,
            window: true
        });

        for (const node of nodes) {
            this.constructor._removeData(node, key);
        }
    },

    /**
     * Set custom data for each node.
     * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} nodes The input node(s), or a query selector string.
     * @param {string|object} key The data key, or an object containing data.
     * @param {*} [value] The data value.
     */
    setData(nodes, key, value) {
        nodes = this.parseNodes(nodes, {
            fragment: true,
            shadow: true,
            document: true,
            window: true
        });

        const data = this.constructor._parseData(key, value);

        for (const node of nodes) {
            this.constructor._setData(node, data);
        }
    }

});
