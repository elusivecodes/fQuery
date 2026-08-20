import { debounce as _debounce } from './../helpers.js';
import { eventLookup } from './../vars.js';
import { addEvent, removeEvent } from './event-handlers.js';

/**
 * DOM Event Factory
 */

/**
 * Return a wrapped mouse drag event (optionally debounced).
 * @param {DOM~eventCallback} down The callback to execute on mousedown.
 * @param {DOM~eventCallback} move The callback to execute on mousemove.
 * @param {DOM~eventCallback} up The callback to execute on mouseup.
 * @param {object} [options] The options for the mouse drag event.
 * @param {Boolean} [options.debounce=true] Whether to debounce the move event.
 * @param {Boolean} [options.passive=true] Whether to use passive event listeners.
 * @param {Boolean} [options.preventDefault=true] Whether to prevent the default event.
 * @param {number} [options.touches=1] The number of touches to trigger the event for.
 * @return {DOM~eventCallback} The mouse drag event callback.
 */
export function mouseDragFactory(down, move, up, { debounce = true, passive = true, preventDefault = true, touches = 1 } = {}) {
    if (move && debounce) {
        move = _debounce(move);

        // needed to make sure up callback executes after final move callback
        if (up) {
            up = _debounce(up);
        }
    }

    return (event) => {
        const isTouch = event.type === 'touchstart';

        if (isTouch && event.touches.length !== touches) {
            return;
        }

        if (down && down(event) === false) {
            return;
        }

        if (preventDefault) {
            event.preventDefault();
        }

        if (!move && !up) {
            return;
        }

        const [moveEvent, upEvent] = event.type in eventLookup ?
            eventLookup[event.type] :
            eventLookup.mousedown;

        const realMove = (event) => {
            if (isTouch && event.touches.length !== touches) {
                return;
            }

            if (preventDefault && !passive) {
                event.preventDefault();
            }

            if (!move) {
                return;
            }

            move(event);
        };

        const realUp = (event) => {
            if (isTouch && event.touches.length !== touches - 1) {
                return;
            }

            if (up && up(event) === false) {
                return;
            }

            if (preventDefault) {
                event.preventDefault();
            }

            removeEvent(window, moveEvent, realMove);
            removeEvent(window, upEvent, realUp);
        };

        addEvent(window, moveEvent, realMove, { passive });
        addEvent(window, upEvent, realUp);
    };
};
