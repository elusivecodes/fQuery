const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Event Handlers', function() {

    describe('#addEvent', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<a href="#" id="test1">Test</a>' +
                    '<a href="#" id="test2">Test</a>';
            });
        });

        it('adds an event to each node', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click');
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    let result = 0;
                    dom.addEvent(
                        'a',
                        'click',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    return result;
                }),
                4
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click');
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    let result = 0;
                    dom.addEvent(
                        element1,
                        'click',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    return result;
                }),
                2
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click');
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    let result = 0;
                    dom.addEvent(
                        document.body.children,
                        'click',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    return result;
                }),
                4
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click');
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    let result = 0;
                    dom.addEvent(
                        document.querySelectorAll('a'),
                        'click',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    return result;
                }),
                4
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click');
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    let result = 0;
                    dom.addEvent(
                        [
                            element1,
                            element2
                        ],
                        'click',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    return result;
                }),
                4
            );
        });

    });

    describe('#addEventDelegate', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<a href="#" id="test1">Test</a>' +
                    '<span>' +
                    '<a href="#" id="test2">Test</a>' +
                    '</span>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<a href="#" id="test3">Test</a>' +
                    '<span>' +
                    '<a href="#" id="test4">Test</a>' +
                    '</span>' +
                    '</div>';
            });
        });

        it('adds a delegated event to each node', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click', {
                        bubbles: true
                    });
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    const element3 = document.getElementById('test3');
                    const element4 = document.getElementById('test4');
                    let result = 0;
                    dom.addEventDelegate(
                        'div',
                        'click',
                        'a',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    return result;
                }),
                8
            );
        });

        it('adds a delegated event to each node with custom child selector', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click', {
                        bubbles: true
                    });
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    const element3 = document.getElementById('test3');
                    const element4 = document.getElementById('test4');
                    let result = 0;
                    dom.addEventDelegate(
                        'div',
                        'click',
                        '> a',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    return result;
                }),
                4
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click', {
                        bubbles: true
                    });
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    const element3 = document.getElementById('test3');
                    const element4 = document.getElementById('test4');
                    let result = 0;
                    dom.addEventDelegate(
                        document.getElementById('parent1'),
                        'click',
                        'a',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    return result;
                }),
                4
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click', {
                        bubbles: true
                    });
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    const element3 = document.getElementById('test3');
                    const element4 = document.getElementById('test4');
                    let result = 0;
                    dom.addEventDelegate(
                        document.body.children,
                        'click',
                        'a',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    return result;
                }),
                8
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click', {
                        bubbles: true
                    });
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    const element3 = document.getElementById('test3');
                    const element4 = document.getElementById('test4');
                    let result = 0;
                    dom.addEventDelegate(
                        document.querySelectorAll('div'),
                        'click',
                        'a',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    return result;
                }),
                8
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click', {
                        bubbles: true
                    });
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    const element3 = document.getElementById('test3');
                    const element4 = document.getElementById('test4');
                    let result = 0;
                    dom.addEventDelegate(
                        [
                            document.getElementById('parent1'),
                            document.getElementById('parent2')
                        ],
                        'click',
                        'a',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    return result;
                }),
                8
            );
        });

    });

    describe('#addEventDelegateOnce', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="parent1">' +
                    '<a href="#" id="test1">Test</a>' +
                    '<span>' +
                    '<a href="#" id="test2">Test</a>' +
                    '</span>' +
                    '</div>' +
                    '<div id="parent2">' +
                    '<a href="#" id="test3">Test</a>' +
                    '<span>' +
                    '<a href="#" id="test4">Test</a>' +
                    '</span>' +
                    '</div>';
            });
        });

        it('adds a self-destructing delegated event to each node', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click', {
                        bubbles: true
                    });
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    const element3 = document.getElementById('test3');
                    const element4 = document.getElementById('test4');
                    let result = 0;
                    dom.addEventDelegateOnce(
                        'div',
                        'click',
                        'a',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    return result;
                }),
                2
            );
        });

        it('adds a self-destructing delegated event to each node with custom child selector', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click', {
                        bubbles: true
                    });
                    const element1 = document.getElementById('test1');
                    const element4 = document.getElementById('test4');
                    let result = 0;
                    dom.addEventDelegateOnce(
                        'div',
                        'click',
                        '> a',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    return result;
                }),
                1
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click', {
                        bubbles: true
                    });
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    const element3 = document.getElementById('test3');
                    const element4 = document.getElementById('test4');
                    let result = 0;
                    dom.addEventDelegateOnce(
                        document.getElementById('parent1'),
                        'click',
                        'a',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    return result;
                }),
                1
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click', {
                        bubbles: true
                    });
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    const element3 = document.getElementById('test3');
                    const element4 = document.getElementById('test4');
                    let result = 0;
                    dom.addEventDelegateOnce(
                        document.body.children,
                        'click',
                        'a',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    return result;
                }),
                2
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click', {
                        bubbles: true
                    });
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    const element3 = document.getElementById('test3');
                    const element4 = document.getElementById('test4');
                    let result = 0;
                    dom.addEventDelegateOnce(
                        document.querySelectorAll('div'),
                        'click',
                        'a',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    return result;
                }),
                2
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click', {
                        bubbles: true
                    });
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    const element3 = document.getElementById('test3');
                    const element4 = document.getElementById('test4');
                    let result = 0;
                    dom.addEventDelegateOnce(
                        [
                            document.getElementById('parent1'),
                            document.getElementById('parent2')
                        ],
                        'click',
                        'a',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element3.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    element4.dispatchEvent(event);
                    return result;
                }),
                2
            );
        });

    });

    describe('#addEventOnce', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<a href="#" id="test1">Test</a>' +
                    '<a href="#" id="test2">Test</a>';
            });
        });

        it('adds a self-destrucing event to each node', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click');
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    let result = 0;
                    dom.addEventOnce(
                        'a',
                        'click',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    return result;
                }),
                2
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click');
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    let result = 0;
                    dom.addEventOnce(
                        element1,
                        'click',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    return result;
                }),
                1
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click');
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    let result = 0;
                    dom.addEventOnce(
                        document.body.children,
                        'click',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    return result;
                }),
                2
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click');
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    let result = 0;
                    dom.addEventOnce(
                        document.querySelectorAll('a'),
                        'click',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    return result;
                }),
                2
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click');
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    let result = 0;
                    dom.addEventOnce(
                        [
                            element1,
                            element2
                        ],
                        'click',
                        _ => { result++; }
                    );
                    element1.dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    return result;
                }),
                2
            );
        });

    });

    describe('#cloneEvents', function() {

        it('clones all events from all elements to all other elements');
        it('works with HTMLElement nodes');
        it('works with HTMLCollection nodes');
        it('works with NodeList nodes');
        it('works with array nodes');
        it('works with HTMLElement other nodes');
        it('works with HTMLCollection other nodes');
        it('works with NodeList other nodes');
        it('works with array other nodes');

    });

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
                    const event1 = new Event('click');
                    const event2 = new Event('hover');
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    let result = 0;
                    const callback1 = _ => { result++; };
                    const callback2 = _ => { result++; };
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
                    const event1 = new Event('click');
                    const event2 = new Event('hover');
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    let result = 0;
                    const callback1 = _ => { result++; };
                    const callback2 = _ => { result++; };
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
                    const event = new Event('click');
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    let result = 0;
                    const callback1 = _ => { result++; };
                    const callback2 = _ => { result++; };
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
                    const event = new Event('click');
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    let result = 0;
                    const callback1 = _ => { result++; };
                    const callback2 = _ => { result++; };
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

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click');
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    let result = 0;
                    const callback1 = _ => { result++; };
                    const callback2 = _ => { result++; };
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

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click');
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    let result = 0;
                    const callback1 = _ => { result++; };
                    const callback2 = _ => { result++; };
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

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click');
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    let result = 0;
                    const callback1 = _ => { result++; };
                    const callback2 = _ => { result++; };
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
                    let result = 0;
                    const callback1 = _ => { result++; };
                    const callback2 = _ => { result++; };
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
                    let result = 0;
                    const callback1 = _ => { result++; };
                    const callback2 = _ => { result++; };
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
                    const event = new Event('click', {
                        bubbles: true
                    });
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    const element3 = document.getElementById('test3');
                    const element4 = document.getElementById('test4');
                    let result = 0;
                    const callback1 = _ => { result++; };
                    const callback2 = _ => { result++; };
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
                    const event = new Event('click', {
                        bubbles: true
                    });
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    const element3 = document.getElementById('test3');
                    const element4 = document.getElementById('test4');
                    let result = 0;
                    const callback1 = _ => { result++; };
                    const callback2 = _ => { result++; };
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

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click', {
                        bubbles: true
                    });
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    const element3 = document.getElementById('test3');
                    const element4 = document.getElementById('test4');
                    let result = 0;
                    const callback1 = _ => { result++; };
                    const callback2 = _ => { result++; };
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

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click', {
                        bubbles: true
                    });
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    const element3 = document.getElementById('test3');
                    const element4 = document.getElementById('test4');
                    let result = 0;
                    const callback1 = _ => { result++; };
                    const callback2 = _ => { result++; };
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

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click', {
                        bubbles: true
                    });
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    const element3 = document.getElementById('test3');
                    const element4 = document.getElementById('test4');
                    let result = 0;
                    const callback1 = _ => { result++; };
                    const callback2 = _ => { result++; };
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

});