const assert = require('assert');
const { exec } = require('../../../setup');

describe('#next', function() {

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
        assert.deepStrictEqual(
            await exec(_ =>
                dom.next('.span')
                    .map(node => node.id)
            ),
            [
                'span3',
                'span7'
            ]
        );
    });

    it('returns the next sibling of each node matching a filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.next('.span', '#span7')
                    .map(node => node.id)
            ),
            [
                'span7'
            ]
        );
    });

    it('returns an empty array for empty nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.next('#invalid')
            ),
            []
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.next(
                    document.getElementById('span6'),
                    '#span7'
                ).map(node => node.id)
            ),
            [
                'span7'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.next(
                    document.querySelectorAll('.span'),
                    '#span7'
                ).map(node => node.id)
            ),
            [
                'span7'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.next(
                    document.getElementById('parent2').children,
                    '#span7'
                ).map(node => node.id)
            ),
            [
                'span7'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.next([
                    document.getElementById('span2'),
                    document.getElementById('span6')
                ], '#span7').map(node => node.id)
            ),
            [
                'span7'
            ]
        );
    });

    it('works with function filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.next(
                    '.span',
                    node => node.id === 'span7'
                ).map(node => node.id)
            ),
            [
                'span7'
            ]
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.next(
                    '.span',
                    document.getElementById('span7')
                ).map(node => node.id)
            ),
            [
                'span7'
            ]
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.next(
                    '.span',
                    document.querySelectorAll('#span7')
                ).map(node => node.id)
            ),
            [
                'span7'
            ]
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.next(
                    '.span',
                    document.getElementById('parent2').children
                ).map(node => node.id)
            ),
            [
                'span7'
            ]
        );
    });

    it('works with array filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.next('.span', [
                    document.getElementById('span3'),
                    document.getElementById('span7')
                ]).map(node => node.id)
            ),
            [
                'span3',
                'span7'
            ]
        );
    });

});