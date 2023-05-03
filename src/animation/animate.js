import Animation from './animation.js';
import AnimationSet from './animation-set.js';
import { start } from './helpers.js';
import { parseNodes } from './../filters.js';
import { animations } from './../vars.js';

/**
 * DOM Animate
 */

/**
 * Add an animation to each node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {DOM~animationCallback} callback The animation callback.
 * @param {object} [options] The options to use for animating.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
 */
export function animate(selector, callback, options) {
    const nodes = parseNodes(selector);

    const newAnimations = nodes.map((node) => new Animation(node, callback, options));

    start();

    return new AnimationSet(newAnimations);
};

/**
 * Stop all animations for each node.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {object} [options] The options for stopping the animation.
 * @param {Boolean} [options.finish=true] Whether to complete all current animations.
 */
export function stop(selector, { finish = true } = {}) {
    const nodes = parseNodes(selector);

    for (const node of nodes) {
        if (!animations.has(node)) {
            continue;
        }

        const currentAnimations = animations.get(node);
        for (const animation of currentAnimations) {
            animation.stop({ finish });
        }
    }
};
