const assert = require('assert');
const { exec } = require('../../../setup');
const { testNoAnimation, waitFor } = require('../../../helpers');

describe('QuerySetImmutable #remove', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="outer1">' +
                '<div id="inner1">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '</div>' +
                '<div id="outer2">' +
                '<div id="inner2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>';
        });
    });

    it('removes all nodes from the DOM', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.query('a')
                    .remove();
                return document.body.innerHTML;
            }),
            '<div id="outer1">' +
            '<div id="inner1">' +
            '</div>' +
            '</div>' +
            '<div id="outer2">' +
            '<div id="inner2">' +
            '</div>' +
            '</div>'
        );
    });

    it('removes events', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                const nodes = document.querySelectorAll('a');
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.query('a')
                    .remove();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                dom.triggerEvent(
                    'a',
                    'click'
                );
                return result;
            }),
            0
        );
    });

    it('removes events recursively', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                const nodes = document.querySelectorAll('a');
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.query('div')
                    .remove();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                dom.triggerEvent(
                    'a',
                    'click'
                );
                return result;
            }),
            0
        );
    });

    it('removes data', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const nodes = document.querySelectorAll('a');
                dom.setData('a', 'test', 'Test');
                dom.query('a')
                    .remove();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                return [...nodes]
                    .map(node =>
                        dom.getData(node, 'test')
                    );
            }),
            [
                null,
                null,
                null,
                null
            ]
        );
    });

    it('removes data recursively', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const nodes = document.querySelectorAll('a');
                dom.setData('a', 'test', 'Test');
                dom.query('div')
                    .remove();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                return [...nodes]
                    .map(node =>
                        dom.getData(node, 'test')
                    );
            }),
            [
                null,
                null,
                null,
                null
            ]
        );
    });

    it('removes animations', async function() {
        await exec(_ => {
            dom.animate(
                'a',
                _ => { },
                {
                    duration: 100,
                    debug: true
                }
            );
        }).then(waitFor(50)).then(async _ => {
            await exec(_ => {
                const nodes = document.querySelectorAll('a');
                dom.query('a')
                    .remove();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('removes animations recursively', async function() {
        await exec(_ => {
            dom.animate(
                'a',
                _ => { },
                {
                    duration: 100,
                    debug: true
                }
            );
        }).then(waitFor(50)).then(async _ => {
            await exec(_ => {
                const nodes = document.querySelectorAll('a');
                dom.query('div')
                    .remove();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('removes queue', async function() {
        await exec(_ => {
            dom.queue('a', _ =>
                new Promise(resolve =>
                    setTimeout(resolve, 100)
                )
            );
            dom.queue('a', node => {
                node.dataset.test = 'Test'
            });
        }).then(waitFor(50)).then(async _ => {
            await exec(_ => {
                const nodes = document.querySelectorAll('a');
                dom.query('a')
                    .remove();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
        }).then(waitFor(100)).then(async _ => {
            assert.strictEqual(
                await exec(_ => document.body.innerHTML),
                '<div id="outer1">' +
                '<div id="inner1"></div>' +
                '</div>' +
                '<div id="outer2">' +
                '<div id="inner2"></div>' +
                '</div>' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>'
            );
        });
    });

    it('removes queue recursively', async function() {
        await exec(_ => {
            dom.queue('a', _ =>
                new Promise(resolve =>
                    setTimeout(resolve, 100)
                )
            );
            dom.queue('a', node => {
                node.dataset.test = 'Test'
            });
        }).then(waitFor(50)).then(async _ => {
            await exec(_ => {
                const nodes = document.querySelectorAll('a');
                dom.query('div')
                    .remove();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
        }).then(waitFor(100)).then(async _ => {
            assert.strictEqual(
                await exec(_ => document.body.innerHTML),
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>'
            );
        });
    });

    it('triggers a remove event', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'remove', _ => {
                    result++;
                });
                dom.query('a')
                    .remove();
                return result;
            }),
            4
        );
    });

    it('triggers a remove event recursively', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'remove', _ => {
                    result++;
                });
                dom.query('div')
                    .remove();
                return result;
            }),
            4
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query1 = dom.query('a');
                const query2 = query1.remove();
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

});