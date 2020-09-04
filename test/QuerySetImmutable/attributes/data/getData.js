const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #getData', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2"></div>';
            dom.setData('#test1', 'test', 'Test 1');
        });
    });

    it('returns an object with all data for the first node', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .getData()
            ),
            {
                test: 'Test 1'
            }
        );
    });

    it('returns data for the first node', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('div')
                    .getData('test')
            ),
            'Test 1'
        );
    });

    it('returns undefined for an undefined key', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('div')
                    .getData('invalid')
            ),
            undefined
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('#invalid')
                    .getData('test')
            ),
            undefined
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.equal(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                dom.setData(fragment, 'test', 'Test 2');
                return dom.query(fragment)
                    .getData('test');
            }),
            'Test 2'
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.equal(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                dom.setData(shadow, 'test', 'Test 2');
                return dom.query(shadow)
                    .getData('test');
            }),
            'Test 2'
        );
    });

    it('works with Document nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setData(document, 'test', 'Test 2');
                return dom.query(document)
                    .getData('test');
            }),
            'Test 2'
        );
    });

    it('works with Window nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setData(window, 'test', 'Test 2');
                return dom.query(window)
                    .getData('test');
            }),
            'Test 2'
        );
    });

});