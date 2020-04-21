const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Create', function() {

    describe('#attachShadow', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML = '<div id="test"></div>';
            });
        });

        it('attaches a shadow root to the first node', async function() {
            assert.equal(
                await exec(_ => {
                    dom.attachShadow(
                        '#test'
                    );
                    return document.getElementById('test').shadowRoot instanceof ShadowRoot;
                }),
                true
            );
        });

        it('attaches a closed shadow root to the first node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const shadow = dom.attachShadow(
                        '#test',
                        false
                    );
                    return [
                        shadow instanceof ShadowRoot,
                        document.getElementById('test').shadowRoot
                    ];
                }),
                [
                    true,
                    null
                ]
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const element = document.getElementById('test');
                    dom.attachShadow(
                        element
                    );
                    return element.shadowRoot instanceof ShadowRoot;
                }),
                true
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.attachShadow(
                        document.body.children
                    );
                    return document.getElementById('test').shadowRoot instanceof ShadowRoot;
                }),
                true
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.attachShadow(
                        document.querySelectorAll('div')
                    );
                    return document.getElementById('test').shadowRoot instanceof ShadowRoot;
                }),
                true
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const element = document.getElementById('test');
                    dom.attachShadow(
                        [
                            element
                        ]
                    );
                    return element.shadowRoot instanceof ShadowRoot;
                }),
                true
            );
        });

    });

    describe('#create', function() {

        it('creates a new node', async function() {
            assert.equal(
                await exec(_ => {
                    const element = dom.create(
                        'div'
                    );
                    document.body.appendChild(element);
                    return document.body.innerHTML;
                }),
                '<div></div>'
            );
        });

        it('creates a new node with HTML', async function() {
            assert.equal(
                await exec(_ => {
                    const element = dom.create(
                        'div',
                        {
                            html: '<span>Test</span>'
                        }
                    );
                    document.body.appendChild(element);
                    return document.body.innerHTML;
                }),
                '<div><span>Test</span></div>'
            );
        });

        it('creates a new node with text', async function() {
            assert.equal(
                await exec(_ => {
                    const element = dom.create(
                        'div',
                        {
                            text: '<span>Test</span>'
                        }
                    );
                    document.body.appendChild(element);
                    return document.body.innerHTML;
                }),
                '<div>&lt;span&gt;Test&lt;/span&gt;</div>'
            );
        });

        it('creates a new node with classes', async function() {
            assert.equal(
                await exec(_ => {
                    const element = dom.create(
                        'div',
                        {
                            class: 'test'
                        }
                    );
                    document.body.appendChild(element);
                    return document.body.innerHTML;
                }),
                '<div class="test"></div>'
            );
        });

        it('creates a new node with styles', async function() {
            assert.equal(
                await exec(_ => {
                    const element = dom.create(
                        'div',
                        {
                            style: {
                                display: 'block',
                                width: '50px'
                            }
                        }
                    );
                    document.body.appendChild(element);
                    return document.body.innerHTML;
                }),
                '<div style="display: block; width: 50px;"></div>'
            );
        });

        it('creates a new node with value', async function() {
            assert.equal(
                await exec(_ => {
                    const element = dom.create(
                        'input',
                        {
                            value: 'Test'
                        }
                    );
                    return element.value;
                }),
                'Test'
            );
        });

        it('creates a new node with attributes', async function() {
            assert.equal(
                await exec(_ => {
                    const element = dom.create(
                        'input',
                        {
                            attributes: {
                                type: 'number',
                                min: '1',
                                max: '10'
                            }
                        }
                    );
                    document.body.appendChild(element);
                    return document.body.innerHTML;
                }),
                '<input type="number" min="1" max="10">'
            );
        });

        it('creates a new node with properties', async function() {
            assert.equal(
                await exec(_ => {
                    const element = dom.create(
                        'input',
                        {
                            properties: {
                                test: 'Test'
                            }
                        }
                    );
                    return element.test;
                }),
                'Test'
            );
        });

        it('creates a new node with dataset values', async function() {
            assert.equal(
                await exec(_ => {
                    const element = dom.create(
                        'div',
                        {
                            dataset: {
                                text: 'Test',
                                number: 123.456,
                                true: true,
                                false: false,
                                null: null,
                                array: [1, 2, 3],
                                object: { a: 1 }
                            }
                        }
                    );
                    document.body.appendChild(element);
                    return document.body.innerHTML;
                }),
                '<div data-text="Test" data-number="123.456" data-true="true" data-false="false" data-null="null" data-array="[1,2,3]" data-object="{&quot;a&quot;:1}"></div>'
            );
        });

    });

    describe('#createComment', function() {

        it('creates a new comment node', async function() {
            assert.equal(
                await exec(_ => {
                    const comment = dom.createComment('Test');
                    document.body.appendChild(comment);
                    return document.body.innerHTML;
                }),
                '<!--Test-->'
            );
        });

    });

    describe('#createFragment', function() {

        it('creates a new document fragment', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.createFragment() instanceof DocumentFragment;
                }),
                true
            );
        });

    });

    describe('#createRange', function() {

        it('creates a new range', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.createRange() instanceof Range;
                }),
                true
            );
        });

    });

    describe('#createText', function() {

        it('creates a new text node', async function() {
            assert.equal(
                await exec(_ => {
                    const text = dom.createText('Test');
                    document.body.appendChild(text);
                    return document.body.innerHTML;
                }),
                'Test'
            );
        });

    });

    describe('#parseHTML', function() {

        it('returns an array of nodes parsed from a HTML string', async function() {
            assert.equal(
                await exec(_ => {
                    const nodes = dom.parseHTML(
                        '<div id="div1">' +
                        '<span id="span1"></span>' +
                        '</div>' +
                        '<div id="div2">' +
                        '<span id="span2"></span>' +
                        '</div>'
                    );

                    for (const node of nodes) {
                        document.body.appendChild(node);
                    }

                    return document.body.innerHTML;

                }),
                '<div id="div1">' +
                '<span id="span1"></span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2"></span>' +
                '</div>'
            );
        });

    });

});