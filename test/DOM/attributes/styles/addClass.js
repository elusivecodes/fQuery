const assert = require('assert');
const { exec } = require('../../../setup');

describe('#addClass', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2"></div>';
        });
    });

    it('adds a class to all nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.addClass('div', 'test');
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test"></div>' +
            '<div id="test2" class="test"></div>'
        );
    });

    it('parses classes from string', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.addClass('div', 'test1 test2');
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test1 test2"></div>' +
            '<div id="test2" class="test1 test2"></div>'
        );
    });

    it('parses classes from array', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.addClass('div', [
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
        assert.strictEqual(
            await exec(_ => {
                dom.addClass('div', 'test1', ['test2']);
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test1 test2"></div>' +
            '<div id="test2" class="test1 test2"></div>'
        );
    });

    it('works with empty strings', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.addClass('div', '');
                return document.body.innerHTML;
            }),
            '<div id="test1"></div>' +
            '<div id="test2"></div>'
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.addClass(
                    document.getElementById('test1'),
                    'test'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test"></div>' +
            '<div id="test2"></div>'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.addClass(
                    document.querySelectorAll('div'),
                    'test'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test"></div>' +
            '<div id="test2" class="test"></div>'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.addClass(
                    document.body.children,
                    'test'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test"></div>' +
            '<div id="test2" class="test"></div>'
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.addClass([
                    document.getElementById('test1'),
                    document.getElementById('test2')
                ], 'test');
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test"></div>' +
            '<div id="test2" class="test"></div>'
        );
    });

});