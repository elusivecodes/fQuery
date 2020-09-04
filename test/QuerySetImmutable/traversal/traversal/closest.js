const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #closest', function() {

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
                dom.query('a')
                    .closest()
                    .get()
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
                dom.query('a')
                    .closest('div')
                    .get()
                    .map(node => node.id)
            ),
            [
                'child1',
                'child2'
            ]
        );
    });

    it('returns the closest ancestor of each node before a limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('a')
                    .closest('div', '#span2')
                    .get()
                    .map(node => node.id)
            ),
            [
                'child1'
            ]
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.equal(
            await exec(_ => {
                const query1 = dom.query('a');
                const query2 = query1.closest();
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

    it('works with function filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('a')
                    .closest(node => node.tagName === 'DIV')
                    .get()
                    .map(node => node.id)
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
                dom.query('a')
                    .closest(
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
        assert.deepEqual(
            await exec(_ =>
                dom.query('a')
                    .closest(
                        document.querySelectorAll('div')
                    )
                    .get()
                    .map(node => node.id)
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
                dom.query('a')
                    .closest(
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
        assert.deepEqual(
            await exec(_ =>
                dom.query('a')
                    .closest([
                        document.getElementById('child1'),
                        document.getElementById('child2')
                    ])
                    .get()
                    .map(node => node.id)
            ),
            [
                'child1',
                'child2'
            ]
        );
    });

    it('works with QuerySet filter', async function() {
        assert.deepEqual(
            await exec(_ => {
                const query = dom.query('div');
                return dom.query('a')
                    .closest(query)
                    .get()
                    .map(node => node.id);
            }),
            [
                'child1',
                'child2'
            ]
        );
    });

    it('works with function limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('a')
                    .closest(
                        'div',
                        node => node.id === 'span2'
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'child1'
            ]
        );
    });

    it('works with HTMLElement limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('a')
                    .closest(
                        'div',
                        document.getElementById('span2')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'child1'
            ]
        );
    });

    it('works with NodeList limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('a')
                    .closest(
                        'div',
                        document.querySelectorAll('#span2')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'child1'
            ]
        );
    });

    it('works with HTMLCollection limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('a')
                    .closest(
                        'div',
                        document.getElementById('child2').children
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'child1'
            ]
        );
    });

    it('works with array limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('a')
                    .closest('div', [
                        document.getElementById('span2')
                    ])
                    .get()
                    .map(node => node.id)
            ),
            [
                'child1'
            ]
        );
    });

    it('works with QuerySet limit', async function() {
        assert.deepEqual(
            await exec(_ => {
                const query = dom.query('#span2');
                return dom.query('a')
                    .closest('div', query)
                    .get()
                    .map(node => node.id);
            }),
            [
                'child1'
            ]
        );
    });

});