import { afterSelection as _afterSelection, beforeSelection as _beforeSelection, select as _select, selectAll as _selectAll, wrapSelection as _wrapSelection } from './../../utility/selection.js';

/**
 * QuerySet Selection
 */

/**
 * Insert each node after the selection.
 * @return {QuerySet} The QuerySet object.
 */
export function afterSelection() {
    _afterSelection(this);

    return this;
};

/**
 * Insert each node before the selection.
 * @return {QuerySet} The QuerySet object.
 */
export function beforeSelection() {
    _beforeSelection(this);

    return this;
};

/**
 * Create a selection on the first node.
 * @return {QuerySet} The QuerySet object.
 */
export function select() {
    _select(this);

    return this;
};

/**
 * Create a selection containing all of the nodes.
 * @return {QuerySet} The QuerySet object.
 */
export function selectAll() {
    _selectAll(this);

    return this;
};

/**
 * Wrap selected nodes with other nodes.
 * @return {QuerySet} The QuerySet object.
 */
export function wrapSelection() {
    _wrapSelection(this);

    return this;
};
