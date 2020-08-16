const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#triggerOne', function() {

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
                dom.addEvent(
                    'a',
                    'click',
                    _ => { result++; }
                );
                dom.triggerOne('a', 'click');
                return result;
            }),
            1
        );
    });

    it('triggers a namespaced event for the first node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'click.test',
                    _ => { result++; }
                );
                dom.triggerOne('a', 'click');
                return result;
            }),
            1
        );
    });

    it('triggers a deep namespaced event for the first node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'click.test.deep',
                    _ => { result++; }
                );
                dom.triggerOne('a', 'click');
                return result;
            }),
            1
        );
    });

    it('triggers a namespaced event with namespacing for the first node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'click.test',
                    _ => { result++; }
                );
                dom.triggerOne('a', 'click.test');
                return result;
            }),
            1
        );
    });

    it('triggers a deep namespaced event with namespacing for the first node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'click.test.deep',
                    _ => { result++; }
                );
                dom.triggerOne('a', 'click.test');
                return result;
            }),
            1
        );
    });

    it('triggers a deep namespaced event with deep namespacing for the first node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'click.test.deep',
                    _ => { result++; }
                );
                dom.triggerOne('a', 'click.test.deep');
                return result;
            }),
            1
        );
    });

    it('does not trigger an event without namespacing for the first node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'click',
                    _ => { result++; }
                );
                dom.triggerOne('a', 'click.test');
                return result;
            }),
            0
        );
    });

    it('does not trigger a namespaced event with deep namespacing for the first node', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'click.test',
                    _ => { result++; }
                );
                dom.triggerOne('a', 'click.test.deep');
                return result;
            }),
            0
        );
    });

    it('triggers an event for the first node with custom data', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'click',
                    e => {
                        if (e.detail === 'test') {
                            result++;
                        }
                    }
                );
                dom.triggerOne('a', 'click');
                dom.triggerOne('a', 'click', { detail: 'test' });
                return result;
            }),
            1
        );
    });

    it('bubbles to other event listeners', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    '#div1',
                    'click',
                    _ => {
                        result++;
                    }
                );
                dom.triggerOne('a', 'click');
                return result;
            }),
            1
        );
    });

    it('can be prevented from bubbling', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    '#div1',
                    'click',
                    _ => {
                        result++;
                    }
                );
                dom.triggerOne('a', 'click', {
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
                dom.addEvent(
                    '#test1',
                    'click',
                    e => {
                        e.preventDefault();
                    }
                );
                return dom.triggerOne('#test1', 'click');
            }),
            false
        );
    });

    it('returns true if the event is not cancelled', async function() {
        assert.equal(
            await exec(_ => {
                dom.addEvent(
                    '#test1',
                    'click',
                    e => { }
                );
                return dom.triggerOne('#test1', 'click');
            }),
            true
        );
    });

    it('can be prevented from being cancelled', async function() {
        assert.equal(
            await exec(_ => {
                dom.addEvent(
                    '#test1',
                    'click',
                    e => {
                        e.preventDefault();
                    }
                );
                return dom.triggerOne('#test1', 'click', {
                    cancelable: false
                });
            }),
            true
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'click',
                    _ => { result++; }
                );
                dom.triggerOne(
                    document.getElementById('test1'),
                    'click'
                );
                return result;
            }),
            1
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'click',
                    _ => { result++; }
                );
                dom.triggerOne(
                    document.querySelectorAll('a'),
                    'click'
                );
                return result;
            }),
            1
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'click',
                    _ => { result++; }
                );
                dom.triggerOne(
                    document.getElementById('div1').children,
                    'click'
                );
                return result;
            }),
            1
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                dom.addEvent(
                    shadow,
                    'click',
                    _ => { result++; }
                );
                dom.triggerOne(shadow, 'click');
                return result;
            }),
            1
        );
    });

    it('works with Document nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    document,
                    'click',
                    _ => { result++; }
                );
                dom.triggerOne(document, 'click');
                return result;
            }),
            1
        );
    });

    it('works with Window nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    window,
                    'click',
                    _ => { result++; }
                );
                dom.triggerOne(window, 'click');
                return result;
            }),
            1
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'click',
                    _ => { result++; }
                );
                dom.triggerOne([
                    document.getElementById('test1'),
                    document.getElementById('test2')
                ], 'click');
                return result;
            }),
            1
        );
    });

});