const assert = require('assert').strict;
const { exec } = require('../../../setup');

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
                let result = 0;
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                element1.dispatchEvent(event);
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            4
        );
    });

    it('adds events to each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click hover', _ => {
                    result++;
                });
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                element2.dispatchEvent(event2);
                return result;
            }),
            8
        );
    });

    it('adds a namespaced event to each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click.test', _ => {
                    result++;
                });
                element1.dispatchEvent(event);
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            4
        );
    });

    it('adds namespaced events to each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click.test hover.test', _ => {
                    result++;
                });
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                element2.dispatchEvent(event2);
                return result;
            }),
            8
        );
    });

    it('adds a deep namespaced event to each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click.test.deep', _ => {
                    result++;
                });
                element1.dispatchEvent(event);
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            4
        );
    });

    it('adds deep namespaced events to each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click.test.deep hover.test.deep', _ => {
                    result++;
                });
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                element2.dispatchEvent(event2);
                return result;
            }),
            8
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(element1, 'click', _ => {
                    result++;
                });
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
                let result = 0;
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    document.querySelectorAll('a'),
                    'click',
                    _ => {
                        result++;
                    }
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

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    document.body.children,
                    'click',
                    _ => {
                        result++;
                    }
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
                let result = 0;
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const event = new Event('click');
                dom.addEvent(shadow, 'click', _ => {
                    result++;
                });
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
                let result = 0;
                const event = new Event('click');
                dom.addEvent(document, 'click', _ => {
                    result++;
                });
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
                let result = 0;
                const event = new Event('click');
                dom.addEvent(window, 'click', _ => {
                    result++;
                });
                window.dispatchEvent(event);
                window.dispatchEvent(event);
                return result;
            }),
            2
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent(
                    [
                        element1,
                        element2
                    ],
                    'click',
                    _ => {
                        result++;
                    }
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