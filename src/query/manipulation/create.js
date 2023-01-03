import QuerySet from './../query-set.js';
import { attachShadow as _attachShadow } from './../../manipulation/create.js';

/**
 * QuerySet Create
 */

/**
 * Attach a shadow DOM tree to the first node.
 * @param {Boolean} [open=true] Whether the elements are accessible from JavaScript outside the root.
 * @return {QuerySet} A new QuerySet object.
 */
export function attachShadow({ open = true } = {}) {
    const shadow = _attachShadow(this, { open });

    return new QuerySet(shadow ? [shadow] : []);
}
