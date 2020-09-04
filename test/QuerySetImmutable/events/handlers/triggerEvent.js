const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #triggerEvent', function() {

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
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.query('a')
                    .triggerEvent('click');
                return result;
            }),
            2
        );
    });

    it('triggers events for each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click hover', _ => {
                    result++;
                });
                dom.query('a')
                    .triggerEvent('click hover');
                return result;
            }),
            4
        );
    });

    it('triggers a namespaced event for each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test', _ => {
                    result++;
                });
                dom.query('a')
                    .triggerEvent('click');
                return result;
            }),
            2
        );
    });

    it('triggers namespaced events for each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test hover.test', _ => {
                    result++;
                });
                dom.query('a')
                    .triggerEvent('click hover');
                return result;
            }),
            4
        );
    });

    it('triggers a deep namespaced event for each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test.deep', _ => {
                    result++;
                });
                dom.query('a')
                    .triggerEvent('click');
                return result;
            }),
            2
        );
    });

    it('triggers deep namespaced events for each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test.deep hover.test.deep', _ => {
                    result++;
                });
                dom.query('a')
                    .triggerEvent('click hover');
                return result;
            }),
            4
        );
    });

    it('triggers a namespaced event with namespacing for each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test', _ => {
                    result++;
                });
                dom.query('a')
                    .triggerEvent('click.test');
                return result;
            }),
            2
        );
    });

    it('triggers namespaced events with namespacing for each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test hover.test', _ => {
                    result++;
                });
                dom.query('a')
                    .triggerEvent('click.test hover.test');
                return result;
            }),
            4
        );
    });

    it('triggers a deep namespaced event with namespacing for each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test.deep', _ => {
                    result++;
                });
                dom.query('a')
                    .triggerEvent('click.test');
                return result;
            }),
            2
        );
    });

    it('triggers deep namespaced events with namespacing for each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test.deep hover.test.deep', _ => {
                    result++;
                });
                dom.query('a')
                    .triggerEvent('click.test hover.test');
                return result;
            }),
            4
        );
    });

    it('triggers a deep namespaced event with deep namespacing for each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test.deep', _ => {
                    result++;
                });
                dom.query('a')
                    .triggerEvent('click.test.deep');
                return result;
            }),
            2
        );
    });

    it('triggers deep namespaced events with deep namespacing for each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test.deep hover.test.deep', _ => {
                    result++;
                });
                dom.query('a')
                    .triggerEvent('click.test.deep hover.test.deep');
                return result;
            }),
            4
        );
    });

    it('does not trigger an event without namespacing for each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.query('a')
                    .triggerEvent('click.test');
                return result;
            }),
            0
        );
    });

    it('does not trigger events without namespacing for each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click hover', _ => {
                    result++;
                });
                dom.query('a')
                    .triggerEvent('click.test hover.test');
                return result;
            }),
            0
        );
    });

    it('does not trigger a namespaced event with deep namespacing for each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test', _ => {
                    result++;
                });
                dom.query('a')
                    .triggerEvent('click.test.deep');
                return result;
            }),
            0
        );
    });

    it('does not trigger namespaced events with deep namespacing for each node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test hover.test', _ => {
                    result++;
                });
                dom.query('a')
                    .triggerEvent('click.test.deep hover.test.deep');
                return result;
            }),
            0
        );
    });

    it('triggers an event for each node with custom data', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click', e => {
                    if (e.detail === 'test') {
                        result++;
                    }
                });
                dom.query('a')
                    .triggerEvent('click')
                    .triggerEvent('click', {
                        detail: 'test'
                    });
                return result;
            }),
            2
        );
    });

    it('bubbles to other event listeners', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('#div1', 'click', _ => {
                    result++;
                });
                dom.query('a')
                    .triggerEvent('click');
                return result;
            }),
            2
        );
    });

    it('can be prevented from bubbling', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('#div1', 'click', _ => {
                    result++;
                });
                dom.query('a')
                    .triggerEvent('click', {
                        bubbles: false
                    });
                return result;
            }),
            0
        );
    });

    it('can be cancelled', async function() {
        assert.equal(
            await exec(_ => {
                let result;
                dom.addEvent('#test1', 'click', e => {
                    result = e.cancelable;
                });
                dom.query('#test1')
                    .triggerEvent('click');
                return result;
            }),
            true
        );
    });

    it('can be prevented from being cancelled', async function() {
        assert.equal(
            await exec(_ => {
                let result;
                dom.addEvent('#test1', 'click', e => {
                    result = e.cancelable;
                });
                dom.query('#test1')
                    .triggerEvent('click', {
                        cancelable: false
                    });
                return result;
            }),
            false
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.query('a');
                return query === query.triggerEvent('click');
            }),
            true
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                dom.addEvent(shadow, 'click', _ => {
                    result++;
                });
                dom.query(shadow)
                    .triggerEvent('click');
                return result;
            }),
            1
        );
    });

    it('works with Document nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(document, 'click', _ => {
                    result++;
                });
                dom.query(document)
                    .triggerEvent('click');
                return result;
            }),
            1
        );
    });

    it('works with Window nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(window, 'click', _ => {
                    result++;
                });
                dom.query(window)
                    .triggerEvent('click');
                return result;
            }),
            1
        );
    });

});