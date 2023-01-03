
import { PADDING_BOX } from './../../vars.js';
import { height as _height, width as _width } from './../../attributes/size.js';

/**
 * QuerySet Size
 */

/**
 * Get the computed height of the first node.
 * @param {object} [options] The options for calculating the height.
 * @param {number} [options.boxSize=PADDING_BOX] The box sizing to calculate.
 * @param {Boolean} [options.outer] Whether to use the window outer height.
 * @return {number} The height.
 */
export function height({ boxSize = PADDING_BOX, outer = false } = {}) {
    return _height(this, { boxSize, outer });
};

/**
 * Get the computed width of the first node.
 * @param {object} [options] The options for calculating the width.
 * @param {number} [options.boxSize=PADDING_BOX] The box sizing to calculate.
 * @param {Boolean} [options.outer] Whether to use the window outer width.
 * @return {number} The width.
 */
export function width({ boxSize = PADDING_BOX, outer = false } = {}) {
    return _width(this, { boxSize, outer });
};
