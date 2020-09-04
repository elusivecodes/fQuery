const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #siblings', function() {

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
                '<span id="span5">' +
                '<a></a>' +
                '</span>' +
                '</div>' +
                '<div id="parent2">' +
                '<span id="span6">' +
                '<a></a>' +
                '</span>' +
                '<span id="span7">' +
                '<a></a>' +
                '</span>' +
                '<span id="span8" class="span">' +
                '<a></a>' +
                '</span>' +
                '<span id="span9">' +
                '<a></a>' +
                '</span>' +
                '<span id="span10">' +
                '<a></a>' +
                '</span>' +
                '</div>';
        });
    });

    it('returns all siblings of each node', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('.span')
                    .siblings()
                    .get()
                    .map(node => node.id)
            ),
            [
                'span1',
                'span2',
                'span4',
                'span5',
                'span6',
                'span7',
                'span9',
                'span10'
            ]
        );
    });

    it('returns all siblings of each node matching a filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('.span')
                    .siblings('#span1, #span10')
                    .get()
                    .map(node => node.id)
            ),
            [
                'span1',
                'span10'
            ]
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.equal(
            await exec(_ => {
                const query1 = dom.query('.span');
                const query2 = query1.siblings();
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

    it('works with function filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('.span')
                    .siblings(node => node.id === 'span5')
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
                dom.query('.span')
                    .siblings(
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
                dom.query('.span')
                    .siblings(
                        document.querySelectorAll('#span1, #span10')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span1',
                'span10'
            ]
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('.span')
                    .siblings(
                        document.getElementById('parent2').children
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'span6',
                'span7',
                'span9',
                'span10'
            ]
        );
    });

    it('works with array filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('.span')
                    .siblings([
                        document.getElementById('span1'),
                        document.getElementById('span10')
                    ])
                    .get()
                    .map(node => node.id)
            ),
            [
                'span1',
                'span10'
            ]
        );
    });

    it('works with QuerySet filter', async function() {
        assert.deepEqual(
            await exec(_ => {
                const query = dom.query('#span1, #span10');
                return dom.query('.span')
                    .siblings(query)
                    .get()
                    .map(node => node.id);
            }),
            [
                'span1',
                'span10'
            ]
        );
    });

});