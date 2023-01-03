import assert from 'node:assert/strict';
import { easeInOut, testAnimation, testNoAnimation, waitFor } from './../../../helpers.js';
import { exec } from './../../../setup.js';

describe('#detach', function() {
    beforeEach(async function() {
        await exec((_) => {
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
            await exec((_) => {
                $.detach('a');
                return document.body.innerHTML;
            }),
            '<div id="parent1"></div>' +
            '<div id="parent2"></div>',
        );
    });

    it('returns detached nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.detach('a')
                    .map((node) => node.id),
            ),
            [
                'test1',
                'test2',
                'test3',
                'test4',
            ],
        );
    });

    it('does not remove events', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                $.addEvent('a', 'click', (_) => {
                    result++;
                });
                const nodes = $.detach('a');
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                $.triggerEvent('a', 'click');
                return result;
            }),
            4,
        );
    });

    it('does not remove data', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.setData('a', 'test', 'Test');
                const nodes = $.detach('a');
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                return nodes.map((node) =>
                    $.getData(node, 'test'),
                );
            }),
            [
                'Test',
                'Test',
                'Test',
                'Test',
            ],
        );
    });

    it('does not remove animations', async function() {
        await exec((_) => {
            $.animate(
                'a',
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );
        }).then(waitFor(50)).then(async (_) => {
            await exec((_) => {
                const nodes = $.detach('a');
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
            await testAnimation('#test1', easeInOut, 100);
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test3', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('does not remove queue', async function() {
        await exec((_) => {
            $.queue('a', (_) =>
                new Promise((resolve) =>
                    setTimeout(resolve, 100),
                ),
            );
            $.queue('a', (node) => {
                node.dataset.test = 'Test';
            });
        }).then(waitFor(50)).then(async (_) => {
            await exec((_) => {
                const nodes = $.detach('a');
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
        }).then(waitFor(100)).then(async (_) => {
            assert.strictEqual(
                await exec((_) => document.body.innerHTML),
                '<div id="parent1"></div>' +
                '<div id="parent2"></div>' +
                '<a href="#" id="test1" data-test="Test">Test</a>' +
                '<a href="#" id="test2" data-test="Test">Test</a>' +
                '<a href="#" id="test3" data-test="Test">Test</a>' +
                '<a href="#" id="test4" data-test="Test">Test</a>',
            );
        });
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.detach(
                    document.getElementById('test1'),
                );
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<a href="#" id="test2">Test</a>' +
            '</div>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>',
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.detach(
                    document.querySelectorAll('a'),
                );
                return document.body.innerHTML;
            }),
            '<div id="parent1"></div>' +
            '<div id="parent2"></div>',
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.detach(
                    document.body.children,
                );
                return document.body.innerHTML;
            }),
            '',
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.detach([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                    document.getElementById('test3'),
                    document.getElementById('test4'),
                ]);
                return document.body.innerHTML;
            }),
            '<div id="parent1"></div>' +
            '<div id="parent2"></div>',
        );
    });
});
