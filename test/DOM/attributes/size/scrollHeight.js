const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#scrollHeight', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; height: 100px; overflow-y: scroll;">' +
                '<div style="display: block; width: 1px; height: 1000px;"></div>' +
                '</div>' +
                '<div id="test2"></div>';
        });
    });

    it('returns the scroll height of the first node', async function() {
        assert.equal(
            await exec(_ => {
                return dom.scrollHeight(
                    'div'
                );
            }),
            1000
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.scrollHeight(
                    '#invalid'
                );
            }),
            undefined
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.scrollHeight(
                    document.querySelectorAll('div')
                );
            }),
            1000
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.scrollHeight(
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
                return dom.scrollHeight(
                    document
                );
            }),
            1016
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.scrollHeight(
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