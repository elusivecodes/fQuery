const assert = require('assert').strict;
const { exec } = require('../../setup');
const { waitFor } = require('../../helpers');

describe('#queue', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>';
        });
    });

    it('queues a callback for each node', async function() {
        await exec(_ => {
            dom.queue('.queue', node => {
                node.dataset.test = 'Test'
            });
        }).then(waitFor(100)).then(async _ => {
            assert.equal(
                await exec(_ => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue" data-test="Test"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue" data-test="Test"></div>'
            );
        });
    });

    it('does not execute the callback immediately', async function() {
        await exec(_ => {
            dom.queue('.queue', node => {
                node.dataset.test = 'Test'
            });
        });
        assert.equal(
            await exec(_ => document.body.innerHTML),
            '<div id="test1"></div>' +
            '<div id="test2" class="queue"></div>' +
            '<div id="test3"></div>' +
            '<div id="test4" class="queue"></div>'
        );
    });

    it('only executes callbacks after the previous item is resolved', async function() {
        await exec(_ => {
            dom.queue('.queue', _ =>
                new Promise(resolve =>
                    setTimeout(resolve, 100)
                )
            );
            dom.queue('.queue', node => {
                node.dataset.test = 'Test'
            });
        }).then(waitFor(50)).then(async _ => {
            assert.equal(
                await exec(_ => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>'
            );
        }).then(waitFor(100)).then(async _ => {
            assert.equal(
                await exec(_ => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue" data-test="Test"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue" data-test="Test"></div>'
            );
        });
    });

    it('does not continue the queue if an item is rejected', async function() {
        await exec(_ => {
            dom.queue('.queue', _ =>
                new Promise((_, reject) =>
                    setTimeout(reject, 100)
                )
            );
            dom.queue('.queue', node => {
                node.dataset.test = 'Test'
            });
        }).then(waitFor(50)).then(async _ => {
            assert.equal(
                await exec(_ => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>'
            );
        }).then(waitFor(100)).then(async _ => {
            assert.equal(
                await exec(_ => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>'
            );
        });
    });

    it('works with HTMLElement nodes', async function() {
        await exec(_ => {
            dom.queue(
                document.getElementById('test2'),
                node => {
                    node.dataset.test = 'Test'
                }
            );
        }).then(waitFor(100)).then(async _ => {
            assert.equal(
                await exec(_ => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue" data-test="Test"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>'
            );
        });
    });

    it('works with NodeList nodes', async function() {
        await exec(_ => {
            dom.queue(
                document.querySelectorAll('.queue'),
                node => {
                    node.dataset.test = 'Test'
                }
            );
        }).then(waitFor(100)).then(async _ => {
            assert.equal(
                await exec(_ => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue" data-test="Test"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue" data-test="Test"></div>'
            );
        });
    });

    it('works with HTMLCollection nodes', async function() {
        await exec(_ => {
            dom.queue(
                document.body.children,
                node => {
                    node.dataset.test = 'Test'
                }
            );
        }).then(waitFor(100)).then(async _ => {
            assert.equal(
                await exec(_ => document.body.innerHTML),
                '<div id="test1" data-test="Test"></div>' +
                '<div id="test2" class="queue" data-test="Test"></div>' +
                '<div id="test3" data-test="Test"></div>' +
                '<div id="test4" class="queue" data-test="Test"></div>'
            );
        });
    });

    it('works with array nodes', async function() {
        await exec(_ => {
            dom.queue([
                document.getElementById('test2'),
                document.getElementById('test4')
            ], node => {
                node.dataset.test = 'Test'
            });
        }).then(waitFor(100)).then(async _ => {
            assert.equal(
                await exec(_ => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue" data-test="Test"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue" data-test="Test"></div>'
            );
        });
    });

});