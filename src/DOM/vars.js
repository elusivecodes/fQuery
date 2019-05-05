/**
 * DOM (Static) Properties
 */

/**
 * @callback DOM~animationCallback
 * @param {HTMLElement} node The input node.
 * @param {number} progress The animation progress.
 * @param {object} options The options to use for animating.
 */

/**
 * @callback DOM~delegateCallback
 * @param {HTMLElement} node The input node.
 */

/**
 * @callback DOM~eventCallback
 * @param {Event} event The event object.
 */

/**
 * @callback DOM~nodeCallback
 * @param {Node|HTMLElement|DocumentFragment|ShadowRoot|Document|Window} node The input node.
 */

/**
 * @callback DOM~queueCallback
 * @param {HTMLElement} node The input node.
 */

Object.assign(DOM, {

    // Default AJAX options
    ajaxDefaults: {
        beforeSend: false,
        cache: true,
        contentType: 'application/x-www-form-urlencoded',
        data: false,
        method: 'GET',
        processData: true
    },

    // Default animation options
    animationDefaults: {
        duration: 1000,
        type: 'ease-in-out',
        infinite: false
    },

    // CSS properties that can have number-only values
    cssNumberProperties: [
        'font-weight',
        'line-height',
        'opacity',
        'orphans',
        'widows',
        'z-index'
    ],

    // Complex selector RegEX
    complexRegex: /(?:^\s*[\>\+\~]|\,(?=(?:(?:[^"']*["']){2})*[^"']*$)\s*[\>\+\~])/,

    // Fast selector RegEx
    fastRegex: /^([\#\.]?)([\w\-]+)$/,

    // Local protocol RegEx
    localRegex: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,

    // Comma seperated selector RegEx
    splitRegex: /\,(?=(?:(?:[^"]*"){2})*[^"]*$)\s*/,

    // Temporary ID
    tempId: 'frost' + (Date.now().toString(16))

});
