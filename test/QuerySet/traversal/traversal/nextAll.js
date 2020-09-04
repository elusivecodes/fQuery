const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #nextAll', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent1">' +
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

    it('returns all next siblings of each node', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .nextAll()
                    .get()
                    .map(node => node.id)
            ),
            [
                'span3',
                'span4',
                'span7',
                'span8'
            ]
        );
    });

    it('returns all next siblings of each node matching a filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .nextAll('#span4, #span8')
                    .get()
                    .map(node => node.id)
            ),
            [
                'span4',
                'span8'
            ]
        );
    });

    it('returns all next siblings of each node before a limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .nextAll(null, '#span4, #span7')
                    .get()
                    .map(node => node.id)
            ),
            [
                'span3'
            ]
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('.span');
                return query === query.nextAll();
            }),
            true
        );
    });

    it('works with function filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .nextAll(node => node.id === 'span8')
                    .get()
                    .map(node => node.id)
            ),
            [
                'span8'
            ]
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .nextAll(
                        document.getElementById('span4')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span4'
            ]
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .nextAll(
                        document.querySelectorAll('#span4, #span8')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span4',
                'span8'
            ]
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .nextAll(
                        document.getElementById('parent2').children
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span7',
                'span8'
            ]
        );
    });

    it('works with array filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .nextAll([
                        document.getElementById('span4'),
                        document.getElementById('span8')
                    ])
                    .get()
                    .map(node => node.id)
            ),
            [
                'span4',
                'span8'
            ]
        );
    });

    it('works with QuerySet filter', async function() {
        assert.deepEqual(
            await exec(_ => {
                const query = dom.queryMutable('#span4, #span8');
                return dom.queryMutable('.span')
                    .nextAll(query)
                    .get()
                    .map(node => node.id);
            }),
            [
                'span4',
                'span8'
            ]
        );
    });

    it('works with function limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .nextAll(
                        null,
                        node => node.id === 'span7'
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span3',
                'span4'
            ]
        );
    });

    it('works with HTMLElement limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .nextAll(
                        null,
                        document.getElementById('span7')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span3',
                'span4'
            ]
        );
    });

    it('works with NodeList limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .nextAll(
                        null,
                        document.querySelectorAll('#span4, #span7')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span3'
            ]
        );
    });

    it('works with HTMLCollection limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .nextAll(
                        null,
                        document.getElementById('parent2').children
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span3',
                'span4'
            ]
        );
    });

    it('works with array limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .nextAll(null, [
                        document.getElementById('span4'),
                        document.getElementById('span7')
                    ])
                    .get()
                    .map(node => node.id)
            ),
            [
                'span3'
            ]
        );
    });

    it('works with QuerySet limit', async function() {
        assert.deepEqual(
            await exec(_ => {
                const query = dom.queryMutable('#span4, #span7');
                return dom.queryMutable('.span')
                    .nextAll(null, query)
                    .get()
                    .map(node => node.id);
            }),
            [
                'span3'
            ]
        );
    });

});