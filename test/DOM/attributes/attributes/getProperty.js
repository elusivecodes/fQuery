const assert = require('assert').strict;
const { exec } = require('../../../setup');

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