import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#getData', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2"></div>';
            $.setData('#test1', 'test', 'Test 1');
        });
    });

    it('returns an object with all data for the first node', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.getData('div'),
            ),
            {
                test: 'Test 1',
            },
        );
    });

    it('returns data for the first node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getData('div', 'test'),
            ),
            'Test 1',
        );
    });

    it('returns undefined for an undefined key', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getData('div', 'invalid'),
            ),
            undefined,
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getData('#invalid', 'test'),
            ),
            undefined,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getData(
                    document.getElementById('test1'),
                    'test',
                ),
            ),
            'Test 1',
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getData(
                    document.querySelectorAll('div'),
                    'test',
                ),
            ),
            'Test 1',
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getData(
                    document.body.children,
                    'test',
                ),
            ),
            'Test 1',
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                $.setData(fragment, 'test', 'Test 2');
                return $.getData(fragment, 'test');
            }),
            'Test 2',
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                $.setData(shadow, 'test', 'Test 2');
                return $.getData(shadow, 'test');
            }),
            'Test 2',
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setData(document, 'test', 'Test 2');
                return $.getData(document, 'test');
            }),
            'Test 2',
        );
    });

    it('works with Window nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setData(window, 'test', 'Test 2');
                return $.getData(window, 'test');
            }),
            'Test 2',
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getData([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                ], 'test'),
            ),
            'Test 1',
        );
    });
});
