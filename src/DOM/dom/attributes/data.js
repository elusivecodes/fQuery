/**
 * DOM Data
 */

Object.assign(DOM.prototype, {

    /**
     * Clone custom data from each node to each other node.
     * @param {string|Node|NodeList|HTMLCollection|Window|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|Node|NodeList|HTMLCollection|Window|Node[]} others The other node(s), or a query selector string.
     */
    cloneData(nodes, others) {
        for (const node of this._nodeFilter(nodes, node => DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node))) {
            this._cloneData(node, others);
        }
    },

    /**
     * Get custom data for the first node.
     * @param {string|Node|NodeList|HTMLCollection|Window|Node[]} nodes The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     * @returns {*} The data value.
     */
    getData(nodes, key) {
        const node = this._nodeFind(nodes, node => DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node));

        if (!node) {
            return;
        }

        return this._getData(node, key);
    },

    /**
     * Remove custom data from each node.
     * @param {string|Node|NodeList|HTMLCollection|Window|Node[]} nodes The input node(s), or a query selector string.
     * @param {string} [key] The data key.
     */
    removeData(nodes, key) {
        for (const node of this._nodeFilter(nodes, node => DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node))) {
            this._removeData(node, key);
        }
    },

    /**
     * Set custom data for each node.
     * @param {string|Node|NodeList|HTMLCollection|Window|Node[]} nodes The input node(s), or a query selector string.
     * @param {string|object} key The data key, or an object containing data.
     * @param {*} [value] The data value.
     */
    setData(nodes, key, value) {
        const data = DOM._parseData(key, value);

        for (const node of this._nodeFilter(nodes, node => DOM.isNode(node) || DOM.isDocument(node) || Core.isWindow(node))) {
            this._setData(node, data);
        }
    },

    /**
     * Clone custom data from a single node to each other node.
     * @param {Node|Window} node The input node.
     * @param {string|Node|NodeList|HTMLCollection|Window|Node[]} others The other node(s), or a query selector string.
     */
    _cloneData(node, others) {
        if (!this._data.has(node)) {
            return;
        }

        this.setData(others, {
            ...this._data.get(node)
        });
    },

    /**
     * Get custom data for a single node.
     * @param {Node|Window} node The input node.
     * @param {string} [key] The data key.
     * @returns {*} The data value.
     */
    _getData(node, key) {
        if (!this._data.has(node)) {
            return;
        }

        if (!key) {
            return this._data.get(node);
        }

        return this._data.get(node)[key];
    },

    /**
     * Remove custom data from a single node.
     * @param {Node|Window} node The input node.
     * @param {string} [key] The data key.
     */
    _removeData(node, key) {
        if (!this._data.has(node)) {
            return;
        }

        if (key) {
            const data = this._data.get(node);
            delete data[key];
            if (Object.keys(data).length) {
                return;
            }
        }

        this._data.delete(node);
    },

    /**
     * Set custom data for a single node.
     * @param {Node|Window} node The input node.
     * @param {object} data An object containing data.
     */
    _setData(node, data) {
        if (!this._data.has(node)) {
            this._data.set(node, {});
        }

        Object.assign(
            this._data.get(node),
            data
        );
    }

});
