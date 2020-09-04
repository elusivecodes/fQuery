/**
 * QuerySet Attributes
 */

Object.assign(QuerySet.prototype, {

    /**
     * Get attribute value(s) for the first node.
     * @param {string} [attribute] The attribute name.
     * @returns {string} The attribute value.
     */
    getAttribute(attribute) {
        return this._dom.getAttribute(this, attribute);
    },

    /**
     * Get dataset value(s) for the first node.
     * @param {string} [key] The dataset key.
     * @returns {*} The dataset value, or an object containing the dataset.
     */
    getDataset(key) {
        return this._dom.getDataset(this, key);
    },

    /**
     * Get the HTML contents of the first node.
     * @returns {string} The HTML contents.
     */
    getHTML() {
        return this._dom.getHTML(this);
    },

    /**
     * Get a property value for the first node.
     * @param {string} property The property name.
     * @returns {string} The property value.
     */
    getProperty(property) {
        return this._dom.getProperty(this, property);
    },

    /**
     * Get the text contents of the first node.
     * @returns {string} The text contents.
     */
    getText() {
        return this._dom.getText(this);
    },

    /**
     * Get the value property of the first node.
     * @returns {string} The value.
     */
    getValue() {
        return this._dom.getValue(this);
    },

    /**
     * Remove an attribute from each node.
     * @param {string} attribute The attribute name.
     * @returns {QuerySet} The QuerySet object.
     */
    removeAttribute(attribute) {
        this._dom.removeAttribute(this, attribute);

        return this;
    },

    /**
     * Remove a dataset value from each node.
     * @param {string} key The dataset key.
     * @returns {QuerySet} The QuerySet object.
     */
    removeDataset(key) {
        this._dom.removeDataset(this, key);

        return this;
    },

    /**
     * Remove a property from each node.
     * @param {string} property The property name.
     * @returns {QuerySet} The QuerySet object.
     */
    removeProperty(property) {
        this._dom.removeProperty(this, property);

        return this;
    },

    /**
     * Set an attribute value for each node.
     * @param {string|object} attribute The attribute name, or an object containing attributes.
     * @param {string} [value] The attribute value.
     * @returns {QuerySet} The QuerySet object.
     */
    setAttribute(attribute, value) {
        this._dom.setAttribute(this, attribute, value);

        return this;
    },

    /**
     * Set a dataset value for each node.
     * @param {string|object} key The dataset key, or an object containing dataset values.
     * @param {*} [value] The dataset value.
     * @returns {QuerySet} The QuerySet object.
     */
    setDataset(key, value) {
        this._dom.setDataset(this, key, value);

        return this;
    },

    /**
     * Set the HTML contents of each node.
     * @param {string} html The HTML contents.
     * @returns {QuerySet} The QuerySet object.
     */
    setHTML(html) {
        this._dom.setHTML(this, html);

        return this;
    },

    /**
     * Set a property value for each node.
     * @param {string|object} property The property name, or an object containing properties.
     * @param {string} [value] The property value.
     * @returns {QuerySet} The QuerySet object.
     */
    setProperty(property, value) {
        this._dom.setProperty(this, property, value);

        return this;
    },

    /**
     * Set the text contents of each node.
     * @param {string} text The text contents.
     * @returns {QuerySet} The QuerySet object.
     */
    setText(text) {
        this._dom.setText(this, text);

        return this;
    },
    /**
     * Set the value property of each node.
     * @param {string} value The value.
     * @returns {QuerySet} The QuerySet object.
     */
    setValue(value) {
        this._dom.setValue(this, value);

        return this;
    }

});
