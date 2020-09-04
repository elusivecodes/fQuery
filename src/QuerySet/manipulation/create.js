/**
 * QuerySet Create
 */

Object.assign(QuerySet.prototype, {

    /**
     * Attach a shadow DOM tree to the first node.
     * @param {Boolean} [open=true] Whether the elements are accessible from JavaScript outside the root.
     * @returns {QuerySet} A new QuerySet object.
     */
    attachShadow(open = true) {
        const nodes = [],
            shadow = this._dom.attachShadow(this, open);

        if (shadow) {
            nodes.push(shadow);
        }

        return new this.constructor(nodes, this._dom);
    }

});
