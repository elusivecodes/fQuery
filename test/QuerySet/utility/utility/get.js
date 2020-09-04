const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #slice', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('reduces the nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .get()
                    .map(node => node.id)
            ),
            [
                'div1',
                'div2',
                'div3',
                'div4'
            ]
        );
    });

    it('reduces the node at an index', async function() {
        assert.equal(
            await exec(_ =>
                dom.queryMutable('div')
                    .get(1).id
            ),
            'div2'
        );
    });

});