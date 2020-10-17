const assert = require('assert');
const { exec } = require('../../../setup');
const { easeInOut, testAnimation, testNoAnimation, waitFor } = require('../../../helpers');

describe('QuerySetImmutable #detach', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent1">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>';
        });
    });

    it('detaches all nodes from the DOM', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.query('a')
                    .detach();
                return document.body.innerHTML;
            }),
            '<div id="parent1"></div>' +
            '<div id="parent2"></div>'
        );
    });

    it('returns detached nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                return dom.query('a')
                    .detach()
                    .get()
                    .map(node => node.id);
            }),
            [
                'test1',
                'test2',
                'test3',
                'test4'
            ]
        );
    });

    it('does not remove events', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                const nodes = dom.query('a')
                    .detach()
                    .get();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                dom.triggerEvent(
                    'a',
                    'click'
                );
                return result;
            }),
            4
        );
    });

    it('does not remove data', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                dom.setData('a', 'test', 'Test');
                const nodes = dom.query('a')
                    .detach()
                    .get();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                return nodes.map(node =>
                    dom.getData(node, 'test')
                );
            }),
            [
                'Test',
                'Test',
                'Test',
                'Test'
            ]
        );
    });

    it('does not remove animations', async function() {
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
                const nodes = dom.query('a')
                    .detach()
                    .get();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
            await testAnimation('#test1', easeInOut, 100);
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test3', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('does not remove queue', async function() {
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
                const nodes = dom.query('a')
                    .detach()
                    .get();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
        }).then(waitFor(100)).then(async _ => {
            assert.strictEqual(
                await exec(_ => document.body.innerHTML),
                '<div id="parent1"></div>' +
                '<div id="parent2"></div>' +
                '<a href="#" id="test1" data-test="Test">Test</a>' +
                '<a href="#" id="test2" data-test="Test">Test</a>' +
                '<a href="#" id="test3" data-test="Test">Test</a>' +
                '<a href="#" id="test4" data-test="Test">Test</a>'
            );
        });
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.query('a');
                return query === query.detach();
            }),
            true
        );
    });

});