const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#equal', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent1">' +
                '<span data-id="span1"></span>' +
                '<span data-id="span2"></span>' +
                '<span data-id="span3"></span>' +
                '</div>' +
                '<div id="parent2">' +
                '<span data-id="span2"></span>' +
                '<span data-id="span3"></span>' +
                '<span data-id="span4"></span>' +
                '</div>';
        });
    });

    it('returns nodes equal to other nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.equal('#parent1 span', '#parent2 span')
                    .map(node => node.dataset.id)
            ),
            [
                'span2',
                'span3'
            ]
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.equal(
                    document.querySelector('#parent1 [data-id="span2"]'),
                    '#parent2 span'
                ).map(node => node.dataset.id)
            ),
            [
                'span2'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.equal(
                    document.querySelectorAll('#parent1 span'),
                    '#parent2 span'
                ).map(node => node.dataset.id)
            ),
            [
                'span2',
                'span3'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.equal(
                    document.getElementById('parent1').children,
                    '#parent2 span'
                ).map(node => node.dataset.id)
            ),
            [
                'span2',
                'span3'
            ]
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const fragment1 = document.createDocumentFragment();
                const fragment2 = document.createDocumentFragment();
                fragment1.id = 'fragment';
                return dom.equal(
                    fragment1,
                    [
                        fragment2
                    ]
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
                const div1 = document.createElement('div');
                const div2 = document.createElement('div');
                const shadow1 = div1.attachShadow({ mode: 'open' });
                const shadow2 = div2.attachShadow({ mode: 'closed' });
                shadow1.id = 'shadow';
                return dom.equal(
                    shadow1,
                    [
                        shadow2
                    ]
                ).map(node => node.id);
            }),
            [
                'shadow'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.equal([
                    document.querySelector('#parent1 > [data-id="span1"]'),
                    document.querySelector('#parent1 > [data-id="span2"]'),
                    document.querySelector('#parent1 > [data-id="span3"]')
                ], '#parent2 span').map(node => node.dataset.id)
            ),
            [
                'span2',
                'span3'
            ]
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.equal(
                    '#parent1 span',
                    document.querySelector('#parent2 > [data-id="span2"]')
                ).map(node => node.dataset.id)
            ),
            [
                'span2'
            ]
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.equal(
                    '#parent1 span',
                    document.querySelectorAll('#parent2 > span')
                ).map(node => node.dataset.id)
            ),
            [
                'span2',
                'span3'
            ]
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.equal(
                    '#parent1 span',
                    document.getElementById('parent2').children
                ).map(node => node.dataset.id)
            ),
            [
                'span2',
                'span3'
            ]
        );
    });

    it('works with DocumentFragment other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const fragment1 = document.createDocumentFragment();
                const fragment2 = document.createDocumentFragment();
                fragment1.id = 'fragment';
                return dom.equal(
                    [
                        fragment1
                    ],
                    fragment2
                ).map(node => node.id);
            }),
            [
                'fragment'
            ]
        );
    });

    it('works with ShadowRoot other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const div1 = document.createElement('div');
                const div2 = document.createElement('div');
                const shadow1 = div1.attachShadow({ mode: 'open' });
                const shadow2 = div2.attachShadow({ mode: 'closed' });
                shadow1.id = 'shadow';
                return dom.equal(
                    [
                        shadow1
                    ],
                    shadow2
                ).map(node => node.id);
            }),
            [
                'shadow'
            ]
        );
    });

    it('works with array other nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.equal('#parent1 span', [
                    document.querySelector('#parent2 > [data-id="span2"]'),
                    document.querySelector('#parent2 > [data-id="span3"]')
                ]).map(node => node.dataset.id)
            ),
            [
                'span2',
                'span3'
            ]
        );
    });

});