const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #prev', function() {

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
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
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
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
                    .prev('#span6')
                    .get()
                    .map(node => node.id)
            ),
            [
                'span6'
            ]
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('.span');
                return query === query.prev();
            }),
            true
        );
    });

    it('works with function filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
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
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
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
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
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
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
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
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('.span')
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
        assert.deepEqual(
            await exec(_ => {
                const query = dom.queryMutable('#span6');
                return dom.queryMutable('.span')
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