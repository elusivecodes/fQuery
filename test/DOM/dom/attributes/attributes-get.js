const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Attributes (Get)', function() {

    describe('#getAttribute', function() {

        beforeEach(async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<input type="text" id="test1"><input type="number" id="test2">'
                );
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
                        dom.findOne('#test1'),
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
                        dom.find('input'),
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
                dom.setHTML(
                    document.body,
                    '<div id="test1"><span>Test</span></div><div id="test2"></div>'
                );
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
                        dom.findOne('#test1')
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
                        dom.find('div')
                    );
                }),
                '<span>Test</span>'
            );
        });
    });

    describe('#getProperty', function() {

        beforeEach(async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<input type="text" id="test1"><input type="number" id="test2">'
                );
                dom.setProperty('#test1', 'test', 'Test 1');
                dom.setProperty('#test2', 'test', 'Test 2');
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
                        dom.findOne('#test1'),
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
                        dom.find('input'),
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
                dom.setHTML(
                    document.body,
                    '<div id="test1"><span>Test</span></div><div id="test2"></div>'
                );
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
                        dom.findOne('#test1')
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
                        dom.find('div')
                    );
                }),
                'Test'
            );
        });
    });

    describe('#getValue', function() {

        beforeEach(async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<input type="text" id="test1" value="Test"><input type="number" id="test2"><textarea id="test3">Test</textarea><select id="test4"><option value="1">1</option><option value="2" selected>2</option></select><select id="test5"><option value="3">3</option><option value="4" selected>4</option></select>'
                );
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

        it('works with textarea inputs', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getValue(
                        'textarea'
                    );
                }),
                'Test'
            );
        });

        it('works with select inputs', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getValue(
                        'select'
                    );
                }),
                '2'
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.getValue(
                        dom.findOne('#test1')
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
                        dom.find('input')
                    );
                }),
                'Test'
            );
        });
    });

});