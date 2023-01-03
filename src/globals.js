import { getWindow, setContext, setWindow } from './config.js';
import $ from './fquery.js';

let _$;

/**
 * Reset the global $ variable.
 */
export function noConflict() {
    const window = getWindow();

    if (window.$ === $) {
        window.$ = _$;
    }
};

/**
 * Register the global variables.
 * @param {Window} window The window.
 * @param {Document} [document] The document.
 * @return {object} The fQuery object.
 */
export function registerGlobals(window, document) {
    setWindow(window);
    setContext(document || window.document);

    _$ = window.$;
    window.$ = $;

    return $;
};
