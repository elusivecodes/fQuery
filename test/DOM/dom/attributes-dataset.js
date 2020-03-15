const assert = require('assert').strict;
const exec = require('../../setup');

describe('DOM Attributes (Dataset)', function() {

    describe('#getDataset', function() {
        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML = `<div id="test1" data-text="Test" data-number="123.456" data-true="true" data-false="false" data-null="null" data-array="[1,2,3]" data-object='{"a": 1}'></div><div id="test2"></div>`;
            });
        });

        it('returns a dataset value for the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getDataset(
                        'div',
                        'text'
                    );
                }),
                'Test'
            );
        });

        it('returns an object with all dataset values for the first node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.getDataset(
                        'div'
                    );
                }),
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

        it('parses number values', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getDataset(
                        'div',
                        'number'
                    );
                }),
                123.456
            );
        });

        it('parses boolean true values', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getDataset(
                        'div',
                        'true'
                    );
                }),
                true
            );
        });

        it('parses boolean false values', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getDataset(
                        'div',
                        'false'
                    );
                }),
                false
            );
        });

        it('parses null values', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getDataset(
                        'div',
                        'null'
                    );
                }),
                null
            );
        });

        it('parses JSON array values', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.getDataset(
                        'div',
                        'array'
                    );
                }),
                [1, 2, 3]
            );
        });

        it('parses JSON object values', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.getDataset(
                        'div',
                        'object'
                    );
                }),
                { a: 1 }
            );
        });

        it('works with HTMLElement');
        it('works with HTMLCollection');
        it('works with NodeList');
        it('works with array');

    });

    describe('#removeDataset', function() {

        it('removes a dataset value for all nodes');
        it('works with HTMLElement');
        it('works with HTMLCollection');
        it('works with NodeList');
        it('works with array');

    });

    describe('#setDataset', function() {

        it('sets a dataset value for all nodes');
        it('sets a dataset object for all nodes');
        it('works with HTMLElement');
        it('works with HTMLCollection');
        it('works with NodeList');
        it('works with array');

    });

});