import assert from 'node:assert/strict';
import { easeInOut, testAnimation, testNoAnimation, waitFor } from './../../../helpers.js';
import { exec } from './../../../setup.js';

describe('QuerySet #replaceWith', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div class="outer1">' +
                '<div class="inner1">' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer2">' +
                '<div class="inner2">' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '</div>' +
                '</div>';
        });
    });

    it('replaces each node with other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .replaceWith('a');
                return document.body.innerHTML;
            }),
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>',
        );
    });

    it('removes events from nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const nodes = document.querySelectorAll('div');
                $.addEvent('div', 'click', (_) => {
                    result++;
                });
                $('div')
                    .replaceWith('a');
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                $.triggerEvent('div', 'click');
                return result;
            }),
            0,
        );
    });

    it('does not remove events for other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                $.addEvent('a', 'click', (_) => {
                    result++;
                });
                $('div')
                    .replaceWith('a');
                $.triggerEvent('a', 'click');
                return result;
            }),
            8,
        );
    });

    it('removes data from nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const nodes = document.querySelectorAll('div');
                $.setData('div', 'test', 'Test');
                $('div')
                    .replaceWith('a');
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

    it('does not remove data for other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.setData('a', 'test', 'Test');
                $('div')
                    .replaceWith('a');
                return [...document.querySelectorAll('a')]
                    .map((node) =>
                        $.getData(node, 'test'),
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
                'Test',
            ],
        );
    });

    it('removes animations from nodes', async function() {
        await exec((_) => {
            $.animate(
                'div',
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );
        }).then(waitFor(50)).then(async (_) => {
            await exec((_) => {
                const nodes = document.querySelectorAll('div');
                $('div')
                    .replaceWith('a');
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
            await testNoAnimation('.outer1');
            await testNoAnimation('.inner1');
            await testNoAnimation('.outer2');
            await testNoAnimation('.inner2');
        });
    });

    it('does not remove animations for other nodes', async function() {
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
                const nodes = document.querySelectorAll('div');
                $('div')
                    .replaceWith('a');
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
            await testAnimation('a:nth-of-type(1)', easeInOut, 100);
            await testAnimation('a:nth-of-type(2)', easeInOut, 100);
            await testAnimation('a:nth-of-type(3)', easeInOut, 100);
            await testAnimation('a:nth-of-type(4)', easeInOut, 100);
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('a:nth-of-type(1)');
            await testNoAnimation('a:nth-of-type(2)');
            await testNoAnimation('a:nth-of-type(3)');
            await testNoAnimation('a:nth-of-type(4)');
        });
    });

    it('removes queue from nodes', async function() {
        await exec((_) => {
            $.queue('div', (_) =>
                new Promise((resolve) =>
                    setTimeout(resolve, 100),
                ),
            );
            $.queue('div', (node) => {
                node.dataset.test = 'Test';
            });
        }).then(waitFor(50)).then(async (_) => {
            await exec((_) => {
                const nodes = document.querySelectorAll('div');
                $('div')
                    .replaceWith('a');
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
        }).then(waitFor(100)).then(async (_) => {
            assert.strictEqual(
                await exec((_) => document.body.innerHTML),
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '<div class="outer1"></div>' +
                '<div class="inner1"></div>' +
                '<div class="outer2"></div>' +
                '<div class="inner2"></div>',
            );
        });
    });

    it('triggers a remove event for nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                $.addEvent('div', 'remove', (_) => {
                    result++;
                });
                $('div')
                    .replaceWith('a');
                return result;
            }),
            4,
        );
    });

    it('does not clone for the last other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const nodes = [...document.querySelectorAll('a')];
                $('div')
                    .replaceWith('a');
                const newNodes = [...document.querySelectorAll('a')].slice(4);
                return nodes.every((node, i) => node.isSameNode(newNodes[i]));
            }),
            true,
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('div');
                return query === query.replaceWith('a');
            }),
            true,
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .replaceWith(
                        document.querySelector('.inner1'),
                    );
                return document.body.innerHTML;
            }),
            '<div class="inner1">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>' +
            '<div class="inner1">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>',
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .replaceWith(
                        document.querySelectorAll('.inner1'),
                    );
                return document.body.innerHTML;
            }),
            '<div class="inner1">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>' +
            '<div class="inner1">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>',
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .replaceWith(
                        document.querySelector('.outer1').children,
                    );
                return document.body.innerHTML;
            }),
            '<div class="inner1">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>' +
            '<div class="inner1">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>',
        );
    });

    it('works with DocumentFragment other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>',
                );
                $('a')
                    .replaceWith(fragment);
                return document.body.innerHTML;
            }),
            '<div class="outer1">' +
            '<div class="inner1">' +
            '<div><span></span></div>' +
            '<div><span></span></div>' +
            '</div>' +
            '</div>' +
            '<div class="outer2">' +
            '<div class="inner2">' +
            '<div><span></span></div>' +
            '<div><span></span></div>' +
            '</div>' +
            '</div>',
        );
    });

    it('works with array other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .replaceWith([
                        document.querySelector('.inner1'),
                    ]);
                return document.body.innerHTML;
            }),
            '<div class="inner1">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>' +
            '<div class="inner1">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>',
        );
    });

    it('works with HTML other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('a')
                    .replaceWith('<div><span class="test">Test</span></div>');
                return document.body.innerHTML;
            }),
            '<div class="outer1">' +
            '<div class="inner1">' +
            '<div><span class="test">Test</span></div>' +
            '<div><span class="test">Test</span></div>' +
            '</div>' +
            '</div>' +
            '<div class="outer2">' +
            '<div class="inner2">' +
            '<div><span class="test">Test</span></div>' +
            '<div><span class="test">Test</span></div>' +
            '</div>' +
            '</div>',
        );
    });

    it('works with QuerySet other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('a');
                $('div')
                    .replaceWith(query);
                return document.body.innerHTML;
            }),
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>',
        );
    });
});
