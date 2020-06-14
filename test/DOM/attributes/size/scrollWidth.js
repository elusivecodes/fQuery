const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#scrollWidth', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; width: 100px; overflow-x: scroll;">' +
                '<div style="display: block; width: 1000px; height: 1px;"></div>' +
                '</div>' +
                '<div id="test2"></div>';
        });
    });

    it('returns the scroll width of the first node', async function() {
        assert.equal(
            await exec(_ => {
                return dom.scrollWidth(
                    'div'
                );
            }),
            1000
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.scrollWidth(
                    '#invalid'
                );
            }),
            undefined
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.scrollWidth(
                    document.querySelectorAll('div')
                );
            }),
            1000
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.scrollWidth(
                    document.body.children
                );
            }),
            1000
        );
    });

    it('works with Document nodes', async function() {
        assert.equal(
            await exec(_ => {
                document.body.innerHTML = '<div style="block; width: 1000px; height: 1000px;"></div>';
                return dom.scrollWidth(
                    document
                );
            }),
            1008
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.scrollWidth(
                    [
                        document.getElementById('test1'),
                        document.getElementById('test2')
                    ]
                );
            }),
            1000
        );
    });

});