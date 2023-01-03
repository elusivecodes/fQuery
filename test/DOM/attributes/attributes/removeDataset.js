import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#removeDataset', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1" data-text="Test"></div>' +
                '<div id="test2" data-text="Test"></div>';
        });
    });

    it('removes a dataset value for all nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.removeDataset('div', 'text');
                return document.body.innerHTML;
            }),
            '<div id="test1"></div>' +
            '<div id="test2"></div>',
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.removeDataset(
                    document.getElementById('test1'),
                    'text',
                );
                return document.body.innerHTML;
            }),
            '<div id="test1"></div>' +
            '<div id="test2" data-text="Test"></div>',
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.removeDataset(
                    document.querySelectorAll('div'),
                    'text',
                );
                return document.body.innerHTML;
            }),
            '<div id="test1"></div>' +
            '<div id="test2"></div>',
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.removeDataset(
                    document.body.children,
                    'text',
                );
                return document.body.innerHTML;
            }),
            '<div id="test1"></div>' +
            '<div id="test2"></div>',
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.removeDataset([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                ], 'text');
                return document.body.innerHTML;
            }),
            '<div id="test1"></div>' +
            '<div id="test2"></div>',
        );
    });
});
