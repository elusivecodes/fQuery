/**
 * DOM (Static) Properties
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

    // Comma seperated selector RegEx
    splitRegex: /\,(?=(?:(?:[^"]*"){2})*[^"]*$)\s*/,

    // Temporary ID
    tempId: 'frost' + (Date.now().toString(16))

});
