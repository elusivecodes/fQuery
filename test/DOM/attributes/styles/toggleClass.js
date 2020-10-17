const assert = require('assert');
const { exec } = require('../../../setup');

describe('#toggleClass', function() {

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
                dom.toggleClass('div', 'test1');
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test2"></div>' +
            '<div id="test2" class="test1"></div>'
        );
    });

    it('parses classes from string', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.toggleClass('div', 'test1 test2');
                return document.body.innerHTML;
            }),
            '<div id="test1" class=""></div>' +
            '<div id="test2" class="test1 test2"></div>'
        );
    });

    it('parses classes from array', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.toggleClass('div', [
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
                dom.toggleClass('div', 'test1', ['test2']);
                return document.body.innerHTML;
            }),
            '<div id="test1" class=""></div>' +
            '<div id="test2" class="test1 test2"></div>'
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.toggleClass(
                    document.getElementById('test1'),
                    'test1'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test2"></div>' +
            '<div id="test2"></div>'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.toggleClass(
                    document.querySelectorAll('div'),
                    'test1'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test2"></div>' +
            '<div id="test2" class="test1"></div>'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.toggleClass(
                    document.body.children,
                    'test1'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test2"></div>' +
            '<div id="test2" class="test1"></div>'
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.toggleClass([
                    document.getElementById('test1'),
                    document.getElementById('test2')
                ], 'test1');
                return document.body.innerHTML;
            }),
            '<div id="test1" class="test2"></div>' +
            '<div id="test2" class="test1"></div>'
        );
    });

});