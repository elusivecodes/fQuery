import { dropIn as _dropIn, dropOut as _dropOut, fadeIn as _fadeIn, fadeOut as _fadeOut, rotateIn as _rotateIn, rotateOut as _rotateOut, slideIn as _slideIn, slideOut as _slideOut, squeezeIn as _squeezeIn, squeezeOut as _squeezeOut } from './../../animation/animations.js';

/**
 * QuerySet Animations
 */

/**
 * Add a drop in animation to the queue for each node.
 * @param {object} [options] The options to use for animating.
 * @param {string} [options.queueName=default] The name of the queue to use.
 * @param {string|function} [options.direction=top] The direction to drop the node from.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {QuerySet} The QuerySet object.
 */
export function dropIn({ queueName = 'default', ...options } = {}) {
    return this.queue((node) =>
        _dropIn(node, options),
    { queueName },
    );
};

/**
 * Add a drop out animation to the queue for each node.
 * @param {object} [options] The options to use for animating.
 * @param {string} [options.queueName=default] The name of the queue to use.
 * @param {string|function} [options.direction=top] The direction to drop the node to.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {QuerySet} The QuerySet object.
 */
export function dropOut({ queueName = 'default', ...options } = {}) {
    return this.queue((node) =>
        _dropOut(node, options),
    { queueName },
    );
};

/**
 * Add a fade in animation to the queue for each node.
 * @param {object} [options] The options to use for animating.
 * @param {string} [options.queueName=default] The name of the queue to use.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {QuerySet} The QuerySet object.
 */
export function fadeIn({ queueName = 'default', ...options } = {}) {
    return this.queue((node) =>
        _fadeIn(node, options),
    { queueName },
    );
};

/**
 * Add a fade out animation to the queue for each node.
 * @param {object} [options] The options to use for animating.
 * @param {string} [options.queueName=default] The name of the queue to use.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {QuerySet} The QuerySet object.
 */
export function fadeOut({ queueName = 'default', ...options } = {}) {
    return this.queue((node) =>
        _fadeOut(node, options),
    { queueName },
    );
};

/**
 * Add a rotate in animation to the queue for each node.
 * @param {object} [options] The options to use for animating.
 * @param {string} [options.queueName=default] The name of the queue to use.
 * @param {number} [options.x=0] The amount to rotate on the X-axis.
 * @param {number} [options.y=1] The amount to rotate on the Y-axis.
 * @param {number} [options.z=0] The amount to rotate on the Z-axis.
 * @param {Boolean} [options.inverse] Whether to invert the rotation.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {QuerySet} The QuerySet object.
 */
export function rotateIn({ queueName = 'default', ...options } = {}) {
    return this.queue((node) =>
        _rotateIn(node, options),
    { queueName },
    );
};

/**
 * Add a rotate out animation to the queue for each node.
 * @param {object} [options] The options to use for animating.
 * @param {string} [options.queueName=default] The name of the queue to use.
 * @param {number} [options.x=0] The amount to rotate on the X-axis.
 * @param {number} [options.y=1] The amount to rotate on the Y-axis.
 * @param {number} [options.z=0] The amount to rotate on the Z-axis.
 * @param {Boolean} [options.inverse] Whether to invert the rotation.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {QuerySet} The QuerySet object.
 */
export function rotateOut({ queueName = 'default', ...options } = {}) {
    return this.queue((node) =>
        _rotateOut(node, options),
    { queueName },
    );
};

/**
 * Add a slide in animation to the queue for each node.
 * @param {object} [options] The options to use for animating.
 * @param {string} [options.queueName=default] The name of the queue to use.
 * @param {string|function} [options.direction=bottom] The direction to slide from.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {QuerySet} The QuerySet object.
 */
export function slideIn({ queueName = 'default', ...options } = {}) {
    return this.queue((node) =>
        _slideIn(node, options),
    { queueName },
    );
};

/**
 * Add a slide out animation to the queue for each node.
 * @param {object} [options] The options to use for animating.
 * @param {string} [options.queueName=default] The name of the queue to use.
 * @param {string|function} [options.direction=bottom] The direction to slide to.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {QuerySet} The QuerySet object.
 */
export function slideOut({ queueName = 'default', ...options } = {}) {
    return this.queue((node) =>
        _slideOut(node, options),
    { queueName },
    );
};

/**
 * Add a squeeze in animation to the queue for each node.
 * @param {object} [options] The options to use for animating.
 * @param {string} [options.queueName=default] The name of the queue to use.
 * @param {string|function} [options.direction=bottom] The direction to squeeze from.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {QuerySet} The QuerySet object.
 */
export function squeezeIn({ queueName = 'default', ...options } = {}) {
    return this.queue((node) =>
        _squeezeIn(node, options),
    { queueName },
    );
};

/**
 * Add a squeeze out animation to the queue for each node.
 * @param {object} [options] The options to use for animating.
 * @param {string} [options.queueName=default] The name of the queue to use.
 * @param {string|function} [options.direction=bottom] The direction to squeeze to.
 * @param {number} [options.duration=1000] The duration of the animation.
 * @param {string} [options.type=ease-in-out] The type of animation.
 * @param {Boolean} [options.infinite] Whether the animation should run forever.
 * @param {Boolean} [options.useGpu=true] Whether the animation should use GPU acceleration.
 * @param {Boolean} [options.debug] Whether to set debugging info on the node.
 * @return {QuerySet} The QuerySet object.
 */
export function squeezeOut({ queueName = 'default', ...options } = {}) {
    return this.queue((node) =>
        _squeezeOut(node, options),
    { queueName },
    );
};
