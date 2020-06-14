const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#detach', function() {

    beforeEach(async function() {
        await exec(_ => {
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
        assert.equal(
            await exec(_ => {
                dom.detach(
                    'a'
                );
                return document.body.innerHTML;
            }),
            '<div id="parent1"></div>' +
            '<div id="parent2"></div>'
        );
    });

    it('returns detached nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.detach(
                    'a'
                ).map(node => node.id);
            }),
            [
                'test1',
                'test2',
                'test3',
                'test4'
            ]
        );
    });

    it('does not remove events', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'click',
                    _ => { result++; }
                );
                const nodes = dom.detach(
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
            4
        );
    });

    it('does not remove data', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setData(
                    '#test1',
                    'test1',
                    'Test 1'
                );
                dom.setData(
                    '#test2',
                    'test2',
                    'Test 2'
                );
                const nodes = dom.detach(
                    'a'
                );
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                return [
                    dom.getData('#test1', 'test1'),
                    dom.getData('#test2', 'test2')
                ];
            }),
            [
                'Test 1',
                'Test 2'
            ]
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.detach(
                    document.getElementById('test1')
                );
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<a href="#" id="test2">Test</a>' +
            '</div>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.detach(
                    document.querySelectorAll('a')
                );
                return document.body.innerHTML;
            }),
            '<div id="parent1"></div>' +
            '<div id="parent2"></div>'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.detach(
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
                dom.detach(
                    [
                        document.getElementById('test1'),
                        document.getElementById('test2'),
                        document.getElementById('test3'),
                        document.getElementById('test4')
                    ]
                );
                return document.body.innerHTML;
            }),
            '<div id="parent1"></div>' +
            '<div id="parent2"></div>'
        );
    });

});