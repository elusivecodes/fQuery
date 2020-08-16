const assert = require('assert').strict;
const { exec } = require('../../../setup');

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
                dom.setAttribute('input', {
                    min: '1',
                    max: '10'
                });
                return document.body.innerHTML;
            }),
            '<input type="number" id="test1" min="1" max="10">' +
            '<input type="number" id="test2" min="1" max="10">'
        );
    });

    it('sets an attribute for all nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setAttribute('input', 'placeholder', '123');
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

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setAttribute([
                    document.getElementById('test1'),
                    document.getElementById('test2')
                ], 'placeholder', '123');
                return document.body.innerHTML;
            }),
            '<input type="number" id="test1" placeholder="123">' +
            '<input type="number" id="test2" placeholder="123">'
        );
    });

});