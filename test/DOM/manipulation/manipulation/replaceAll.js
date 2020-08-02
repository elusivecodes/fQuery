const assert = require('assert').strict;
const { exec } = require('../../../setup');
const { easeInOut, testAnimation, testNoAnimation, waitFor } = require('../../../helpers');

describe('#replaceAll', function() {

    beforeEach(async function() {
        await exec(_ => {
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

    it('replaces each other node with nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceAll(
                    'a',
                    'div'
                );
                return document.body.innerHTML;
            }),
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>'
        );
    });

    it('removes events from other nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const nodes = document.querySelectorAll('div');
                dom.addEvent(
                    'div',
                    'click',
                    _ => { result++; }
                );
                dom.replaceAll(
                    'a',
                    'div'
                );
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                dom.triggerEvent(
                    'div',
                    'click'
                );
                return result;
            }),
            0
        );
    });

    it('does not remove events for nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'click',
                    _ => { result++; }
                );
                dom.replaceAll(
                    'a',
                    'div'
                );
                dom.triggerEvent(
                    'a',
                    'click'
                );
                return result;
            }),
            8
        );
    });

    it('removes data from other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const nodes = document.querySelectorAll('div');
                dom.setData(
                    'div',
                    'test',
                    'Test'
                );
                dom.replaceAll(
                    'a',
                    'div'
                );
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                return [...document.querySelectorAll('div')]
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

    it('does not remove data for nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setData(
                    'a',
                    'test',
                    'Test'
                );
                dom.replaceAll(
                    'a',
                    'div'
                );
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

    it('removes animations from other nodes', async function() {
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
                dom.replaceAll(
                    'a',
                    'div'
                );
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

    it('does not remove animations for nodes', async function() {
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
                const nodes = document.querySelectorAll('div');
                dom.replaceAll(
                    'a',
                    'div'
                );
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
            await testAnimation('a:nth-of-type(1)', easeInOut, 100);
            await testAnimation('a:nth-of-type(2)', easeInOut, 100);
            await testAnimation('a:nth-of-type(3)', easeInOut, 100);
            await testAnimation('a:nth-of-type(4)', easeInOut, 100);
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('a:nth-of-type(1)');
            await testNoAnimation('a:nth-of-type(2)');
            await testNoAnimation('a:nth-of-type(3)');
            await testNoAnimation('a:nth-of-type(4)');
        });
    });

    it('does not clone for the last nodes', async function() {
        assert.equal(
            await exec(_ => {
                const nodes = [...document.querySelectorAll('a')];
                dom.replaceAll(
                    'a',
                    'div'
                );
                const newNodes = [...document.querySelectorAll('a')].slice(4);
                return nodes.every((node, i) => node.isSameNode(newNodes[i]));
            }),
            true
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceAll(
                    document.querySelector('.inner1'),
                    'div'
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
            '</div>'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceAll(
                    document.querySelector('.outer1').children,
                    'div'
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
            '</div>'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceAll(
                    document.querySelectorAll('.inner1'),
                    'div'
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
            '</div>'
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.equal(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>'
                );
                dom.replaceAll(
                    fragment,
                    'a'
                );
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
            '</div>'
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceAll(
                    [
                        document.querySelector('.inner1')
                    ],
                    'div'
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
            '</div>'
        );
    });

    it('works with HTML nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceAll(
                    '<div><span class="test">Test</span></div>',
                    'a'
                );
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
            '</div>'
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceAll(
                    'a',
                    document.querySelector('.inner2')
                );
                return document.body.innerHTML;
            }),
            '<div class="outer1">' +
            '<div class="inner1">' +
            '</div>' +
            '</div>' +
            '<div class="outer2">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>'
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceAll(
                    'a',
                    document.querySelectorAll('.inner2'),
                );
                return document.body.innerHTML;
            }),
            '<div class="outer1">' +
            '<div class="inner1">' +
            '</div>' +
            '</div>' +
            '<div class="outer2">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>'
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceAll(
                    'a',
                    document.querySelector('.outer2').children
                );
                return document.body.innerHTML;
            }),
            '<div class="outer1">' +
            '<div class="inner1">' +
            '</div>' +
            '</div>' +
            '<div class="outer2">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>'
        );
    });

    it('works with array other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceAll(
                    'a',
                    [
                        document.querySelector('.inner2')
                    ]
                );
                return document.body.innerHTML;
            }),
            '<div class="outer1">' +
            '<div class="inner1">' +
            '</div>' +
            '</div>' +
            '<div class="outer2">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>'
        );
    });

});