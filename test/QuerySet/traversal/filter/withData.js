const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #withData', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
            dom.setData('#div1', 'test1', 'Test 1');
            dom.setData('#div3', 'test2', 'Test 2');
        });
    });

    it('returns nodes with data', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .withData()
                    .get()
                    .map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('returns nodes with data for a key', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .withData('test1')
                    .get()
                    .map(node => node.id)
            ),
            [
                'div1'
            ]
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return query === query.withData();
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                dom.setData(fragment, 'test', 'Test');
                fragment.id = 'fragment';
                return dom.queryMutable(fragment)
                    .withData()
                    .get()
                    .map(node => node.id);
            }),
            [
                'fragment'
            ]
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                dom.setData(shadow, 'test', 'Test');
                shadow.id = 'shadow';
                return dom.queryMutable(shadow)
                    .withData()
                    .get()
                    .map(node => node.id);
            }),
            [
                'shadow'
            ]
        );
    });

    it('works with Document nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setData(document, 'test', 'Test');
                return dom.queryMutable(document)
                    .withData()
                    .get()
                    .map(node => node.id);
            }),
            [
                'document'
            ]
        );
    });

    it('works with Window nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setData(window, 'test', 'Test');
                return dom.queryMutable(window)
                    .withData()
                    .get()
                    .map(node => node.id);
            }),
            [
                'window'
            ]
        );
    });

});