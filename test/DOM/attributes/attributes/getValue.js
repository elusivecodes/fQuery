const assert = require('assert').strict;
const { exec } = require('../../../setup');

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
            await exec(_ =>
                dom.getValue('input')
            ),
            'Test 1'
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.getValue('#invalid')
            ),
            undefined
        );
    });

    it('works with textarea input nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.getValue('textarea')
            ),
            'Test 2'
        );
    });

    it('works with select input nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.getValue('select')
            ),
            '2'
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.getValue(
                    document.getElementById('test1')
                )
            ),
            'Test 1'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.getValue(
                    document.querySelectorAll('input')
                )
            ),
            'Test 1'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.getValue(
                    document.body.children
                )
            ),
            'Test 1'
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.getValue([
                    document.getElementById('test1'),
                    document.getElementById('test2')
                ])
            ),
            'Test 1'
        );
    });

});