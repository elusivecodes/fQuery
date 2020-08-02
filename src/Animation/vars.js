/**
 * Animation (Static) Properties
 */

Object.assign(Animation, {

    // Animation defaults
    defaults: {
        duration: 1000,
        type: 'ease-in-out',
        infinite: false,
        debug: false
    },

    // Animating flag
    _animating: false,

    // Current animations
    _animations: new Map()

});

// Set the Animation prototype
Object.setPrototypeOf(Animation.prototype, Promise.prototype);
