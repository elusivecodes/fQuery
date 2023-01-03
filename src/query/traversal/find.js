import QuerySet from './../query-set.js';
import { find as _find, findByClass as _findByClass, findById as _findById, findByTag as _findByTag, findOne as _findOne, findOneByClass as _findOneByClass, findOneById as _findOneById, findOneByTag as _findOneByTag } from './../../traversal/find.js';

/**
 * QuerySet Find
 */

/**
 * Return all descendent nodes matching a selector.
 * @param {string} selector The query selector.
 * @return {QuerySet} The QuerySet object.
 */
export function find(selector) {
    return new QuerySet(_find(selector, this));
};

/**
 * Return all descendent nodes with a specific class.
 * @param {string} className The class name.
 * @return {QuerySet} The QuerySet object.
 */
export function findByClass(className) {
    return new QuerySet(_findByClass(className, this));
};

/**
 * Return all descendent nodes with a specific ID.
 * @param {string} id The id.
 * @return {QuerySet} The QuerySet object.
 */
export function findById(id) {
    return new QuerySet(_findById(id, this));
};

/**
 * Return all descendent nodes with a specific tag.
 * @param {string} tagName The tag name.
 * @return {QuerySet} The QuerySet object.
 */
export function findByTag(tagName) {
    return new QuerySet(_findByTag(tagName, this));
};

/**
 * Return a single descendent node matching a selector.
 * @param {string} selector The query selector.
 * @return {QuerySet} The QuerySet object.
 */
export function findOne(selector) {
    const node = _findOne(selector, this);

    return new QuerySet(node ? [node] : []);
};

/**
 * Return a single descendent node with a specific class.
 * @param {string} className The class name.
 * @return {QuerySet} The QuerySet object.
 */
export function findOneByClass(className) {
    const node = _findOneByClass(className, this);

    return new QuerySet(node ? [node] : []);
};

/**
 * Return a single descendent node with a specific ID.
 * @param {string} id The id.
 * @return {QuerySet} The QuerySet object.
 */
export function findOneById(id) {
    const node = _findOneById(id, this);

    return new QuerySet(node ? [node] : []);
};

/**
 * Return a single descendent node with a specific tag.
 * @param {string} tagName The tag name.
 * @return {QuerySet} The QuerySet object.
 */
export function findOneByTag(tagName) {
    const node = _findOneByTag(tagName, this);

    return new QuerySet(node ? [node] : []);
};
