const assert = require('assert');
const { exec } = require('../../../setup');
const { testNoAnimation, waitFor } = require('../../../helpers');

describe('QuerySet #empty', function() {

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

    it('removes contents of all nodes from the DOM', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.queryMutable('div')
                    .empty();
                return document.body.innerHTML;
            }),
            '<div id="outer1"></div>' +
            '<div id="outer2"></div>'
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
                dom.queryMutable('div')
                    .empty();
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

    it('removes data recursively', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const nodes = document.querySelectorAll('a');
                dom.setData('a', 'test', 'Test');
                dom.queryMutable('div')
                    .empty();
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
                dom.queryMutable('div')
                    .empty();
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
                dom.queryMutable('div')
                    .empty();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
        }).then(waitFor(100)).then(async _ => {
            assert.strictEqual(
                await exec(_ => document.body.innerHTML),
                '<div id="outer1">' +
                '</div>' +
                '<div id="outer2">' +
                '</div>' +
                '<a href="#" id="test1"></a>' +
                '<a href="#" id="test2"></a>' +
                '<a href="#" id="test3"></a>' +
                '<a href="#" id="test4"></a>'
            );
        });
    });

    it('triggers a remove event recursively', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'remove', _ => {
                    result++;
                });
                dom.queryMutable('div')
                    .empty();
                return result;
            }),
            4
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.queryMutable('a');
                return query === query.empty();
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>'
                );
                dom.queryMutable(fragment)
                    .empty();
                document.body.innerHTML = '';
                document.body.appendChild(fragment);
                return document.body.innerHTML;
            }),
            ''
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>'
                );
                shadow.appendChild(fragment);
                dom.queryMutable(shadow)
                    .empty();
                return shadow.innerHTML;
            }),
            ''
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const parser = new DOMParser();
                const myDoc = parser.parseFromString(
                    '<html></html>',
                    'text/html'
                );
                dom.queryMutable(myDoc)
                    .empty();
                return myDoc.childNodes.length
            }),
            0
        );
    });

});