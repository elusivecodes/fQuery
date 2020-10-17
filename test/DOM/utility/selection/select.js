const assert = require('assert');
const { exec } = require('../../../setup');

describe('#select', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="select">' +
                '<div id="div1" class="select">' +
                '<span id="span1">Test 1</span>' +
                '</div>' +
                '<div id="div2" class="select">' +
                '<span id="span2">Test 2</span>' +
                '</div>' +
                '</div>' +
                '<input id="input" value="Test 3">' +
                '<textarea id="textarea">Test 4</textarea>';
        });
    });

    it('creates a selection on the first node', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.select('.select');
                const selection = document.getSelection();
                const range = selection.getRangeAt(0);
                return range.toString();
            }),
            'Test 1'
        );
    });

    it('creates a selection on an input node', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.select('#input');
                document.execCommand('cut');
                return document.getElementById('input').value;
            }),
            ''
        );
    });

    it('creates a selection on a textarea node', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.select('#textarea');
                document.execCommand('cut');
                return document.getElementById('textarea').value;
            }),
            ''
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.select(
                    document.getElementById('div1')
                );
                const selection = document.getSelection();
                const range = selection.getRangeAt(0);
                return range.toString();
            }),
            'Test 1'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.select(
                    document.querySelectorAll('.select')
                );
                const selection = document.getSelection();
                const range = selection.getRangeAt(0);
                return range.toString();
            }),
            'Test 1'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.select(
                    document.getElementById('select').children
                );
                const selection = document.getSelection();
                const range = selection.getRangeAt(0);
                return range.toString();
            }),
            'Test 1'
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.select([
                    document.getElementById('div1'),
                    document.getElementById('div2')
                ]);
                const selection = document.getSelection();
                const range = selection.getRangeAt(0);
                return range.toString();
            }),
            'Test 1'
        );
    });

});