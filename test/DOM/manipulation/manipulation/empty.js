import assert from 'node:assert/strict';
import { testNoAnimation, waitFor } from './../../../helpers.js';
import { exec } from './../../../setup.js';

describe('#empty', function() {
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

    it('removes contents of all nodes from the DOM', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.empty('div');
                return document.body.innerHTML;
            }),
            '<div id="outer1"></div>' +
            '<div id="outer2"></div>',
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
                $.empty('div');
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                $.triggerEvent('a', 'click');
                return result;
            }),
            0,
        );
    });

    it('removes data recursively', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const nodes = document.querySelectorAll('a');
                $.setData('a', 'test', 'Test');
                $.empty('div');
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
                $.empty('div');
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
                $.empty('div');
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
        }).then(waitFor(100)).then(async (_) => {
            assert.strictEqual(
                await exec((_) => document.body.innerHTML),
                '<div id="outer1">' +
                '</div>' +
                '<div id="outer2">' +
                '</div>' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>',
            );
        });
    });

    it('triggers a remove event recursively', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                $.addEvent('a', 'remove', (_) => {
                    result++;
                });
                $.empty('div');
                return result;
            }),
            4,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.empty(
                    document.getElementById('outer1'),
                );
                return document.body.innerHTML;
            }),
            '<div id="outer1"></div>' +
            '<div id="outer2">' +
            '<div id="inner2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>' +
            '</div>',
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.empty(
                    document.querySelectorAll('div'),
                );
                return document.body.innerHTML;
            }),
            '<div id="outer1"></div>' +
            '<div id="outer2"></div>',
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.empty(
                    document.body.children,
                );
                return document.body.innerHTML;
            }),
            '<div id="outer1"></div>' +
            '<div id="outer2"></div>',
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>',
                );
                $.empty(fragment);
                document.body.innerHTML = '';
                document.body.appendChild(fragment);
                return document.body.innerHTML;
            }),
            '',
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>',
                );
                shadow.appendChild(fragment);
                $.empty(shadow);
                return shadow.innerHTML;
            }),
            '',
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const parser = new DOMParser();
                const myDoc = parser.parseFromString(
                    '<html></html>',
                    'text/html',
                );
                $.empty(myDoc);
                return myDoc.childNodes.length;
            }),
            0,
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.empty([
                    document.getElementById('outer1'),
                    document.getElementById('outer2'),
                ]);
                return document.body.innerHTML;
            }),
            '<div id="outer1"></div>' +
            '<div id="outer2"></div>',
        );
    });
});
