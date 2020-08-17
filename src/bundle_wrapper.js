/**
 * FrostDOM Bundle v1.0.3
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
        Core: window.Core,
        DOM: window.DOM,
        dom: new window.DOM
    };

});