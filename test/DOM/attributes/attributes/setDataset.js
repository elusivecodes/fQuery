const assert = require('assert').strict;
const { exec } = require('../../../setup');

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