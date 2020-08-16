const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#create', function() {

    it('creates a new node', async function() {
        assert.equal(
            await exec(_ => {
                const element = dom.create('div');
                document.body.appendChild(element);
                return document.body.innerHTML;
            }),
            '<div></div>'
        );
    });

    it('creates a new node with HTML', async function() {
        assert.equal(
            await exec(_ => {
                const element = dom.create('div', {
                    html: '<span>Test</span>'
                });
                document.body.appendChild(element);
                return document.body.innerHTML;
            }),
            '<div><span>Test</span></div>'
        );
    });

    it('creates a new node with text', async function() {
        assert.equal(
            await exec(_ => {
                const element = dom.create('div', {
                    text: '<span>Test</span>'
                });
                document.body.appendChild(element);
                return document.body.innerHTML;
            }),
            '<div>&lt;span&gt;Test&lt;/span&gt;</div>'
        );
    });

    it('creates a new node with classes', async function() {
        assert.equal(
            await exec(_ => {
                const element = dom.create('div', {
                    class: 'test'
                });
                document.body.appendChild(element);
                return document.body.innerHTML;
            }),
            '<div class="test"></div>'
        );
    });

    it('creates a new node with styles', async function() {
        assert.equal(
            await exec(_ => {
                const element = dom.create('div', {
                    style: {
                        display: 'block',
                        width: '50px'
                    }
                });
                document.body.appendChild(element);
                return document.body.innerHTML;
            }),
            '<div style="display: block; width: 50px;"></div>'
        );
    });

    it('creates a new node with value', async function() {
        assert.equal(
            await exec(_ => {
                const element = dom.create('input', {
                    value: 'Test'
                });
                return element.value;
            }),
            'Test'
        );
    });

    it('creates a new node with attributes', async function() {
        assert.equal(
            await exec(_ => {
                const element = dom.create('input', {
                    attributes: {
                        type: 'number',
                        min: '1',
                        max: '10'
                    }
                });
                document.body.appendChild(element);
                return document.body.innerHTML;
            }),
            '<input type="number" min="1" max="10">'
        );
    });

    it('creates a new node with properties', async function() {
        assert.equal(
            await exec(_ => {
                const element = dom.create('input', {
                    properties: {
                        test: 'Test'
                    }
                });
                return element.test;
            }),
            'Test'
        );
    });

    it('creates a new node with dataset values', async function() {
        assert.equal(
            await exec(_ => {
                const element = dom.create('div', {
                    dataset: {
                        text: 'Test',
                        number: 123.456,
                        true: true,
                        false: false,
                        null: null,
                        array: [1, 2, 3],
                        object: { a: 1 }
                    }
                });
                document.body.appendChild(element);
                return document.body.innerHTML;
            }),
            '<div data-text="Test" data-number="123.456" data-true="true" data-false="false" data-null="null" data-array="[1,2,3]" data-object="{&quot;a&quot;:1}"></div>'
        );
    });

});