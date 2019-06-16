/**
 * DOM (Static) Data
 */

Object.assign(DOM, {

    /**
     * Clone custom data from a single node to each other node.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} other The other node.
     */
    _cloneData(node, other) {
        if (!DOM._data.has(node)) {
            return;
        }

        this._setData(other, {
            ...DOM._data.get(node)
        });
    },

    /**
     * Get custom data for a single node.
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
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
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
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
     * @param {HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
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
