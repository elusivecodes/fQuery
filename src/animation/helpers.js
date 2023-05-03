import { config, getWindow } from './../config.js';
import { animations } from './../vars.js';

/**
 * Animation Helpers
 */

let animating = false;

/**
 * Get the current time.
 * @return {number} The current time.
 */
export function getTime() {
    return document.timeline ?
        document.timeline.currentTime :
        performance.now();
};

/**
 * Start the animation loop (if not already started).
 */
export function start() {
    if (animating) {
        return;
    }

    animating = true;
    update();
};

/**
 * Run a single frame of all animations, and then queue up the next frame.
 */
function update() {
    const time = getTime();

    for (const [node, currentAnimations] of animations) {
        const otherAnimations = currentAnimations.filter((animation) => !animation.update(time));

        if (!otherAnimations.length) {
            animations.delete(node);
        } else {
            animations.set(node, otherAnimations);
        }
    }

    if (!animations.size) {
        animating = false;
    } else if (config.useTimeout) {
        setTimeout(update, 1000 / 60);
    } else {
        getWindow().requestAnimationFrame(update);
    }
};
