const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#triggerEvent', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>';
        });
    });

    it('triggers an event for each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'click',
                    _ => { result++; }
                );
                dom.triggerEvent(
                    'a',
                    'click'
                );
                return result;
            }),
            2
        );
    });

    it('triggers an event for each node with custom data', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'click',
                    e => {
                        if (e.test) {
                            result++;
                        }
                    }
                );
                dom.triggerEvent(
                    'a',
                    'click'
                );
                dom.triggerEvent(
                    'a',
                    'click',
                    { test: true }
                );
                return result;
            }),
            2
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'click',
                    _ => { result++; }
                );
                dom.triggerEvent(
                    document.getElementById('test1'),
                    'click'
                );
                return result;
            }),
            1
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'click',
                    _ => { result++; }
                );
                dom.triggerEvent(
                    document.querySelectorAll('a'),
                    'click'
                );
                return result;
            }),
            2
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'click',
                    _ => { result++; }
                );
                dom.triggerEvent(
                    document.body.children,
                    'click'
                );
                return result;
            }),
            2
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                dom.addEvent(
                    shadow,
                    'click',
                    _ => { result++; }
                );
                dom.triggerEvent(
                    shadow,
                    'click'
                );
                return result;
            }),
            1
        );
    });

    it('works with Document nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    document,
                    'click',
                    _ => { result++; }
                );
                dom.triggerEvent(
                    document,
                    'click'
                );
                return result;
            }),
            1
        );
    });

    it('works with Window nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    window,
                    'click',
                    _ => { result++; }
                );
                dom.triggerEvent(
                    window,
                    'click'
                );
                return result;
            }),
            1
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'click',
                    _ => { result++; }
                );
                dom.triggerEvent(
                    [
                        document.getElementById('test1'),
                        document.getElementById('test2')
                    ],
                    'click'
                );
                return result;
            }),
            2
        );
    });

});