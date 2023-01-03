import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #addEventOnce', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>';
        });
    });

    it('adds a self-destructing event to each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $('a')
                    .addEventOnce('click', (_) => {
                        result++;
                    });
                element1.dispatchEvent(event);
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            2,
        );
    });

    it('adds self-destructing events to each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $('a')
                    .addEventOnce('click hover', (_) => {
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
            4,
        );
    });

    it('adds a namespaced self-destructing event to each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $('a')
                    .addEventOnce('click.test', (_) => {
                        result++;
                    });
                element1.dispatchEvent(event);
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            2,
        );
    });

    it('adds namespaced self-destructing events to each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $('a')
                    .addEventOnce('click.test hover.test', (_) => {
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
            4,
        );
    });

    it('adds a deep namespaced self-destructing event to each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $('a')
                    .addEventOnce('click.test.deep', (_) => {
                        result++;
                    });
                element1.dispatchEvent(event);
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            2,
        );
    });

    it('adds deep namespaced self-destructing events to each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event1 = new Event('click');
                const event2 = new Event('hover');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $('a')
                    .addEventOnce('click.test.deep hover.test.deep', (_) => {
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
            4,
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('a');
                return query === query.addEventOnce('click', (_) => {
                    result++;
                });
            }),
            true,
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click');
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                $(shadow)
                    .addEventOnce('click', (_) => {
                        result++;
                    });
                shadow.dispatchEvent(event);
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
                const event = new Event('click');
                $(document)
                    .addEventOnce('click', (_) => {
                        result++;
                    });
                document.dispatchEvent(event);
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
                const event = new Event('click');
                $(window)
                    .addEventOnce('click', (_) => {
                        result++;
                    });
                window.dispatchEvent(event);
                window.dispatchEvent(event);
                return result;
            }),
            1,
        );
    });

    it('does not capture events', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $(document)
                    .addEventOnce('click', (_) => {
                        result++;
                    });
                element1.dispatchEvent(event);
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            0,
        );
    });

    it('works with capture', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $(document)
                    .addEventOnce('click', (_) => {
                        result++;
                    }, { capture: true });
                element1.dispatchEvent(event);
                element1.dispatchEvent(event);
                element2.dispatchEvent(event);
                element2.dispatchEvent(event);
                return result;
            }),
            1,
        );
    });
});
