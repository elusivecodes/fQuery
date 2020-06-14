const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#filter', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2" data-filter="test"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4" data-filter="test"></div>';
        });
    });

    it('returns filtered nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.filter(
                    'div',
                    '[data-filter="test"]'
                ).map(node => node.id);
            }),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.filter(
                    document.getElementById('div2'),
                    '[data-filter="test"]'
                ).map(node => node.id);
            }),
            [
                'div2'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.filter(
                    document.querySelectorAll('div'),
                    '[data-filter="test"]'
                ).map(node => node.id);
            }),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.filter(
                    document.body.children,
                    '[data-filter="test"]'
                ).map(node => node.id);
            }),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return dom.filter(
                    fragment
                ).map(node => node.id);
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
                shadow.id = 'shadow';
                return dom.filter(
                    shadow
                ).map(node => node.id);
            }),
            [
                'shadow'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.filter(
                    [
                        document.getElementById('div1'),
                        document.getElementById('div2'),
                        document.getElementById('div3'),
                        document.getElementById('div4')
                    ],
                    '[data-filter="test"]'
                ).map(node => node.id);
            }),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('works with function filter', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.filter(
                    'div',
                    node => node.dataset.filter === 'test'
                ).map(node => node.id);
            }),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.filter(
                    'div',
                    document.getElementById('div2')
                ).map(node => node.id);
            }),
            [
                'div2'
            ]
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.filter(
                    'div',
                    document.querySelectorAll('[data-filter="test"]')
                ).map(node => node.id);
            }),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.filter(
                    'div',
                    document.body.children
                ).map(node => node.id);
            }),
            [
                'div1',
                'div2',
                'div3',
                'div4'
            ]
        );
    });

    it('works with DocumentFragment filter', async function() {
        assert.deepEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return dom.filter(
                    [
                        document.getElementById('div1'),
                        fragment
                    ],
                    fragment,
                ).map(node => node.id);
            }),
            [
                'fragment'
            ]
        );
    });

    it('works with ShadowRoot filter', async function() {
        assert.deepEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return dom.filter(
                    [
                        document.getElementById('div1'),
                        shadow
                    ],
                    shadow
                ).map(node => node.id);
            }),
            [
                'shadow'
            ]
        );
    });

    it('works with array filter', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.filter(
                    'div',
                    [
                        document.getElementById('div2'),
                        document.getElementById('div4')
                    ]
                ).map(node => node.id);
            }),
            [
                'div2',
                'div4'
            ]
        );
    });

});