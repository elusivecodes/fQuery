const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #setData', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2"></div>';
        });
    });

    it('sets a data object for all nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.queryMutable('div')
                    .setData({
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
        assert.deepEqual(
            await exec(_ => {
                dom.queryMutable('div')
                    .setData('test', 'Test 1');
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

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return query === query.setData('test', 'Test 1');
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                dom.setData(fragment, 'test', 'Test 1');
                return dom.queryMutable(fragment)
                    .getData();
            }),
            {
                test: 'Test 1'
            }
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                dom.setData(shadow, 'test', 'Test 1');
                return dom.queryMutable(shadow)
                    .getData();
            }),
            {
                test: 'Test 1'
            }
        );
    });

    it('works with Document nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setData(document, 'test', 'Test 1');
                return dom.queryMutable(document)
                    .getData();
            }),
            {
                test: 'Test 1'
            }
        );
    });

    it('works with Window nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setData(window, 'test', 'Test 1');
                return dom.queryMutable(window)
                    .getData();
            }),
            {
                test: 'Test 1'
            }
        );
    });

});