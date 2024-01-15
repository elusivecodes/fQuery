import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#removeStyle', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1" style="background-color: blue; color: white;"></div>' +
                '<div id="test2" style="background-color: blue; color: white;"></div>';
        });
    });

    it('removes a style from all nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.removeStyle('div', 'color');
                return document.body.innerHTML;
            }),
            '<div id="test1" style="background-color: blue;"></div>' +
            '<div id="test2" style="background-color: blue;"></div>',
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.removeStyle(
                    document.getElementById('test1'),
                    'color',
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" style="background-color: blue;"></div>' +
            '<div id="test2" style="background-color: blue; color: white;"></div>',
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.removeStyle(
                    document.querySelectorAll('div'),
                    'color',
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" style="background-color: blue;"></div>' +
            '<div id="test2" style="background-color: blue;"></div>',
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.removeStyle(
                    document.body.children,
                    'color',
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" style="background-color: blue;"></div>' +
            '<div id="test2" style="background-color: blue;"></div>',
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.removeStyle([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                ], 'color');
                return document.body.innerHTML;
            }),
            '<div id="test1" style="background-color: blue;"></div>' +
            '<div id="test2" style="background-color: blue;"></div>',
        );
    });
});
