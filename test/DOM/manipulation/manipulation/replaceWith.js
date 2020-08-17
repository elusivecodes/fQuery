const assert = require('assert').strict;
const { exec } = require('../../../setup');
const { easeInOut, testAnimation, testNoAnimation, waitFor } = require('../../../helpers');

describe('#replaceWith', function() {

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

    it('replaces each node with other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceWith('div', 'a');
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

    it('removes events from nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const nodes = document.querySelectorAll('div');
                dom.addEvent('div', 'click', _ => {
                    result++;
                });
                dom.replaceWith('div', 'a');
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                dom.triggerEvent('div', 'click');
                return result;
            }),
            0
        );
    });

    it('does not remove events for other nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.replaceWith('div', 'a');
                dom.triggerEvent('a', 'click');
                return result;
            }),
            8
        );
    });

    it('removes data from nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const nodes = document.querySelectorAll('div');
                dom.setData('div', 'test', 'Test');
                dom.replaceWith('div', 'a');
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

    it('does not remove data for other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setData('a', 'test', 'Test');
                dom.replaceWith('div', 'a');
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

    it('removes animations from nodes', async function() {
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
                dom.replaceWith('div', 'a');
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
                dom.replaceWith('div', 'a');
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

    it('removes queue from nodes', async function() {
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
                dom.replaceWith('div', 'a');
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
        }).then(waitFor(100)).then(async _ => {
            assert.equal(
                await exec(_ => document.body.innerHTML),
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
                '<div class="inner2"></div>'
            );
        });
    });

    it('triggers a remove event for nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('div', 'remove', _ => {
                    result++;
                });
                dom.replaceWith('div', 'a');
                return result;
            }),
            4
        );
    });

    it('does not clone for the last other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const nodes = [...document.querySelectorAll('a')];
                dom.replaceWith('div', 'a');
                const newNodes = [...document.querySelectorAll('a')].slice(4);
                return nodes.every((node, i) => node.isSameNode(newNodes[i]));
            }),
            true
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceWith(
                    document.querySelector('.inner2'),
                    'a'
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

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceWith(
                    document.querySelectorAll('.inner2'),
                    'a'
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

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceWith(
                    document.querySelector('.outer2').children,
                    'a'
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

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceWith([
                    document.querySelector('.inner2')
                ], 'a');
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

    it('works with HTMLElement other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceWith(
                    'div',
                    document.querySelector('.inner1')
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

    it('works with NodeList other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceWith(
                    'div',
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
            '</div>'
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceWith(
                    'div',
                    document.querySelector('.outer1').children
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

    it('works with DocumentFragment other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>'
                );
                dom.replaceWith('a', fragment);
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

    it('works with array other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceWith('div', [
                    document.querySelector('.inner1')
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
            '</div>'
        );
    });

    it('works with HTML other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceWith('a', '<div><span class="test">Test</span></div>');
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

});