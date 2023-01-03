import assert from 'node:assert/strict';
import { testNoAnimation, waitFor } from './../../../helpers.js';
import { exec } from './../../../setup.js';

describe('QuerySet #remove', function() {
    beforeEach(async function() {
        await exec((_) => {
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
            await exec((_) => {
                $('a')
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
            '</div>',
        );
    });

    it('removes events', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const nodes = document.querySelectorAll('a');
                $.addEvent('a', 'click', (_) => {
                    result++;
                });
                $('a')
                    .remove();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                $.triggerEvent(
                    'a',
                    'click',
                );
                return result;
            }),
            0,
        );
    });

    it('removes events recursively', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const nodes = document.querySelectorAll('a');
                $.addEvent('a', 'click', (_) => {
                    result++;
                });
                $('div')
                    .remove();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                $.triggerEvent(
                    'a',
                    'click',
                );
                return result;
            }),
            0,
        );
    });

    it('removes data', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const nodes = document.querySelectorAll('a');
                $.setData('a', 'test', 'Test');
                $('a')
                    .remove();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                return [...nodes]
                    .map((node) =>
                        $.getData(node, 'test'),
                    );
            }),
            [
                null,
                null,
                null,
                null,
            ],
        );
    });

    it('removes data recursively', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const nodes = document.querySelectorAll('a');
                $.setData('a', 'test', 'Test');
                $('div')
                    .remove();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                return [...nodes]
                    .map((node) =>
                        $.getData(node, 'test'),
                    );
            }),
            [
                null,
                null,
                null,
                null,
            ],
        );
    });

    it('removes animations', async function() {
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
                const nodes = document.querySelectorAll('a');
                $('a')
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
                const nodes = document.querySelectorAll('a');
                $('div')
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
                const nodes = document.querySelectorAll('a');
                $('a')
                    .remove();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
        }).then(waitFor(100)).then(async (_) => {
            assert.strictEqual(
                await exec((_) => document.body.innerHTML),
                '<div id="outer1">' +
                '<div id="inner1"></div>' +
                '</div>' +
                '<div id="outer2">' +
                '<div id="inner2"></div>' +
                '</div>' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>',
            );
        });
    });

    it('removes queue recursively', async function() {
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
                const nodes = document.querySelectorAll('a');
                $('div')
                    .remove();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
        }).then(waitFor(100)).then(async (_) => {
            assert.strictEqual(
                await exec((_) => document.body.innerHTML),
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>',
            );
        });
    });

    it('triggers a remove event', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                $.addEvent('a', 'remove', (_) => {
                    result++;
                });
                $('a')
                    .remove();
                return result;
            }),
            4,
        );
    });

    it('triggers a remove event recursively', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                $.addEvent('a', 'remove', (_) => {
                    result++;
                });
                $('div')
                    .remove();
                return result;
            }),
            4,
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('a');
                return query === query.remove();
            }),
            true,
        );
    });
});
