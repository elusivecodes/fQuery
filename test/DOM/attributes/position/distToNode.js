const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#distToNode', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="fromParent">' +
                '<div id="test1" data-toggle="from" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>' +
                '<div id="test2" data-toggle="from"></div>' +
                '</div>' +
                '<div id="toParent">' +
                '<div id="test3" data-toggle="to" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>' +
                '<div id="test4" data-toggle="to"></div>' +
                '</div>';
            window.scrollTo(1000, 1000);
        });
    });

    it('returns the distance from the first node to another node', async function() {
        assert.equal(
            await exec(_ =>
                dom.distToNode('[data-toggle="from"]', '[data-toggle="to"]')
            ),
            1250
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.distToNode('#invalid', '[data-toggle="to"]')
            ),
            undefined
        );
    });

    it('returns undefined for empty other nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.distToNode('[data-toggle="from"]', '#invalid')
            ),
            undefined
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.distToNode(
                    document.getElementById('test1'),
                    '[data-toggle="to"]'
                )
            ),
            1250
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.distToNode(
                    document.querySelectorAll('[data-toggle="from"]'),
                    '[data-toggle="to"]'
                )
            ),
            1250
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.distToNode(
                    document.getElementById('fromParent').children,
                    '[data-toggle="to"]'
                )
            ),
            1250
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.distToNode([
                    document.getElementById('test1'),
                    document.getElementById('test2')
                ], '[data-toggle="to"]')
            ),
            1250
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.distToNode(
                    '[data-toggle="from"]',
                    document.getElementById('test3')
                )
            ),
            1250
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.distToNode(
                    '[data-toggle="from"]',
                    document.querySelectorAll('[data-toggle="to"]')
                )
            ),
            1250
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.distToNode(
                    '[data-toggle="from"]',
                    document.getElementById('toParent').children
                )
            ),
            1250
        );
    });

    it('works with array other nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.distToNode('[data-toggle="from"]', [
                    document.getElementById('test3'),
                    document.getElementById('test4')
                ])
            ),
            1250
        );
    });

});