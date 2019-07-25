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

    _animating: false,
    _animations: new Map,
    _queues: new WeakMap,

    _data: new WeakMap,
    _events: new WeakMap,
    _styles: new WeakMap,

    // Default AJAX options
    ajaxDefaults: {
        beforeSend: false,
        cache: true,
        contentType: 'application/x-www-form-urlencoded',
        data: false,
        method: 'GET',
        processData: true
    },

    // Default allowed tags/attributes for sanitizer
    allowedTags: {
        '*': ['class', 'dir', 'id', 'lang', 'role', /^aria-[\w-]*$/i],
        a: ['target', 'href', 'title', 'rel'],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ['src', 'alt', 'title', 'width', 'height'],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: []
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

    // Complex selector RegExp
    _complexRegExp: /(?:^\s*[\>\+\~]|\,(?=(?:(?:[^"']*["']){2})*[^"']*$)\s*[\>\+\~])/,

    // Fast selector RegExp
    _fastRegExp: /^([\#\.]?)([\w\-]+)$/,

    // Local protocol RegExp
    _localRegExp: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,

    // Comma seperated selector RegExp
    _splitRegExp: /\,(?=(?:(?:[^"]*"){2})*[^"]*$)\s*/,

    // Temporary ID
    _tempId: 'frost' + (Date.now().toString(16))

});
