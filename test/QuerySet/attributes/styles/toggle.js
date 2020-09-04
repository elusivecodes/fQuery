const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #toggle', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" style="display: none;"></div>';
        });
    });

    it('toggles the visibility of all nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.queryMutable('div')
                    .toggle();
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: none;"></div>' +
            '<div id="test2" style=""></div>'
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return query === query.toggle();
            }),
            true
        );
    });

});