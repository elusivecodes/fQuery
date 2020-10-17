const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySet #addEventDelegate', function() {

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
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                const event = new Event('click', {
                    bubbles: true
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                dom.queryMutable('div')
                    .addEventDelegate('click', 'a', _ => {
                        result++;
                    });
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

    it('adds delegated events to each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
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
                dom.queryMutable('div')
                    .addEventDelegate('click hover', 'a', _ => {
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
                element3.dispatchEvent(event1);
                element3.dispatchEvent(event1);
                element3.dispatchEvent(event2);
                element3.dispatchEvent(event2);
                element4.dispatchEvent(event1);
                element4.dispatchEvent(event1);
                element4.dispatchEvent(event2);
                element4.dispatchEvent(event2);
                return result;
            }),
            16
        );
    });

    it('adds a delegated event to each node with custom child selector', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                const event = new Event('click', {
                    bubbles: true
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                dom.queryMutable('div')
                    .addEventDelegate('click', '> a', _ => {
                        result++;
                    });
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

    it('adds delegated events to each node with custom child selector', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
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
                dom.queryMutable('div')
                    .addEventDelegate('click hover', '> a', _ => {
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
                element3.dispatchEvent(event1);
                element3.dispatchEvent(event1);
                element3.dispatchEvent(event2);
                element3.dispatchEvent(event2);
                element4.dispatchEvent(event1);
                element4.dispatchEvent(event1);
                element4.dispatchEvent(event2);
                element4.dispatchEvent(event2);
                return result;
            }),
            8
        );
    });

    it('adds a namespaced delegated event to each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                const event = new Event('click', {
                    bubbles: true
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                dom.queryMutable('div')
                    .addEventDelegate('click.test', 'a', _ => {
                        result++;
                    });
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

    it('adds namespaced delegated events to each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
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
                dom.queryMutable('div')
                    .addEventDelegate('click.test hover.test', 'a', _ => {
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
                element3.dispatchEvent(event1);
                element3.dispatchEvent(event1);
                element3.dispatchEvent(event2);
                element3.dispatchEvent(event2);
                element4.dispatchEvent(event1);
                element4.dispatchEvent(event1);
                element4.dispatchEvent(event2);
                element4.dispatchEvent(event2);
                return result;
            }),
            16
        );
    });

    it('adds a deep namespaced delegated event to each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                const event = new Event('click', {
                    bubbles: true
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                dom.queryMutable('div')
                    .addEventDelegate('click.test.deep', 'a', _ => {
                        result++;
                    });
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

    it('adds deep namespaced delegated events to each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
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
                dom.queryMutable('div')
                    .addEventDelegate('click.test.deep hover.test.deep', 'a', _ => {
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
                element3.dispatchEvent(event1);
                element3.dispatchEvent(event1);
                element3.dispatchEvent(event2);
                element3.dispatchEvent(event2);
                element4.dispatchEvent(event1);
                element4.dispatchEvent(event1);
                element4.dispatchEvent(event2);
                element4.dispatchEvent(event2);
                return result;
            }),
            16
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return query === query.addEventDelegate('click', 'a', _ => {
                    result++;
                });
            }),
            true
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                const event = new Event('click', {
                    bubbles: true
                });
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const a = document.createElement('a');
                shadow.appendChild(a);
                dom.queryMutable(shadow)
                    .addEventDelegate('click', 'a', _ => {
                        result++;
                    });
                a.dispatchEvent(event);
                a.dispatchEvent(event);
                return result;
            }),
            2
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                const event = new Event('click', {
                    bubbles: true
                });
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                const element3 = document.getElementById('test3');
                const element4 = document.getElementById('test4');
                dom.queryMutable(document)
                    .addEventDelegate('click', 'a', _ => {
                        result++;
                    });
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