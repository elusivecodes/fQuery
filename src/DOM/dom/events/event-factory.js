/**
 * DOM Event Factory
 */

Object.assign(DOM.prototype, {

    /** 
     * Return a wrapped mouse drag event (optionally limited by animation frame).
     * @param {function} down The callback to execute on mousedown.
     * @param {function} move The callback to execute on mousemove.
     * @param {function} up The callback to execute on mouseup.
     * @param {Boolean} [animated=true] Whether to limit the move event by animation frame.
     * @returns {DOM~eventCallback} The mouse drag event callback.
     */
    mouseDragFactory(down, move, up, animated = true) {
        if (move && animated) {
            move = Core.animation(move);

            // needed to make sure up callback executes after final move callback
            if (up) {
                up = Core.animation(up);
            }
        }

        return e => {
            if (down && down(e) === false) {
                return false;
            }

            if (move) {
                this._addEvent(window, 'mousemove', move);
            }

            if (move || up) {
                this._addEventOnce(window, 'mouseup', e => {
                    if (move) {
                        this._removeEvent(window, 'mousemove', move);
                    }

                    if (up) {
                        up(e);
                    }
                });
            }
        };
    },

    /**
     * Return a wrapped event callback that executes on a delegate selector.
     * @param {HTMLElement} node The input node.
     * @param {string} selector The delegate query selector.
     * @param {function} callback The event callback.
     * @returns {DOM~eventCallback} The delegated event callback.
     */
    _delegateFactory(node, selector, callback) {
        const getDelegate = selector.match(DOM.complexRegex) ?
            this._getDelegateContainsFactory(node, selector) :
            this._getDelegateMatchFactory(node, selector);

        return e => {
            if (DOM._isSame(e.target, node)) {
                return;
            }

            const delegate = getDelegate(e.target);

            if (!delegate) {
                return;
            }

            e.delegateTarget = delegate;

            return callback(e);
        };
    },

    /**
     * Return a function for matching a delegate target to a complex selector.
     * @param {HTMLElement} node The input node.
     * @param {string} selector The delegate query selector.
     * @returns {function} The callback for finding the matching delegate.
     */
    _getDelegateContainsFactory(node, selector) {
        selector = DOM._prefixSelectors(selectors, `#${DOM._tempId}`);

        return target => {
            const matches = Core.merge(
                [],
                DOM._findByCustom(selector, node)
            );

            if (!matches.length) {
                return false;
            }

            if (matches.includes(target)) {
                return target;
            }

            return DOM._parents(
                target,
                parent => matches.contains(parent),
                parent => DOM._isSame(node, parent),
                true
            ).shift();
        };
    },

    /**
     * Return a function for matching a delegate target to a standard selector.
     * @param {HTMLElement} node The input node.
     * @param {string} selector The delegate query selector.
     * @returns {function} The callback for finding the matching delegate.
     */
    _getDelegateMatchFactory(node, selector) {
        return target =>
            DOM._is(target, selector) ?
                target :
                DOM._parents(
                    target,
                    parent => DOM._is(parent, selector),
                    parent => DOM._isSame(node, parent),
                    true
                ).shift();
    },

    /**
     * Return a wrapped event callback that removes itself after execution.
     * @param {HTMLElement|Document|Window} node The input node.
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
