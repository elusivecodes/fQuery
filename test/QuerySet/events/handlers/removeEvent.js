const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #removeEvent', function() {

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
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click hover', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .removeEvent();
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
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.addEvent('a', 'click hover', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .removeEvent('click');
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
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.addEvent('a', 'click hover', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .removeEvent('click hover');
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
                const callback = _ => {
                    result++;
                };
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click', callback);
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .removeEvent('click', callback);
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
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click.test', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .removeEvent('click');
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
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click.test hover.test', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .removeEvent('click hover');
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
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click.test.deep', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .removeEvent('click');
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
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click.test.deep hover.test.deep', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .removeEvent('click hover');
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
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click.test', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .removeEvent('click.test');
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
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click.test hover.test', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .removeEvent('click.test hover.test');
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
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click.test.deep', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .removeEvent('click.test');
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
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click.test.deep hover.test.deep', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .removeEvent('click.test hover.test');
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
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click.test.deep', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .removeEvent('click.test.deep');
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
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click.test.deep hover.test.deep', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .removeEvent('click.test.deep hover.test.deep');
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
                const callback = _ => {
                    result++;
                };
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click', callback);
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .removeEvent('hover', callback);
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
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .removeEvent('click.test');
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
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click hover', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .removeEvent('click.test hover.test');
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
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click.test', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .removeEvent('click.test.deep');
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
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.addEvent('a', 'click.test hover.test', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .removeEvent('click.test.deep hover.test.deep');
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            4
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('a');
                return query === query.removeEvent();
            }),
            true
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const callback = _ => {
                    result++;
                };
                const event = new Event('click');
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                dom.addEvent(shadow, 'click', callback);
                dom.addEvent(shadow, 'click', _ => {
                    result++;
                });
                dom.queryMutable(shadow)
                    .removeEvent('click', callback);
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
                const callback = _ => {
                    result++;
                };
                const event = new Event('click');
                dom.addEvent(document, 'click', callback);
                dom.addEvent(document, 'click', _ => {
                    result++;
                });
                dom.queryMutable(document)
                    .removeEvent('click', callback);
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
                const callback = _ => {
                    result++;
                };
                const event = new Event('click');
                dom.addEvent(window, 'click', callback);
                dom.addEvent(window, 'click', _ => {
                    result++;
                });
                dom.queryMutable(window)
                    .removeEvent('click', callback);
                window.dispatchEvent(event);
                return result;
            }),
            1
        );
    });

});