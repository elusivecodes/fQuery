import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #removeEvent', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>';
        });
    });

    it('removes all events from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.addEvent('a', 'click hover', (_) => {
                    result++;
                });
                $('a')
                    .removeEvent();
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            0,
        );
    });

    it('removes all events of a type from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.addEvent('a', 'click', (_) => {
                    result++;
                });
                $.addEvent('a', 'click hover', (_) => {
                    result++;
                });
                $('a')
                    .removeEvent('click');
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            2,
        );
    });

    it('removes all events of types from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.addEvent('a', 'click', (_) => {
                    result++;
                });
                $.addEvent('a', 'click hover', (_) => {
                    result++;
                });
                $('a')
                    .removeEvent('click hover');
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            0,
        );
    });

    it('removes a specific event from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const callback = (_) => {
                    result++;
                };
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.addEvent('a', 'click', callback);
                $.addEvent('a', 'click', (_) => {
                    result++;
                });
                $('a')
                    .removeEvent('click', callback);
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            2,
        );
    });

    it('removes a namespaced event from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.addEvent('a', 'click.test', (_) => {
                    result++;
                });
                $('a')
                    .removeEvent('click');
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            0,
        );
    });

    it('removes namespaced events from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.addEvent('a', 'click.test hover.test', (_) => {
                    result++;
                });
                $('a')
                    .removeEvent('click hover');
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            0,
        );
    });

    it('removes a deep namespaced event from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.addEvent('a', 'click.test.deep', (_) => {
                    result++;
                });
                $('a')
                    .removeEvent('click');
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            0,
        );
    });

    it('removes deep namespaced events from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.addEvent('a', 'click.test.deep hover.test.deep', (_) => {
                    result++;
                });
                $('a')
                    .removeEvent('click hover');
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            0,
        );
    });

    it('removes a namespaced event with namespacing from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.addEvent('a', 'click.test', (_) => {
                    result++;
                });
                $('a')
                    .removeEvent('click.test');
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            0,
        );
    });

    it('removes namespaced events with namespacing from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.addEvent('a', 'click.test hover.test', (_) => {
                    result++;
                });
                $('a')
                    .removeEvent('click.test hover.test');
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            0,
        );
    });

    it('removes a deep namespaced event with namespacing from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.addEvent('a', 'click.test.deep', (_) => {
                    result++;
                });
                $('a')
                    .removeEvent('click.test');
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            0,
        );
    });

    it('removes deep namespaced events with namespacing from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.addEvent('a', 'click.test.deep hover.test.deep', (_) => {
                    result++;
                });
                $('a')
                    .removeEvent('click.test hover.test');
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            0,
        );
    });

    it('removes a deep namespaced event with deep namespacing from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.addEvent('a', 'click.test.deep', (_) => {
                    result++;
                });
                $('a')
                    .removeEvent('click.test.deep');
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            0,
        );
    });

    it('removes deep namespaced events with deep namespacing from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.addEvent('a', 'click.test.deep hover.test.deep', (_) => {
                    result++;
                });
                $('a')
                    .removeEvent('click.test.deep hover.test.deep');
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            0,
        );
    });

    it('does not remove a specific event of the wrong type from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const callback = (_) => {
                    result++;
                };
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.addEvent('a', 'click', callback);
                $.addEvent('a', 'click', (_) => {
                    result++;
                });
                $('a')
                    .removeEvent('hover', callback);
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            4,
        );
    });

    it('does not remove an event without namespacing from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.addEvent('a', 'click', (_) => {
                    result++;
                });
                $('a')
                    .removeEvent('click.test');
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            2,
        );
    });

    it('does not remove events without namespacing from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.addEvent('a', 'click hover', (_) => {
                    result++;
                });
                $('a')
                    .removeEvent('click.test hover.test');
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            4,
        );
    });

    it('does not remove a namespaced event with deep namespacing from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.addEvent('a', 'click.test', (_) => {
                    result++;
                });
                $('a')
                    .removeEvent('click.test.deep');
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            2,
        );
    });

    it('does not remove namespaced events with deep namespacing from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.addEvent('a', 'click.test hover.test', (_) => {
                    result++;
                });
                $('a')
                    .removeEvent('click.test.deep hover.test.deep');
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            4,
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('a');
                return query === query.removeEvent();
            }),
            true,
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const callback = (_) => {
                    result++;
                };
                const event = new Event('click');
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                $.addEvent(shadow, 'click', callback);
                $.addEvent(shadow, 'click', (_) => {
                    result++;
                });
                $(shadow)
                    .removeEvent('click', callback);
                shadow.dispatchEvent(event);
                return result;
            }),
            1,
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const callback = (_) => {
                    result++;
                };
                const event = new Event('click');
                $.addEvent(document, 'click', callback);
                $.addEvent(document, 'click', (_) => {
                    result++;
                });
                $(document)
                    .removeEvent('click', callback);
                document.dispatchEvent(event);
                return result;
            }),
            1,
        );
    });

    it('works with Window nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const callback = (_) => {
                    result++;
                };
                const event = new Event('click');
                $.addEvent(window, 'click', callback);
                $.addEvent(window, 'click', (_) => {
                    result++;
                });
                $(window)
                    .removeEvent('click', callback);
                window.dispatchEvent(event);
                return result;
            }),
            1,
        );
    });

    it('removes capture events', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.addEvent(document, 'click hover', (_) => {
                    result++;
                }, true);
                $(document)
                    .removeEvent();
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            0,
        );
    });

    it('works with capture', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click', {
                    bubbles: true,
                });
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.addEvent(document, 'click', (_) => {
                    result++;
                });
                $.addEvent(document, 'hover', (_) => {
                    result++;
                }, { capture: true });
                $(document)
                    .removeEvent(null, null, { capture: true });
                element1.dispatchEvent(event1);
                element1.dispatchEvent(event2);
                element2.dispatchEvent(event1);
                element2.dispatchEvent(event2);
                return result;
            }),
            2,
        );
    });
});
