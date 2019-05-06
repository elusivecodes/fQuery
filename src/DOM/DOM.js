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
        this._context = context;

        this._animating = false;
        this._animations = new Map;
        this._queues = new WeakMap;

        this._data = new WeakMap;
        this._events = new WeakMap;
        this._styles = new WeakMap;
    }

}
