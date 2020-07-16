const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#hasCSSAnimation', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<style>' +
                '.test { animation: spin 4s linear infinite; }' +
                '@keyframes spin { 100% { transform: rotate(360deg); } }' +
                '</style>' +
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns true if any node has a CSS animation', async function() {
        assert.equal(
            await exec(_ => {
                return dom.hasCSSAnimation(
                    'div'
                );
            }),
            true
        );
    });

    it('returns false if no nodes have a CSS animation', async function() {
        assert.equal(
            await exec(_ => {
                return dom.hasCSSAnimation(
                    'div:not(.test)'
                );
            }),
            false
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.hasCSSAnimation(
                    document.getElementById('div1')
                );
            }),
            true
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.hasCSSAnimation(
                    document.querySelectorAll('div')
                );
            }),
            true
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.hasCSSAnimation(
                    document.body.children
                );
            }),
            true
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.hasCSSAnimation(
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