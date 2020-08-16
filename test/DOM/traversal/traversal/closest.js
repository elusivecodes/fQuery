const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#closest', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent1">' +
                '<div id="child1">' +
                '<span id="span1">' +
                '<a id="a1"></a>' +
                '</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div id="child2">' +
                '<span id="span2">' +
                '<a id="a2"></a>' +
                '</span>' +
                '</div>' +
                '</div>';
        });
    });

    it('returns the closest ancestor of each node', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.closest('a')
                    .map(node => node.id)
            ),
            [
                'span1',
                'span2'
            ]
        );
    });

    it('returns the closest ancestor of each node matching a filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.closest('a', 'div')
                    .map(node => node.id)
            ),
            [
                'child1',
                'child2'
            ]
        );
    });

    it('returns an empty array for empty nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.closest('#invalid')
            ),
            []
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.closest(
                    document.getElementById('a1'),
                    'div'
                ).map(node => node.id)
            ),
            [
                'child1'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.closest(
                    document.querySelectorAll('a'),
                    'div'
                ).map(node => node.id)
            ),
            [
                'child1',
                'child2'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.closest(
                    document.getElementById('child1').children,
                    'div'
                ).map(node => node.id)
            ),
            [
                'child1'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.closest([
                    document.getElementById('a1'),
                    document.getElementById('a2')
                ], 'div').map(node => node.id)
            ),
            [
                'child1',
                'child2'
            ]
        );
    });

    it('works with function filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.closest(
                    'a',
                    node => node.tagName === 'DIV'
                ).map(node => node.id)
            ),
            [
                'child1',
                'child2'
            ]
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.closest(
                    'a',
                    document.getElementById('child1')
                ).map(node => node.id)
            ),
            [
                'child1'
            ]
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.closest(
                    'a',
                    document.querySelectorAll('div')
                ).map(node => node.id)
            ),
            [
                'child1',
                'child2'
            ]
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.closest(
                    'a',
                    document.body.children
                ).map(node => node.id)
            ),
            [
                'parent1',
                'parent2'
            ]
        );
    });

    it('works with array filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.closest('a', [
                    document.getElementById('child1'),
                    document.getElementById('child2')
                ]).map(node => node.id)
            ),
            [
                'child1',
                'child2'
            ]
        );
    });

    it('works with function limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.closest(
                    'a',
                    'div',
                    node => node.id === 'span2'
                ).map(node => node.id)
            ),
            [
                'child1'
            ]
        );
    });

    it('works with HTMLElement limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.closest(
                    'a',
                    'div',
                    document.getElementById('span2')
                ).map(node => node.id)
            ),
            [
                'child1'
            ]
        );
    });

    it('works with NodeList limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.closest(
                    'a',
                    'div',
                    document.querySelectorAll('#span2')
                ).map(node => node.id)
            ),
            [
                'child1'
            ]
        );
    });

    it('works with HTMLCollection limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.closest(
                    'a',
                    'div',
                    document.getElementById('child2').children
                ).map(node => node.id)
            ),
            [
                'child1'
            ]
        );
    });

    it('works with array limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.closest('a', 'div', [
                    document.getElementById('span2')
                ]).map(node => node.id)
            ),
            [
                'child1'
            ]
        );
    });

});