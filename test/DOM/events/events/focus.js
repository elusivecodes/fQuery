const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#focus', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<input type="text" id="test1">' +
                '<input type="text" id="test2">';
        });
    });

    it('triggers a focus event on the first node', async function() {
        assert.equal(
            await exec(_ => {
                let result;
                const element = document.getElementById('test1');
                element.addEventListener('focus', _ => {
                    result = true;
                });
                dom.focus('input');
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
                element.addEventListener('focus', _ => {
                    result = true;
                });
                dom.focus(
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
                element.addEventListener('focus', _ => {
                    result = true;
                });
                dom.focus(
                    document.querySelectorAll('input')
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
                element.addEventListener('focus', _ => {
                    result = true;
                });
                dom.focus(
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
                element.addEventListener('focus', _ => {
                    result = true;
                });
                dom.focus([
                    document.getElementById('test1'),
                    document.getElementById('test2')
                ]);
                return result;
            }),
            true
        );
    });

});