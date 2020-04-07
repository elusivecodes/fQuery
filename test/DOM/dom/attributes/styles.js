const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Attributes (Styles)', function() {

    describe('#addClass', function() {

        it('adds a class to all nodes');
        it('parses multiple classes from string');
        it('parses multiple classes from array');
        it('works with HTMLElement');
        it('works with HTMLCollection');
        it('works with NodeList');
        it('works with array');

    });

    describe('#css', function() {

        it('returns a computed style for the first node');
        it('returns an object with all computed styles for the first node');
        it('works with HTMLElement');
        it('works with HTMLCollection');
        it('works with NodeList');
        it('works with array');

    });

    describe('#getStyle', function() {

        it('returns a style value for the first node');
        it('returns an object with all style values for the first node');
        it('works with HTMLElement');
        it('works with HTMLCollection');
        it('works with NodeList');
        it('works with array');

    });

    describe('#hide', function() {

        it('hides all nodes');
        it('works with HTMLElement');
        it('works with HTMLCollection');
        it('works with NodeList');
        it('works with array');

    });

    describe('#removeClass', function() {

        it('removes a class from all nodes');
        it('parses multiple classes from string');
        it('parses multiple classes from array');
        it('works with HTMLElement');
        it('works with HTMLCollection');
        it('works with NodeList');
        it('works with array');

    });

    describe('#setStyle', function() {

        it('sets a style value for all nodes');
        it('sets a styles object for all nodes');
        it('sets a style value for all nodes with important');
        it('works with HTMLElement');
        it('works with HTMLCollection');
        it('works with NodeList');
        it('works with array');

    });

    describe('#show', function() {

        it('shows all nodes');
        it('works with HTMLElement');
        it('works with HTMLCollection');
        it('works with NodeList');
        it('works with array');

    });

    describe('#toggle', function() {

        it('toggles the visibility of all nodes');
        it('works with HTMLElement');
        it('works with HTMLCollection');
        it('works with NodeList');
        it('works with array');

    });

    describe('#toggleClass', function() {

        it('toggles a class for all nodes');
        it('parses multiple classes from string');
        it('parses multiple classes from array');
        it('works with HTMLElement');
        it('works with HTMLCollection');
        it('works with NodeList');
        it('works with array');

    });

});