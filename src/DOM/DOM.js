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


        this.animating = false;
        this.animations = new Map;

        this.queues = new WeakMap;

        this.nodeData = new WeakMap;
        this.nodeEvents = new WeakMap;
        this.nodeStyles = new WeakMap;
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
