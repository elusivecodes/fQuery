const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#prevAll', function() {

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
                dom.prevAll('.span')
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
                dom.prevAll('.span', '#span1, #span5')
                    .map(node => node.id)
            ),
            [
                'span1',
                'span5'
            ]
        );
    });

    it('returns all previous siblings of each node before a limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.prevAll('.span', null, '#span1, #span6')
                    .map(node => node.id)
            ),
            [
                'span2'
            ]
        );
    });

    it('returns an empty array for empty nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.prevAll('#invalid')
            ),
            []
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.prevAll(
                    document.getElementById('span3'),
                    '#span1, #span5'
                ).map(node => node.id)
            ),
            [
                'span1'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.prevAll(
                    document.querySelectorAll('.span'),
                    '#span1, #span5'
                ).map(node => node.id)
            ),
            [
                'span1',
                'span5'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.prevAll(
                    document.getElementById('parent2').children,
                    '#span1, #span5'
                ).map(node => node.id)
            ),
            [
                'span5'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.prevAll([
                    document.getElementById('span3'),
                    document.getElementById('span7')
                ], '#span1, #span5').map(node => node.id)
            ),
            [
                'span1',
                'span5'
            ]
        );
    });

    it('works with function filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.prevAll(
                    '.span',
                    node => node.id === 'span5'
                ).map(node => node.id)
            ),
            [
                'span5'
            ]
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.prevAll(
                    '.span',
                    document.getElementById('span1')
                ).map(node => node.id)
            ),
            [
                'span1'
            ]
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.prevAll(
                    '.span',
                    document.querySelectorAll('#span1, #span5')
                ).map(node => node.id)
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
                dom.prevAll(
                    '.span',
                    document.getElementById('parent2').children
                ).map(node => node.id)
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
                dom.prevAll('.span', [
                    document.getElementById('span1'),
                    document.getElementById('span5')
                ]).map(node => node.id)
            ),
            [
                'span1',
                'span5'
            ]
        );
    });

    it('works with function limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.prevAll(
                    '.span',
                    null,
                    node => node.id === 'span6'
                ).map(node => node.id)
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
                dom.prevAll(
                    '.span',
                    null,
                    document.getElementById('span6')
                ).map(node => node.id)
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
                dom.prevAll(
                    '.span',
                    null,
                    document.querySelectorAll('#span1, #span6')
                ).map(node => node.id)
            ),
            [
                'span2'
            ]
        );
    });

    it('works with HTMLCollection limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.prevAll(
                    '.span',
                    null,
                    document.getElementById('parent2').children
                ).map(node => node.id)
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
                dom.prevAll('.span', null, [,
                    document.getElementById('span1'),
                    document.getElementById('span6')
                ]).map(node => node.id)
            ),
            [
                'span2'
            ]
        );
    });

});