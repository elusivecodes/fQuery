/**
 * DOM Class
 * @class
 */
class DOM {

    /**
     * New DOM constructor.
     * @param {Document} [context=document] The document context.
     * @returns {DOM} A new DOM object.
     */
    constructor(context = document) {
        if (!(Core.isDocument(context))) {
            throw new Error('Invalid document');
        }

        this._context = context;
    }

}
