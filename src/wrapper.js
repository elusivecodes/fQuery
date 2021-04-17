/**
 * FrostDOM v2.0.13
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
    let dom;

    // {{code}}
    dom = new DOM;

    return {
        AjaxRequest,
        Animation,
        AnimationSet,
        DOM,
        dom,
        QuerySet,
        QuerySetImmutable
    };

});