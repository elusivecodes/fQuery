const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#index', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2" class="test"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4" class="test"></div>';
        });
    });

    it('returns the index of the first node relative to the parent', async function() {
        assert.equal(
            await exec(_ => {
                return dom.index(
                    '.test'
                );
            }),
            1
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.index(
                    document.getElementById('div2')
                );
            }),
            1
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.index(
                    document.querySelectorAll('.test')
                );
            }),
            1
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.index(
                    document.body.children
                );
            }),
            0
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.index(
                    [
                        document.getElementById('div2'),
                        document.getElementById('div4')
                    ]
                );
            }),
            1
        );
    });

});