const assert = require('assert');
const { exec } = require('../../../setup');

describe('#siblings', function() {

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
        assert.deepStrictEqual(
            await exec(_ =>
                dom.siblings('.span')
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
        assert.deepStrictEqual(
            await exec(_ =>
                dom.siblings('.span', '#span1, #span10')
                    .map(node => node.id)
            ),
            [
                'span1',
                'span10'
            ]
        );
    });

    it('returns an empty array for empty nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.siblings('#invalid')
            ),
            []
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.siblings(
                    document.getElementById('span3'),
                    '#span1, #span10'
                ).map(node => node.id)
            ),
            [
                'span1'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.siblings(
                    document.querySelectorAll('.span'),
                    '#span1, #span10'
                ).map(node => node.id)
            ),
            [
                'span1',
                'span10'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.siblings(
                    document.getElementById('parent2').children,
                    '#span1, #span10'
                ).map(node => node.id)
            ),
            [
                'span10'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.siblings([
                    document.getElementById('span3'),
                    document.getElementById('span8')
                ], '#span1, #span10').map(node => node.id)
            ),
            [
                'span1',
                'span10'
            ]
        );
    });

    it('works with function filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.siblings(
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
        assert.deepStrictEqual(
            await exec(_ =>
                dom.siblings(
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
        assert.deepStrictEqual(
            await exec(_ =>
                dom.siblings(
                    '.span',
                    document.querySelectorAll('#span1, #span10')
                ).map(node => node.id)
            ),
            [
                'span1',
                'span10'
            ]
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.siblings(
                    '.span',
                    document.getElementById('parent2').children
                ).map(node => node.id)
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
        assert.deepStrictEqual(
            await exec(_ =>
                dom.siblings('.span', [
                    document.getElementById('span1'),
                    document.getElementById('span10')
                ]).map(node => node.id)
            ),
            [
                'span1',
                'span10'
            ]
        );
    });

});