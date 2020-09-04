const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #removeDataset', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" data-text="Test"></div>' +
                '<div id="test2" data-text="Test"></div>';
        });
    });

    it('removes a dataset value for all nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.queryMutable('div')
                    .removeDataset('text');
                return document.body.innerHTML;
            }),
            '<div id="test1"></div>' +
            '<div id="test2"></div>'
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('div')
                return query === query.removeDataset('text');
            }),
            true
        );
    });

});