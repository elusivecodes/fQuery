import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#cloneEvents', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="eventParent">' +
                '<div id="test1" data-toggle="event"></div>' +
                '<div id="test2" data-toggle="event"></div>' +
                '</div>' +
                '<div id="noEventParent">' +
                '<div id="test3" data-toggle="noEvent"></div>' +
                '<div id="test4" data-toggle="noEvent"></div>' +
                '</div>';
            $.addEvent('#test1', 'click', (e) => {
                e.currentTarget.dataset.test1 = 'Test 1';
            });
            $.addEvent('#test2', 'click', (e) => {
                e.currentTarget.dataset.test2 = 'Test 2';
            });
        });
    });

    it('clones all events from all elements to all other elements', async function() {
        assert.strictEqual(
            await exec((_) => {
                const event = new Event('click');
                $.cloneEvents('[data-toggle="event"]', '[data-toggle="noEvent"]');
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
            '</div>',
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const event = new Event('click');
                const element = document.getElementById('test1');
                $.cloneEvents(element, '[data-toggle="noEvent"]');
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
            '</div>',
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const event = new Event('click');
                $.cloneEvents(
                    document.querySelectorAll('[data-toggle="event"]'),
                    '[data-toggle="noEvent"]',
                );
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
            '</div>',
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const event = new Event('click');
                $.cloneEvents(
                    document.getElementById('eventParent').children,
                    '[data-toggle="noEvent"]',
                );
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
            '</div>',
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click');
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                $.addEvent(shadow, 'click', (_) => {
                    result++;
                });
                $.cloneEvents(shadow, '[data-toggle="noEvent"]');
                shadow.dispatchEvent(event);
                document.getElementById('test3').dispatchEvent(event);
                document.getElementById('test4').dispatchEvent(event);
                return result;
            }),
            3,
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click');
                $.addEvent(document, 'click', (_) => {
                    result++;
                });
                $.cloneEvents(document, '[data-toggle="noEvent"]');
                document.dispatchEvent(event);
                document.getElementById('test3').dispatchEvent(event);
                document.getElementById('test4').dispatchEvent(event);
                return result;
            }),
            3,
        );
    });

    it('works with Window nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click');
                $.addEvent(window, 'click', (_) => {
                    result++;
                });
                $.cloneEvents(window, '[data-toggle="noEvent"]');
                window.dispatchEvent(event);
                document.getElementById('test3').dispatchEvent(event);
                document.getElementById('test4').dispatchEvent(event);
                return result;
            }),
            3,
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const event = new Event('click');
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                $.cloneEvents([
                    element1,
                    element2,
                ], '[data-toggle="noEvent"]');
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
            '</div>',
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const event = new Event('click');
                const element = document.getElementById('test3');
                $.cloneEvents('[data-toggle="event"]', element);
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
            '</div>',
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const event = new Event('click');
                $.cloneEvents(
                    '[data-toggle="event"]',
                    document.querySelectorAll('[data-toggle="noEvent"]'),
                );
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
            '</div>',
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const event = new Event('click');
                $.cloneEvents(
                    '[data-toggle="event"]',
                    document.getElementById('noEventParent').children,
                );
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
            '</div>',
        );
    });

    it('works with ShadowRoot other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click');
                const a = document.createElement('a');
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                $.addEvent(a, 'click', (_) => {
                    result++;
                });
                $.cloneEvents(a, shadow);
                a.dispatchEvent(event);
                shadow.dispatchEvent(event);
                return result;
            }),
            2,
        );
    });

    it('works with Document other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click');
                const a = document.createElement('a');
                $.addEvent(a, 'click', (_) => {
                    result++;
                });
                $.cloneEvents(a, document);
                a.dispatchEvent(event);
                document.dispatchEvent(event);
                return result;
            }),
            2,
        );
    });

    it('works with Window other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click');
                const a = document.createElement('a');
                $.addEvent(a, 'click', (_) => {
                    result++;
                });
                $.cloneEvents(a, window);
                a.dispatchEvent(event);
                window.dispatchEvent(event);
                return result;
            }),
            2,
        );
    });

    it('works with array other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const event = new Event('click');
                const element1 = document.getElementById('test3');
                const element2 = document.getElementById('test4');
                $.cloneEvents('[data-toggle="event"]', [
                    element1,
                    element2,
                ]);
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
            '</div>',
        );
    });

    it('clones capture events', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const event = new Event('click');
                $.removeEvent('#test1');
                $.removeEvent('#test2');
                $.addEvent('#eventParent', 'click', (_) => {
                    result++;
                }, { capture: true });
                $.cloneEvents('#eventParent', '#noEventParent');
                document.getElementById('test1').dispatchEvent(event);
                document.getElementById('test2').dispatchEvent(event);
                document.getElementById('test3').dispatchEvent(event);
                document.getElementById('test4').dispatchEvent(event);
                return result;
            }),
            4,
        );
    });
});
