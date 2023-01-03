import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #cloneData', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="dataParent">' +
                '<div id="test1" data-toggle="data"></div>' +
                '<div id="test2" data-toggle="data"></div>' +
                '</div>' +
                '<div id="noDataParent">' +
                '<div id="test3" data-toggle="noData"></div>' +
                '<div id="test4" data-toggle="noData"></div>' +
                '</div>';
            $.setData('#test1', 'test1', 'Test 1');
            $.setData('#test2', 'test2', 'Test 2');
        });
    });

    it('clones data from all nodes to all other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $('[data-toggle="data"]')
                    .cloneData('[data-toggle="noData"]');
                return [
                    $.getData('#test3'),
                    $.getData('#test4'),
                ];
            }),
            [
                {
                    test1: 'Test 1',
                    test2: 'Test 2',
                },
                {
                    test1: 'Test 1',
                    test2: 'Test 2',
                },
            ],
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('[data-toggle="data"]');
                return query === query.cloneData('[data-toggle="noData"]');
            }),
            true,
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                $.setData(fragment, 'test', 'Test 1');
                $(fragment)
                    .cloneData('[data-toggle="noData"]');
                return [
                    $.getData('#test3'),
                    $.getData('#test4'),
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

    it('works with ShadowRoot nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                $.setData(shadow, 'test', 'Test 1');
                $(shadow)
                    .cloneData('[data-toggle="noData"]');
                return [
                    $.getData('#test3'),
                    $.getData('#test4'),
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

    it('works with Document nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.setData(document, 'test', 'Test 1');
                $(document)
                    .cloneData('[data-toggle="noData"]');
                return [
                    $.getData('#test3'),
                    $.getData('#test4'),
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

    it('works with Window nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.setData(window, 'test', 'Test 1');
                $(window)
                    .cloneData('[data-toggle="noData"]');
                return [
                    $.getData('#test3'),
                    $.getData('#test4'),
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

    it('works with HTMLElement other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $('[data-toggle="data"]')
                    .cloneData(
                        document.getElementById('test3'),
                    );
                return $.getData('#test3');
            }),
            {
                test1: 'Test 1',
                test2: 'Test 2',
            },
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $('[data-toggle="data"]')
                    .cloneData(
                        document.querySelectorAll('[data-toggle="noData"]'),
                    );
                return [
                    $.getData('#test3'),
                    $.getData('#test4'),
                ];
            }),
            [
                {
                    test1: 'Test 1',
                    test2: 'Test 2',
                },
                {
                    test1: 'Test 1',
                    test2: 'Test 2',
                },
            ],
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $('[data-toggle="data"]')
                    .cloneData(
                        document.getElementById('noDataParent').children,
                    );
                return [
                    $.getData('#test3'),
                    $.getData('#test4'),
                ];
            }),
            [
                {
                    test1: 'Test 1',
                    test2: 'Test 2',
                },
                {
                    test1: 'Test 1',
                    test2: 'Test 2',
                },
            ],
        );
    });

    it('works with DocumentFragment other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                $('[data-toggle="data"]')
                    .cloneData(fragment);
                return $.getData(fragment);
            }),
            {
                test1: 'Test 1',
                test2: 'Test 2',
            },
        );
    });

    it('works with ShadowRoot other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                $('[data-toggle="data"]')
                    .cloneData(shadow);
                return $.getData(shadow);
            }),
            {
                test1: 'Test 1',
                test2: 'Test 2',
            },
        );
    });

    it('works with Document other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $('[data-toggle="data"]')
                    .cloneData(document);
                return $.getData(document);
            }),
            {
                test1: 'Test 1',
                test2: 'Test 2',
            },
        );
    });

    it('works with Window other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $('[data-toggle="data"]')
                    .cloneData(window);
                return $.getData(window);
            }),
            {
                test1: 'Test 1',
                test2: 'Test 2',
            },
        );
    });

    it('works with array other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.cloneData(
                    '[data-toggle="data"]',
                    [
                        document.getElementById('test3'),
                        document.getElementById('test4'),
                    ],
                );
                return [
                    $.getData('#test3'),
                    $.getData('#test4'),
                ];
            }),
            [
                {
                    test1: 'Test 1',
                    test2: 'Test 2',
                },
                {
                    test1: 'Test 1',
                    test2: 'Test 2',
                },
            ],
        );
    });

    it('works with QuerySet other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const query = $('[data-toggle="noData"]');
                $('[data-toggle="data"]')
                    .cloneData(query);
                return [
                    $.getData('#test3'),
                    $.getData('#test4'),
                ];
            }),
            [
                {
                    test1: 'Test 1',
                    test2: 'Test 2',
                },
                {
                    test1: 'Test 1',
                    test2: 'Test 2',
                },
            ],
        );
    });
});
