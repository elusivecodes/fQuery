import { evaluate } from '@fr0st/core';
import { parseNodes } from './../filters.js';
import { animate } from './animate.js';
import AnimationSet from './animation-set.js';
import Animation from './animation.js';
import { start } from './helpers.js';

/**
 * @typedef {import('../helpers.js').ElementInput} ElementInput
 * @typedef {import('./animation.js').AnimationOptions} AnimationOptions
 */

/**
 * Drops each node into place.
 * @param {ElementInput} selector The input node(s), or a query selector string.
 * @param {AnimationOptions} [options] The animation options.
 * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
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
 * Drops each node out of place.
 * @param {ElementInput} selector The input node(s), or a query selector string.
 * @param {AnimationOptions} [options] The animation options.
 * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
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
 * Fades the opacity of each node in.
 * @param {ElementInput} selector The input node(s), or a query selector string.
 * @param {AnimationOptions} [options] The animation options.
 * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
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
 * Fades the opacity of each node out.
 * @param {ElementInput} selector The input node(s), or a query selector string.
 * @param {AnimationOptions} [options] The animation options.
 * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
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
 * Rotates each node in on an X, Y or Z.
 * @param {ElementInput} selector The input node(s), or a query selector string.
 * @param {AnimationOptions} [options] The animation options.
 * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
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
 * Rotates each node out on an X, Y or Z.
 * @param {ElementInput} selector The input node(s), or a query selector string.
 * @param {AnimationOptions} [options] The animation options.
 * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
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
 * Slides each node in from a direction.
 * @param {ElementInput} selector The input node(s), or a query selector string.
 * @param {AnimationOptions} [options] The animation options.
 * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
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
 * Slides each node out from a direction.
 * @param {ElementInput} selector The input node(s), or a query selector string.
 * @param {AnimationOptions} [options] The animation options.
 * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
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
 * Squeezes each node in from a direction.
 * @param {ElementInput} selector The input node(s), or a query selector string.
 * @param {AnimationOptions} [options] The animation options.
 * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
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
 * Squeezes each node out from a direction.
 * @param {ElementInput} selector The input node(s), or a query selector string.
 * @param {AnimationOptions} [options] The animation options.
 * @returns {AnimationSet} A new AnimationSet that resolves when the animation has completed.
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
