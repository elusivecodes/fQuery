import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#removeAttribute', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<input type="text" id="test1" disabled>' +
                '<input type="number" id="test2" disabled>';
        });
    });

    it('removes an attribute for all nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.removeAttribute('input', 'disabled');
                return document.body.innerHTML;
            }),
            '<input type="text" id="test1">' +
            '<input type="number" id="test2">',
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.removeAttribute(
                    document.getElementById('test1'),
                    'disabled',
                );
                return document.body.innerHTML;
            }),
            '<input type="text" id="test1">' +
            '<input type="number" id="test2" disabled="">',
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.removeAttribute(
                    document.querySelectorAll('input'),
                    'disabled',
                );
                return document.body.innerHTML;
            }),
            '<input type="text" id="test1">' +
            '<input type="number" id="test2">',
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.removeAttribute(
                    document.body.children,
                    'disabled',
                );
                return document.body.innerHTML;
            }),
            '<input type="text" id="test1">' +
            '<input type="number" id="test2">',
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.removeAttribute([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                ], 'disabled');
                return document.body.innerHTML;
            }),
            '<input type="text" id="test1">' +
            '<input type="number" id="test2">',
        );
    });
});
