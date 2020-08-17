const assert = require('assert').strict;
const { exec } = require('../../../setup');
const { testNoAnimation, waitFor } = require('../../../helpers');

describe('#setText', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1">' +
                '<div><span id="inner">Test 1</span></div>' +
                '</div>' +
                '<div id="test2"></div>';
        });
    });

    it('sets the text contents for all nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setText('div', 'Test 2');
                return document.body.innerHTML;
            }),
            '<div id="test1">Test 2</div>' +
            '<div id="test2">Test 2</div>'
        );
    });

    it('escapes HTML strings', async function() {
        assert.equal(
            await exec(_ => {
                dom.setText('#test1', '<span>Test 2</span>');
                return document.body.innerHTML;
            }),
            '<div id="test1">&lt;span&gt;Test 2&lt;/span&gt;</div>' +
            '<div id="test2"></div>'
        );
    });

    it('removes events recursively', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const node = document.getElementById('inner');
                dom.addEvent(node, 'click', _ => {
                    result++;
                });
                dom.setText('div', 'Test 2');
                document.body.appendChild(node);
                dom.triggerEvent(node, 'click');
                return result;
            }),
            0
        );
    });

    it('removes data recursively', async function() {
        assert.equal; (
            await exec(_ => {
                const node = document.getElementById('inner');
                dom.setData(node, 'test', 'Test');
                dom.setText('div', 'Test 2');
                document.body.appendChild(node);
                return dom.getData(node, 'test');
            }),
            null
        );
    });

    it('removes animations recursively', async function() {
        await exec(_ => {
            dom.animate(
                '#inner',
                _ => { },
                {
                    duration: 100,
                    debug: true
                }
            );
        }).then(waitFor(50)).then(async _ => {
            await exec(_ => {
                const node = document.getElementById('inner');
                dom.setText('div', 'Test 2');
                document.body.appendChild(node);
            });
            await testNoAnimation('#inner');
        });
    });

    it('removes queue recursively', async function() {
        await exec(_ => {
            dom.queue('#inner', _ =>
                new Promise(resolve =>
                    setTimeout(resolve, 100)
                )
            );
            dom.queue('#inner', node => {
                node.dataset.test = 'Test'
            });
        }).then(waitFor(50)).then(async _ => {
            await exec(_ => {
                const node = document.getElementById('inner');
                dom.setText('div', 'Test 2');
                document.body.appendChild(node);
            });
        }).then(waitFor(100)).then(async _ => {
            assert.equal(
                await exec(_ => document.body.innerHTML),
                '<div id="test1">Test 2</div>' +
                '<div id="test2">Test 2</div>' +
                '<span id="inner"></span>'
            );
        });
    });

    it('triggers a remove event recursively', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('#inner', 'remove', _ => {
                    result++;
                });
                dom.setText('div', 'Test 2');
                return result;
            }),
            1
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setText(
                    document.getElementById('test1'),
                    'Test 2'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1">Test 2</div>' +
            '<div id="test2"></div>'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setText(
                    document.querySelectorAll('div'),
                    'Test 2'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1">Test 2</div>' +
            '<div id="test2">Test 2</div>'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setText(
                    document.body.children,
                    'Test 2'
                );
                return document.body.innerHTML;
            }),
            '<div id="test1">Test 2</div>' +
            '<div id="test2">Test 2</div>'
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.setText([
                    document.getElementById('test1'),
                    document.getElementById('test2')
                ], 'Test 2');
                return document.body.innerHTML;
            }),
            '<div id="test1">Test 2</div>' +
            '<div id="test2">Test 2</div>'
        );
    });

});