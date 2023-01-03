import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#removeData', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2"></div>';
            $.setData('div', {
                testA: 'Test 1',
                testB: 'Test 2',
            });
        });
    });

    it('removes all data for all nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.removeData('div');
                return [
                    $.getData('#test1'),
                    $.getData('#test2'),
                ];
            }),
            [
                null,
                null,
            ],
        );
    });

    it('removes data for all nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.removeData('div', 'testA');
                return [
                    $.getData('#test1'),
                    $.getData('#test2'),
                ];
            }),
            [
                {
                    testB: 'Test 2',
                },
                {
                    testB: 'Test 2',
                },
            ],
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.removeData(
                    document.getElementById('test1'),
                    'testA',
                );
                return $.getData('#test1');
            }),
            {
                testB: 'Test 2',
            },
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.removeData(
                    document.querySelectorAll('div'),
                    'testA',
                );
                return [
                    $.getData('#test1'),
                    $.getData('#test2'),
                ];
            }),
            [
                {
                    testB: 'Test 2',
                },
                {
                    testB: 'Test 2',
                },
            ],
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.removeData(
                    document.body.children,
                    'testA',
                );
                return [
                    $.getData('#test1'),
                    $.getData('#test2'),
                ];
            }),
            [
                {
                    testB: 'Test 2',
                },
                {
                    testB: 'Test 2',
                },
            ],
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                $.setData(fragment, {
                    testA: 'Test 1',
                    testB: 'Test 2',
                });
                $.removeData(fragment, 'testA');
                return $.getData(fragment);
            }),
            {
                testB: 'Test 2',
            },
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                $.setData(shadow, {
                    testA: 'Test 1',
                    testB: 'Test 2',
                });
                $.removeData(shadow, 'testA');
                return $.getData(shadow);
            }),
            {
                testB: 'Test 2',
            },
        );
    });

    it('works with Document nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.setData(document, {
                    testA: 'Test 1',
                    testB: 'Test 2',
                });
                $.removeData(document, 'testA');
                return $.getData(document);
            }),
            {
                testB: 'Test 2',
            },
        );
    });

    it('works with Window nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.setData(window, {
                    testA: 'Test 1',
                    testB: 'Test 2',
                });
                $.removeData(window, 'testA');
                return $.getData(window);
            }),
            {
                testB: 'Test 2',
            },
        );
    });

    it('works with array nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.removeData([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                ], 'testA');
                return [
                    $.getData('#test1'),
                    $.getData('#test2'),
                ];
            }),
            [
                {
                    testB: 'Test 2',
                },
                {
                    testB: 'Test 2',
                },
            ],
        );
    });
});
