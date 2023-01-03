import { getAttribute as _getAttribute, getDataset as _getDataset, getHTML as _getHTML, getProperty as _getProperty, getText as _getText, getValue as _getValue, removeAttribute as _removeAttribute, removeDataset as _removeDataset, removeProperty as _removeProperty, setAttribute as _setAttribute, setDataset as _setDataset, setHTML as _setHTML, setProperty as _setProperty, setText as _setText, setValue as _setValue } from './../../attributes/attributes.js';

/**
 * QuerySet Attributes
 */

/**
 * Get attribute value(s) for the first node.
 * @param {string} [attribute] The attribute name.
 * @return {string} The attribute value.
 */
export function getAttribute(attribute) {
    return _getAttribute(this, attribute);
};

/**
 * Get dataset value(s) for the first node.
 * @param {string} [key] The dataset key.
 * @return {*} The dataset value, or an object containing the dataset.
 */
export function getDataset(key) {
    return _getDataset(this, key);
};

/**
 * Get the HTML contents of the first node.
 * @return {string} The HTML contents.
 */
export function getHTML() {
    return _getHTML(this);
};

/**
 * Get a property value for the first node.
 * @param {string} property The property name.
 * @return {string} The property value.
 */
export function getProperty(property) {
    return _getProperty(this, property);
};

/**
 * Get the text contents of the first node.
 * @return {string} The text contents.
 */
export function getText() {
    return _getText(this);
};

/**
 * Get the value property of the first node.
 * @return {string} The value.
 */
export function getValue() {
    return _getValue(this);
};

/**
 * Remove an attribute from each node.
 * @param {string} attribute The attribute name.
 * @return {QuerySet} The QuerySet object.
 */
export function removeAttribute(attribute) {
    _removeAttribute(this, attribute);

    return this;
};

/**
 * Remove a dataset value from each node.
 * @param {string} key The dataset key.
 * @return {QuerySet} The QuerySet object.
 */
export function removeDataset(key) {
    _removeDataset(this, key);

    return this;
};

/**
 * Remove a property from each node.
 * @param {string} property The property name.
 * @return {QuerySet} The QuerySet object.
 */
export function removeProperty(property) {
    _removeProperty(this, property);

    return this;
};

/**
 * Set an attribute value for each node.
 * @param {string|object} attribute The attribute name, or an object containing attributes.
 * @param {string} [value] The attribute value.
 * @return {QuerySet} The QuerySet object.
 */
export function setAttribute(attribute, value) {
    _setAttribute(this, attribute, value);

    return this;
};

/**
 * Set a dataset value for each node.
 * @param {string|object} key The dataset key, or an object containing dataset values.
 * @param {*} [value] The dataset value.
 * @return {QuerySet} The QuerySet object.
 */
export function setDataset(key, value) {
    _setDataset(this, key, value);

    return this;
};

/**
 * Set the HTML contents of each node.
 * @param {string} html The HTML contents.
 * @return {QuerySet} The QuerySet object.
 */
export function setHTML(html) {
    _setHTML(this, html);

    return this;
};

/**
 * Set a property value for each node.
 * @param {string|object} property The property name, or an object containing properties.
 * @param {string} [value] The property value.
 * @return {QuerySet} The QuerySet object.
 */
export function setProperty(property, value) {
    _setProperty(this, property, value);

    return this;
};

/**
 * Set the text contents of each node.
 * @param {string} text The text contents.
 * @return {QuerySet} The QuerySet object.
 */
export function setText(text) {
    _setText(this, text);

    return this;
};

/**
 * Set the value property of each node.
 * @param {string} value The value.
 * @return {QuerySet} The QuerySet object.
 */
export function setValue(value) {
    _setValue(this, value);

    return this;
};
