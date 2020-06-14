const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#indexOf', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2" class="test"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4" class="test"></div>';
        });
    });

    it('returns the index of the first node matching a filter', async function() {
        assert.equal(
            await exec(_ => {
                return dom.indexOf(
                    'div',
                    '.test'
                );
            }),
            1
        );
    });

    it('returns the index of the first node without a filter', async function() {
        assert.equal(
            await exec(_ => {
                return dom.indexOf(
                    'div'
                );
            }),
            0
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.indexOf(
                    document.getElementById('div2'),
                    '.test'
                );
            }),
            0
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.indexOf(
                    document.querySelectorAll('div'),
                    '.test'
                );
            }),
            1
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.indexOf(
                    document.body.children,
                    '.test'
                );
            }),
            1
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.equal(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                return dom.indexOf(
                    fragment
                );
            }),
            0
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.equal(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                return dom.indexOf(
                    shadow
                );
            }),
            0
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.indexOf(
                    [
                        document.getElementById('div1'),
                        document.getElementById('div2'),
                        document.getElementById('div3'),
                        document.getElementById('div4')
                    ],
                    '.test'
                );
            }),
            1
        );
    });

    it('works with function filter', async function() {
        assert.equal(
            await exec(_ => {
                return dom.indexOf(
                    'div',
                    node => node.id === 'div2'
                );
            }),
            1
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.equal(
            await exec(_ => {
                return dom.indexOf(
                    'div',
                    document.getElementById('div2')
                );
            }),
            1
        );
    });

    it('works with NodeList filter', async function() {
        assert.equal(
            await exec(_ => {
                return dom.indexOf(
                    'div',
                    document.querySelectorAll('.test')
                );
            }),
            1
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.equal(
            await exec(_ => {
                return dom.indexOf(
                    'div',
                    document.body.children
                );
            }),
            0
        );
    });

    it('works with DocumentFragment filter', async function() {
        assert.equal(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                return dom.indexOf(
                    [
                        document.getElementById('div2'),
                        document.getElementById('div4'),
                        fragment
                    ],
                    fragment
                );
            }),
            2
        );
    });

    it('works with ShadowRoot filter', async function() {
        assert.equal(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                return dom.indexOf(
                    [
                        document.getElementById('div2'),
                        document.getElementById('div4'),
                        shadow
                    ],
                    shadow
                );
            }),
            2
        );
    });

    it('works with array filter', async function() {
        assert.equal(
            await exec(_ => {
                return dom.indexOf(
                    'div',
                    [
                        document.getElementById('div2'),
                        document.getElementById('div4')
                    ]
                );
            }),
            1
        );
    });

});