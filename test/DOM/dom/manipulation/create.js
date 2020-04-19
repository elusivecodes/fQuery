const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Create', function() {

    describe('#attachShadow', function() {

        it('attaches a shadow root to the first node');
        it('attaches a closed shadow root to the first node');
        it('works with HTMLElement nodes');
        it('works with HTMLCollection nodes');
        it('works with NodeList nodes');
        it('works with array nodes');

    });

    describe('#create', function() {

        it('creates a new node');
        it('creates a new node with HTML');
        it('creates a new node with text');
        it('creates a new node with classes');
        it('creates a new node with styles');
        it('creates a new node with value');
        it('creates a new node with attributes');
        it('creates a new node with properties');
        it('creates a new node with dataset values');

    });

    describe('#createComment', function() {

        it('creates a new comment node', async function() {
            assert.equal(
                await exec(_ => {
                    const comment = dom.createComment('Test');
                    document.body.appendChild(comment);
                    return document.body.innerHTML;
                }),
                '<!--Test-->'
            );
        });

    });

    describe('#createFragment', function() {

        it('creates a new document fragment');

    });

    describe('#createRange', function() {

        it('creates a new range');

    });

    describe('#createText', function() {

        it('creates a new text node', async function() {
            assert.equal(
                await exec(_ => {
                    const text = dom.createText('Test');
                    document.body.appendChild(text);
                    return document.body.innerHTML;
                }),
                'Test'
            );
        });

    });

    describe('#parseHTML', function() {

        it('returns an array of nodes parsed from a HTML string');

    });

});