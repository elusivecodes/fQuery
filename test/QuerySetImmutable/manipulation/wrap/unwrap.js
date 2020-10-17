const assert = require('assert');
const { exec } = require('../../../setup');
const { testNoAnimation, waitFor } = require('../../../helpers');

describe('QuerySetImmutable #unwrap', function() {

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

    it('unwraps each node', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.query('a')
                    .unwrap();
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>'
        );
    });

    it('unwraps each node with filter', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.query('a')
                    .unwrap('#parent1');
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>'
        );
    });

    it('removes events', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                const nodes = document.querySelectorAll('div');
                dom.addEvent('div', 'click', _ => {
                    result++;
                });
                dom.query('a')
                    .unwrap();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                dom.triggerEvent('div', 'click');
                return result;
            }),
            0
        );
    });

    it('removes data', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const nodes = document.querySelectorAll('div');
                dom.setData('div', 'test', 'Test');
                dom.query('a')
                    .unwrap();
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
                null
            ]
        );
    });

    it('removes animations', async function() {
        await exec(_ => {
            dom.animate(
                'div',
                _ => { },
                {
                    duration: 100,
                    debug: true
                }
            );
        }).then(waitFor(50)).then(async _ => {
            await exec(_ => {
                const nodes = document.querySelectorAll('div');
                dom.query('a')
                    .unwrap();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
            await testNoAnimation('#parent1');
            await testNoAnimation('#parent2');
        });
    });

    it('removes queue', async function() {
        await exec(_ => {
            dom.queue('div', _ =>
                new Promise(resolve =>
                    setTimeout(resolve, 100)
                )
            );
            dom.queue('div', node => {
                node.dataset.test = 'Test'
            });
        }).then(waitFor(50)).then(async _ => {
            await exec(_ => {
                const nodes = document.querySelectorAll('div');
                dom.query('a')
                    .unwrap();
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
                '<a href="#" id="test4">Test</a>' +
                '<div id="parent1">' +
                '</div>' +
                '<div id="parent2">' +
                '</div>'
            );
        });
    });

    it('triggers a remove event', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('div', 'remove', _ => {
                    result++;
                });
                dom.query('a')
                    .unwrap();
                return result;
            }),
            2
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.query('a');
                return query === query.unwrap();
            }),
            true
        );
    });

    it('works with function filter', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.query('a')
                    .unwrap(
                        node => node.id === 'parent1'
                    );
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>'
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.query('a')
                    .unwrap(
                        document.getElementById('parent1')
                    );
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>'
        );
    });

    it('works with NodeList filter', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.query('a')
                    .unwrap(
                        document.querySelectorAll('#parent1')
                    );
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>'
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.query('a')
                    .unwrap(
                        document.body.children
                    );
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>'
        );
    });

    it('works with array filter', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.query('a')
                    .unwrap([
                        document.getElementById('parent1')
                    ]);
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>'
        );
    });

    it('works with QuerySet filter', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.query('#parent1');
                dom.query('a')
                    .unwrap(query);
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>'
        );
    });

});