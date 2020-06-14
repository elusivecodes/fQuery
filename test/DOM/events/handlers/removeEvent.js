const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#removeEvent', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>';
        });
    });

    it('removes all events from each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback1 = _ => { result++; };
                const callback2 = _ => { result++; };
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    'a',
                    'click',
                    callback1
                );
                dom.addEvent(
                    'a',
                    'click',
                    callback2
                );
                dom.removeEvent('a');
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            0
        );
    });

    it('removes all events of a type from each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback1 = _ => { result++; };
                const callback2 = _ => { result++; };
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    'a',
                    'click',
                    callback1
                );
                dom.addEvent(
                    'a',
                    'click',
                    callback2
                );
                dom.addEvent(
                    'a',
                    'hover',
                    callback1
                );
                dom.removeEvent(
                    'a',
                    'click'
                );
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            2
        );
    });

    it('removes an event from each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback1 = _ => { result++; };
                const callback2 = _ => { result++; };
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    'a',
                    'click',
                    callback1
                );
                dom.addEvent(
                    'a',
                    'click',
                    callback2
                );
                dom.removeEvent(
                    'a',
                    'click',
                    callback1
                );
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            2
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback1 = _ => { result++; };
                const callback2 = _ => { result++; };
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    'a',
                    'click',
                    callback1
                );
                dom.addEvent(
                    'a',
                    'click',
                    callback2
                );
                dom.removeEvent(
                    element1,
                    'click',
                    callback1
                );
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            3
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback1 = _ => { result++; };
                const callback2 = _ => { result++; };
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    'a',
                    'click',
                    callback1
                );
                dom.addEvent(
                    'a',
                    'click',
                    callback2
                );
                dom.removeEvent(
                    document.querySelectorAll('a'),
                    'click',
                    callback1
                );
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            2
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback1 = _ => { result++; };
                const callback2 = _ => { result++; };
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    'a',
                    'click',
                    callback1
                );
                dom.addEvent(
                    'a',
                    'click',
                    callback2
                );
                dom.removeEvent(
                    document.body.children,
                    'click',
                    callback1
                );
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            2
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback1 = _ => { result++; };
                const callback2 = _ => { result++; };
                const event = new Event('click');
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                dom.addEvent(
                    shadow,
                    'click',
                    callback1
                );
                dom.addEvent(
                    shadow,
                    'click',
                    callback2
                );
                dom.removeEvent(
                    shadow,
                    'click',
                    callback1
                );
                shadow.dispatchEvent(event);
                return result;
            }),
            1
        );
    });

    it('works with Document nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback1 = _ => { result++; };
                const callback2 = _ => { result++; };
                const event = new Event('click');
                dom.addEvent(
                    document,
                    'click',
                    callback1
                );
                dom.addEvent(
                    document,
                    'click',
                    callback2
                );
                dom.removeEvent(
                    document,
                    'click',
                    callback1
                );
                document.dispatchEvent(event);
                return result;
            }),
            1
        );
    });

    it('works with Window nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback1 = _ => { result++; };
                const callback2 = _ => { result++; };
                const event = new Event('click');
                dom.addEvent(
                    window,
                    'click',
                    callback1
                );
                dom.addEvent(
                    window,
                    'click',
                    callback2
                );
                dom.removeEvent(
                    window,
                    'click',
                    callback1
                );
                window.dispatchEvent(event);
                return result;
            }),
            1
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback1 = _ => { result++; };
                const callback2 = _ => { result++; };
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    'a',
                    'click',
                    callback1
                );
                dom.addEvent(
                    'a',
                    'click',
                    callback2
                );
                dom.removeEvent(
                    [
                        element1,
                        element2
                    ],
                    'click',
                    callback1
                );
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            2
        );
    });

});