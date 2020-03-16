const assert = require('assert').strict;
const exec = require('../../setup');

describe('DOM Attributes (Remove)', function() {

    describe('#removeAttribute', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML = '<input type="text" id="test1" disabled>' +
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

        it('works with HTMLElement', async function() {
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

        it('works with HTMLCollection', async function() {
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

        it('works with NodeList', async function() {
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

        it('works with array', async function() {
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
                document.body.innerHTML = '<input type="checkbox" id="test1">' +
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

        it('works with HTMLElement', async function() {
            const result = await exec(_ => {
                dom.removeProperty(
                    document.getElementById('test1'),
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

        it('works with NodeList', async function() {
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

        it('works with array', async function() {
            const result = await exec(_ => {
                dom.removeProperty(
                    [
                        document.getElementById('test1'),
                        document.getElementById('test2')
                    ],
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

    });

});