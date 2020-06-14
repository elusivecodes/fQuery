const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#removeEventDelegate', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent1">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>';
        });
    });

    it('removes all delegated events from each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback1 = _ => { result++; };
                const callback2 = _ => { result++; };
                const event1 = new Event('click', {
                    bubbles: true
                });
                const event2 = new Event('hover', {
                    bubbles: true
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                dom.addEventDelegate(
                    'div',
                    'click',
                    'a',
                    callback1
                );
                dom.addEventDelegate(
                    'div',
                    'click',
                    'a',
                    callback2
                );
                dom.addEventDelegate(
                    'div',
                    'hover',
                    'a',
                    callback1
                );
                dom.removeEventDelegate(
                    'div',
                    null,
                    'a'
                );
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                element3.dispatchEvent(event1);
                element3.dispatchEvent(event2);
                element4.dispatchEvent(event1);
                element4.dispatchEvent(event2);
                return result;
            }),
            0
        );
    });

    it('removes all delegated events of a type from each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback1 = _ => { result++; };
                const callback2 = _ => { result++; };
                const event1 = new Event('click', {
                    bubbles: true
                });
                const event2 = new Event('hover', {
                    bubbles: true
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                dom.addEventDelegate(
                    'div',
                    'click',
                    'a',
                    callback1
                );
                dom.addEventDelegate(
                    'div',
                    'click',
                    'a',
                    callback2
                );
                dom.addEventDelegate(
                    'div',
                    'hover',
                    'a',
                    callback1
                );
                dom.removeEventDelegate(
                    'div',
                    'click',
                    'a'
                );
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                element3.dispatchEvent(event1);
                element3.dispatchEvent(event2);
                element4.dispatchEvent(event1);
                element4.dispatchEvent(event2);
                return result;
            }),
            4
        );
    });

    it('removes a delegated event from each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback1 = _ => { result++; };
                const callback2 = _ => { result++; };
                const event = new Event('click', {
                    bubbles: true
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                dom.addEventDelegate(
                    'div',
                    'click',
                    'a',
                    callback1
                );
                dom.addEventDelegate(
                    'div',
                    'click',
                    'a',
                    callback2
                );
                dom.removeEventDelegate(
                    'div',
                    'click',
                    'a',
                    callback1
                );
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element3.dispatchEvent(event);
                element4.dispatchEvent(event);
                return result;
            }),
            4
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback1 = _ => { result++; };
                const callback2 = _ => { result++; };
                const event = new Event('click', {
                    bubbles: true
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                dom.addEventDelegate(
                    'div',
                    'click',
                    'a',
                    callback1
                );
                dom.addEventDelegate(
                    'div',
                    'click',
                    'a',
                    callback2
                );
                dom.removeEventDelegate(
                    document.getElementById('parent1'),
                    'click',
                    'a',
                    callback1
                );
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element3.dispatchEvent(event);
                element4.dispatchEvent(event);
                return result;
            }),
            6
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback1 = _ => { result++; };
                const callback2 = _ => { result++; };
                const event = new Event('click', {
                    bubbles: true
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                dom.addEventDelegate(
                    'div',
                    'click',
                    'a',
                    callback1
                );
                dom.addEventDelegate(
                    'div',
                    'click',
                    'a',
                    callback2
                );
                dom.removeEventDelegate(
                    document.querySelectorAll('div'),
                    'click',
                    'a',
                    callback1
                );
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element3.dispatchEvent(event);
                element4.dispatchEvent(event);
                return result;
            }),
            4
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback1 = _ => { result++; };
                const callback2 = _ => { result++; };
                const event = new Event('click', {
                    bubbles: true
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                dom.addEventDelegate(
                    'div',
                    'click',
                    'a',
                    callback1
                );
                dom.addEventDelegate(
                    'div',
                    'click',
                    'a',
                    callback2
                );
                dom.removeEventDelegate(
                    document.body.children,
                    'click',
                    'a',
                    callback1
                );
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element3.dispatchEvent(event);
                element4.dispatchEvent(event);
                return result;
            }),
            4
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback1 = _ => { result++; };
                const callback2 = _ => { result++; };
                const event = new Event('click', {
                    bubbles: true
                });
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const a = document.createElement('a');
                shadow.appendChild(a);
                dom.addEventDelegate(
                    shadow,
                    'click',
                    'a',
                    callback1
                );
                dom.addEventDelegate(
                    shadow,
                    'click',
                    'a',
                    callback2
                );
                dom.removeEventDelegate(
                    shadow,
                    'click',
                    'a',
                    callback1
                );
                a.dispatchEvent(event);
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
                const event = new Event('click', {
                    bubbles: true
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                dom.addEventDelegate(
                    document,
                    'click',
                    'a',
                    callback1
                );
                dom.addEventDelegate(
                    document,
                    'click',
                    'a',
                    callback2
                );
                dom.removeEventDelegate(
                    document,
                    'click',
                    'a',
                    callback1
                );
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element3.dispatchEvent(event);
                element4.dispatchEvent(event);
                return result;
            }),
            4
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback1 = _ => { result++; };
                const callback2 = _ => { result++; };
                const event = new Event('click', {
                    bubbles: true
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                dom.addEventDelegate(
                    'div',
                    'click',
                    'a',
                    callback1
                );
                dom.addEventDelegate(
                    'div',
                    'click',
                    'a',
                    callback2
                );
                dom.removeEventDelegate(
                    [
                        document.getElementById('parent1'),
                        document.getElementById('parent2')
                    ],
                    'click',
                    'a',
                    callback1
                );
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element3.dispatchEvent(event);
                element4.dispatchEvent(event);
                return result;
            }),
            4
        );
    });

});