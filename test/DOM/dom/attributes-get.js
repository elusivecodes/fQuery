const assert = require('assert').strict;
const exec = require('../../setup');

describe('DOM Attributes (Get)', function() {

    describe('#getAttribute', function() {
        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML = '<input type="text" id="test1"><input type="number" id="test2">';
            });
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

        it('returns an object with all attributes for the first node', async function() {
            assert.deepEqual(
                await exec(_ => {
                    return dom.getAttribute(
                        'input'
                    );
                }),
                {
                    type: 'text',
                    id: 'test1'
                }
            );
        });

        it('works with HTMLElement', async function() {
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

        it('works with HTMLCollection', async function() {
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

        it('works with NodeList', async function() {
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

        it('works with array', async function() {
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
                document.body.innerHTML = '<div id="test1"><span>Test</span></div><div id="test2"></div>';
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

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getHTML(
                        document.getElementById('test1')
                    );
                }),
                '<span>Test</span>'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getHTML(
                        document.body.children
                    );
                }),
                '<span>Test</span>'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getHTML(
                        document.querySelectorAll('div')
                    );
                }),
                '<span>Test</span>'
            );
        });

        it('works with array', async function() {
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
                document.body.innerHTML = '<input type="text" id="test1"><input type="number" id="test2">';
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

        it('works with HTMLElement', async function() {
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

        it('works with HTMLCollection', async function() {
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

        it('works with NodeList', async function() {
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

        it('works with array', async function() {
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
                document.body.innerHTML = '<div id="test1"><span>Test</span></div><div id="test2"></div>';
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

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getText(
                        document.getElementById('test1')
                    );
                }),
                'Test'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getText(
                        document.body.children
                    );
                }),
                'Test'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getText(
                        document.querySelectorAll('div')
                    );
                }),
                'Test'
            );
        });

        it('works with array', async function() {
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

    describe('#getValue (input)', function() {
        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML = '<input type="text" id="test1" value="Test"><input type="number" id="test2">';
            });
        });

        it('returns the input value of the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getValue(
                        'input'
                    );
                }),
                'Test'
            );
        });

        it('works with textarea inputs');

        it('works with select inputs', async function() {
            assert.equal(
                await exec(_ => {
                    document.body.innerHTML = '<select id="test1"><option value="1">1</option><option value="2" selected>2</option></select><select id="test2"><option value="3">3</option><option value="4" selected>4</option></select>';
                    return dom.getValue(
                        'select'
                    );
                }),
                '2'
            );
        });

        it('works with multiple select inputs');

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getValue(
                        document.getElementById('test1')
                    );
                }),
                'Test'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getValue(
                        document.body.children
                    );
                }),
                'Test'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getValue(
                        document.querySelectorAll('input')
                    );
                }),
                'Test'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getValue(
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

});