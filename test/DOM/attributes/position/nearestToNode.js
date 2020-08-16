const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#nearestToNode', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="fromParent">' +
                '<div id="test1" data-toggle="from" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>' +
                '<div id="test2" data-toggle="from" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>' +
                '</div>' +
                '<div id="toParent">' +
                '<div id="test3" data-toggle="to"></div>' +
                '<div id="test4" data-toggle="to"></div>' +
                '</div>';
            window.scrollTo(1000, 1000);
        });
    });

    it('returns the nearest node to another node', async function() {
        assert.equal(
            await exec(_ => {
                const nearest = dom.nearestToNode('[data-toggle="from"]', '[data-toggle="to"]');
                return nearest.id;
            }),
            'test2'
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.nearestToNode('#invalid', '[data-toggle="to"]')
            ),
            undefined
        );
    });

    it('returns undefined for empty other nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.nearestToNode('[data-toggle="from"]', '#invalid')
            ),
            undefined
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                const nearest = dom.nearestToNode(
                    document.getElementById('test1'),
                    '[data-toggle="to"]'
                );
                return nearest.id;
            }),
            'test1'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                const nearest = dom.nearestToNode(
                    document.querySelectorAll('[data-toggle="from"]'),
                    '[data-toggle="to"]'
                );
                return nearest.id;
            }),
            'test2'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                const nearest = dom.nearestToNode(
                    document.getElementById('fromParent').children,
                    '[data-toggle="to"]'
                );
                return nearest.id;
            }),
            'test2'
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                const nearest = dom.nearestToNode([
                    document.getElementById('test1'),
                    document.getElementById('test2')
                ], '[data-toggle="to"]');
                return nearest.id;
            }),
            'test2'
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const nearest = dom.nearestToNode(
                    '[data-toggle="from"]',
                    document.getElementById('test3')
                );
                return nearest.id;
            }),
            'test2'
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const nearest = dom.nearestToNode(
                    '[data-toggle="from"]',
                    document.querySelectorAll('[data-toggle="to"]')
                );
                return nearest.id;
            }),
            'test2'
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const nearest = dom.nearestToNode(
                    '[data-toggle="from"]',
                    document.getElementById('toParent').children
                );
                return nearest.id;
            }),
            'test2'
        );
    });

    it('works with array other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const nearest = dom.nearestToNode('[data-toggle="from"]', [
                    document.getElementById('test3'),
                    document.getElementById('test4')
                ]);
                return nearest.id;
            }),
            'test2'
        );
    });

});