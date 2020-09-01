/**
 * FrostDOM v1.0.11
 * https://github.com/elusivecodes/FrostDOM
 */
(function(global, factory) {
    'use strict';

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory;
    } else {
        Object.assign(global, factory(global));
    }

})(this || window, function(window) {
    'use strict';

    if (!window) {
        throw new Error('FrostDOM requires a Window.');
    }

    if (!('Core' in window)) {
        throw new Error('FrostDOM requires FrostCore.');
    }

    const Core = window.Core;
    const document = window.document;

    // {{code}}
    return {
        AjaxRequest,
        Animation,
        AnimationSet,
        DOM,
        dom: new DOM
    };

});