const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #triggerOne', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '</div>';
        });
    });

    it('triggers an event for the first node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .triggerOne('click');
                return result;
            }),
            1
        );
    });

    it('triggers a namespaced event for the first node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .triggerOne('click');
                return result;
            }),
            1
        );
    });

    it('triggers a deep namespaced event for the first node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test.deep', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .triggerOne('click');
                return result;
            }),
            1
        );
    });

    it('triggers a namespaced event with namespacing for the first node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .triggerOne('click.test');
                return result;
            }),
            1
        );
    });

    it('triggers a deep namespaced event with namespacing for the first node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test.deep', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .triggerOne('click.test');
                return result;
            }),
            1
        );
    });

    it('triggers a deep namespaced event with deep namespacing for the first node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test.deep', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .triggerOne('click.test.deep');
                return result;
            }),
            1
        );
    });

    it('does not trigger an event without namespacing for the first node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .triggerOne('click.test');
                return result;
            }),
            0
        );
    });

    it('does not trigger a namespaced event with deep namespacing for the first node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click.test', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .triggerOne('click.test.deep');
                return result;
            }),
            0
        );
    });

    it('triggers an event for the first node with custom data', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click', e => {
                    if (e.detail === 'test') {
                        result++;
                    }
                });
                dom.queryMutable('a')
                    .triggerOne('click');
                dom.queryMutable('a')
                    .triggerOne('click', {
                        detail: 'test'
                    });
                return result;
            }),
            1
        );
    });

    it('bubbles to other event listeners', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('#div1', 'click', _ => {
                    result++;
                });
                dom.queryMutable('a')
                    .triggerOne('click');
                return result;
            }),
            1
        );
    });

    it('can be prevented from bubbling', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('#div1', 'click',
                    _ => {
                        result++;
                    });
                dom.queryMutable('a')
                    .triggerOne('click', {
                        bubbles: false
                    });
                return result;
            }),
            0
        );
    });

    it('returns false if the event is cancelled', async function() {
        assert.equal(
            await exec(_ => {
                dom.addEvent('#test1', 'click', e => {
                    e.preventDefault();
                });
                return dom.queryMutable('#test1')
                    .triggerOne('click');
            }),
            false
        );
    });

    it('returns false if the event returns false', async function() {
        assert.equal(
            await exec(_ => {
                dom.addEvent('#test1', 'click', _ => false);
                return dom.queryMutable('#test1')
                    .triggerOne('click');
            }),
            false
        );
    });

    it('returns false if a delegated event returns false', async function() {
        assert.equal(
            await exec(_ => {
                dom.addEventDelegate('#div1', 'click', 'a', _ => false);
                return dom.queryMutable('#test1')
                    .triggerOne('click');
            }),
            false
        );
    });

    it('returns true if the event is not cancelled', async function() {
        assert.equal(
            await exec(_ => {
                dom.addEvent('#test1', 'click', _ => { });
                return dom.queryMutable('#test1')
                    .triggerOne('click');
            }),
            true
        );
    });

    it('returns true if a delegated event is not cancelled', async function() {
        assert.equal(
            await exec(_ => {
                dom.addEventDelegate('#div1', 'click', 'a', _ => { });
                return dom.queryMutable('#test1')
                    .triggerOne('click');
            }),
            true
        );
    });

    it('can be prevented from being cancelled', async function() {
        assert.equal(
            await exec(_ => {
                dom.addEvent('#test1', 'click', e => {
                    e.preventDefault();
                });
                return dom.queryMutable('#test1')
                    .triggerOne('click', {
                        cancelable: false
                    });
            }),
            true
        );
    });

    it('can be prevented from being cancelled with delegate', async function() {
        assert.equal(
            await exec(_ => {
                dom.addEventDelegate('#div1', 'click', 'a', e => {
                    e.preventDefault();
                });
                return dom.queryMutable('#test1')
                    .triggerOne('click', {
                        cancelable: false
                    });
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
                dom.queryMutable(shadow)
                    .triggerOne('click');
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
                dom.queryMutable(document)
                    .triggerOne('click');
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
                dom.queryMutable(window)
                    .triggerOne('click');
                return result;
            }),
            1
        );
    });
});