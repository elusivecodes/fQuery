const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySet #parents', function() {

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
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('a')
                    .parents()
                    .get()
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
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('a')
                    .parents('div')
                    .get()
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

    it('returns the parents of each node before a limit', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('a')
                    .parents(null, 'div')
                    .get()
                    .map(node => node.id)
            ),
            [
                'span1',
                'span2'
            ]
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.queryMutable('a');
                return query === query.parents();
            }),
            true
        );
    });

    it('works with function filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('a')
                    .parents(node => node.tagName === 'DIV')
                    .get()
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

    it('works with HTMLElement filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('a')
                    .parents(
                        document.getElementById('child1')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'child1'
            ]
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('a')
                    .parents(
                        document.querySelectorAll('div')
                    )
                    .get()
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

    it('works with HTMLCollection filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('a')
                    .parents(
                        document.body.children
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'parent1',
                'parent2'
            ]
        );
    });

    it('works with array filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('a')
                    .parents([
                        document.getElementById('parent1'),
                        document.getElementById('child1'),
                        document.getElementById('parent2'),
                        document.getElementById('child2')
                    ])
                    .get()
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

    it('works with QuerySet filter', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return dom.queryMutable('a')
                    .parents(query)
                    .get()
                    .map(node => node.id);
            }),
            [
                'parent1',
                'child1',
                'parent2',
                'child2'
            ]
        );
    });

    it('works with function limit', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('a')
                    .parents(
                        null,
                        node => node.id === 'body'
                    )
                    .get()
                    .map(node => node.id)
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
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('a')
                    .parents(
                        null,
                        document.body
                    )
                    .get()
                    .map(node => node.id)
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
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('a')
                    .parents(
                        null,
                        document.querySelectorAll('div')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span1',
                'span2'
            ]
        );
    });

    it('works with HTMLCollection limit', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('a')
                    .parents(
                        null,
                        document.body.children
                    )
                    .get()
                    .map(node => node.id)
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
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('a')
                    .parents(null, [
                        document.getElementById('parent1'),
                        document.getElementById('parent2')
                    ])
                    .get()
                    .map(node => node.id)
            ),
            [
                'child1',
                'span1',
                'child2',
                'span2'
            ]
        );
    });

    it('works with QuerySet limit', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return dom.queryMutable('a')
                    .parents(null, query)
                    .get()
                    .map(node => node.id);
            }),
            [
                'span1',
                'span2'
            ]
        );
    });

});