const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('DOM Attributes (Dataset)', function() {

    describe('#getDataset', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="test1" data-text="Test" data-number="123.456" data-true="true" data-false="false" data-null="null" data-array="[1,2,3]" data-object="{&quot;a&quot;:1}"></div>' +
                    '<div id="test2"></div>';
            });
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

        it('returns undefined for empty nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getDataset(
                        '#invalid',
                        'text'
                    );
                }),
                undefined
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getDataset(
                        document.getElementById('test1'),
                        'text'
                    );
                }),
                'Test'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getDataset(
                        document.body.children,
                        'text'
                    );
                }),
                'Test'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getDataset(
                        document.querySelectorAll('div'),
                        'text'
                    );
                }),
                'Test'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getDataset(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        'text'
                    );
                }),
                'Test'
            );
        });

    });

    describe('#removeDataset', function() {

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
                    dom.removeDataset(
                        'div',
                        'text'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1"></div>' +
                '<div id="test2"></div>'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeDataset(
                        document.getElementById('test1'),
                        'text'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1"></div>' +
                '<div id="test2" data-text="Test"></div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeDataset(
                        document.body.children,
                        'text'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1"></div>' +
                '<div id="test2"></div>'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeDataset(
                        document.querySelectorAll('div'),
                        'text'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1"></div>' +
                '<div id="test2"></div>'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeDataset(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        'text'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1"></div>' +
                '<div id="test2"></div>'
            );
        });

    });

    describe('#setDataset', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="test1"></div>' +
                    '<div id="test2"></div>';
            });
        });

        it('sets a dataset object for all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setDataset(
                        'div',
                        {
                            testA: 'Test 1',
                            testB: 'Test 2'
                        }
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" data-test-a="Test 1" data-test-b="Test 2"></div>' +
                '<div id="test2" data-test-a="Test 1" data-test-b="Test 2"></div>'
            );
        });

        it('sets a dataset value for all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setDataset(
                        'div',
                        'text',
                        'Test'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" data-text="Test"></div>' +
                '<div id="test2" data-text="Test"></div>'
            );
        });

        it('formats boolean true values', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setDataset(
                        '#test1',
                        'true',
                        true
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" data-true="true"></div>' +
                '<div id="test2"></div>'
            );
        });

        it('formats boolean false values', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setDataset(
                        '#test1',
                        'false',
                        false
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" data-false="false"></div>' +
                '<div id="test2"></div>'
            );
        });

        it('formats boolean null values', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setDataset(
                        '#test1',
                        'null',
                        null
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" data-null="null"></div>' +
                '<div id="test2"></div>'
            );
        });

        it('formats array values', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setDataset(
                        '#test1',
                        'array',
                        [1, 2, 3]
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" data-array="[1,2,3]"></div>' +
                '<div id="test2"></div>'
            );
        });

        it('formats object values', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setDataset(
                        '#test1',
                        'object',
                        { a: 1 }
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" data-object="{&quot;a&quot;:1}"></div>' +
                '<div id="test2"></div>'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setDataset(
                        document.getElementById('test1'),
                        'text',
                        'Test'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" data-text="Test"></div>' +
                '<div id="test2"></div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setDataset(
                        document.body.children,
                        'text',
                        'Test'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" data-text="Test"></div>' +
                '<div id="test2" data-text="Test"></div>'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setDataset(
                        document.querySelectorAll('div'),
                        'text',
                        'Test'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" data-text="Test"></div>' +
                '<div id="test2" data-text="Test"></div>'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setDataset(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        'text',
                        'Test'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1" data-text="Test"></div>' +
                '<div id="test2" data-text="Test"></div>'
            );
        });

    });

});