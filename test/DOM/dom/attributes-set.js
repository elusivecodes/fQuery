const assert = require('assert').strict;
const exec = require('../../setup');

describe('DOM Attributes (Set)', function() {

    describe('#setAttribute', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML = '<input type="number" id="test1">' +
                    '<input type="number" id="test2">';
            });
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

        it('works with HTMLElement', async function() {
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

        it('works with HTMLCollection', async function() {
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

        it('works with NodeList', async function() {
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

        it('works with array', async function() {
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
                document.body.innerHTML = '<div id="test1"><div><span id="inner">Test 1</span></div></div>' +
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

        it('works with HTMLElement', async function() {
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

        it('works with HTMLCollection', async function() {
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

        it('works with NodeList', async function() {
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

        it('works with array', async function() {
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

        it('removes data for all previous descendents');

    });

    describe('#setProperty', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML = '<input type="text" id="test1">' +
                    '<input type="number" id="test2">';
            });
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

        it('sets a properties object for all nodes', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setProperty(
                        '#test1',
                        {
                            test1: 'Test 1',
                            test2: 'Test 2'
                        }
                    );
                    return [
                        document.getElementById('test1').test1,
                        document.getElementById('test1').test2
                    ];
                }),
                [
                    'Test 1',
                    'Test 2'
                ]
            );
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setProperty(
                        document.getElementById('test1'),
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
                    null
                ]
            );
        });

        it('works with HTMLCollection', async function() {
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

        it('works with NodeList', async function() {
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

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setProperty(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
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

    });

    describe('#setText', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML = '<div id="test1"><div><span id="inner">Test 1</span></div></div>' +
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

        it('works with HTMLElement', async function() {
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

        it('works with HTMLCollection', async function() {
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

        it('works with NodeList', async function() {
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

        it('works with array', async function() {
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

        it('removes data for all previous descendents');

    });

    describe('#setValue', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML = '<input type="text" id="test1">' +
                    '<input type="text" id="test2">';
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
            )
        });

        it('works with textarea inputs', async function() {
            assert.equal(
                await exec(_ => {
                    document.body.innerHTML = '<textarea id="test1"></textarea>';
                    dom.setValue(
                        'textarea',
                        'Test'
                    );
                    return document.getElementById('test1').value
                }),
                'Test'
            );
        });

        it('works with select inputs', async function() {
            assert.equal(
                await exec(_ => {
                    document.body.innerHTML = '<select id="test1"><option value="1">1</option><option value="2">2</option></select>';
                    dom.setValue(
                        'select',
                        2
                    );
                    return document.getElementById('test1').value
                }),
                '2'
            );
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setValue(
                        document.getElementById('test1'),
                        'Test'
                    );
                    return [
                        document.getElementById('test1').value,
                        document.getElementById('test2').value
                    ]
                }),
                [
                    'Test',
                    ''
                ]
            )
        });

        it('works with HTMLCollection', async function() {
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
            )
        });

        it('works with NodeList', async function() {
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
            )
        });

        it('works with array', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setValue(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ],
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
            )
        });

    });

});