const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#hasData', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
            dom.setData(
                '#div1',
                'test1',
                'Test 1'
            );
            dom.setData(
                '#div3',
                'test2',
                'Test 2'
            );
        });
    });

    it('returns true if any node has data', async function() {
        assert.equal(
            await exec(_ => {
                return dom.hasData(
                    'div'
                );
            }),
            true
        );
    });

    it('returns false if no nodes have data', async function() {
        assert.equal(
            await exec(_ => {
                return dom.hasData(
                    'div:not(.test)'
                );
            }),
            false
        );
    });

    it('returns true if any node has data for a key', async function() {
        assert.equal(
            await exec(_ => {
                return dom.hasData(
                    '#div1',
                    'test1'
                );
            }),
            true
        );
    });

    it('returns false if no nodes have data for a key', async function() {
        assert.equal(
            await exec(_ => {
                return dom.hasData(
                    '#div1',
                    'test2'
                );
            }),
            false
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.hasData(
                    document.getElementById('div1')
                );
            }),
            true
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.hasData(
                    document.querySelectorAll('div')
                );
            }),
            true
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.hasData(
                    document.body.children
                );
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.equal(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                dom.setData(
                    fragment,
                    'test',
                    'Test'
                );
                return dom.hasData(
                    fragment
                );
            }),
            true
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.equal(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                dom.setData(
                    shadow,
                    'test',
                    'Test'
                );
                return dom.hasData(
                    shadow
                );
            }),
            true
        );
    });

    it('works with Document nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setData(
                    document,
                    'test',
                    'Test'
                );
                return dom.hasData(
                    document
                );
            }),
            true
        );
    });

    it('works with Window nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setData(
                    window,
                    'test',
                    'Test'
                );
                return dom.hasData(
                    window
                );
            }),
            true
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.hasData(
                    [
                        document.getElementById('div1'),
                        document.getElementById('div2'),
                        document.getElementById('div3'),
                        document.getElementById('div4')
                    ]
                );
            }),
            true
        );
    });

});