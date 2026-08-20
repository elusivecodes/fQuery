import { config, getWindow } from './../config.js';
import { animations } from './../vars.js';

let animating = false;

/**
 * Gets the current time.
 * @returns {number} The current time.
 */
export function getTime() {
    return performance.now();
};

/**
 * Starts the animation loop (if not already started).
 */
export function start() {
    if (animating) {
        return;
    }

    animating = true;
    update();
};

/**
 * Runs a single frame of all animations, and then queue up the next frame.
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
