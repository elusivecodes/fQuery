import { blur as _blur, click as _click, focus as _focus } from './../../events/events.js';

/**
 * QuerySet Events
 */

/**
 * Trigger a blur event on the first node.
 * @return {QuerySet} The QuerySet object.
 */
export function blur() {
    _blur(this);

    return this;
};

/**
 * Trigger a click event on the first node.
 * @return {QuerySet} The QuerySet object.
 */
export function click() {
    _click(this);

    return this;
};

/**
 * Trigger a focus event on the first node.
 * @return {QuerySet} The QuerySet object.
 */
export function focus() {
    _focus(this);

    return this;
};
