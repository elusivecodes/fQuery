const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #prevAll', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent1">' +
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

    it('returns all previous siblings of each node', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .prevAll()
                    .get()
                    .map(node => node.id)
            ),
            [
                'span1',
                'span2',
                'span5',
                'span6'
            ]
        );
    });

    it('returns all previous siblings of each node matching a filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .prevAll('#span1, #span5')
                    .get()
                    .map(node => node.id)
            ),
            [
                'span1',
                'span5'
            ]
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('.span');
                return query === query.prevAll();
            }),
            true
        );
    });

    it('works with function filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .prevAll(node => node.id === 'span5')
                    .get()
                    .map(node => node.id)
            ),
            [
                'span5'
            ]
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .prevAll(
                        document.getElementById('span1')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span1'
            ]
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .prevAll(
                        document.querySelectorAll('#span1, #span5')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span1',
                'span5'
            ]
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .prevAll(
                        document.getElementById('parent2').children
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span5',
                'span6'
            ]
        );
    });

    it('works with array filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .prevAll([
                        document.getElementById('span1'),
                        document.getElementById('span5')
                    ])
                    .get()
                    .map(node => node.id)
            ),
            [
                'span1',
                'span5'
            ]
        );
    });

    it('works with QuerySet filter', async function() {
        assert.deepEqual(
            await exec(_ => {
                const query = dom.queryMutable('#span1, #span5');
                return dom.queryMutable('.span')
                    .prevAll(query)
                    .get()
                    .map(node => node.id);
            }),
            [
                'span1',
                'span5'
            ]
        );
    });

    it('works with function limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .prevAll(
                        null,
                        node => node.id === 'span6'
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

    it('works with HTMLElement limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .prevAll(
                        null,
                        document.getElementById('span6')
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

    it('works with NodeList limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .prevAll(
                        null,
                        document.querySelectorAll('#span1, #span6')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span2'
            ]
        );
    });

    it('works with HTMLCollection limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .prevAll(
                        null,
                        document.getElementById('parent2').children
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

    it('works with array limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .prevAll(null, [,
                        document.getElementById('span1'),
                        document.getElementById('span6')
                    ])
                    .get()
                    .map(node => node.id)
            ),
            [
                'span2'
            ]
        );
    });

    it('works with QuerySet limit', async function() {
        assert.deepEqual(
            await exec(_ => {
                const query = dom.queryMutable('#span1, #span6');
                return dom.queryMutable('.span')
                    .prevAll(null, query)
                    .get()
                    .map(node => node.id);
            }),
            [
                'span2'
            ]
        );
    });

});