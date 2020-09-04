const assert = require('assert').strict;
const { exec } = require('../../../setup');
const { easeInOut, testAnimation, testNoAnimation, waitFor } = require('../../../helpers');

describe('QuerySetImmutable #after', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent1">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>';
        });
    });

    it('inserts each other node after each node', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('div')
                    .after('a');
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent2">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>'
        );
    });

    it('preserves events for other nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.query('div')
                    .after('a');
                dom.triggerEvent('a', 'click');
                return result;
            }),
            8
        );
    });

    it('preserves data for other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setData('a', 'test', 'Test');
                dom.query('div')
                    .after('a');
                return [...document.querySelectorAll('a')]
                    .map(node =>
                        dom.getData(node, 'test')
                    );
            }),
            [
                'Test',
                'Test',
                'Test',
                'Test',
                'Test',
                'Test',
                'Test',
                'Test'
            ]
        );
    });

    it('preserves animations for other nodes', async function() {
        await exec(_ => {
            dom.animate(
                'a',
                _ => { },
                {
                    duration: 100,
                    debug: true
                }
            );
            dom.query('div')
                .after('a');
        }).then(waitFor(50)).then(async _ => {
            await testAnimation('body > a:nth-of-type(1)', easeInOut, 100);
            await testAnimation('body > a:nth-of-type(2)', easeInOut, 100);
            await testAnimation('body > a:nth-of-type(3)', easeInOut, 100);
            await testAnimation('body > a:nth-of-type(4)', easeInOut, 100);
            await testAnimation('body > a:nth-of-type(5)', easeInOut, 100);
            await testAnimation('body > a:nth-of-type(6)', easeInOut, 100);
            await testAnimation('body > a:nth-of-type(7)', easeInOut, 100);
            await testAnimation('body > a:nth-of-type(8)', easeInOut, 100);
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('body > a:nth-of-type(1)');
            await testNoAnimation('body > a:nth-of-type(2)');
            await testNoAnimation('body > a:nth-of-type(3)');
            await testNoAnimation('body > a:nth-of-type(4)');
            await testNoAnimation('body > a:nth-of-type(5)');
            await testNoAnimation('body > a:nth-of-type(6)');
            await testNoAnimation('body > a:nth-of-type(7)');
            await testNoAnimation('body > a:nth-of-type(8)');
        });
    });

    it('does not clone for the last other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const nodes = [...document.querySelectorAll('a')];
                dom.query('div')
                    .after('a');
                const newNodes = [...document.querySelectorAll('a')].slice(4);
                return nodes.every((node, i) => node.isSameNode(newNodes[i]));
            }),
            true
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.query('div');
                return query === query.after('a');
            }),
            true
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('div')
                    .after(
                        document.querySelector('.test1')
                    );
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '<a href="#" class="test2">Test</a>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<div id="parent2">' +
            '<span></span>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>'
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('div')
                    .after(
                        document.querySelectorAll('a')
                    );
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent2">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>'
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('div')
                    .after(
                        document.getElementById('parent1').children
                    );
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '</div>' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<div id="parent2">' +
            '<span></span>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>'
        );
    });

    it('works with DocumentFragment other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>'
                );
                dom.query('div')
                    .after(fragment);
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '</div>' +
            '<div><span></span></div>' +
            '<div id="parent2">' +
            '<span></span>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>' +
            '<div><span></span></div>'
        );
    });

    it('works with array other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('div')
                    .after([
                        document.querySelector('.test1'),
                        document.querySelector('.test2'),
                        document.querySelector('.test3'),
                        document.querySelector('.test4')
                    ]);
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent2">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>'
        );
    });

    it('works with HTML other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('div')
                    .after('<div><span></span></div>');
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '</div>' +
            '<div><span></span></div>' +
            '<div id="parent2">' +
            '<span></span>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>' +
            '<div><span></span></div>'
        );
    });

    it('works with QuerySet other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.query('a');
                dom.query('div')
                    .after(query);
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent2">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>'
        );
    });

});