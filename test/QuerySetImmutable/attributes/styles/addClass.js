const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #addClass', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2"></div>';
        });
    });

    it('adds a class to all nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('div')
                    .addClass('test');
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test"></div>' +
            '<div id="test2" class="test"></div>'
        );
    });

    it('parses classes from string', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('div')
                    .addClass('test1 test2');
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test1 test2"></div>' +
            '<div id="test2" class="test1 test2"></div>'
        );
    });

    it('parses classes from array', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('div')
                    .addClass([
                        'test1',
                        'test2'
                    ]);
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test1 test2"></div>' +
            '<div id="test2" class="test1 test2"></div>'
        );
    });

    it('parses classes from multiple arguments', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('div')
                    .addClass('test1', ['test2']);
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test1 test2"></div>' +
            '<div id="test2" class="test1 test2"></div>'
        );
    });

    it('adds a class to all nodes', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.query('div');
                return query === query.addClass('test');
            }),
            true
        );
    });

});