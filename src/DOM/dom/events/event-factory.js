/**
 * DOM Event Factory
 */

Object.assign(DOM.prototype, {

    /** 
     * Return a wrapped mouse drag event (optionally limited by animation frame).
     * @param {DOM~eventCallback} down The callback to execute on mousedown.
     * @param {DOM~eventCallback} move The callback to execute on mousemove.
     * @param {DOM~eventCallback} up The callback to execute on mouseup.
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
                this.addEvent(window, 'mousemove', move);
            }

            if (move || up) {
                this.addEventOnce(window, 'mouseup', e => {
                    if (move) {
                        this.removeEvent(window, 'mousemove', move);
                    }

                    if (up) {
                        up(e);
                    }
                });
            }
        };
    }

});
