import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #getData', function() {
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
                $('div')
                    .getData(),
            ),
            {
                test: 'Test 1',
            },
        );
    });

    it('returns data for the first node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .getData('test'),
            ),
            'Test 1',
        );
    });

    it('returns undefined for an undefined key', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .getData('invalid'),
            ),
            undefined,
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('#invalid')
                    .getData('test'),
            ),
            undefined,
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                $.setData(fragment, 'test', 'Test 2');
                return $(fragment)
                    .getData('test');
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
                return $(shadow)
                    .getData('test');
            }),
            'Test 2',
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setData(document, 'test', 'Test 2');
                return $(document)
                    .getData('test');
            }),
            'Test 2',
        );
    });

    it('works with Window nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setData(window, 'test', 'Test 2');
                return $(window)
                    .getData('test');
            }),
            'Test 2',
        );
    });
});
