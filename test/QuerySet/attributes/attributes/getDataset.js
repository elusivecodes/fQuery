const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #getDataset', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" data-text="Test" data-number="123.456" data-true="true" data-false="false" data-null="null" data-array="[1,2,3]" data-object="{&quot;a&quot;:1}"></div>' +
                '<div id="test2"></div>';
        });
    });

    it('returns an object with all dataset values for the first node', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .getDataset()
            ),
            {
                text: 'Test',
                number: 123.456,
                true: true,
                false: false,
                null: null,
                array: [1, 2, 3],
                object: { a: 1 }
            }
        );
    });

    it('returns a dataset value for the first node', async function() {
        assert.equal(
            await exec(_ =>
                dom.queryMutable('div')
                    .getDataset('text')
            ),
            'Test'
        );
    });

    it('parses number values', async function() {
        assert.equal(
            await exec(_ =>
                dom.queryMutable('div')
                    .getDataset('number')
            ),
            123.456
        );
    });

    it('parses boolean true values', async function() {
        assert.equal(
            await exec(_ =>
                dom.queryMutable('div')
                    .getDataset('true')
            ),
            true
        );
    });

    it('parses boolean false values', async function() {
        assert.equal(
            await exec(_ =>
                dom.queryMutable('div')
                    .getDataset('false')
            ),
            false
        );
    });

    it('parses null values', async function() {
        assert.equal(
            await exec(_ =>
                dom.queryMutable('div')
                    .getDataset('null')
            ),
            null
        );
    });

    it('parses JSON array values', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .getDataset('array')
            ),
            [1, 2, 3]
        );
    });

    it('parses JSON object values', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .getDataset('object')
            ),
            { a: 1 }
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.queryMutable('#invalid')
                    .getDataset('text')
            ),
            undefined
        );
    });

});