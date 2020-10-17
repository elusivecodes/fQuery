const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySet #toggleClass', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" class="test1 test2"></div>' +
                '<div id="test2"></div>';
        });
    });

    it('toggles a class for all nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.queryMutable('div')
                    .toggleClass('test1');
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test2"></div>' +
            '<div id="test2" class="test1"></div>'
        );
    });

    it('parses classes from string', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.queryMutable('div')
                    .toggleClass('test1 test2');
                return document.body.innerHTML;
            }),
            '<div id="test1" class=""></div>' +
            '<div id="test2" class="test1 test2"></div>'
        );
    });

    it('parses classes from array', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.queryMutable('div')
                    .toggleClass([
                        'test1',
                        'test2'
                    ]);
                return document.body.innerHTML;
            }),
            '<div id="test1" class=""></div>' +
            '<div id="test2" class="test1 test2"></div>'
        );
    });

    it('parses classes from multiple arguments', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.queryMutable('div')
                    .toggleClass('test1', ['test2']);
                return document.body.innerHTML;
            }),
            '<div id="test1" class=""></div>' +
            '<div id="test2" class="test1 test2"></div>'
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return query === query.toggleClass('test1');
            }),
            true
        );
    });

});