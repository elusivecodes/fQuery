const assert = require('assert').strict;
const { exec } = require('../../../setup');
const { testNoAnimation, waitFor } = require('../../../helpers');

describe('#unwrap', function() {

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
        assert.equal(
            await exec(_ => {
                dom.unwrap('a');
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>'
        );
    });

    it('unwraps each node with filter', async function() {
        assert.equal(
            await exec(_ => {
                dom.unwrap('a', '#parent1');
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
        assert.equal(
            await exec(_ => {
                let result = 0;
                const nodes = document.querySelectorAll('div');
                dom.addEvent(
                    'div',
                    'click',
                    _ => { result++; }
                );
                dom.unwrap('a');
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
        assert.deepEqual(
            await exec(_ => {
                const nodes = document.querySelectorAll('div');
                dom.setData('div', 'test', 'Test');
                dom.unwrap('a');
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
                dom.unwrap('a');
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
            dom.queue(
                'div',
                _ => {
                    return new Promise(resolve =>
                        setTimeout(resolve, 100)
                    );
                }
            );
            dom.queue(
                'div',
                node => {
                    node.dataset.test = 'Test'
                }
            );
        }).then(waitFor(50)).then(async _ => {
            await exec(_ => {
                const nodes = document.querySelectorAll('div');
                dom.unwrap('a');
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
        }).then(waitFor(100)).then(async _ => {
            assert.equal(
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
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'div',
                    'remove',
                    _ => { result++; }
                );
                dom.unwrap('a');
                return result;
            }),
            2
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.unwrap(
                    document.getElementById('test1'),
                    '#parent1'
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

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.unwrap(
                    document.querySelectorAll('a'),
                    '#parent1'
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

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.unwrap(
                    document.getElementById('parent1').children,
                    '#parent1'
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

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.unwrap([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                    document.getElementById('test3'),
                    document.getElementById('test4')
                ], '#parent1');
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

    it('works with function filter', async function() {
        assert.equal(
            await exec(_ => {
                dom.unwrap(
                    'a',
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
        assert.equal(
            await exec(_ => {
                dom.unwrap(
                    'a',
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
        assert.equal(
            await exec(_ => {
                dom.unwrap(
                    'a',
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
        assert.equal(
            await exec(_ => {
                dom.unwrap(
                    'a',
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
        assert.equal(
            await exec(_ => {
                dom.unwrap('a', [
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

});