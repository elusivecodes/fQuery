const assert = require('assert');
const { exec } = require('../../../setup');

describe('#prev', function() {

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
                dom.prev('.span')
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
                dom.prev('.span', '#span6')
                    .map(node => node.id)
            ),
            [
                'span6'
            ]
        );
    });

    it('returns an empty array for empty nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.prev('#invalid')
            ),
            []
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.prev(
                    document.getElementById('span7'),
                    '#span6'
                ).map(node => node.id)
            ),
            [
                'span6'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.prev(
                    document.querySelectorAll('.span'),
                    '#span6'
                ).map(node => node.id)
            ),
            [
                'span6'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.prev(
                    document.getElementById('parent2').children,
                    '#span6'
                ).map(node => node.id)
            ),
            [
                'span6'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.prev([
                    document.getElementById('span3'),
                    document.getElementById('span7')
                ], '#span6').map(node => node.id)
            ),
            [
                'span6'
            ]
        );
    });

    it('works with function filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.prev(
                    '.span',
                    node => node.id === 'span6'
                ).map(node => node.id)
            ),
            [
                'span6'
            ]
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.prev(
                    '.span',
                    document.getElementById('span6')
                ).map(node => node.id)
            ),
            [
                'span6'
            ]
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.prev(
                    '.span',
                    document.querySelectorAll('#span6')
                ).map(node => node.id)
            ),
            [
                'span6'
            ]
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.prev(
                    '.span',
                    document.getElementById('parent2').children
                ).map(node => node.id)
            ),
            [
                'span6'
            ]
        );
    });

    it('works with array filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.prev('.span', [
                    document.getElementById('span2'),
                    document.getElementById('span6')
                ]).map(node => node.id)
            ),
            [
                'span2',
                'span6'
            ]
        );
    });

});