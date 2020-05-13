const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Attributes', function() {

    describe('#getAttribute', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<input type="text" id="test1" required>' +
                    '<input type="number" id="test2">';
            });
        });

        it('returns an object with all attributes for the first node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.getAttribute(
                        'input'
                    );
                }),
                {
                    type: 'text',
                    id: 'test1',
                    required: ''
                }
            );
        });

        it('returns an attribute value for the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getAttribute(
                        'input',
                        'type'
                    );
                }),
                'text'
            );
        });

        it('returns null for an undefined property', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getAttribute(
                        'input',
                        'disabled'
                    );
                }),
                null
            );
        });

        it('returns undefined for empty nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getAttribute(
                        '#invalid',
                        'type'
                    );
                }),
                undefined
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getAttribute(
                        document.getElementById('test1'),
                        'type'
                    );
                }),
                'text'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getAttribute(
                        document.body.children,
                        'type'
                    );
                }),
                'text'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getAttribute(
                        document.querySelectorAll('input'),
                        'type'
                    );
                }),
                'text'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getAttribute(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        'type'
                    );
                }),
                'text'
            );
        });

    });

    describe('#getHTML', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="test1"><span>Test</span></div>' +
                    '<div id="test2"></div>';
            });
        });

        it('returns the HTML contents of the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getHTML(
                        'div'
                    );
                }),
                '<span>Test</span>'
            );
        });

        it('returns undefined for empty nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getHTML(
                        '#invalid'
                    );
                }),
                undefined
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getHTML(
                        document.getElementById('test1')
                    );
                }),
                '<span>Test</span>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getHTML(
                        document.body.children
                    );
                }),
                '<span>Test</span>'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getHTML(
                        document.querySelectorAll('div')
                    );
                }),
                '<span>Test</span>'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getHTML(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ]
                    );
                }),
                '<span>Test</span>'
            );
        });

    });

    describe('#getProperty', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<input type="text" id="test1">' +
                    '<input type="number" id="test2">';
                document.getElementById('test1').test = 'Test 1';
                document.getElementById('test2').test = 'Test 2';
            });
        });

        it('returns a property value for the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getProperty(
                        'input',
                        'test'
                    );
                }),
                'Test 1'
            );
        });

        it('returns undefined for an undefined property', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getProperty(
                        'input',
                        'invalid'
                    );
                }),
                undefined
            );
        });

        it('returns undefined for empty nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getProperty(
                        '#invalid',
                        'test'
                    );
                }),
                undefined
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getProperty(
                        document.getElementById('test1'),
                        'test'
                    );
                }),
                'Test 1'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getProperty(
                        document.body.children,
                        'test'
                    );
                }),
                'Test 1'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getProperty(
                        document.querySelectorAll('input'),
                        'test'
                    );
                }),
                'Test 1'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getProperty(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        'test'
                    );
                }),
                'Test 1'
            );
        });

    });

    describe('#getText', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="test1"><span>Test</span></div>' +
                    '<div id="test2"></div>';
            });
        });

        it('returns the text contents of the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getText(
                        'div'
                    );
                }),
                'Test'
            );
        });

        it('returns undefined for empty nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getText(
                        '#invalid'
                    );
                }),
                undefined
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getText(
                        document.getElementById('test1')
                    );
                }),
                'Test'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getText(
                        document.body.children
                    );
                }),
                'Test'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getText(
                        document.querySelectorAll('div')
                    );
                }),
                'Test'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getText(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ]
                    );
                }),
                'Test'
            );
        });

    });

    describe('#getValue', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<input type="text" id="test1" value="Test 1">' +
                    '<input type="number" id="test2">' +
                    '<textarea id="test3">Test 2</textarea>' +
                    '<select id="test4"><option value="1">1</option><option value="2" selected>2</option></select>' +
                    '<select id="test5"><option value="3">3</option><option value="4" selected>4</option></select>';
            });
        });

        it('returns the input value of the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getValue(
                        'input'
                    );
                }),
                'Test 1'
            );
        });

        it('returns undefined for empty nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getValue(
                        '#invalid'
                    );
                }),
                undefined
            );
        });

        it('works with textarea input nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getValue(
                        'textarea'
                    );
                }),
                'Test 2'
            );
        });

        it('works with select input nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getValue(
                        'select'
                    );
                }),
                '2'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getValue(
                        document.getElementById('test1')
                    );
                }),
                'Test 1'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getValue(
                        document.body.children
                    );
                }),
                'Test 1'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getValue(
                        document.querySelectorAll('input')
                    );
                }),
                'Test 1'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getValue(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ]
                    );
                }),
                'Test 1'
            );
        });

    });

    describe('#removeAttribute', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<input type="text" id="test1" disabled>' +
                    '<input type="number" id="test2" disabled>';
            });
        });

        it('removes an attribute for all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeAttribute(
                        'input',
                        'disabled'
                    );
                    return document.body.innerHTML;
                }),
                '<input type="text" id="test1">' +
                '<input type="number" id="test2">'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeAttribute(
                        document.getElementById('test1'),
                        'disabled'
                    );
                    return document.body.innerHTML;
                }),
                '<input type="text" id="test1">' +
                '<input type="number" id="test2" disabled="">'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeAttribute(
                        document.body.children,
                        'disabled'
                    );
                    return document.body.innerHTML;
                }),
                '<input type="text" id="test1">' +
                '<input type="number" id="test2">'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeAttribute(
                        document.querySelectorAll('input'),
                        'disabled'
                    );
                    return document.body.innerHTML;
                }),
                '<input type="text" id="test1">' +
                '<input type="number" id="test2">'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeAttribute(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        'disabled'
                    );
                    return document.body.innerHTML;
                }),
                '<input type="text" id="test1">' +
                '<input type="number" id="test2">'
            );
        });

    });

    describe('#removeProperty', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<input type="checkbox" id="test1">' +
                    '<input type="checkbox" id="test2">';
                document.getElementById('test1').test = 'Test 1';
                document.getElementById('test2').test = 'Test 2';
            });
        });

        it('removes a property for all nodes', async function() {
            const result = await exec(_ => {
                dom.removeProperty(
                    'input',
                    'test'
                );
                return [
                    document.getElementById('test1').test,
                    document.getElementById('test2').test
                ];
            });

            assert.deepEqual(
                result,
                [
                    null,
                    null
                ]
            );
        });

        it('works with HTMLElement nodes', async function() {
            const result = await exec(_ => {
                const element = document.getElementById('test1');
                dom.removeProperty(
                    element,
                    'test'
                );
                return [
                    element.test,
                    document.getElementById('test2').test
                ];
            });

            assert.deepEqual(
                result,
                [
                    null,
                    'Test 2'
                ]
            );
        });

        it('works with HTMLCollection nodes', async function() {
            const result = await exec(_ => {
                dom.removeProperty(
                    document.body.children,
                    'test'
                );
                return [
                    document.getElementById('test1').test,
                    document.getElementById('test2').test
                ];
            });

            assert.deepEqual(
                result,
                [
                    null,
                    null
                ]
            );
        });

        it('works with NodeList nodes', async function() {
            const result = await exec(_ => {
                dom.removeProperty(
                    document.querySelectorAll('input'),
                    'test'
                );
                return [
                    document.getElementById('test1').test,
                    document.getElementById('test2').test
                ];
            });

            assert.deepEqual(
                result,
                [
                    null,
                    null
                ]
            );
        });

        it('works with array nodes', async function() {
            const result = await exec(_ => {
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.removeProperty(
                    [
                        element1,
                        element2
                    ],
                    'test'
                );
                return [
                    element1.test,
                    element2.test
                ];
            });

            assert.deepEqual(
                result,
                [
                    null,
                    null
                ]
            );
        });

    });

    describe('#setAttribute', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<input type="number" id="test1">' +
                    '<input type="number" id="test2">';
            });
        });

        it('sets an attributes object for all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setAttribute(
                        'input',
                        {
                            min: '1',
                            max: '10'
                        }
                    );
                    return document.body.innerHTML;
                }),
                '<input type="number" id="test1" min="1" max="10">' +
                '<input type="number" id="test2" min="1" max="10">'
            );
        });

        it('sets an attribute for all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setAttribute(
                        'input',
                        'placeholder',
                        '123'
                    );
                    return document.body.innerHTML;
                }),
                '<input type="number" id="test1" placeholder="123">' +
                '<input type="number" id="test2" placeholder="123">'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setAttribute(
                        document.getElementById('test1'),
                        'placeholder',
                        '123'
                    );
                    return document.body.innerHTML;
                }),
                '<input type="number" id="test1" placeholder="123">' +
                '<input type="number" id="test2">'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setAttribute(
                        document.body.children,
                        'placeholder',
                        '123'
                    );
                    return document.body.innerHTML;
                }),
                '<input type="number" id="test1" placeholder="123">' +
                '<input type="number" id="test2" placeholder="123">'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setAttribute(
                        document.querySelectorAll('input'),
                        'placeholder',
                        '123'
                    );
                    return document.body.innerHTML;
                }),
                '<input type="number" id="test1" placeholder="123">' +
                '<input type="number" id="test2" placeholder="123">'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setAttribute(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        'placeholder',
                        '123'
                    );
                    return document.body.innerHTML;
                }),
                '<input type="number" id="test1" placeholder="123">' +
                '<input type="number" id="test2" placeholder="123">'
            );
        });

    });

    describe('#setHTML', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="test1">' +
                    '<div><span id="inner">Test 1</span></div>' +
                    '</div>' +
                    '<div id="test2"></div>';
            });
        });

        it('sets the HTML contents for all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setHTML(
                        'div',
                        '<span>Test 2</span>'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1"><span>Test 2</span></div>' +
                '<div id="test2"><span>Test 2</span></div>'
            );
        });

        it('removes data for all previous descendents', async function() {
            assert.equal(
                await exec(_ => {
                    const element = document.getElementById('inner');
                    dom.setData(
                        element,
                        'test',
                        'Test 1'
                    );
                    dom.setHTML(
                        'div',
                        '<span>Test 2</span>'
                    );
                    return dom.getData(
                        element,
                        'test'
                    );
                }),
                undefined
            );
        });

        it('removes events for all previous descendents', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click');
                    const element = document.getElementById('inner');
                    let result = 0;
                    dom.addEvent(
                        element,
                        'click',
                        _ => { result++; }
                    );
                    dom.setHTML(
                        'div',
                        '<span>Test 2</span>'
                    );
                    document.body.appendChild(element);
                    element.dispatchEvent(event);
                    return result;
                }),
                0
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setHTML(
                        document.getElementById('test1'),
                        '<span>Test 2</span>'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1"><span>Test 2</span></div>' +
                '<div id="test2"></div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setHTML(
                        document.body.children,
                        '<span>Test 2</span>'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1"><span>Test 2</span></div>' +
                '<div id="test2"><span>Test 2</span></div>'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setHTML(
                        document.querySelectorAll('div'),
                        '<span>Test 2</span>'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1"><span>Test 2</span></div>' +
                '<div id="test2"><span>Test 2</span></div>'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setHTML(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        '<span>Test 2</span>'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1"><span>Test 2</span></div>' +
                '<div id="test2"><span>Test 2</span></div>'
            );
        });

    });

    describe('#setProperty', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<input type="text" id="test1">' +
                    '<input type="number" id="test2">';
            });
        });

        it('sets a properties object for all nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    dom.setProperty(
                        'input',
                        {
                            test1: 'Test 1',
                            test2: 'Test 2'
                        }
                    );
                    return [
                        element1.test1,
                        element1.test2,
                        element2.test1,
                        element2.test2
                    ];
                }),
                [
                    'Test 1',
                    'Test 2',
                    'Test 1',
                    'Test 2'
                ]
            );
        });

        it('sets a property for all nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setProperty(
                        'input',
                        'test',
                        'Test'
                    );
                    return [
                        document.getElementById('test1').test,
                        document.getElementById('test2').test
                    ];
                }),
                [
                    'Test',
                    'Test'
                ]
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const element = document.getElementById('test1');
                    dom.setProperty(
                        element,
                        'test',
                        'Test'
                    );
                    return [
                        element.test,
                        document.getElementById('test2').test
                    ];
                }),
                [
                    'Test',
                    null
                ]
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setProperty(
                        document.body.children,
                        'test',
                        'Test'
                    );
                    return [
                        document.getElementById('test1').test,
                        document.getElementById('test2').test
                    ];
                }),
                [
                    'Test',
                    'Test'
                ]
            );
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setProperty(
                        document.querySelectorAll('input'),
                        'test',
                        'Test'
                    );
                    return [
                        document.getElementById('test1').test,
                        document.getElementById('test2').test
                    ];
                }),
                [
                    'Test',
                    'Test'
                ]
            );
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    dom.setProperty(
                        [
                            element1,
                            element2
                        ],
                        'test',
                        'Test'
                    );
                    return [
                        element1.test,
                        element2.test
                    ];
                }),
                [
                    'Test',
                    'Test'
                ]
            );
        });

    });

    describe('#setText', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="test1">' +
                    '<div><span id="inner">Test 1</span></div>' +
                    '</div>' +
                    '<div id="test2"></div>';
            });
        });

        it('sets the text contents for all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setText(
                        'div',
                        'Test 2'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1">Test 2</div>' +
                '<div id="test2">Test 2</div>'
            );
        });

        it('escapes HTML strings', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setText(
                        document.getElementById('test1'),
                        '<span>Test 2</span>'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1">&lt;span&gt;Test 2&lt;/span&gt;</div>' +
                '<div id="test2"></div>'
            );
        });

        it('removes data for all previous descendents', async function() {
            assert.equal(
                await exec(_ => {
                    const element = document.getElementById('inner');
                    dom.setData(
                        element,
                        'test',
                        'Test 1'
                    );
                    dom.setText(
                        'div',
                        'Test 2'
                    );
                    return dom.getData(
                        element,
                        'test'
                    );
                }),
                undefined
            );
        });

        it('removes events for all previous descendents', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click');
                    const element = document.getElementById('inner');
                    let result = 0;
                    dom.addEvent(
                        element,
                        'click',
                        _ => { result++; }
                    );
                    dom.setText(
                        'div',
                        'Test 2'
                    );
                    document.body.appendChild(element);
                    element.dispatchEvent(event);
                    return result;
                }),
                0
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setText(
                        document.getElementById('test1'),
                        'Test 2'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1">Test 2</div>' +
                '<div id="test2"></div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setText(
                        document.body.children,
                        'Test 2'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1">Test 2</div>' +
                '<div id="test2">Test 2</div>'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setText(
                        document.querySelectorAll('div'),
                        'Test 2'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1">Test 2</div>' +
                '<div id="test2">Test 2</div>'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setText(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
                        'Test 2'
                    );
                    return document.body.innerHTML;
                }),
                '<div id="test1">Test 2</div>' +
                '<div id="test2">Test 2</div>'
            );
        });

    });

    describe('#setValue', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<input type="text" id="test1">' +
                    '<input type="text" id="test2">' +
                    '<textarea id="test3"></textarea>' +
                    '<select id="test4"><option value="1">1</option><option value="2">2</option></select>';
            });
        });

        it('sets the input value for all nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setValue(
                        'input',
                        'Test'
                    );
                    return [
                        document.getElementById('test1').value,
                        document.getElementById('test2').value
                    ]
                }),
                [
                    'Test',
                    'Test'
                ]
            );
        });

        it('works with textarea input nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setValue(
                        'textarea',
                        'Test'
                    );
                    return document.getElementById('test3').value;
                }),
                'Test'
            );
        });

        it('works with select input nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setValue(
                        'select',
                        2
                    );
                    return document.getElementById('test4').value;
                }),
                '2'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const element = document.getElementById('test1');
                    dom.setValue(
                        element,
                        'Test'
                    );
                    return [
                        element.value,
                        document.getElementById('test2').value
                    ]
                }),
                [
                    'Test',
                    ''
                ]
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setValue(
                        document.body.children,
                        'Test'
                    );
                    return [
                        document.getElementById('test1').value,
                        document.getElementById('test2').value
                    ]
                }),
                [
                    'Test',
                    'Test'
                ]
            );
        });

        it('works with NodeList nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setValue(
                        document.querySelectorAll('input'),
                        'Test'
                    );
                    return [
                        document.getElementById('test1').value,
                        document.getElementById('test2').value
                    ]
                }),
                [
                    'Test',
                    'Test'
                ]
            );
        });

        it('works with array nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    dom.setValue(
                        [
                            element1,
                            element2
                        ],
                        'Test'
                    );
                    return [
                        element1.value,
                        element2.value
                    ]
                }),
                [
                    'Test',
                    'Test'
                ]
            );
        });

    });

});