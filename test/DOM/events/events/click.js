const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#click', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>';
        });
    });

    it('triggers a click event on the first node', async function() {
        assert.equal(
            await exec(_ => {
                let result;
                const element = document.getElementById('test1');
                element.addEventListener('click', _ => {
                    result = true;
                });
                dom.click('a');
                return result;
            }),
            true
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result;
                const element = document.getElementById('test1');
                element.addEventListener('click', _ => {
                    result = true;
                });
                dom.click(
                    document.getElementById('test1')
                );
                return result;
            }),
            true
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result;
                const element = document.getElementById('test1');
                element.addEventListener('click', _ => {
                    result = true;
                });
                dom.click(
                    document.querySelectorAll('a')
                );
                return result;
            }),
            true
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result;
                const element = document.getElementById('test1');
                element.addEventListener('click', _ => {
                    result = true;
                });
                dom.click(
                    document.body.children
                );
                return result;
            }),
            true
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result;
                const element = document.getElementById('test1');
                element.addEventListener('click', _ => {
                    result = true;
                });
                dom.click([
                    document.getElementById('test1'),
                    document.getElementById('test2')
                ]);
                return result;
            }),
            true
        );
    });

});