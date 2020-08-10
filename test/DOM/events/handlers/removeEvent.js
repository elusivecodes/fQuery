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
                    'hover',
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

    it('removes all events of types from each node', async function() {
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
                    'click hover'
                );
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            0
        );
    });

    it('removes a specific event from each node', async function() {
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

    it('removes a namespaced event from each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback = _ => { result++; };
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    'a',
                    'click.test',
                    callback
                );
                dom.removeEvent(
                    'a',
                    'click'
                );
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            0
        );
    });

    it('removes namespaced events from each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback = _ => { result++; };
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    'a',
                    'click.test',
                    callback
                );
                dom.addEvent(
                    'a',
                    'hover.test',
                    callback
                );
                dom.removeEvent(
                    'a',
                    'click hover'
                );
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            0
        );
    });

    it('removes a deep namespaced event from each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback = _ => { result++; };
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    'a',
                    'click.test.deep',
                    callback
                );
                dom.removeEvent(
                    'a',
                    'click'
                );
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            0
        );
    });

    it('removes deep namespaced events from each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback = _ => { result++; };
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    'a',
                    'click.test.deep',
                    callback
                );
                dom.addEvent(
                    'a',
                    'hover.test.deep',
                    callback
                );
                dom.removeEvent(
                    'a',
                    'click hover'
                );
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            0
        );
    });

    it('removes a namespaced event with namespacing from each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback = _ => { result++; };
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    'a',
                    'click.test',
                    callback
                );
                dom.removeEvent(
                    'a',
                    'click.test'
                );
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            0
        );
    });

    it('removes namespaced events with namespacing from each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback = _ => { result++; };
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    'a',
                    'click.test',
                    callback
                );
                dom.addEvent(
                    'a',
                    'hover.test',
                    callback
                );
                dom.removeEvent(
                    'a',
                    'click.test hover.test'
                );
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            0
        );
    });

    it('removes a deep namespaced event with namespacing from each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback = _ => { result++; };
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    'a',
                    'click.test.deep',
                    callback
                );
                dom.removeEvent(
                    'a',
                    'click.test'
                );
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            0
        );
    });

    it('removes deep namespaced events with namespacing from each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback = _ => { result++; };
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    'a',
                    'click.test.deep',
                    callback
                );
                dom.addEvent(
                    'a',
                    'hover.test.deep',
                    callback
                );
                dom.removeEvent(
                    'a',
                    'click.test hover.test'
                );
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            0
        );
    });

    it('removes a deep namespaced event with deep namespacing from each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback = _ => { result++; };
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    'a',
                    'click.test.deep',
                    callback
                );
                dom.removeEvent(
                    'a',
                    'click.test.deep'
                );
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            0
        );
    });

    it('removes deep namespaced events with deep namespacing from each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback = _ => { result++; };
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    'a',
                    'click.test.deep',
                    callback
                );
                dom.addEvent(
                    'a',
                    'hover.test.deep',
                    callback
                );
                dom.removeEvent(
                    'a',
                    'click.test.deep hover.test.deep'
                );
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            0
        );
    });

    it('does not remove a specific event of the wrong type from each node', async function() {
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
                    'hover',
                    callback1
                );
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            4
        );
    });

    it('does not remove an event without namespacing from each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback = _ => { result++; };
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    'a',
                    'click',
                    callback
                );
                dom.removeEvent(
                    'a',
                    'click.test'
                );
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            2
        );
    });

    it('does not remove events without namespacing from each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback = _ => { result++; };
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    'a',
                    'click',
                    callback
                );
                dom.addEvent(
                    'a',
                    'hover',
                    callback
                );
                dom.removeEvent(
                    'a',
                    'click.test hover.test'
                );
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            4
        );
    });

    it('does not remove a namespaced event with deep namespacing from each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback = _ => { result++; };
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    'a',
                    'click.test',
                    callback
                );
                dom.removeEvent(
                    'a',
                    'click.test.deep'
                );
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            2
        );
    });

    it('does not remove namespaced events with deep namespacing from each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback = _ => { result++; };
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    'a',
                    'click.test',
                    callback
                );
                dom.addEvent(
                    'a',
                    'hover.test',
                    callback
                );
                dom.removeEvent(
                    'a',
                    'click.test.deep hover.test.deep'
                );
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
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