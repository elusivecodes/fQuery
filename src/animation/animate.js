import { parseNodes } from './../filters.js';
import { animations } from './../vars.js';
import AnimationSet from './animation-set.js';
import Animation from './animation.js';
import { start } from './helpers.js';

/**
 * @typedef {import('../helpers.js').ElementInput} ElementInput
 * @typedef {import('./animation.js').AnimationCallback} AnimationCallback
 * @typedef {import('./animation.js').AnimationOptions} AnimationOptions
 * @typedef {import('./animation.js').StopAnimationOptions} StopAnimationOptions
 */

/**
 * Adds an animation to each node.
 * @param {ElementInput} selector The input node(s), or a query selector string.
 * @param {AnimationCallback} callback The animation callback.
 * @param {AnimationOptions} [options] The animation options.
 * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
 */
export function animate(selector, callback, options) {
    const nodes = parseNodes(selector);

    const newAnimations = nodes.map((node) => new Animation(node, callback, options));

    start();

    return new AnimationSet(newAnimations);
};

/**
 * Stops all animations for each node.
 * @param {ElementInput} selector The input node(s), or a query selector string.
 * @param {StopAnimationOptions} [options] The stopping options.
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
