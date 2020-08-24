const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#nextAll', function() {

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
                dom.nextAll('.span')
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
                dom.nextAll('.span', '#span4, #span8')
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
                dom.nextAll('.span', null, '#span4, #span7')
                    .map(node => node.id)
            ),
            [
                'span3'
            ]
        );
    });

    it('returns an empty array for empty nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.nextAll('#invalid')
            ),
            []
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.nextAll(
                    document.getElementById('span2'),
                    '#span4, #span8'
                ).map(node => node.id)
            ),
            [
                'span4'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.nextAll(
                    document.querySelectorAll('.span'),
                    '#span4, #span8'
                ).map(node => node.id)
            ),
            [
                'span4',
                'span8'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.nextAll(
                    document.getElementById('parent2').children,
                    '#span4, #span8'
                ).map(node => node.id)
            ),
            [
                'span8'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.nextAll([
                    document.getElementById('span2'),
                    document.getElementById('span6')
                ], '#span4, #span8').map(node => node.id)
            ),
            [
                'span4',
                'span8'
            ]
        );
    });

    it('works with function filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.nextAll(
                    '.span',
                    node => node.id === 'span8'
                ).map(node => node.id)
            ),
            [
                'span8'
            ]
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.nextAll(
                    '.span',
                    document.getElementById('span4')
                ).map(node => node.id)
            ),
            [
                'span4'
            ]
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.nextAll(
                    '.span',
                    document.querySelectorAll('#span4, #span8')
                ).map(node => node.id)
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
                dom.nextAll(
                    '.span',
                    document.getElementById('parent2').children
                ).map(node => node.id)
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
                dom.nextAll('.span', [
                    document.getElementById('span4'),
                    document.getElementById('span8')
                ]).map(node => node.id)
            ),
            [
                'span4',
                'span8'
            ]
        );
    });

    it('works with function limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.nextAll(
                    '.span',
                    null,
                    node => node.id === 'span7'
                ).map(node => node.id)
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
                dom.nextAll(
                    '.span',
                    null,
                    document.getElementById('span7')
                ).map(node => node.id)
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
                dom.nextAll(
                    '.span',
                    null,
                    document.querySelectorAll('#span4, #span7')
                ).map(node => node.id)
            ),
            [
                'span3'
            ]
        );
    });

    it('works with HTMLCollection limit', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.nextAll(
                    '.span',
                    null,
                    document.getElementById('parent2').children
                ).map(node => node.id)
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
                dom.nextAll('.span', null, [
                    document.getElementById('span4'),
                    document.getElementById('span7')
                ]).map(node => node.id)
            ),
            [
                'span3'
            ]
        );
    });

});