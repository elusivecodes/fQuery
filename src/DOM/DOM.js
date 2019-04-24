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
        this.context = context;

        this._animating = false;
        this._animations = new Map;

        this._queues = new WeakMap;

        this._data = new WeakMap;
        this._events = new WeakMap;
        this._styles = new WeakMap;
    }

    /**
     * Execute a command in the document context.
     * @param {string} command The command to execute.
     * @param {string} [value] The value to give the command.
     * @returns {Boolean} TRUE if the command was executed, otherwise FALSE.
     */
    exec(command, value = null) {
        return this.context.execCommand(command, false, value);
    }

}
