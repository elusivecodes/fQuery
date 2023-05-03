import { evaluate } from '@fr0st/core';
import { animate } from './animate.js';
import Animation from './animation.js';
import AnimationSet from './animation-set.js';
import { start } from './helpers.js';
import { parseNodes } from './../filters.js';

/**
 * DOM Animations
 */

/**
 * Drop each node into place.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {object} [options] The options to use for animating.
 * @param {string|function} [options.direction=top] The direction to drop the node from.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
 */
export function dropIn(selector, options) {
    return slideIn(
        selector,
        {
            direction: 'top',
            ...options,
        },
    );
};

/**
 * Drop each node out of place.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {object} [options] The options to use for animating.
 * @param {string|function} [options.direction=top] The direction to drop the node to.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
 */
export function dropOut(selector, options) {
    return slideOut(
        selector,
        {
            direction: 'top',
            ...options,
        },
    );
};

/**
 * Fade the opacity of each node in.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {object} [options] The options to use for animating.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
 */
export function fadeIn(selector, options) {
    return animate(
        selector,
        (node, progress) =>
            node.style.setProperty(
                'opacity',
                progress < 1 ?
                    progress.toFixed(2) :
                    '',
            ),
        options,
    );
};

/**
 * Fade the opacity of each node out.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {object} [options] The options to use for animating.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
 */
export function fadeOut(selector, options) {
    return animate(
        selector,
        (node, progress) =>
            node.style.setProperty(
                'opacity',
                progress < 1 ?
                    (1 - progress).toFixed(2) :
                    '',
            ),
        options,
    );
};

/**
 * Rotate each node in on an X, Y or Z.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {object} [options] The options to use for animating.
 * @param {number} [options.x=0] The amount to rotate on the X-axis.
 * @param {number} [options.y=1] The amount to rotate on the Y-axis.
 * @param {number} [options.z=1] The amount to rotate on the Z-axis.
 * @param {Boolean} [options.inverse] Whether to invert the rotation.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
 */
export function rotateIn(selector, options) {
    return animate(
        selector,
        (node, progress, options) => {
            const amount = ((90 - (progress * 90)) * (options.inverse ? -1 : 1)).toFixed(2);
            node.style.setProperty(
                'transform',
                progress < 1 ?
                    `rotate3d(${options.x}, ${options.y}, ${options.z}, ${amount}deg)` :
                    '',
            );
        },
        {
            x: 0,
            y: 1,
            z: 0,
            ...options,
        },
    );
};

/**
 * Rotate each node out on an X, Y or Z.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {object} [options] The options to use for animating.
 * @param {number} [options.x=0] The amount to rotate on the X-axis.
 * @param {number} [options.y=1] The amount to rotate on the Y-axis.
 * @param {number} [options.z=1] The amount to rotate on the Z-axis.
 * @param {Boolean} [options.inverse] Whether to invert the rotation.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
 */
export function rotateOut(selector, options) {
    return animate(
        selector,
        (node, progress, options) => {
            const amount = ((progress * 90) * (options.inverse ? -1 : 1)).toFixed(2);
            node.style.setProperty(
                'transform',
                progress < 1 ?
                    `rotate3d(${options.x}, ${options.y}, ${options.z}, ${amount}deg)` :
                    '',
            );
        },
        {
            x: 0,
            y: 1,
            z: 0,
            ...options,
        },
    );
};

/**
 * Slide each node in from a direction.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {object} [options] The options to use for animating.
 * @param {string|function} [options.direction=bottom] The direction to slide from.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
 */
export function slideIn(selector, options) {
    return animate(
        selector,
        (node, progress, options) => {
            if (progress === 1) {
                node.style.setProperty('overflow', '');
                if (options.useGpu) {
                    node.style.setProperty('transform', '');
                } else {
                    node.style.setProperty('margin-left', '');
                    node.style.setProperty('margin-top', '');
                }
                return;
            }

            const dir = evaluate(options.direction);

            let size; let translateStyle; let inverse;
            if (['top', 'bottom'].includes(dir)) {
                size = node.clientHeight;
                translateStyle = options.useGpu ?
                    'Y' :
                    'margin-top';
                inverse = dir === 'top';
            } else {
                size = node.clientWidth;
                translateStyle = options.useGpu ?
                    'X' :
                    'margin-left';
                inverse = dir === 'left';
            }

            const translateAmount = ((size - (size * progress)) * (inverse ? -1 : 1)).toFixed(2);
            if (options.useGpu) {
                node.style.setProperty('transform', `translate${translateStyle}(${translateAmount}px)`);
            } else {
                node.style.setProperty(translateStyle, `${translateAmount}px`);
            }
        },
        {
            direction: 'bottom',
            useGpu: true,
            ...options,
        },
    );
};

/**
 * Slide each node out from a direction.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {object} [options] The options to use for animating.
 * @param {string|function} [options.direction=bottom] The direction to slide to.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
 */
