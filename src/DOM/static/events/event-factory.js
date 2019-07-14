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
        const getDelegate = selector.match(DOM.complexRegex) ?
            this._getDelegateContainsFactory(node, selector) :
            this._getDelegateMatchFactory(node, selector);

        return e => {
            if (DOMNode.isSame(e.target, node)) {
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
     * Return a function for matching a delegate target to a custom selector.
     * @param {HTMLElement|ShadowRoot|Document} node The input node.
     * @param {string} selector The delegate query selector.
     * @returns {DOM~delegateCallback} The callback for finding the matching delegate.
     */
    _getDelegateContainsFactory(node, selector) {
        selector = DOM._prefixSelectors(selectors, `#${DOM._tempId}`);

        return target => {
            const matches = this.__findByCustom(selector, node);

            if (!matches.length) {
                return false;
            }

            if (matches.includes(target)) {
                return target;
            }

            return this._parents(
                target,
                parent => matches.includes(parent),
                parent => DOMNode.isSame(node, parent),
                true
            ).shift();
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
            DOMNode.is(target, selector) ?
                target :
                this._parents(
                    target,
                    parent => DOMNode.is(parent, selector),
                    parent => DOMNode.isSame(node, parent),
                    true
                ).shift();
    },

    /**
     * Return a wrapped event callback that removes itself after execution.
     * @param {HTMLElement|ShadowRoot|Document|Window} node The input node.
     * @param {string} events The event names.
     * @param {string} delegate The delegate selector.
     * @param {DOM~eventCallback} callback The callback to execute.
     */
    _selfDestructFactory(node, events, delegate, callback) {
        const realCallback = e => {
            delegate ?
                this._removeEvent(node, events, callback, delegate) :
                this._removeEvent(node, events, realCallback);
            return callback(e);
        };

        return realCallback;
    }

});
