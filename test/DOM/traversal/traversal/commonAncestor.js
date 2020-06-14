const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#commonAncestor', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent">' +
                '<div id="child">' +
                '<span id="span1">' +
                '<a id="a1"></a>' +
                '</span>' +
                '<span id="span2">' +
                '<a id="a2"></a>' +
                '</span>' +
                '</div>' +
                '</div>';
        });
    });

    it('returns the closest common ancestor of all nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.commonAncestor(
                    'a'
                ).id;
            }),
            'child'
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.commonAncestor(
                    '#invalid'
                );
            }),
            undefined
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.commonAncestor(
                    document.getElementById('a1')
                ).id;
            }),
            'span1'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.commonAncestor(
                    document.querySelectorAll('a')
                ).id;
            }),
            'child'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.commonAncestor(
                    document.getElementById('span1').children
                ).id;
            }),
            'span1'
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.commonAncestor(
                    [
                        document.getElementById('a1'),
                        document.getElementById('a2')
                    ]
                ).id;
            }),
            'child'
        );
    });

});