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
        const { debounce = true, passive = true, touches = 1 } = options;

        if (move && debounce) {
            move = this.constructor.debounce(move);

            // needed to make sure up callback executes after final move callback
            if (up) {
                up = this.constructor.debounce(up);
            }
        }

        return e => {
            const isTouch = e.type === 'touchstart';

            if (isTouch && e.touches.length !== touches) {
                return;
            }

            if (down && down(e) === false) {
                return;
            }

            if (isTouch) {
                e.preventDefault();
            }

            if (!move && !up) {
                return;
            }

            const moveEvent = isTouch ?
                'touchmove' :
                'mousemove';

            const realMove = e => {
                if (isTouch && e.touches.length !== touches) {
                    return;
                }

                if (!move) {
                    return;
                }

                move(e);
            };

            const upEvent = isTouch ?
                'touchend' :
                'mouseup';

            const realUp = e => {
                if (isTouch && e.touches.length !== touches) {
                    return;
                }

                if (up && up(e) === false) {
                    return;
                }

                if (isTouch) {
                    e.preventDefault();
                }

                this.removeEvent(window, moveEvent, realMove);
                this.removeEvent(window, upEvent, realUp);
            };

            this.addEvent(window, moveEvent, realMove, { passive });
            this.addEvent(window, upEvent, realUp, { passive });
        };
    }

});
