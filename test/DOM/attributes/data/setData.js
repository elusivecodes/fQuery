const assert = require('assert');
const { exec } = require('../../../setup');

describe('#setData', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2"></div>';
        });
    });

    it('sets a data object for all nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                dom.setData('div', {
                    testA: 'Test 1',
                    testB: 'Test 2'
                });
                return [
                    dom.getData('#test1'),
                    dom.getData('#test2')
                ];
            }),
            [
                {
                    testA: 'Test 1',
                    testB: 'Test 2'
                },
                {
                    testA: 'Test 1',
                    testB: 'Test 2'
                }
            ]
        );
    });

    it('sets data for all nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                dom.setData('div', 'test', 'Test 1');
                return [
                    dom.getData('#test1'),
                    dom.getData('#test2')
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

    it('works with HTMLElement nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                dom.setData(
                    document.getElementById('test1'),
                    'test',
                    'Test 1'
                );
                return dom.getData('#test1');
            }),
            {
                test: 'Test 1'
            }
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                dom.setData(
                    document.querySelectorAll('div'),
                    'test',
                    'Test 1'
                );
                return [
                    dom.getData('#test1'),
                    dom.getData('#test2')
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

    it('works with HTMLCollection nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                dom.setData(
                    document.body.children,
                    'test',
                    'Test 1'
                );
                return [
                    dom.getData('#test1'),
                    dom.getData('#test2')
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

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                dom.setData(fragment, 'test', 'Test 1');
                return dom.getData(fragment);
            }),
            {
                test: 'Test 1'
            }
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                dom.setData(shadow, 'test', 'Test 1');
                return dom.getData(shadow);
            }),
            {
                test: 'Test 1'
            }
        );
    });

    it('works with Document nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                dom.setData(document, 'test', 'Test 1');
                return dom.getData(document);
            }),
            {
                test: 'Test 1'
            }
        );
    });

    it('works with Window nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                dom.setData(window, 'test', 'Test 1');
                return dom.getData(window);
            }),
            {
                test: 'Test 1'
            }
        );
    });

    it('works with array nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                dom.setData([
                    document.getElementById('test1'),
                    document.getElementById('test2')
                ], 'test', 'Test 1');
                return [
                    dom.getData('#test1'),
                    dom.getData('#test2')
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

});