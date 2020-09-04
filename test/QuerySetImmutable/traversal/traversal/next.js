const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #next', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent">' +
                '<span id="span1">' +
                '<a></a>' +
                '</span>' +
                '<span id="span2" class="span">' +
                '<a></a>' +
                '</span>' +
                '<span id="span3">' +
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
                '<span id="span6" class="span">' +
                '<a></a>' +
                '</span>' +
                '<span id="span7">' +
                '<a></a>' +
                '</span>' +
                '<span id="span8">' +
                '<a></a>' +
                '</span>' +
                '</div>';
        });
    });

    it('returns the next sibling of each node', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('.span')
                    .next()
                    .get()
                    .map(node => node.id)
            ),
            [
                'span3',
                'span7'
            ]
        );
    });

    it('returns the next sibling of each node matching a filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('.span')
                    .next('#span7')
                    .get()
                    .map(node => node.id)
            ),
            [
                'span7'
            ]
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.equal(
            await exec(_ => {
                const query1 = dom.query('.span');
                const query2 = query1.next();
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

    it('works with function filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('.span')
                    .next(node => node.id === 'span7')
                    .get()
                    .map(node => node.id)
            ),
            [
                'span7'
            ]
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('.span')
                    .next(
                        document.getElementById('span7')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span7'
            ]
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('.span')
                    .next(
                        document.querySelectorAll('#span7')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span7'
            ]
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('.span')
                    .next(
                        document.getElementById('parent2').children
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span7'
            ]
        );
    });

    it('works with array filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('.span')
                    .next([
                        document.getElementById('span3'),
                        document.getElementById('span7')
                    ])
                    .get()
                    .map(node => node.id)
            ),
            [
                'span3',
                'span7'
            ]
        );
    });

    it('works with QuerySet filter', async function() {
        assert.deepEqual(
            await exec(_ => {
                const query = dom.query('#span7');
                return dom.query('.span')
                    .next(query)
                    .get()
                    .map(node => node.id);
            }),
            [
                'span7'
            ]
        );
    });

});