import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #setData', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2"></div>';
        });
    });

    it('sets a data object for all nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $('div')
                    .setData({
                        testA: 'Test 1',
                        testB: 'Test 2',
                    });
                return [
                    $.getData('#test1'),
                    $.getData('#test2'),
                ];
            }),
            [
                {
                    testA: 'Test 1',
                    testB: 'Test 2',
                },
                {
                    testA: 'Test 1',
                    testB: 'Test 2',
                },
            ],
        );
    });

    it('sets data for all nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $('div')
                    .setData('test', 'Test 1');
                return [
                    $.getData('#test1'),
                    $.getData('#test2'),
                ];
            }),
            [
                {
                    test: 'Test 1',
                },
                {
                    test: 'Test 1',
                },
            ],
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('div');
                return query === query.setData('test', 'Test 1');
            }),
            true,
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                $.setData(fragment, 'test', 'Test 1');
                return $(fragment)
                    .getData();
            }),
            {
                test: 'Test 1',
            },
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                $.setData(shadow, 'test', 'Test 1');
                return $(shadow)
                    .getData();
            }),
            {
                test: 'Test 1',
            },
        );
    });

    it('works with Document nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.setData(document, 'test', 'Test 1');
                return $(document)
                    .getData();
            }),
            {
                test: 'Test 1',
            },
        );
    });

    it('works with Window nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.setData(window, 'test', 'Test 1');
                return $(window)
                    .getData();
            }),
            {
                test: 'Test 1',
            },
        );
    });
});
