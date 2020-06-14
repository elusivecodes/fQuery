const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#cloneData', function() {

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
            dom.setData(
                '#test1',
                'test1',
                'Test 1'
            );
            dom.setData(
                '#test2',
                'test2',
                'Test 2'
            );
        });
    });

    it('clones data from all nodes to all other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.cloneData(
                    '[data-toggle="data"]',
                    '[data-toggle="noData"]'
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

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.cloneData(
                    document.getElementById('test1'),
                    '[data-toggle="noData"]'
                );
                return [
                    dom.getData('#test3'),
                    dom.getData('#test4')
                ];
            }),
            [
                {
                    test1: 'Test 1'
                },
                {
                    test1: 'Test 1'
                }
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.cloneData(
                    document.querySelectorAll('[data-toggle="data"]'),
                    '[data-toggle="noData"]'
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

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.cloneData(
                    document.getElementById('dataParent').children,
                    '[data-toggle="noData"]'
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

    it('works with DocumentFragment nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                dom.setData(
                    fragment,
                    'test',
                    'Test 1'
                );
                dom.cloneData(
                    fragment,
                    '[data-toggle="noData"]'
                );
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
                dom.setData(
                    shadow,
                    'test',
                    'Test 1'
                );
                dom.cloneData(
                    shadow,
                    '[data-toggle="noData"]'
                );
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
                dom.setData(
                    document,
                    'test',
                    'Test 1'
                );
                dom.cloneData(
                    document,
                    '[data-toggle="noData"]'
                );
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
                dom.setData(
                    window,
                    'test',
                    'Test 1'
                );
                dom.cloneData(
                    window,
                    '[data-toggle="noData"]'
                );
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

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.cloneData(
                    [
                        document.getElementById('test1'),
                        document.getElementById('test2')
                    ],
                    '[data-toggle="noData"]'
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

    it('works with HTMLElement other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.cloneData(
                    '[data-toggle="data"]',
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
                dom.cloneData(
                    '[data-toggle="data"]',
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
                dom.cloneData(
                    '[data-toggle="data"]',
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
                dom.cloneData(
                    '[data-toggle="data"]',
                    fragment
                );
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
                dom.cloneData(
                    '[data-toggle="data"]',
                    shadow
                );
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
                dom.cloneData(
                    '[data-toggle="data"]',
                    document
                );
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
                dom.cloneData(
                    '[data-toggle="data"]',
                    window
                );
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

});