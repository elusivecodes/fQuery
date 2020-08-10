const assert = require('assert').strict;
const { exec } = require('../../../setup');
const { testNoAnimation, waitFor } = require('../../../helpers');

describe('#remove', function() {

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

    it('removes all nodes from the DOM', async function() {
        assert.equal(
            await exec(_ => {
                dom.remove(
                    'a'
                );
                return document.body.innerHTML;
            }),
            '<div id="outer1">' +
            '<div id="inner1">' +
            '</div>' +
            '</div>' +
            '<div id="outer2">' +
            '<div id="inner2">' +
            '</div>' +
            '</div>'
        );
    });

    it('removes events', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const nodes = document.querySelectorAll('a');
                dom.addEvent(
                    'a',
                    'click',
                    _ => { result++; }
                );
                dom.remove(
                    'a'
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
                dom.remove(
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

    it('removes data', async function() {
        assert.deepEqual(
            await exec(_ => {
                const nodes = document.querySelectorAll('a');
                dom.setData(
                    'a',
                    'test',
                    'Test'
                );
                dom.remove(
                    'a'
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

    it('removes data recursively', async function() {
        assert.deepEqual(
            await exec(_ => {
                const nodes = document.querySelectorAll('a');
                dom.setData(
                    'a',
                    'test',
                    'Test'
                );
                dom.remove(
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

    it('removes animations', async function() {
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
                dom.remove('a');
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
                dom.remove('div');
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
                dom.remove('a');
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
                '<div id="inner1"></div>' +
                '</div>' +
                '<div id="outer2">' +
                '<div id="inner2"></div>' +
                '</div>' +
                '<a href="#" id="test1"></a>' +
                '<a href="#" id="test2"></a>' +
                '<a href="#" id="test3"></a>' +
                '<a href="#" id="test4"></a>'
            );
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
                dom.remove('div');
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
        }).then(waitFor(100)).then(async _ => {
            assert.equal(
                await exec(_ => {
                    return document.body.innerHTML;
                }),
                '<a href="#" id="test1"></a>' +
                '<a href="#" id="test2"></a>' +
                '<a href="#" id="test3"></a>' +
                '<a href="#" id="test4"></a>'
            );
        });
    });

    it('triggers a remove event', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'remove',
                    _ => { result++; }
                );
                dom.remove('a');
                return result;
            }),
            4
        );
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
                dom.remove('div');
                return result;
            }),
            4
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.remove(
                    document.getElementById('inner1')
                );
                return document.body.innerHTML;
            }),
            '<div id="outer1">' +
            '</div>' +
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
                dom.remove(
                    document.querySelectorAll('a')
                );
                return document.body.innerHTML;
            }),
            '<div id="outer1">' +
            '<div id="inner1">' +
            '</div>' +
            '</div>' +
            '<div id="outer2">' +
            '<div id="inner2">' +
            '</div>' +
            '</div>'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.remove(
                    document.body.children
                );
                return document.body.innerHTML;
            }),
            ''
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.remove(
                    [
                        document.getElementById('test1'),
                        document.getElementById('test2'),
                        document.getElementById('test3'),
                        document.getElementById('test4')
                    ]
                );
                return document.body.innerHTML;
            }),
            '<div id="outer1">' +
            '<div id="inner1">' +
            '</div>' +
            '</div>' +
            '<div id="outer2">' +
            '<div id="inner2">' +
            '</div>' +
            '</div>'
        );
    });

});