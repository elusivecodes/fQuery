/**
 * DOM Event Factory
 */

Object.assign(DOM.prototype, {

    /** 
     * Return a wrapped mouse drag event (optionally debounced).
     * @param {DOM~eventCallback} down The callback to execute on mousedown.
     * @param {DOM~eventCallback} move The callback to execute on mousemove.
     * @param {DOM~eventCallback} up The callback to execute on mouseup.
     * @param {Boolean} [debounce=true] Whether to debounce the move event.
     * @returns {DOM~eventCallback} The mouse drag event callback.
     */
    mouseDragFactory(down, move, up, debounce = true) {
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
                this.addEvent(window, moveEvent, move);
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

                this.addEvent(window, upEvent, realUp);
            }
        };
    }

});
