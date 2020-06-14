const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#is', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns true if any node matches a filter', async function() {
        assert.equal(
            await exec(_ => {
                return dom.is(
                    'div',
                    '.test'
                );
            }),
            true
        );
    });

    it('returns false if no nodes match a filter', async function() {
        assert.equal(
            await exec(_ => {
                return dom.is(
                    'div:not(.test)',
                    '.test'
                );
            }),
            false
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.is(
                    document.getElementById('div1'),
                    '.test'
                );
            }),
            true
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.is(
                    document.querySelectorAll('div'),
                    '.test'
                );
            }),
            true
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.is(
                    document.body.children,
                    '.test'
                );
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.equal(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                return dom.is(
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
                return dom.is(
                    shadow
                );
            }),
            true
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.is(
                    [
                        document.getElementById('div1'),
                        document.getElementById('div2'),
                        document.getElementById('div3'),
                        document.getElementById('div4')
                    ],
                    '.test'
                );
            }),
            true
        );
    });

    it('works with function filter', async function() {
        assert.equal(
            await exec(_ => {
                return dom.is(
                    'div',
                    node => node.classList.contains('test')
                );
            }),
            true
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.equal(
            await exec(_ => {
                return dom.is(
                    'div',
                    document.getElementById('div1')
                );
            }),
            true
        );
    });

    it('works with NodeList filter', async function() {
        assert.equal(
            await exec(_ => {
                return dom.is(
                    'div',
                    document.querySelectorAll('div')
                );
            }),
            true
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.equal(
            await exec(_ => {
                return dom.is(
                    'div',
                    document.body.children
                );
            }),
            true
        );
    });

    it('works with DocumentFragment filter', async function() {
        assert.equal(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                return dom.is(
                    [
                        document.getElementById('div1'),
                        fragment
                    ],
                    fragment,
                );
            }),
            true
        );
    });

    it('works with ShadowRoot filter', async function() {
        assert.equal(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                return dom.is(
                    [
                        document.getElementById('div1'),
                        shadow
                    ],
                    shadow
                );
            }),
            true
        );
    });

    it('works with array filter', async function() {
        assert.equal(
            await exec(_ => {
                return dom.is(
                    'div',
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