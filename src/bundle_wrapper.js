/**
 * FrostDOM Bundle v1.1.4
 * https://github.com/elusivecodes/FrostCore
 * https://github.com/elusivecodes/FrostDOM
 */
(function(global, factory) {
    'use strict';

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory;
    } else {
        factory(global);
    }

})(this, function(window) {
    'use strict';

    if (typeof module === 'object') {
        module.exports = null;
    }

    // {{code}}

    return {
        AjaxRequest: window.AjaxRequest,
        Animation: window.Animation,
        AnimationSet: window.AnimationSet,
        Core: window.Core,
        DOM: window.DOM,
        dom: window.dom,
        QuerySet,
        QuerySetImmutable
    };

});