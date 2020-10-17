const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #removeData', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2"></div>';
            dom.setData('div', {
                testA: 'Test 1',
                testB: 'Test 2'
            });
        });
    });

    it('removes all data for all nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                dom.query('div')
                    .removeData();
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
        assert.deepStrictEqual(
            await exec(_ => {
                dom.query('div')
                    .removeData('testA');
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

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.query('div');
                return query === query.removeData('testA');
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                dom.setData(fragment, {
                    testA: 'Test 1',
                    testB: 'Test 2'
                });
                dom.query(fragment)
                    .removeData('testA');
                return dom.getData(fragment);
            }),
            {
                testB: 'Test 2'
            }
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                dom.setData(shadow, {
                    testA: 'Test 1',
                    testB: 'Test 2'
                });
                dom.query(shadow)
                    .removeData('testA');
                return dom.getData(shadow);
            }),
            {
                testB: 'Test 2'
            }
        );
    });

    it('works with Document nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                dom.setData(document, {
                    testA: 'Test 1',
                    testB: 'Test 2'
                });
                dom.query(document)
                    .removeData('testA');
                return dom.getData(document);
            }),
            {
                testB: 'Test 2'
            }
        );
    });

    it('works with Window nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                dom.setData(window, {
                    testA: 'Test 1',
                    testB: 'Test 2'
                });
                dom.query(window)
                    .removeData('testA');
                return dom.getData(window);
            }),
            {
                testB: 'Test 2'
            }
        );
    });

});