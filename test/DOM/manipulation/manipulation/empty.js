const assert = require('assert').strict;
const { exec } = require('../../../setup');
const { testNoAnimation, waitFor } = require('../../../helpers');

describe('#empty', function() {

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
        assert.equal(
            await exec(_ => {
                dom.empty(
                    'div'
                );
                return document.body.innerHTML;
            }),
            '<div id="outer1"></div>' +
            '<div id="outer2"></div>'
        );
    });

    it('removes events recursively', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const nodes = document.querySelectorAll('a');
                dom.addEvent(
                    'a',
                    'click',
                    _ => { result++; }
                );
                dom.empty(
                    'div'
                );
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
        assert.deepEqual(
            await exec(_ => {
                const nodes = document.querySelectorAll('a');
                dom.setData(
                    'a',
                    'test',
                    'Test'
                );
                dom.empty(
                    'div'
                );
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
                dom.empty('div');
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
            dom.queue(
                'a',
                _ => {
                    return new Promise(resolve =>
                        setTimeout(resolve, 100)
                    );
                }
            );
            dom.queue(
                'a',
                node => {
                    node.dataset.test = 'Test'
                }
            );
        }).then(waitFor(50)).then(async _ => {
            await exec(_ => {
                const nodes = document.querySelectorAll('a');
                dom.empty('div');
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
        }).then(waitFor(100)).then(async _ => {
            assert.equal(
                await exec(_ => {
                    return document.body.innerHTML;
                }),
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
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'remove',
                    _ => { result++; }
                );
                dom.empty('div');
                return result;
            }),
            4
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.empty(
                    document.getElementById('outer1')
                );
                return document.body.innerHTML;
            }),
            '<div id="outer1"></div>' +
            '<div id="outer2">' +
            '<div id="inner2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>' +
            '</div>'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.empty(
                    document.querySelectorAll('div')
                );
                return document.body.innerHTML;
            }),
            '<div id="outer1"></div>' +
            '<div id="outer2"></div>'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.empty(
                    document.body.children
                );
                return document.body.innerHTML;
            }),
            '<div id="outer1"></div>' +
            '<div id="outer2"></div>'
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.equal(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>'
                );
                dom.empty(
                    fragment
                );
                document.body.innerHTML = '';
                document.body.appendChild(fragment);
                return document.body.innerHTML;
            }),
            ''
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.equal(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>'
                );
                shadow.appendChild(fragment);
                dom.empty(shadow);
                return shadow.innerHTML;
            }),
            ''
        );
    });

    it('works with Document nodes', async function() {
        assert.equal(
            await exec(_ => {
                const parser = new DOMParser();
                const myDoc = parser.parseFromString(
                    '<html></html>',
                    'text/html'
                );
                dom.empty(myDoc);
                return myDoc.childNodes.length
            }),
            0
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.empty(
                    [
                        document.getElementById('outer1'),
                        document.getElementById('outer2')
                    ]
                );
                return document.body.innerHTML;
            }),
            '<div id="outer1"></div>' +
            '<div id="outer2"></div>'
        );
    });

});