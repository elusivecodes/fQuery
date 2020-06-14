const assert = require('assert').strict;
const { exec } = require('../../../setup');

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