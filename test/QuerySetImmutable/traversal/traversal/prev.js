const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #prev', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent">' +
                '<span id="span1">' +
                '<a></a>' +
                '</span>' +
                '<span id="span2">' +
                '<a></a>' +
                '</span>' +
                '<span id="span3" class="span">' +
                '<a></a>' +
                '</span>' +
                '<span id="span4">' +
                '<a></a>' +
                '</span>' +
                '</div>' +
                '<div id="parent2">' +
                '<span id="span5">' +
                '<a></a>' +
                '</span>' +
                '<span id="span6">' +
                '<a></a>' +
                '</span>' +
                '<span id="span7" class="span">' +
                '<a></a>' +
                '</span>' +
                '<span id="span8">' +
                '<a></a>' +
                '</span>' +
                '</div>';
        });
    });

    it('returns the previous sibling of each node', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('.span')
                    .prev()
                    .get()
                    .map(node => node.id)
            ),
            [
                'span2',
                'span6'
            ]
        );
    });

    it('returns the previous sibling of each node matching a filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('.span')
                    .prev('#span6')
                    .get()
                    .map(node => node.id)
            ),
            [
                'span6'
            ]
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query1 = dom.query('.span');
                const query2 = query1.prev();
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

    it('works with function filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('.span')
                    .prev(node => node.id === 'span6')
                    .get()
                    .map(node => node.id)
            ),
            [
                'span6'
            ]
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('.span')
                    .prev(
                        document.getElementById('span6')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span6'
            ]
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('.span')
                    .prev(
                        document.querySelectorAll('#span6')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span6'
            ]
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('.span')
                    .prev(
                        document.getElementById('parent2').children
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span6'
            ]
        );
    });

    it('works with array filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('.span')
                    .prev([
                        document.getElementById('span2'),
                        document.getElementById('span6')
                    ])
                    .get()
                    .map(node => node.id)
            ),
            [
                'span2',
                'span6'
            ]
        );
    });

    it('works with QuerySet filter', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const query = dom.query('#span6');
                return dom.query('.span')
                    .prev(query)
                    .get()
                    .map(node => node.id);
            }),
            [
                'span6'
            ]
        );
    });

});