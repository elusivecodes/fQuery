const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#parents', function() {

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

    it('returns the parents of each node', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.parents('a')
                    .map(node => node.id)
            ),
            [
                'html',
                'body',
                'parent1',
                'child1',
                'span1',
                'parent2',
                'child2',
                'span2'
            ]
        );
    });

    it('returns the parents of each node matching a filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.parents('a', 'div')
                    .map(node => node.id)
            ),
            [
                'parent1',
                'child1',
                'parent2',
                'child2'
            ]
        );
    });

    it('returns an empty array for empty nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.parents('#invalid')
            ),
            []
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.parents(
                    document.getElementById('a1'),
                    'div'
                ).map(node => node.id)
            ),
            [
                'parent1',
                'child1'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.parents(
                    document.querySelectorAll('a'),
                    'div'
                ).map(node => node.id)
            ),
            [
                'parent1',
                'child1',
                'parent2',
                'child2'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.parents(
                    document.getElementById('child1').children,
                    'div'
                ).map(node => node.id)
            ),
            [
                'parent1',
                'child1'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.parents([
                    document.getElementById('a1'),
                    document.getElementById('a2')
                ], 'div').map(node => node.id)
            ),
            [
                'parent1',
                'child1',
                'parent2',
                'child2'
            ]
        );
    });

    it('works with function filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.parents(
                    'a',
                    node => node.tagName === 'DIV'
                ).map(node => node.id)
            ),
            [
                'parent1',
                'child1',
                'parent2',
                'child2'
            ]
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.parents(
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
                dom.parents(
                    'a',
                    document.querySelectorAll('div')
                ).map(node => node.id)
            ),
            [
                'parent1',
                'child1',
                'parent2',
                'child2'
            ]
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.parents(
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
                dom.parents('a', [
                    document.getElementById('parent1'),
                    document.getElementById('child1'),
                    document.getElementById('parent2'),
                    document.getElementById('child2')
                ]).map(node => node.id)
            ),
            [
                'parent1',
                'child1',
                'parent2',
                'child2'
            ]
        );
    });

    it('works with function limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.parents(
                    'a',
                    null,
                    node => node.id === 'body'
                ).map(node => node.id)
            ),
            [
                'parent1',
                'child1',
                'span1',
                'parent2',
                'child2',
                'span2'
            ]
        );
    });

    it('works with HTMLElement limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.parents(
                    'a',
                    null,
                    document.body
                ).map(node => node.id)
            ),
            [
                'parent1',
                'child1',
                'span1',
                'parent2',
                'child2',
                'span2'
            ]
        );
    });

    it('works with NodeList limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.parents(
                    'a',
                    null,
                    document.querySelectorAll('div')
                ).map(node => node.id)
            ),
            [
                'span1',
                'span2'
            ]
        );
    });

    it('works with HTMLCollection limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.parents(
                    'a',
                    null,
                    document.body.children
                ).map(node => node.id)
            ),
            [
                'child1',
                'span1',
                'child2',
                'span2'
            ]
        );
    });

    it('works with array limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.parents('a', null, [
                    document.getElementById('parent1'),
                    document.getElementById('parent2')
                ]).map(node => node.id)
            ),
            [
                'child1',
                'span1',
                'child2',
                'span2'
            ]
        );
    });

});