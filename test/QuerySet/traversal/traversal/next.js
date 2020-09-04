const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #next', function() {

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
                dom.queryMutable('.span')
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
                dom.queryMutable('.span')
                    .next('#span7')
                    .get()
                    .map(node => node.id)
            ),
            [
                'span7'
            ]
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('.span');
                return query === query.next();
            }),
            true
        );
    });

    it('works with function filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
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
                dom.queryMutable('.span')
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
                dom.queryMutable('.span')
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
                dom.queryMutable('.span')
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
                dom.queryMutable('.span')
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
                const query = dom.queryMutable('#span7');
                return dom.queryMutable('.span')
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