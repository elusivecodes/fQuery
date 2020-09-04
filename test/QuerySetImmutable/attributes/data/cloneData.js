const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #cloneData', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="dataParent">' +
                '<div id="test1" data-toggle="data"></div>' +
                '<div id="test2" data-toggle="data"></div>' +
                '</div>' +
                '<div id="noDataParent">' +
                '<div id="test3" data-toggle="noData"></div>' +
                '<div id="test4" data-toggle="noData"></div>' +
                '</div>';
            dom.setData('#test1', 'test1', 'Test 1');
            dom.setData('#test2', 'test2', 'Test 2');
        });
    });

    it('clones data from all nodes to all other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.query('[data-toggle="data"]')
                    .cloneData('[data-toggle="noData"]');
                return [
                    dom.getData('#test3'),
                    dom.getData('#test4')
                ];
            }),
            [
                {
                    test1: 'Test 1',
                    test2: 'Test 2'
                },
                {
                    test1: 'Test 1',
                    test2: 'Test 2'
                }
            ]
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.query('[data-toggle="data"]');
                return query === query.cloneData('[data-toggle="noData"]');
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                dom.setData(fragment, 'test', 'Test 1');
                dom.query(fragment)
                    .cloneData('[data-toggle="noData"]');
                return [
                    dom.getData('#test3'),
                    dom.getData('#test4')
                ];
            }),
            [
                {
                    test: 'Test 1'
                },
                {
                    test: 'Test 1'
                }
            ]
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                dom.setData(shadow, 'test', 'Test 1');
                dom.query(shadow)
                    .cloneData('[data-toggle="noData"]');
                return [
                    dom.getData('#test3'),
                    dom.getData('#test4')
                ];
            }),
            [
                {
                    test: 'Test 1'
                },
                {
                    test: 'Test 1'
                }
            ]
        );
    });

    it('works with Document nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setData(document, 'test', 'Test 1');
                dom.query(document)
                    .cloneData('[data-toggle="noData"]');
                return [
                    dom.getData('#test3'),
                    dom.getData('#test4')
                ];
            }),
            [
                {
                    test: 'Test 1'
                },
                {
                    test: 'Test 1'
                }
            ]
        );
    });

    it('works with Window nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setData(window, 'test', 'Test 1');
                dom.query(window)
                    .cloneData('[data-toggle="noData"]');
                return [
                    dom.getData('#test3'),
                    dom.getData('#test4')
                ];
            }),
            [
                {
                    test: 'Test 1'
                },
                {
                    test: 'Test 1'
                }
            ]
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.query('[data-toggle="data"]')
                    .cloneData(
                        document.getElementById('test3')
                    );
                return dom.getData('#test3');
            }),
            {
                test1: 'Test 1',
                test2: 'Test 2'
            }
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.query('[data-toggle="data"]')
                    .cloneData(
                        document.querySelectorAll('[data-toggle="noData"]')
                    );
                return [
                    dom.getData('#test3'),
                    dom.getData('#test4')
                ];
            }),
            [
                {
                    test1: 'Test 1',
                    test2: 'Test 2'
                },
                {
                    test1: 'Test 1',
                    test2: 'Test 2'
                }
            ]
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.query('[data-toggle="data"]')
                    .cloneData(
                        document.getElementById('noDataParent').children
                    );
                return [
                    dom.getData('#test3'),
                    dom.getData('#test4')
                ];
            }),
            [
                {
                    test1: 'Test 1',
                    test2: 'Test 2'
                },
                {
                    test1: 'Test 1',
                    test2: 'Test 2'
                }
            ]
        );
    });

    it('works with DocumentFragment other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                dom.query('[data-toggle="data"]')
                    .cloneData(fragment);
                return dom.getData(fragment);
            }),
            {
                test1: 'Test 1',
                test2: 'Test 2'
            }
        );
    });

    it('works with ShadowRoot other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                dom.query('[data-toggle="data"]')
                    .cloneData(shadow);
                return dom.getData(shadow);
            }),
            {
                test1: 'Test 1',
                test2: 'Test 2'
            }
        );
    });

    it('works with Document other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.query('[data-toggle="data"]')
                    .cloneData(document);
                return dom.getData(document);
            }),
            {
                test1: 'Test 1',
                test2: 'Test 2'
            }
        );
    });

    it('works with Window other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.query('[data-toggle="data"]')
                    .cloneData(window);
                return dom.getData(window);
            }),
            {
                test1: 'Test 1',
                test2: 'Test 2'
            }
        );
    });

    it('works with array other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.cloneData(
                    '[data-toggle="data"]',
                    [
                        document.getElementById('test3'),
                        document.getElementById('test4')
                    ]
                );
                return [
                    dom.getData('#test3'),
                    dom.getData('#test4')
                ];
            }),
            [
                {
                    test1: 'Test 1',
                    test2: 'Test 2'
                },
                {
                    test1: 'Test 1',
                    test2: 'Test 2'
                }
            ]
        );
    });

    it('works with QuerySet other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const query = dom.query('[data-toggle="noData"]');
                dom.query('[data-toggle="data"]')
                    .cloneData(query);
                return [
                    dom.getData('#test3'),
                    dom.getData('#test4')
                ];
            }),
            [
                {
                    test1: 'Test 1',
                    test2: 'Test 2'
                },
                {
                    test1: 'Test 1',
                    test2: 'Test 2'
                }
            ]
        );
    });

});