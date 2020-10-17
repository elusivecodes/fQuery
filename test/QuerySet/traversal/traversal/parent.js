const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySet #parent', function() {

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
                    .parent()
                    .get()
                    .map(node => node.id)
            ),
            [
                'span1',
                'span2'
            ]
        );
    });

    it('returns the parents of each node matching a filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('a')
                    .parent('#span2')
                    .get()
                    .map(node => node.id)
            ),
            [
                'span2'
            ]
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.queryMutable('a');
                return query === query.parent();
            }),
            true
        );
    });

    it('works with function filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('a')
                    .parent(node => node.id === 'span2')
                    .get()
                    .map(node => node.id)
            ),
            [
                'span2'
            ]
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('a')
                    .parent(
                        document.getElementById('span2')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span2'
            ]
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('a')
                    .parent(
                        document.querySelectorAll('#span2')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span2'
            ]
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('a')
                    .parent(
                        document.getElementById('child2').children
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span2'
            ]
        );
    });

    it('works with array filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('a')
                    .parent([
                        document.getElementById('span2')
                    ])
                    .get()
                    .map(node => node.id)
            ),
            [
                'span2'
            ]
        );
    });

    it('works with QuerySet filter', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const query = dom.queryMutable('#span2');
                return dom.queryMutable('a')
                    .parent(query)
                    .get()
                    .map(node => node.id);
            }),
            [
                'span2'
            ]
        );
    });

});