const assert = require('assert');
const { exec } = require('../../../setup');

describe('#toggle', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" style="display: none;"></div>';
        });
    });

    it('toggles the visibility of all nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.toggle('div');
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: none;"></div>' +
            '<div id="test2" style=""></div>'
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.toggle(
                    document.getElementById('test1')
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: none;"></div>' +
            '<div id="test2" style="display: none;"></div>'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.toggle(
                    document.querySelectorAll('div')
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: none;"></div>' +
            '<div id="test2" style=""></div>'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.toggle(
                    document.body.children
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: none;"></div>' +
            '<div id="test2" style=""></div>'
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.toggle([
                    document.getElementById('test1'),
                    document.getElementById('test2')
                ]);
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: none;"></div>' +
            '<div id="test2" style=""></div>'
        );
    });

});