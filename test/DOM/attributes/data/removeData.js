const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#removeData', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2"></div>';
            dom.setData(
                'div',
                {
                    testA: 'Test 1',
                    testB: 'Test 2'
                }
            );
        });
    });

    it('removes all data for all nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.removeData(
                    'div'
                );
                return [
                    dom.getData('#test1'),
                    dom.getData('#test2')
                ];
            }),
            [
                null,
                null
            ]
        );
    });

    it('removes data for all nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.removeData(
                    'div',
                    'testA'
                );
                return [
                    dom.getData('#test1'),
                    dom.getData('#test2')
                ];
            }),
            [
                {
                    testB: 'Test 2'
                },
                {
                    testB: 'Test 2'
                }
            ]
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.removeData(
                    document.getElementById('test1'),
                    'testA'
                );
                return dom.getData('#test1');
            }),
            {
                testB: 'Test 2'
            }
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.removeData(
                    document.querySelectorAll('div'),
                    'testA'
                );
                return [
                    dom.getData('#test1'),
                    dom.getData('#test2')
                ];
            }),
            [
                {
                    testB: 'Test 2'
                },
                {
                    testB: 'Test 2'
                }
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.removeData(
                    document.body.children,
                    'testA'
                );
                return [
                    dom.getData('#test1'),
                    dom.getData('#test2')
                ];
            }),
            [
                {
                    testB: 'Test 2'
                },
                {
                    testB: 'Test 2'
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
                    {
                        testA: 'Test 1',
                        testB: 'Test 2'
                    }
                );
                dom.removeData(
                    fragment,
                    'testA'
                );
                return dom.getData(fragment);
            }),
            {
                testB: 'Test 2'
            }
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                dom.setData(
                    shadow,
                    {
                        testA: 'Test 1',
                        testB: 'Test 2'
                    }
                );
                dom.removeData(
                    shadow,
                    'testA'
                );
                return dom.getData(shadow);
            }),
            {
                testB: 'Test 2'
            }
        );
    });

    it('works with Document nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setData(
                    document,
                    {
                        testA: 'Test 1',
                        testB: 'Test 2'
                    }
                );
                dom.removeData(
                    document,
                    'testA'
                );
                return dom.getData(document);
            }),
            {
                testB: 'Test 2'
            }
        );
    });

    it('works with Window nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setData(
                    window,
                    {
                        testA: 'Test 1',
                        testB: 'Test 2'
                    }
                );
                dom.removeData(
                    window,
                    'testA'
                );
                return dom.getData(window);
            }),
            {
                testB: 'Test 2'
            }
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.removeData(
                    [
                        document.getElementById('test1'),
                        document.getElementById('test2')
                    ],
                    'testA'
                );
                return [
                    dom.getData('#test1'),
                    dom.getData('#test2')
                ];
            }),
            [
                {
                    testB: 'Test 2'
                },
                {
                    testB: 'Test 2'
                }
            ]
        );
    });

});