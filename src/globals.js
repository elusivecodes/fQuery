import { getWindow, setContext, setWindow } from './config.js';

let _$;
let fQuery;

/**
 * Reset the global $ variable.
 */
export function noConflict() {
    const window = getWindow();

    if (fQuery && window.$ === fQuery) {
        window.$ = _$;
    }
};

/**
 * Register the global variables.
 * @param {Window} window The window.
 * @param {Document} [document] The document.
 * @param {object} query The fQuery object.
 * @return {object} The fQuery object.
 */
export function registerGlobals(window, document, query) {
    fQuery = query;

    setWindow(window);
    setContext(document || window.document);

    _$ = window.$;
    window.$ = fQuery;

    return fQuery;
};
