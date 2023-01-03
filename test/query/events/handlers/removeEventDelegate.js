import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #removeEventDelegate', function() {
    beforeEach(async function() {
        await exec((_) => {
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
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click', {
                    bubbles: true,
                });
                const event2 = new Event('hover', {
                    bubbles: true,
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                $.addEventDelegate('div', 'click', 'a', (_) => {
                    result++;
                });
                $.addEventDelegate('div', 'click hover', 'a', (_) => {
                    result++;
                });
                $('div')
                    .removeEventDelegate(null, 'a');
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
            0,
        );
    });

    it('removes all delegated events of a type from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click', {
                    bubbles: true,
                });
                const event2 = new Event('hover', {
                    bubbles: true,
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                $.addEventDelegate('div', 'click', 'a', (_) => {
                    result++;
                });
                $.addEventDelegate('div', 'click hover', 'a', (_) => {
                    result++;
                });
                $('div')
                    .removeEventDelegate('click', 'a');
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
            4,
        );
    });

    it('removes all delegated events of types from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click', {
                    bubbles: true,
                });
                const event2 = new Event('hover', {
                    bubbles: true,
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                $.addEventDelegate('div', 'click', 'a', (_) => {
                    result++;
                });
                $.addEventDelegate('div', 'click hover', 'a', (_) => {
                    result++;
                });
                $('div')
                    .removeEventDelegate('click hover', 'a');
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
            0,
        );
    });

    it('removes a specific delegated event from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const callback = (_) => {
                    result++;
                };
                const event = new Event('click', {
                    bubbles: true,
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                $.addEventDelegate('div', 'click', 'a', callback);
                $.addEventDelegate('div', 'click', 'a', (_) => {
                    result++;
                });
                $('div')
                    .removeEventDelegate('click', 'a', callback);
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element3.dispatchEvent(event);
                element4.dispatchEvent(event);
                return result;
            }),
            4,
        );
    });

    it('removes a namespaced delegated event from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click', {
                    bubbles: true,
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                $.addEventDelegate('div', 'click.test', 'a', (_) => {
                    result++;
                });
                $('div')
                    .removeEventDelegate('click', 'a');
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element3.dispatchEvent(event);
                element4.dispatchEvent(event);
                return result;
            }),
            0,
        );
    });

    it('removes namespaced delegated events from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click', {
                    bubbles: true,
                });
                const event2 = new Event('hover', {
                    bubbles: true,
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                $.addEventDelegate('div', 'click.test hover.test', 'a', (_) => {
                    result++;
                });
                $('div')
                    .removeEventDelegate('click hover', 'a');
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
            0,
        );
    });

    it('removes a deep namespaced delegated event from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click', {
                    bubbles: true,
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                $.addEventDelegate('div', 'click.test.deep', 'a', (_) => {
                    result++;
                });
                $('div')
                    .removeEventDelegate('click', 'a');
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element3.dispatchEvent(event);
                element4.dispatchEvent(event);
                return result;
            }),
            0,
        );
    });

    it('removes deep namespaced delegated events from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click', {
                    bubbles: true,
                });
                const event2 = new Event('hover', {
                    bubbles: true,
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                $.addEventDelegate('div', 'click.test.deep hover.test.deep', 'a', (_) => {
                    result++;
                });
                $('div')
                    .removeEventDelegate('click hover', 'a');
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
            0,
        );
    });

    it('removes a namespaced delegated event with namespacing from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click', {
                    bubbles: true,
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                $.addEventDelegate('div', 'click.test', 'a', (_) => {
                    result++;
                });
                $('div')
                    .removeEventDelegate('click.test', 'a');
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element3.dispatchEvent(event);
                element4.dispatchEvent(event);
                return result;
            }),
            0,
        );
    });

    it('removes namespaced delegated events with namespacing from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click', {
                    bubbles: true,
                });
                const event2 = new Event('click', {
                    bubbles: true,
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                $.addEventDelegate('div', 'click.test hover.test', 'a', (_) => {
                    result++;
                });
                $('div')
                    .removeEventDelegate('click.test hover.test', 'a');
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
            0,
        );
    });

    it('removes a deep namespaced delegated event with namespacing from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click', {
                    bubbles: true,
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                $.addEventDelegate('div', 'click.test.deep', 'a', (_) => {
                    result++;
                });
                $('div')
                    .removeEventDelegate('click.test', 'a');
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element3.dispatchEvent(event);
                element4.dispatchEvent(event);
                return result;
            }),
            0,
        );
    });

    it('removes deep namespaced delegated events with namespacing from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click', {
                    bubbles: true,
                });
                const event2 = new Event('hover', {
                    bubbles: true,
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                $.addEventDelegate('div', 'click.test.deep hover.test.deep', 'a', (_) => {
                    result++;
                });
                $('div')
                    .removeEventDelegate('click.test hover.test', 'a');
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
            0,
        );
    });

    it('removes a deep namespaced delegated event with deep namespacing from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click', {
                    bubbles: true,
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                $.addEventDelegate('div', 'click.test.deep', 'a', (_) => {
                    result++;
                });
                $('div')
                    .removeEventDelegate('click.test.deep', 'a');
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element3.dispatchEvent(event);
                element4.dispatchEvent(event);
                return result;
            }),
            0,
        );
    });

    it('removes deep namespaced delegated events with deep namespacing from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click', {
                    bubbles: true,
                });
                const event2 = new Event('hover', {
                    bubbles: true,
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test2');
                const element4 = document.getElementById('test2');
                $.addEventDelegate('div', 'click.test.deep hover.test.deep', 'a', (_) => {
                    result++;
                });
                $('div')
                    .removeEventDelegate('click.test.deep hover.test.deep', 'a');
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
            0,
        );
    });

    it('does not remove a specific delegated event of the wrong type from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const callback = (_) => {
                    result++;
                };
                const event = new Event('click', {
                    bubbles: true,
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                $.addEventDelegate('div', 'click', 'a', callback);
                $.addEventDelegate('div', 'click', 'a', (_) => {
                    result++;
                });
                $('div')
                    .removeEventDelegate('hover', 'a', callback);
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element3.dispatchEvent(event);
                element4.dispatchEvent(event);
                return result;
            }),
            8,
        );
    });

    it('does not remove a delegated event without namespacing from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click', {
                    bubbles: true,
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                $.addEventDelegate('div', 'click', 'a', (_) => {
                    result++;
                });
                $('div')
                    .removeEventDelegate('click.test', 'a');
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element3.dispatchEvent(event);
                element4.dispatchEvent(event);
                return result;
            }),
            4,
        );
    });

    it('does not remove delegated events without namespacing from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click', {
                    bubbles: true,
                });
                const event2 = new Event('hover', {
                    bubbles: true,
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                $.addEventDelegate('div', 'click hover', 'a', (_) => {
                    result++;
                });
                $('div')
                    .removeEventDelegate('click.test hover.test', 'a');
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
            8,
        );
    });

    it('does not remove a namespaced delegated event with deep namespacing from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click', {
                    bubbles: true,
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                $.addEventDelegate('div', 'click.test', 'a', (_) => {
                    result++;
                });
                $.removeEventDelegate('div', 'click.test.deep', 'a');
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element3.dispatchEvent(event);
                element4.dispatchEvent(event);
                return result;
            }),
            4,
        );
    });

    it('does not remove namespaced delegated events with deep namespacing from each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click', {
                    bubbles: true,
                });
                const event2 = new Event('hover', {
                    bubbles: true,
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                $.addEventDelegate('div', 'click.test hover.test', 'a', (_) => {
                    result++;
                });
                $.removeEventDelegate('div', 'click.test.deep hover.test.deep', 'a');
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
            8,
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('a');
                return query === query.removeEventDelegate(null, 'a');
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
                const event = new Event('click', {
                    bubbles: true,
                });
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const a = document.createElement('a');
                shadow.appendChild(a);
                $.addEventDelegate(shadow, 'click', 'a', callback);
                $.addEventDelegate(shadow, 'click', 'a', (_) => {
                    result++;
                });
                $(shadow)
                    .removeEventDelegate('click', 'a', callback);
                a.dispatchEvent(event);
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
                const event = new Event('click', {
                    bubbles: true,
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                $.addEventDelegate(document, 'click', 'a', callback);
                $.addEventDelegate(document, 'click', 'a', (_) => {
                    result++;
                });
                $(document)
                    .removeEventDelegate('click', 'a', callback);
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element3.dispatchEvent(event);
                element4.dispatchEvent(event);
                return result;
            }),
            4,
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
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                $.addEventDelegate('div', 'click hover', 'a', (_) => {
                    result++;
                }, true);
                $('div')
                    .removeEventDelegate(null, 'a');
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
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                $.addEventDelegate('div', 'click', 'a', (_) => {
                    result++;
                });
                $.addEventDelegate('div', 'hover', 'a', (_) => {
                    result++;
                }, { capture: true });
                $('div')
                    .removeEventDelegate(null, 'a', null, { capture: true });
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
            4,
        );
    });
});
