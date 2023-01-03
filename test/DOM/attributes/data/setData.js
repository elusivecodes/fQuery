import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#setData', function() {
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
                $.setData('div', {
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
                $.setData('div', 'test', 'Test 1');
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

    it('works with HTMLElement nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.setData(
                    document.getElementById('test1'),
                    'test',
                    'Test 1',
                );
                return $.getData('#test1');
            }),
            {
                test: 'Test 1',
            },
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.setData(
                    document.querySelectorAll('div'),
                    'test',
                    'Test 1',
                );
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

    it('works with HTMLCollection nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.setData(
                    document.body.children,
                    'test',
                    'Test 1',
                );
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

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                $.setData(fragment, 'test', 'Test 1');
                return $.getData(fragment);
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
                return $.getData(shadow);
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
                return $.getData(document);
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
                return $.getData(window);
            }),
            {
                test: 'Test 1',
            },
        );
    });

    it('works with array nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.setData([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                ], 'test', 'Test 1');
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
});
