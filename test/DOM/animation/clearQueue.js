const assert = require('assert').strict;
const { exec } = require('../../setup');
const { waitFor } = require('../../helpers');

describe('#clearQueue', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>';
        });
    });

    it('clears the queue for each node', async function() {
        await exec(_ => {
            dom.queue(
                '.queue',
                node => {
                    node.dataset.test = 'Test'
                }
            );
            dom.clearQueue(
                '.queue'
            );
        }).then(waitFor(100)).then(async _ => {
            assert.equal(
                await exec(_ => {
                    return document.body.innerHTML;
                }),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>'
            );
        });
    });

    it('clears future queued items', async function() {
        await exec(_ => {
            dom.queue(
                '.queue',
                _ => {
                    return new Promise(resolve =>
                        setTimeout(resolve, 100)
                    );
                }
            );
            dom.queue(
                '.queue',
                node => {
                    node.dataset.test = 'Test'
                }
            );
        }).then(waitFor(50)).then(async _ => {
            await exec(_ => {
                dom.clearQueue(
                    '.queue'
                );
            });
            assert.equal(
                await exec(_ => {
                    return document.body.innerHTML;
                }),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>'
            );
        }).then(waitFor(100)).then(async _ => {
            assert.equal(
                await exec(_ => {
                    return document.body.innerHTML;
                }),
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
                '.queue',
                node => {
                    node.dataset.test = 'Test'
                }
            );
            dom.clearQueue(
                document.getElementById('test2')
            );
        }).then(waitFor(100)).then(async _ => {
            assert.equal(
                await exec(_ => {
                    return document.body.innerHTML;
                }),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue" data-test="Test"></div>'
            );
        });
    });

    it('works with NodeList nodes', async function() {
        await exec(_ => {
            dom.queue(
                '.queue',
                node => {
                    node.dataset.test = 'Test'
                }
            );
            dom.clearQueue(
                document.querySelectorAll('.queue')
            );
        }).then(waitFor(100)).then(async _ => {
            assert.equal(
                await exec(_ => {
                    return document.body.innerHTML;
                }),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>'
            );
        });
    });

    it('works with HTMLCollection nodes', async function() {
        await exec(_ => {
            dom.queue(
                '.queue',
                node => {
                    node.dataset.test = 'Test'
                }
            );
            dom.clearQueue(
                document.body.children
            );
        }).then(waitFor(100)).then(async _ => {
            assert.equal(
                await exec(_ => {
                    return document.body.innerHTML;
                }),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>'
            );
        });
    });

    it('works with array nodes', async function() {
        await exec(_ => {
            dom.queue(
                '.queue',
                node => {
                    node.dataset.test = 'Test'
                }
            );
            dom.clearQueue(
                [
                    document.getElementById('test2'),
                    document.getElementById('test4')
                ]
            );
        }).then(waitFor(100)).then(async _ => {
            assert.equal(
                await exec(_ => {
                    return document.body.innerHTML;
                }),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>'
            );
        });
    });

});