/**
 * DOM (Static) Event Factory
 */

Object.assign(DOM, {

    /**
     * Return a wrapped event callback that executes on a delegate selector.
     * @param {HTMLElement|ShadowRoot|Document} node The input node.
     * @param {string} selector The delegate query selector.
     * @param {function} callback The event callback.
     * @returns {DOM~eventCallback} The delegated event callback.
     */
    _delegateFactory(node, selector, callback) {
        const getDelegate = this._getDelegateMatchFactory(node, selector);

        return e => {
            if (node.isSameNode(e.target)) {
                return;
            }

            const delegate = getDelegate(e.target);

            if (!delegate) {
                return;
            }

            const event = {};

            for (const key in e) {
                event[key] = Core.isFunction(e[key]) ?
                    (...args) => e[key](...args) :
                    e[key];
            }

            event.currentTarget = delegate;
            event.delegateTarget = node;
            event.originalEvent = e;

            Object.freeze(event)

            return callback(event);
        };
    },

    /**
     * Return a function for matching a delegate target to a standard selector.
     * @param {HTMLElement|ShadowRoot|Document} node The input node.
     * @param {string} selector The delegate query selector.
     * @returns {DOM~delegateCallback} The callback for finding the matching delegate.
     */
    _getDelegateMatchFactory(node, selector) {
        return target =>
            target.matches(selector) ?
                target :
                this._parents(
                    target,
                    parent => parent.matches(selector),
                    parent => parent.isSameNode(node),
                    true
                ).shift();
    },

    /**
     * Return a wrapped event callback that checks for a namespace match.
     * @param {string} event The namespaced event name.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @returns {DOM~eventCallback} The wrapped event callback.
     */
    _namespaceFactory(event, callback) {
        return e => {
            if ('namespaceRegExp' in e && !e.namespaceRegExp.test(event)) {
                return;
            }

            return callback(e);
        };
    },

    /**
     * Return a wrapped event callback that checks for a return false for preventing default.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @returns {DOM~eventCallback} The wrapped event callback.
     */
    _preventFactory(callback) {
        return e => {
            if (callback(e) === false) {
                e.preventDefault();
            }
        };
    },

    /**
     * Return a wrapped event callback that removes itself after execution.
     * @param {HTMLElement|ShadowRoot|Document|Window} node The input node.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     * @returns {DOM~eventCallback} The wrapped event callback.
     */
    _selfDestructFactory(node, events, delegate, callback) {
        return e => {
            this._removeEvent(node, events, callback, delegate);
            return callback(e);
        };
    }

});
