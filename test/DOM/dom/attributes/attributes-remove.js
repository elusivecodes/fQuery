const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Attributes (Remove)', function() {

    describe('#removeAttribute', function() {

        beforeEach(async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<input type="text" id="test1" disabled><input type="number" id="test2" disabled>'
                );
            });
        });

        it('removes an attribute for all nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeAttribute(
                        'input',
                        'disabled'
                    );
                    return dom.getHTML(document.body);
                }),
                '<input type="text" id="test1"><input type="number" id="test2">'
            );
        });

        it('works with HTMLElement', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeAttribute(
                        dom.findOne('#test1'),
                        'disabled'
                    );
                    return dom.getHTML(document.body);
                }),
                '<input type="text" id="test1"><input type="number" id="test2" disabled="">'
            );
        });

        it('works with HTMLCollection', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeAttribute(
                        document.body.children,
                        'disabled'
                    );
                    return dom.getHTML(document.body);
                }),
                '<input type="text" id="test1"><input type="number" id="test2">'
            );
        });

        it('works with NodeList', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeAttribute(
                        document.querySelectorAll('input'),
                        'disabled'
                    );
                    return dom.getHTML(document.body);
                }),
                '<input type="text" id="test1"><input type="number" id="test2">'
            );
        });

        it('works with array', async function() {
            assert.equal(
                await exec(_ => {
                    dom.removeAttribute(
                        dom.find('input'),
                        'disabled'
                    );
                    return dom.getHTML(document.body);
                }),
                '<input type="text" id="test1"><input type="number" id="test2">'
            );
        });

    });

    describe('#removeProperty', function() {

        beforeEach(async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<input type="checkbox" id="test1"><input type="checkbox" id="test2">'
                );
                dom.setProperty('#test1', 'test', 'Test 1');
                dom.setProperty('#test2', 'test', 'Test 2');
            });
        });

        it('removes a property for all nodes', async function() {
            const result = await exec(_ => {
                dom.removeProperty(
                    'input',
                    'test'
                );
                return [
                    dom.getProperty('#test1', 'test'),
                    dom.getProperty('#test2', 'test')
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

        it('works with HTMLElement', async function() {
            const result = await exec(_ => {
                dom.removeProperty(
                    dom.findOne('#test1'),
                    'test'
                );
                return [
                    dom.getProperty('#test1', 'test'),
                    dom.getProperty('#test2', 'test')
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

        it('works with HTMLCollection', async function() {
            const result = await exec(_ => {
                dom.removeProperty(
                    document.body.children,
                    'test'
                );
                return [
                    dom.getProperty('#test1', 'test'),
                    dom.getProperty('#test2', 'test')
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

        it('works with NodeList', async function() {
            const result = await exec(_ => {
                dom.removeProperty(
                    document.querySelectorAll('input'),
                    'test'
                );
                return [
                    dom.getProperty('#test1', 'test'),
                    dom.getProperty('#test2', 'test')
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

        it('works with array', async function() {
            const result = await exec(_ => {
                dom.removeProperty(
                    dom.find('input'),
                    'test'
                );
                return [
                    dom.getProperty('#test1', 'test'),
                    dom.getProperty('#test2', 'test')
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

});