const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#children', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent1" class="parent">' +
                '<div id="child1">' +
                '<span></span>' +
                '</div>' +
                '<div id="child2">' +
                '<span></span>' +
                '</div>' +
                '<span id="child3">' +
                '<span></span>' +
                '</span>' +
                '<span id="child4">' +
                '<span></span>' +
                '</span>' +
                '</div>' +
                '<div id="parent2" class="parent">' +
                '<div id="child5">' +
                '<span></span>' +
                '</div>' +
                '<div id="child6">' +
                '<span></span>' +
                '</div>' +
                '<span id="child7">' +
                '<span></span>' +
                '</span>' +
                '<span id="child8">' +
                '<span></span>' +
                '</span>' +
                '</div>';
        });
    });

    it('returns all children of each node', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.children('.parent')
                    .map(node => node.id)
            ),
            [
                'child1',
                'child2',
                'child3',
                'child4',
                'child5',
                'child6',
                'child7',
                'child8'
            ]
        );
    });

    it('returns all children of each node matching a filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.children('.parent', 'span')
                    .map(node => node.id)
            ),
            [
                'child3',
                'child4',
                'child7',
                'child8'
            ]
        );
    });

    it('returns an empty array for empty nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.children('#invalid')
            ),
            []
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.children(
                    document.getElementById('parent1'),
                    'span'
                ).map(node => node.id)
            ),
            [
                'child3',
                'child4'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.children(
                    document.querySelectorAll('.parent'),
                    'span'
                ).map(node => node.id)
            ),
            [
                'child3',
                'child4',
                'child7',
                'child8'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.children(
                    document.body.children,
                    'span'
                ).map(node => node.id)
            ),
            [
                'child3',
                'child4',
                'child7',
                'child8'
            ]
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>'
                );
                return dom.children(fragment, 'div')
                    .map(node => node.id);
            }),
            [
                'div1',
                'div2'
            ]
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>'
                );
                shadow.appendChild(fragment);
                return dom.children(shadow, 'div')
                    .map(node => node.id);
            }),
            [
                'div1',
                'div2'
            ]
        );
    });

    it('works with Document nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.children(document, 'html')
                    .map(node => node.id)
            ),
            [
                'html'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.children([
                    document.getElementById('parent1'),
                    document.getElementById('parent2')
                ], 'span').map(node => node.id)
            ),
            [
                'child3',
                'child4',
                'child7',
                'child8'
            ]
        );
    });

    it('works with function filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.children(
                    '.parent',
                    node => node.tagName === 'SPAN'
                ).map(node => node.id)
            ),
            [
                'child3',
                'child4',
                'child7',
                'child8'
            ]
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.children(
                    '.parent',
                    document.getElementById('child3')
                ).map(node => node.id)
            ),
            [
                'child3'
            ]
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.children(
                    '.parent',
                    document.querySelectorAll('span')
                ).map(node => node.id)
            ),
            [
                'child3',
                'child4',
                'child7',
                'child8'
            ]
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.children(
                    '.parent',
                    document.getElementById('parent1').children
                ).map(node => node.id)
            ),
            [
                'child1',
                'child2',
                'child3',
                'child4'
            ]
        );
    });

    it('works with array filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.children('.parent', [
                    document.getElementById('child3'),
                    document.getElementById('child4'),
                    document.getElementById('child7'),
                    document.getElementById('child8')
                ]).map(node => node.id)
            ),
            [
                'child3',
                'child4',
                'child7',
                'child8'
            ]
        );
    });

});