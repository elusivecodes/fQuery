const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#isFixed', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<style>' +
                '.test { position: fixed; }' +
                '</style>' +
                '<div id="div1">' +
                '<span id="span1"></span>' +
                '</div>' +
                '<div id="div2" class="test">' +
                '<span id="span2"></span>' +
                '</div>' +
                '<div id="div3">' +
                '<span id="span3"></span>' +
                '</div>' +
                '<div id="div4" class="test">' +
                '<span id="span4"></span>' +
                '</div>';
        });
    });

    it('returns true if any node is fixed', async function() {
        assert.equal(
            await exec(_ => {
                return dom.isFixed(
                    'div'
                );
            }),
            true
        );
    });

    it('returns false if no nodes are fixed', async function() {
        assert.equal(
            await exec(_ => {
                return dom.isFixed(
                    'div:not(.test)'
                );
            }),
            false
        );
    });

    it('returns true if any node is a descdent of a fixed node', async function() {
        assert.equal(
            await exec(_ => {
                return dom.isFixed(
                    'span'
                );
            }),
            true
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.isFixed(
                    document.getElementById('div2')
                );
            }),
            true
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.isFixed(
                    document.querySelectorAll('div')
                );
            }),
            true
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.isFixed(
                    document.body.children
                );
            }),
            true
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.isFixed(
                    [
                        document.getElementById('div1'),
                        document.getElementById('div2'),
                        document.getElementById('div3'),
                        document.getElementById('div4')
                    ]
                );
            }),
            true
        );
    });

});