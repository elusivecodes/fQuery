import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#setStyle', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2"></div>';
        });
    });

    it('sets a styles object for all nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setStyle('div', {
                    display: 'block',
                    width: '100%',
                    height: '100px',
                    opacity: 0.5,
                });
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: block; width: 100%; height: 100px; opacity: 0.5;"></div>' +
            '<div id="test2" style="display: block; width: 100%; height: 100px; opacity: 0.5;"></div>',
        );
    });

    it('sets a style value for all nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setStyle('div', 'display', 'block');
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: block;"></div>' +
            '<div id="test2" style="display: block;"></div>',
        );
    });

    it('converts number values to pixels', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setStyle('div', 'width', '100');
                return document.body.innerHTML;
            }),
            '<div id="test1" style="width: 100px;"></div>' +
            '<div id="test2" style="width: 100px;"></div>',
        );
    });

    it('converts style object number values to pixels', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setStyle('div', {
                    width: 100,
                    height: 100,
                });
                return document.body.innerHTML;
            }),
            '<div id="test1" style="width: 100px; height: 100px;"></div>' +
            '<div id="test2" style="width: 100px; height: 100px;"></div>',
        );
    });

    it('does not convert number values with units to pixels', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setStyle('div', 'width', '100%');
                return document.body.innerHTML;
            }),
            '<div id="test1" style="width: 100%;"></div>' +
            '<div id="test2" style="width: 100%;"></div>',
        );
    });

    it('does not convert number values for CSS number properties', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setStyle('div', 'font-weight', '500');
                return document.body.innerHTML;
            }),
            '<div id="test1" style="font-weight: 500;"></div>' +
            '<div id="test2" style="font-weight: 500;"></div>',
        );
    });

    it('sets a style object for all nodes with important', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setStyle('div', {
                    display: 'block',
                    width: '100%',
                }, null, { important: true });
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: block !important; width: 100% !important;"></div>' +
            '<div id="test2" style="display: block !important; width: 100% !important;"></div>',
        );
    });

    it('sets a style value for all nodes with important', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setStyle('div', 'display', 'block', { important: true });
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: block !important;"></div>' +
            '<div id="test2" style="display: block !important;"></div>',
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setStyle(
                    document.getElementById('test1'),
                    'display',
                    'block',
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: block;"></div>' +
            '<div id="test2"></div>',
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setStyle(
                    document.querySelectorAll('div'),
                    'display',
                    'block',
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: block;"></div>' +
            '<div id="test2" style="display: block;"></div>',
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setStyle(
                    document.body.children,
                    'display',
                    'block',
                );
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: block;"></div>' +
            '<div id="test2" style="display: block;"></div>',
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setStyle([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                ], 'display', 'block');
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: block;"></div>' +
            '<div id="test2" style="display: block;"></div>',
        );
    });
});
