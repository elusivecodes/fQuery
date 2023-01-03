import { extend, isDocument, isWindow } from '@fr0st/core';

/**
 * DOM Config
 */

const ajaxDefaults = {
    afterSend: null,
    beforeSend: null,
    cache: true,
    contentType: 'application/x-www-form-urlencoded',
    data: null,
    headers: {},
    isLocal: null,
    method: 'GET',
    onProgress: null,
    onUploadProgress: null,
    processData: true,
    rejectOnCancel: true,
    responseType: null,
    url: null,
    xhr: (_) => new XMLHttpRequest,
};

const animationDefaults = {
    duration: 1000,
    type: 'ease-in-out',
    infinite: false,
    debug: false,
};

export const config = {
    ajaxDefaults,
    animationDefaults,
    context: null,
    useTimeout: false,
    window: null,
};

/**
 * Get the AJAX defaults.
 * @return {object} The AJAX defaults.
 */
export function getAjaxDefaults() {
    return ajaxDefaults;
};

/**
 * Get the animation defaults.
 * @return {object} The animation defaults.
 */
export function getAnimationDefaults() {
    return animationDefaults;
};

/**
 * Get the document context.
 * @return {Document} The document context.
 */
export function getContext() {
    return config.context;
};

/**
 * Get the window.
 * @return {Window} The window.
 */
export function getWindow() {
    return config.window;
};

/**
 * Set the AJAX defaults.
 * @param {object} options The ajax default options.
 */
export function setAjaxDefaults(options) {
    extend(ajaxDefaults, options);
};

/**
 * Set the animation defaults.
 * @param {object} options The animation default options.
 */
export function setAnimationDefaults(options) {
    extend(animationDefaults, options);
};

/**
 * Set the document context.
 * @param {Document} context The document context.
 */
export function setContext(context) {
    if (!isDocument(context)) {
        throw new Error('FrostDOM requires a valid Document.');
    }

    config.context = context;
};

/**
 * Set the window.
 * @param {Window} window The window.
 */
export function setWindow(window) {
    if (!isWindow(window)) {
        throw new Error('FrostDOM requires a valid Window.');
    }

    config.window = window;
};

/**
 * Set whether animations should use setTimeout.
 * @param {Boolean} [enable=true] Whether animations should use setTimeout.
 */
export function useTimeout(enable = true) {
    config.useTimeout = enable;
};
