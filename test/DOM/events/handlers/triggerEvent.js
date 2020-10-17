const assert = require('assert');
const { exec } = require('../../../setup');

describe('#triggerEvent', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '</div>';
        });
    });

    it('triggers an event for each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.triggerEvent('a', 'click');
                return result;
            }),
            2
        );
    });

    it('triggers events for each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.addEvent('a', 'hover', _ => {
                    result++;
                });
                dom.triggerEvent('a', 'click hover');
                return result;
            }),
            4
        );
    });

    it('triggers a namespaced event for each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test', _ => {
                    result++;
                });
                dom.triggerEvent('a', 'click');
                return result;
            }),
            2
        );
    });

    it('triggers namespaced events for each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test', _ => {
                    result++;
                });
                dom.addEvent('a', 'hover.test', _ => {
                    result++;
                });
                dom.triggerEvent('a', 'click hover');
                return result;
            }),
            4
        );
    });

    it('triggers a deep namespaced event for each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test.deep', _ => {
                    result++;
                });
                dom.triggerEvent('a', 'click');
                return result;
            }),
            2
        );
    });

    it('triggers deep namespaced events for each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test.deep', _ => {
                    result++;
                });
                dom.addEvent('a', 'hover.test.deep', _ => {
                    result++;
                });
                dom.triggerEvent('a', 'click hover');
                return result;
            }),
            4
        );
    });

    it('triggers a namespaced event with namespacing for each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test', _ => {
                    result++;
                });
                dom.triggerEvent('a', 'click.test');
                return result;
            }),
            2
        );
    });

    it('triggers namespaced events with namespacing for each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test', _ => {
                    result++;
                });
                dom.addEvent('a', 'hover.test', _ => {
                    result++;
                });
                dom.triggerEvent('a', 'click.test hover.test');
                return result;
            }),
            4
        );
    });

    it('triggers a deep namespaced event with namespacing for each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test.deep', _ => {
                    result++;
                });
                dom.triggerEvent('a', 'click.test');
                return result;
            }),
            2
        );
    });

    it('triggers deep namespaced events with namespacing for each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test.deep', _ => {
                    result++;
                });
                dom.addEvent('a', 'hover.test.deep', _ => {
                    result++;
                });
                dom.triggerEvent('a', 'click.test hover.test');
                return result;
            }),
            4
        );
    });

    it('triggers a deep namespaced event with deep namespacing for each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test.deep', _ => {
                    result++;
                });
                dom.triggerEvent('a', 'click.test.deep');
                return result;
            }),
            2
        );
    });

    it('triggers deep namespaced events with deep namespacing for each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test.deep', _ => {
                    result++;
                });
                dom.addEvent('a', 'hover.test.deep', _ => {
                    result++;
                });
                dom.triggerEvent('a', 'click.test.deep hover.test.deep');
                return result;
            }),
            4
        );
    });

    it('does not trigger an event without namespacing for each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.triggerEvent('a', 'click.test');
                return result;
            }),
            0
        );
    });

    it('does not trigger events without namespacing for each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.addEvent('a', 'hover', _ => {
                    result++;
                });
                dom.triggerEvent('a', 'click.test hover.test');
                return result;
            }),
            0
        );
    });

    it('does not trigger a namespaced event with deep namespacing for each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test', _ => {
                    result++;
                });
                dom.triggerEvent('a', 'click.test.deep');
                return result;
            }),
            0
        );
    });

    it('does not trigger namespaced events with deep namespacing for each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test', _ => {
                    result++;
                });
                dom.addEvent('a', 'hover.test', _ => {
                    result++;
                });
                dom.triggerEvent('a', 'click.test.deep hover.test.deep');
                return result;
            }),
            0
        );
    });

    it('triggers an event for each node with custom data', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click', e => {
                    if (e.detail === 'test') {
                        result++;
                    }
                });
                dom.triggerEvent('a', 'click');
                dom.triggerEvent('a', 'click', {
                    detail: 'test'
                });
                return result;
            }),
            2
        );
    });

    it('bubbles to other event listeners', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('#div1', 'click', _ => {
                    result++;
                });
                dom.triggerEvent('a', 'click');
                return result;
            }),
            2
        );
    });

    it('can be prevented from bubbling', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('#div1', 'click', _ => {
                    result++;
                });
                dom.triggerEvent('a', 'click', {
                    bubbles: false
                });
                return result;
            }),
            0
        );
    });

    it('can be cancelled', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result;
                dom.addEvent('#test1', 'click', e => {
                    result = e.cancelable;
                });
                dom.triggerEvent('#test1', 'click');
                return result;
            }),
            true
        );
    });

    it('can be prevented from being cancelled', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result;
                dom.addEvent('#test1', 'click', e => {
                    result = e.cancelable;
                });
                dom.triggerEvent('#test1', 'click', {
                    cancelable: false
                });
                return result;
            }),
            false
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.triggerEvent(
                    document.getElementById('test1'),
                    'click'
                );
                return result;
            }),
            1
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.triggerEvent(
                    document.querySelectorAll('a'),
                    'click'
                );
                return result;
            }),
            2
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.triggerEvent(
                    document.getElementById('div1').children,
                    'click'
                );
                return result;
            }),
            2
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                dom.addEvent(shadow, 'click', _ => {
                    result++;
                });
                dom.triggerEvent(shadow, 'click');
                return result;
            }),
            1
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent(document, 'click', _ => {
                    result++;
                });
                dom.triggerEvent(document, 'click');
                return result;
            }),
            1
        );
    });

    it('works with Window nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent(window, 'click', _ => {
                    result++;
                });
                dom.triggerEvent(window, 'click');
                return result;
            }),
            1
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.triggerEvent([
                    document.getElementById('test1'),
                    document.getElementById('test2')
                ], 'click');
                return result;
            }),
            2
        );
    });

});