export function slideOut(selector, options) {
    return animate(
        selector,
        (node, progress, options) => {
            if (progress === 1) {
                node.style.setProperty('overflow', '');
                if (options.useGpu) {
                    node.style.setProperty('transform', '');
                } else {
                    node.style.setProperty('margin-left', '');
                    node.style.setProperty('margin-top', '');
                }
                return;
            }

            const dir = evaluate(options.direction);

            let size; let translateStyle; let inverse;
            if (['top', 'bottom'].includes(dir)) {
                size = node.clientHeight;
                translateStyle = options.useGpu ?
                    'Y' :
                    'margin-top';
                inverse = dir === 'top';
            } else {
                size = node.clientWidth;
                translateStyle = options.useGpu ?
                    'X' :
                    'margin-left';
                inverse = dir === 'left';
            }

            const translateAmount = (size * progress * (inverse ? -1 : 1)).toFixed(2);
            if (options.useGpu) {
                node.style.setProperty('transform', `translate${translateStyle}(${translateAmount}px)`);
            } else {
                node.style.setProperty(translateStyle, `${translateAmount}px`);
            }
        },
        {
            direction: 'bottom',
            useGpu: true,
            ...options,
        },
    );
};

/**
 * Squeeze each node in from a direction.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {object} [options] The options to use for animating.
 * @param {string|function} [options.direction=bottom] The direction to squeeze from.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
 */
export function squeezeIn(selector, options) {
    const nodes = parseNodes(selector);

    options = {
        direction: 'bottom',
        useGpu: true,
        ...options,
    };

    const newAnimations = nodes.map((node) => {
        const initialHeight = node.style.height;
        const initialWidth = node.style.width;
        node.style.setProperty('overflow', 'hidden');

        return new Animation(
            node,
            (node, progress, options) => {
                node.style.setProperty('height', initialHeight);
                node.style.setProperty('width', initialWidth);

                if (progress === 1) {
                    node.style.setProperty('overflow', '');
                    if (options.useGpu) {
                        node.style.setProperty('transform', '');
                    } else {
                        node.style.setProperty('margin-left', '');
                        node.style.setProperty('margin-top', '');
                    }
                    return;
                }

                const dir = evaluate(options.direction);

                let size; let sizeStyle; let translateStyle;
                if (['top', 'bottom'].includes(dir)) {
                    size = node.clientHeight;
                    sizeStyle = 'height';
                    if (dir === 'top') {
                        translateStyle = options.useGpu ?
                            'Y' :
                            'margin-top';
                    }
                } else {
                    size = node.clientWidth;
                    sizeStyle = 'width';
                    if (dir === 'left') {
                        translateStyle = options.useGpu ?
                            'X' :
                            'margin-left';
                    }
                }

                const amount = (size * progress).toFixed(2);

                node.style.setProperty(sizeStyle, `${amount}px`);

                if (translateStyle) {
                    const translateAmount = (size - amount).toFixed(2);
                    if (options.useGpu) {
                        node.style.setProperty('transform', `translate${translateStyle}(${translateAmount}px)`);
                    } else {
                        node.style.setProperty(translateStyle, `${translateAmount}px`);
                    }
                }
            },
            options,
        );
    });

    start();

    return new AnimationSet(newAnimations);
};

/**
 * Squeeze each node out from a direction.
 * @param {string|array|HTMLElement|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {object} [options] The options to use for animating.
 * @param {string|function} [options.direction=bottom] The direction to squeeze to.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {AnimationSet} A new AnimationSet that resolves when the animation has completed.
 */
export function squeezeOut(selector, options) {
    const nodes = parseNodes(selector);

    options = {
        direction: 'bottom',
        useGpu: true,
        ...options,
    };

    const newAnimations = nodes.map((node) => {
        const initialHeight = node.style.height;
        const initialWidth = node.style.width;
        node.style.setProperty('overflow', 'hidden');

        return new Animation(
            node,
            (node, progress, options) => {
                node.style.setProperty('height', initialHeight);
                node.style.setProperty('width', initialWidth);

                if (progress === 1) {
                    node.style.setProperty('overflow', '');
                    if (options.useGpu) {
                        node.style.setProperty('transform', '');
                    } else {
                        node.style.setProperty('margin-left', '');
                        node.style.setProperty('margin-top', '');
                    }
                    return;
                }

                const dir = evaluate(options.direction);

                let size; let sizeStyle; let translateStyle;
                if (['top', 'bottom'].includes(dir)) {
                    size = node.clientHeight;
                    sizeStyle = 'height';
                    if (dir === 'top') {
                        translateStyle = options.useGpu ?
                            'Y' :
                            'margin-top';
                    }
                } else {
                    size = node.clientWidth;
                    sizeStyle = 'width';
                    if (dir === 'left') {
                        translateStyle = options.useGpu ?
                            'X' :
                            'margin-left';
                    }
                }

                const amount = (size - (size * progress)).toFixed(2);

                node.style.setProperty(sizeStyle, `${amount}px`);

                if (translateStyle) {
                    const translateAmount = (size - amount).toFixed(2);
                    if (options.useGpu) {
                        node.style.setProperty('transform', `translate${translateStyle}(${translateAmount}px)`);
                    } else {
                        node.style.setProperty(translateStyle, `${translateAmount}px`);
                    }
                }
            },
            options,
        );
    });

    start();

    return new AnimationSet(newAnimations);
};
