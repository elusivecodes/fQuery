const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #removeClass', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" class="test1 test2"></div>' +
                '<div id="test2" class="test1 test2"></div>';
        });
    });

    it('removes a class from all nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('div')
                    .removeClass('test1');
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test2"></div>' +
            '<div id="test2" class="test2"></div>'
        );
    });

    it('parses classes from string', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('div')
                    .removeClass('test1 test2');
                return document.body.innerHTML;
            }),
            '<div id="test1" class=""></div>' +
            '<div id="test2" class=""></div>'
        );
    });

    it('parses classes from array', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('div')
                    .removeClass([
                        'test1',
                        'test2'
                    ]);
                return document.body.innerHTML;
            }),
            '<div id="test1" class=""></div>' +
            '<div id="test2" class=""></div>'
        );
    });

    it('parses classes from multiple arguments', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('div')
                    .removeClass(
                        'test1',
                        ['test2']
                    );
                return document.body.innerHTML;
            }),
            '<div id="test1" class=""></div>' +
            '<div id="test2" class=""></div>'
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.query('div');
                return query === query.removeClass('test1');
            }),
            true
        );
    });

});