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

    _queues: new WeakMap,

    _data: new WeakMap,
    _events: new WeakMap,
    _styles: new WeakMap,

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

    // CSS properties that can have number-only values
    cssNumberProperties: [
        'font-weight',
        'line-height',
        'opacity',
        'orphans',
        'scale',
        'widows',
        'z-index'
    ],

    CONTENT_BOX: 0,
    PADDING_BOX: 1,
    BORDER_BOX: 2,
    MARGIN_BOX: 3,
    SCROLL_BOX: 4,

    // Fast selector RegExp
    _fastRegExp: /^([\#\.]?)([\w\-]+)$/

});
