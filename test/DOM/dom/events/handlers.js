const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Event Handlers', function() {

    describe('#addEvent', function() {
        // adds an event to each element
    });

    describe('#addEventDelegate', function() {
        // adds a delegated event to each element
    });

    describe('#addEventDelegateOnce', function() {
        // adds a self-destructing delegated event to each element
    });

    describe('#addEventOnce', function() {
        // adds a self-destructing event to each element
    });

    describe('#cloneEvents', function() {
        // clones all events from all elements to all other elements
    });

    describe('#removeEvent', function() {
        // removes an event from each element
        // removes all events of a type for each element
        // removes all events for each element
    });

    describe('#removeEventDelegate', function() {
        // removes a delegated event from each element
        // removes all delegated events of a type for each element
        // removes all delegated events for each element
    });

    describe('#triggerEvent', function() {
        // triggers an event for each element
        // works with custom data
    });

});