/**
 * DOM Event Factory
 */

Object.assign(DOM.prototype, {

    /** 
     * Return a wrapped mouse drag event (optionally debounced).
     * @param {DOM~eventCallback} down The callback to execute on mousedown.
     * @param {DOM~eventCallback} move The callback to execute on mousemove.
     * @param {DOM~eventCallback} up The callback to execute on mouseup.
     * @param {object} [options] Options for the mouse drag event.
     * @param {Boolean} [options.debounce] Whether to debounce the move event.
     * @param {Boolean} [options.passive] Whether to use passive event listeners.
     * @returns {DOM~eventCallback} The mouse drag event callback.
     */
    mouseDragFactory(down, move, up, options = {}) {
        const { debounce, passive } = {
            debounce: true,
            passive: true,
            ...options
        };

        if (move && debounce) {
            move = this.constructor.debounce(move);

            // needed to make sure up callback executes after final move callback
            if (up) {
                up = this.constructor.debounce(up);
            }
        }

        return e => {
            const isTouch = e.type === 'touchstart';

            if (down && down(e) === false) {
                return;
            }

            if (isTouch) {
                e.preventDefault();
            }

            const moveEvent = isTouch ?
                'touchmove' :
                'mousemove';

            if (move) {
                this.addEvent(window, moveEvent, move, { passive });
            }

            if (move || up) {
                const upEvent = isTouch ?
                    'touchend' :
                    'mouseup';

                const realUp = e => {
                    if (up && up(e) === false) {
                        return;
                    }

                    if (isTouch) {
                        e.preventDefault();
                    }

                    this.removeEvent(window, upEvent, realUp);

                    if (move) {
                        this.removeEvent(window, moveEvent, move);
                    }
                };

                this.addEvent(window, upEvent, realUp, { passive });
            }
        };
    }

});
