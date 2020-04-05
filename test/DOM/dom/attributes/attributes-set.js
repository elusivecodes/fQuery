const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Attributes (Set)', function() {

    describe('#setAttribute', function() {

        beforeEach(async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<input type="number" id="test1"><input type="number" id="test2">'
                );
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
                    return dom.getHTML(document.body);
                }),
                '<input type="number" id="test1" placeholder="123"><input type="number" id="test2" placeholder="123">'
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
                    return dom.getHTML(document.body);
                }),
                '<input type="number" id="test1" min="1" max="10"><input type="number" id="test2" min="1" max="10">'
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setAttribute(
                        dom.findOne('#test1'),
                        'placeholder',
                        '123'
                    );
                    return dom.getHTML(document.body);
                }),
                '<input type="number" id="test1" placeholder="123"><input type="number" id="test2">'
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
                    return dom.getHTML(document.body);
                }),
                '<input type="number" id="test1" placeholder="123"><input type="number" id="test2" placeholder="123">'
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
                    return dom.getHTML(document.body);
                }),
                '<input type="number" id="test1" placeholder="123"><input type="number" id="test2" placeholder="123">'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setAttribute(
                        dom.find('input'),
                        'placeholder',
                        '123'
                    );
                    return dom.getHTML(document.body);
                }),
                '<input type="number" id="test1" placeholder="123"><input type="number" id="test2" placeholder="123">'
            );
        });

    });

    describe('#setHTML', function() {

        beforeEach(async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<div id="test1"><div><span id="inner">Test 1</span></div></div><div id="test2"></div>'
                );
            });
        });

        it('sets the HTML contents for all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setHTML(
                        'div',
                        '<span>Test 2</span>'
                    );
                    return dom.getHTML(document.body);
                }),
                '<div id="test1"><span>Test 2</span></div><div id="test2"><span>Test 2</span></div>'
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setHTML(
                        dom.findOne('#test1'),
                        '<span>Test 2</span>'
                    );
                    return dom.getHTML(document.body);
                }),
                '<div id="test1"><span>Test 2</span></div><div id="test2"></div>'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setHTML(
                        document.body.children,
                        '<span>Test 2</span>'
                    );
                    return dom.getHTML(document.body);
                }),
                '<div id="test1"><span>Test 2</span></div><div id="test2"><span>Test 2</span></div>'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setHTML(
                        document.querySelectorAll('div'),
                        '<span>Test 2</span>'
                    );
                    return dom.getHTML(document.body);
                }),
                '<div id="test1"><span>Test 2</span></div><div id="test2"><span>Test 2</span></div>'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setHTML(
                        dom.find('div'),
                        '<span>Test 2</span>'
                    );
                    return dom.getHTML(document.body);
                }),
                '<div id="test1"><span>Test 2</span></div><div id="test2"><span>Test 2</span></div>'
            );
        });

        it('removes data for all previous descendents');

    });

    describe('#setProperty', function() {

        beforeEach(async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<input type="text" id="test1"><input type="number" id="test2">'
                );
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
                        dom.getProperty('#test1', 'test'),
                        dom.getProperty('#test2', 'test')
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
                        dom.getProperty('#test1', 'test1'),
                        dom.getProperty('#test1', 'test2')
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
                        dom.findOne('#test1'),
                        'test',
                        'Test'
                    );
                    return [
                        dom.getProperty('#test1', 'test'),
                        dom.getProperty('#test2', 'test')
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
                        dom.getProperty('#test1', 'test'),
                        dom.getProperty('#test2', 'test')
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
                        dom.getProperty('#test1', 'test'),
                        dom.getProperty('#test2', 'test')
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
                        dom.find('input'),
                        'test',
                        'Test'
                    );
                    return [
                        dom.getProperty('#test1', 'test'),
                        dom.getProperty('#test2', 'test')
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
                dom.setHTML(
                    document.body,
                    '<div id="test1"><div><span id="inner">Test 1</span></div></div><div id="test2"></div>'
                );
            });
        });

        it('sets the text contents for all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setText(
                        'div',
                        'Test 2'
                    );
                    return dom.getHTML(document.body);
                }),
                '<div id="test1">Test 2</div><div id="test2">Test 2</div>'
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setText(
                        dom.findOne('#test1'),
                        'Test 2'
                    );
                    return dom.getHTML(document.body);
                }),
                '<div id="test1">Test 2</div><div id="test2"></div>'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setText(
                        document.body.children,
                        'Test 2'
                    );
                    return dom.getHTML(document.body);
                }),
                '<div id="test1">Test 2</div><div id="test2">Test 2</div>'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setText(
                        document.querySelectorAll('div'),
                        'Test 2'
                    );
                    return dom.getHTML(document.body);
                }),
                '<div id="test1">Test 2</div><div id="test2">Test 2</div>'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setText(
                        dom.find('div'),
                        'Test 2'
                    );
                    return dom.getHTML(document.body);
                }),
                '<div id="test1">Test 2</div><div id="test2">Test 2</div>'
            );
        });

        it('escapes HTML strings', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setText(
                        dom.findOne('#test1'),
                        '<span>Test 2</span>'
                    );
                    return dom.getHTML(document.body);
                }),
                '<div id="test1">&lt;span&gt;Test 2&lt;/span&gt;</div><div id="test2"></div>'
            );
        });

        it('removes data for all previous descendents');

    });

    describe('#setValue', function() {

        beforeEach(async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<input type="text" id="test1"><input type="text" id="test2"><textarea id="test3"></textarea><select id="test4"><option value="1">1</option><option value="2">2</option></select>'
                );
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
                        dom.getValue('#test1'),
                        dom.getValue('#test2')
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
                    dom.setValue(
                        'textarea',
                        'Test'
                    );
                    return dom.getValue('#test3');
                }),
                'Test'
            );
        });

        it('works with select inputs', async function() {
            assert.equal(
                await exec(_ => {
                    dom.setValue(
                        'select',
                        2
                    );
                    return dom.getValue('#test4');
                }),
                '2'
            );
        });

        it('works with HTMLElement', async function() {
            assert.deepEqual(
                await exec(_ => {
                    dom.setValue(
                        dom.findOne('#test1'),
                        'Test'
                    );
                    return [
                        dom.getValue('#test1'),
                        dom.getValue('#test2')
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
                        dom.getValue('#test1'),
                        dom.getValue('#test2')
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
                        dom.getValue('#test1'),
                        dom.getValue('#test2')
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
                        dom.find('input'),
                        'Test'
                    );
                    return [
                        dom.getValue('#test1'),
                        dom.getValue('#test2')
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