const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #distToNode', function() {

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
                dom.query('[data-toggle="from"]')
                    .distToNode('[data-toggle="to"]')
            ),
            1250
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('#invalid')
                    .distToNode('[data-toggle="to"]')
            ),
            undefined
        );
    });

    it('returns undefined for empty other nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('[data-toggle="from"]')
                    .distToNode('#invalid')
            ),
            undefined
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('[data-toggle="from"]')
                    .distToNode(
                        document.getElementById('test3')
                    )
            ),
            1250
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('[data-toggle="from"]')
                    .distToNode(
                        document.querySelectorAll('[data-toggle="to"]')
                    )
            ),
            1250
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('[data-toggle="from"]')
                    .distToNode(
                        document.getElementById('toParent').children
                    )
            ),
            1250
        );
    });

    it('works with array other nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('[data-toggle="from"]')
                    .distToNode([
                        document.getElementById('test3'),
                        document.getElementById('test4')
                    ])
            ),
            1250
        );
    });

    it('works with QuerySet other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.query('[data-toggle="to"]');
                return dom.query('[data-toggle="from"]')
                    .distToNode(query);
            }),
            1250
        );
    });

});