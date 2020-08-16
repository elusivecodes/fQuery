const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#withData', function() {

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
                dom.withData('div')
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
                dom.withData('div', 'test1')
                    .map(node => node.id)
            ),
            [
                'div1'
            ]
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.withData(
                    document.getElementById('div1')
                ).map(node => node.id)
            ),
            [
                'div1'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.withData(
                    document.querySelectorAll('div')
                ).map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.withData(
                    document.body.children
                ).map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                dom.setData(fragment, 'test', 'Test');
                fragment.id = 'fragment';
                return dom.withData(fragment)
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
                return dom.withData(shadow)
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
                return dom.withData(document)
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
                return dom.withData(window)
                    .map(node => node.id);
            }),
            [
                'window'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.withData([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4')
                ]).map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

});