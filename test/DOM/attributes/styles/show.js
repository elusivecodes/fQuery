import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#show', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1" style="display: none;"></div>' +
                '<div id="test2" style="display: none;"></div>';
        });
    });

    it('shows all nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.show('div');
                return document.body.innerHTML;
            }),
            '<div id="test1" style=""></div>' +
            '<div id="test2" style=""></div>',
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.show(
                    document.getElementById('test1'),
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" style=""></div>' +
            '<div id="test2" style="display: none;"></div>',
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.show(
                    document.querySelectorAll('div'),
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" style=""></div>' +
            '<div id="test2" style=""></div>',
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.show(
                    document.body.children,
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" style=""></div>' +
            '<div id="test2" style=""></div>',
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.show([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                ]);
                return document.body.innerHTML;
            }),
            '<div id="test1" style=""></div>' +
            '<div id="test2" style=""></div>',
        );
    });
});
