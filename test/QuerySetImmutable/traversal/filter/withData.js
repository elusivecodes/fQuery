const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #withData', function() {

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
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('div')
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
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('div')
                    .withData('test1')
                    .get()
                    .map(node => node.id)
            ),
            [
                'div1'
            ]
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query1 = dom.query('div');
                const query2 = query1.withData();
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                dom.setData(fragment, 'test', 'Test');
                fragment.id = 'fragment';
                return dom.query(fragment)
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
        assert.deepStrictEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                dom.setData(shadow, 'test', 'Test');
                shadow.id = 'shadow';
                return dom.query(shadow)
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
        assert.deepStrictEqual(
            await exec(_ => {
                dom.setData(document, 'test', 'Test');
                return dom.query(document)
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
        assert.deepStrictEqual(
            await exec(_ => {
                dom.setData(window, 'test', 'Test');
                return dom.query(window)
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