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

        it('works with ShadowRoot nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const div = document.createElement('div');
                    const shadow = div.attachShadow({ mode: 'open' });
                    const event = new Event('click');
                    let result = 0;
                    dom.addEvent(
                        shadow,
                        'click',
                        _ => { result++; }
                    );
                    shadow.dispatchEvent(event);
                    shadow.dispatchEvent(event);
                    return result;
                }),
                2
            );
        });

        it('works with Document nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click');
                    let result = 0;
                    dom.addEvent(
                        document,
                        'click',
                        _ => { result++; }
                    );
                    document.dispatchEvent(event);
                    document.dispatchEvent(event);
                    return result;
                }),
                2
            );
        });

        it('works with Window nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click');
                    let result = 0;
                    dom.addEvent(
                        window,
                        'click',
                        _ => { result++; }
                    );
                    window.dispatchEvent(event);
                    window.dispatchEvent(event);
                    return result;
                }),
                2
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

        it('works with ShadowRoot nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const div = document.createElement('div');
                    const shadow = div.attachShadow({ mode: 'open' });
                    const a = document.createElement('a');
                    shadow.appendChild(a);
                    const event = new Event('click', {
                        bubbles: true
                    });
                    let result = 0;
                    dom.addEventDelegate(
                        shadow,
                        'click',
                        'a',
                        _ => { result++; }
                    );
                    a.dispatchEvent(event);
                    a.dispatchEvent(event);
                    return result;
                }),
                2
            );
        });

        it('works with Document nodes', async function() {
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
                        document,
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

        it('works with ShadowRoot nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const div = document.createElement('div');
                    const shadow = div.attachShadow({ mode: 'open' });
                    const a = document.createElement('a');
                    shadow.appendChild(a);
                    const event = new Event('click', {
                        bubbles: true
                    });
                    let result = 0;
                    dom.addEventDelegateOnce(
                        shadow,
                        'click',
                        'a',
                        _ => { result++; }
                    );
                    a.dispatchEvent(event);
                    a.dispatchEvent(event);
                    return result;
                }),
                1
            );
        });

        it('works with Document nodes', async function() {
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
                        document,
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

        it('works with ShadowRoot nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const div = document.createElement('div');
                    const shadow = div.attachShadow({ mode: 'open' });
                    const event = new Event('click');
                    let result = 0;
                    dom.addEventOnce(
                        shadow,
                        'click',
                        _ => { result++; }
                    );
                    shadow.dispatchEvent(event);
                    shadow.dispatchEvent(event);
                    return result;
                }),
                1
            );
        });

        it('works with Document nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click');
                    let result = 0;
                    dom.addEventOnce(
                        document,
                        'click',
                        _ => { result++; }
                    );
                    document.dispatchEvent(event);
                    document.dispatchEvent(event);
                    return result;
                }),
                1
            );
        });

        it('works with Window nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const event = new Event('click');
                    let result = 0;
                    dom.addEventOnce(
                        window,
                        'click',
                        _ => { result++; }
                    );
                    window.dispatchEvent(event);
                    window.dispatchEvent(event);
                    return result;
                }),
                1
            );
        });

    });

    describe('#cloneEvents', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="eventParent">' +
                    '<div id="test1" data-toggle="event"></div>' +
                    '<div id="test2" data-toggle="event"></div>' +
                    '</div>' +
                    '<div id="noEventParent">' +
                    '<div id="test3" data-toggle="noEvent"></div>' +
                    '<div id="test4" data-toggle="noEvent"></div>' +
                    '</div>';
                dom.addEvent(
                    '#test1',
                    'click',
                    e => {
                        e.currentTarget.dataset.test1 = 'Test 1';
                    }
                );
                dom.addEvent(
                    '#test2',
                    'click',
                    e => {
                        e.currentTarget.dataset.test2 = 'Test 2';
                    }
                );
            });
        });

        it('clones all events from all elements to all other elements', async function() {
            assert.equal(
                await exec(_ => {
                    dom.cloneEvents(
                        '[data-toggle="event"]',
                        '[data-toggle="noEvent"]'
                    );
                    const event = new Event('click');
                    document.getElementById('test1').dispatchEvent(event);
                    document.getElementById('test2').dispatchEvent(event);
                    document.getElementById('test3').dispatchEvent(event);
                    document.getElementById('test4').dispatchEvent(event);
                    return document.body.innerHTML;
                }),
                '<div id="eventParent">' +
                '<div id="test1" data-toggle="event" data-test1="Test 1"></div>' +
                '<div id="test2" data-toggle="event" data-test2="Test 2"></div>' +
                '</div>' +
                '<div id="noEventParent">' +
                '<div id="test3" data-toggle="noEvent" data-test1="Test 1" data-test2="Test 2"></div>' +
                '<div id="test4" data-toggle="noEvent" data-test1="Test 1" data-test2="Test 2"></div>' +
                '</div>'
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const element = document.getElementById('test1');
                    dom.cloneEvents(
                        element,
                        '[data-toggle="noEvent"]'
                    );
                    const event = new Event('click');
                    element.dispatchEvent(event);
                    document.getElementById('test2').dispatchEvent(event);
                    document.getElementById('test3').dispatchEvent(event);
                    document.getElementById('test4').dispatchEvent(event);
                    return document.body.innerHTML;
                }),
                '<div id="eventParent">' +
                '<div id="test1" data-toggle="event" data-test1="Test 1"></div>' +
                '<div id="test2" data-toggle="event" data-test2="Test 2"></div>' +
                '</div>' +
                '<div id="noEventParent">' +
                '<div id="test3" data-toggle="noEvent" data-test1="Test 1"></div>' +
                '<div id="test4" data-toggle="noEvent" data-test1="Test 1"></div>' +
                '</div>'
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.cloneEvents(
                        document.getElementById('eventParent').children,
                        '[data-toggle="noEvent"]'
                    );
                    const event = new Event('click');
                    document.getElementById('test1').dispatchEvent(event);
                    document.getElementById('test2').dispatchEvent(event);
                    document.getElementById('test3').dispatchEvent(event);
                    document.getElementById('test4').dispatchEvent(event);
                    return document.body.innerHTML;
                }),
                '<div id="eventParent">' +
                '<div id="test1" data-toggle="event" data-test1="Test 1"></div>' +
                '<div id="test2" data-toggle="event" data-test2="Test 2"></div>' +
                '</div>' +
                '<div id="noEventParent">' +
                '<div id="test3" data-toggle="noEvent" data-test1="Test 1" data-test2="Test 2"></div>' +
                '<div id="test4" data-toggle="noEvent" data-test1="Test 1" data-test2="Test 2"></div>' +
                '</div>'
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.cloneEvents(
                        document.querySelectorAll('[data-toggle="event"]'),
                        '[data-toggle="noEvent"]'
                    );
                    const event = new Event('click');
                    document.getElementById('test1').dispatchEvent(event);
                    document.getElementById('test2').dispatchEvent(event);
                    document.getElementById('test3').dispatchEvent(event);
                    document.getElementById('test4').dispatchEvent(event);
                    return document.body.innerHTML;
                }),
                '<div id="eventParent">' +
                '<div id="test1" data-toggle="event" data-test1="Test 1"></div>' +
                '<div id="test2" data-toggle="event" data-test2="Test 2"></div>' +
                '</div>' +
                '<div id="noEventParent">' +
                '<div id="test3" data-toggle="noEvent" data-test1="Test 1" data-test2="Test 2"></div>' +
                '<div id="test4" data-toggle="noEvent" data-test1="Test 1" data-test2="Test 2"></div>' +
                '</div>'
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const element1 = document.getElementById('test1');
                    const element2 = document.getElementById('test2');
                    dom.cloneEvents(
                        [
                            element1,
                            element2
                        ],
                        '[data-toggle="noEvent"]'
                    );
                    const event = new Event('click');
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    document.getElementById('test3').dispatchEvent(event);
                    document.getElementById('test4').dispatchEvent(event);
                    return document.body.innerHTML;
                }),
                '<div id="eventParent">' +
                '<div id="test1" data-toggle="event" data-test1="Test 1"></div>' +
                '<div id="test2" data-toggle="event" data-test2="Test 2"></div>' +
                '</div>' +
                '<div id="noEventParent">' +
                '<div id="test3" data-toggle="noEvent" data-test1="Test 1" data-test2="Test 2"></div>' +
                '<div id="test4" data-toggle="noEvent" data-test1="Test 1" data-test2="Test 2"></div>' +
                '</div>'
            );
        });

        it('works with ShadowRoot nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const div = document.createElement('div');
                    const shadow = div.attachShadow({ mode: 'open' });
                    let result = 0;
                    dom.addEvent(
                        shadow,
                        'click',
                        _ => { result++; }
                    );
                    dom.cloneEvents(
                        shadow,
                        '[data-toggle="noEvent"]'
                    );
                    const event = new Event('click');
                    shadow.dispatchEvent(event);
                    document.getElementById('test3').dispatchEvent(event);
                    document.getElementById('test4').dispatchEvent(event);
                    return result;
                }),
                3
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
                    dom.cloneEvents(
                        document,
                        '[data-toggle="noEvent"]'
                    );
                    const event = new Event('click');
                    document.dispatchEvent(event);
                    document.getElementById('test3').dispatchEvent(event);
                    document.getElementById('test4').dispatchEvent(event);
                    return result;
                }),
                3
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
                    dom.cloneEvents(
                        window,
                        '[data-toggle="noEvent"]'
                    );
                    const event = new Event('click');
                    window.dispatchEvent(event);
                    document.getElementById('test3').dispatchEvent(event);
                    document.getElementById('test4').dispatchEvent(event);
                    return result;
                }),
                3
            );
        });

        it('works with HTMLElement other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const element = document.getElementById('test3');
                    dom.cloneEvents(
                        '[data-toggle="event"]',
                        element
                    );
                    const event = new Event('click');
                    document.getElementById('test1').dispatchEvent(event);
                    document.getElementById('test2').dispatchEvent(event);
                    element.dispatchEvent(event);
                    document.getElementById('test4').dispatchEvent(event);
                    return document.body.innerHTML;
                }),
                '<div id="eventParent">' +
                '<div id="test1" data-toggle="event" data-test1="Test 1"></div>' +
                '<div id="test2" data-toggle="event" data-test2="Test 2"></div>' +
                '</div>' +
                '<div id="noEventParent">' +
                '<div id="test3" data-toggle="noEvent" data-test1="Test 1" data-test2="Test 2"></div>' +
                '<div id="test4" data-toggle="noEvent"></div>' +
                '</div>'
            );
        });

        it('works with HTMLCollection other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.cloneEvents(
                        '[data-toggle="event"]',
                        document.getElementById('noEventParent').children
                    );
                    const event = new Event('click');
                    document.getElementById('test1').dispatchEvent(event);
                    document.getElementById('test2').dispatchEvent(event);
                    document.getElementById('test3').dispatchEvent(event);
                    document.getElementById('test4').dispatchEvent(event);
                    return document.body.innerHTML;
                }),
                '<div id="eventParent">' +
                '<div id="test1" data-toggle="event" data-test1="Test 1"></div>' +
                '<div id="test2" data-toggle="event" data-test2="Test 2"></div>' +
                '</div>' +
                '<div id="noEventParent">' +
                '<div id="test3" data-toggle="noEvent" data-test1="Test 1" data-test2="Test 2"></div>' +
                '<div id="test4" data-toggle="noEvent" data-test1="Test 1" data-test2="Test 2"></div>' +
                '</div>'
            );
        });

        it('works with NodeList other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    dom.cloneEvents(
                        '[data-toggle="event"]',
                        document.querySelectorAll('[data-toggle="noEvent"]')
                    );
                    const event = new Event('click');
                    document.getElementById('test1').dispatchEvent(event);
                    document.getElementById('test2').dispatchEvent(event);
                    document.getElementById('test3').dispatchEvent(event);
                    document.getElementById('test4').dispatchEvent(event);
                    return document.body.innerHTML;
                }),
                '<div id="eventParent">' +
                '<div id="test1" data-toggle="event" data-test1="Test 1"></div>' +
                '<div id="test2" data-toggle="event" data-test2="Test 2"></div>' +
                '</div>' +
                '<div id="noEventParent">' +
                '<div id="test3" data-toggle="noEvent" data-test1="Test 1" data-test2="Test 2"></div>' +
                '<div id="test4" data-toggle="noEvent" data-test1="Test 1" data-test2="Test 2"></div>' +
                '</div>'
            );
        });

        it('works with array other nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const element1 = document.getElementById('test3');
                    const element2 = document.getElementById('test4');
                    dom.cloneEvents(
                        '[data-toggle="event"]',
                        [
                            element1,
                            element2
                        ]
                    );
                    const event = new Event('click');
                    document.getElementById('test1').dispatchEvent(event);
                    document.getElementById('test2').dispatchEvent(event);
                    element1.dispatchEvent(event);
                    element2.dispatchEvent(event);
                    return document.body.innerHTML;
                }),
                '<div id="eventParent">' +
                '<div id="test1" data-toggle="event" data-test1="Test 1"></div>' +
                '<div id="test2" data-toggle="event" data-test2="Test 2"></div>' +
                '</div>' +
                '<div id="noEventParent">' +
                '<div id="test3" data-toggle="noEvent" data-test1="Test 1" data-test2="Test 2"></div>' +
                '<div id="test4" data-toggle="noEvent" data-test1="Test 1" data-test2="Test 2"></div>' +
                '</div>'
            );
        });

        it('works with ShadowRoot nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const a = document.createElement('a');
                    const div = document.createElement('div');
                    const shadow = div.attachShadow({ mode: 'open' });
                    let result = 0;
                    dom.addEvent(
                        a,
                        'click',
                        _ => { result++; }
                    );
                    dom.cloneEvents(
                        a,
                        shadow
                    );
                    const event = new Event('click');
                    a.dispatchEvent(event);
                    shadow.dispatchEvent(event);
                    return result;
                }),
                2
            );
        });

        it('works with Document nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const a = document.createElement('a');
                    let result = 0;
                    dom.addEvent(
                        a,
                        'click',
                        _ => { result++; }
                    );
                    dom.cloneEvents(
                        a,
                        document
                    );
                    const event = new Event('click');
                    a.dispatchEvent(event);
                    document.dispatchEvent(event);
                    return result;
                }),
                2
            );
        });

        it('works with Window nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const a = document.createElement('a');
                    let result = 0;
                    dom.addEvent(
                        a,
                        'click',
                        _ => { result++; }
                    );
                    dom.cloneEvents(
                        a,
                        window
                    );
                    const event = new Event('click');
                    a.dispatchEvent(event);
                    window.dispatchEvent(event);
                    return result;
                }),
                2
            );
        });

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

        it('works with ShadowRoot nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const div = document.createElement('div');
                    const shadow = div.attachShadow({ mode: 'open' });
                    const event = new Event('click');
                    let result = 0;
                    const callback1 = _ => { result++; };
                    const callback2 = _ => { result++; };
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
                    const event = new Event('click');
                    let result = 0;
                    const callback1 = _ => { result++; };
                    const callback2 = _ => { result++; };
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
                    const event = new Event('click');
                    let result = 0;
                    const callback1 = _ => { result++; };
                    const callback2 = _ => { result++; };
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

        it('works with ShadowRoot nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const div = document.createElement('div');
                    const shadow = div.attachShadow({ mode: 'open' });
                    const a = document.createElement('a');
                    shadow.appendChild(a);
                    const event = new Event('click', {
                        bubbles: true
                    });
                    let result = 0;
                    const callback1 = _ => { result++; };
                    const callback2 = _ => { result++; };
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

        it('works with ShadowRoot nodes', async function() {
            assert.equal(
                await exec(_ => {
                    const div = document.createElement('div');
                    const shadow = div.attachShadow({ mode: 'open' });
                    let result = 0;
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

    });

});