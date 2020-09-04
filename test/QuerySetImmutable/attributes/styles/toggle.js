const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #toggle', function() {

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
                dom.query('div')
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
                const query = dom.query('div');
                return query === query.toggle();
            }),
            true
        );
    });

});