const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #nearestToNode', function() {

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
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('[data-toggle="from"]')
                    .nearestToNode('[data-toggle="to"]')
                    .get()
                    .map(node => node.id)
            ),
            [
                'test2'
            ]
        );
    });

    it('returns an empty QuerySet for empty nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('#invalid')
                    .nearestToNode('[data-toggle="to"]')
                    .get()
            ),
            []
        );
    });

    it('returns an empty QuerySet for empty other nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('[data-toggle="from"]')
                    .nearestToNode('#invalid')
                    .get()
            ),
            []
        );
    });

    it('returns a new QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query1 = dom.queryMutable('div');
                const query2 = query1.nearestToNode('[data-toggle="to"]');
                return query2 instanceof QuerySet && query1 !== query2;
            }),
            true
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('[data-toggle="from"]')
                    .nearestToNode(
                        document.getElementById('test3')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'test2'
            ]
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('[data-toggle="from"]')
                    .nearestToNode(
                        document.querySelectorAll('[data-toggle="to"]')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'test2'
            ]
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('[data-toggle="from"]')
                    .nearestToNode(
                        document.getElementById('toParent').children
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'test2'
            ]
        );
    });

    it('works with array other nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('[data-toggle="from"]')
                    .nearestToNode([
                        document.getElementById('test3'),
                        document.getElementById('test4')
                    ])
                    .get()
                    .map(node => node.id)
            ),
            [
                'test2'
            ]
        );
    });

    it('works with QuerySet other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const query = dom.queryMutable('[data-toggle="to"]');
                return dom.queryMutable('[data-toggle="from"]')
                    .nearestToNode(query)
                    .get()
                    .map(node => node.id)
            }),
            [
                'test2'
            ]
        );
    });

});