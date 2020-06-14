const assert = require('assert').strict;
const { exec } = require('../../../setup');

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

    it('removes all events', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const nodes = [
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                    document.getElementById('test3'),
                    document.getElementById('test4')
                ];
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

    it('removes all events recursively', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                const nodes = [
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                    document.getElementById('test3'),
                    document.getElementById('test4')
                ];
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

    it('removes all data', async function() {
        assert.deepEqual(
            await exec(_ => {
                const nodes = [
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                    document.getElementById('test3'),
                    document.getElementById('test4')
                ];
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
                dom.remove(
                    'a'
                );
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                return [
                    dom.getData('#test1', 'test1'),
                    dom.getData('#test2', 'test2')
                ]
            }),
            [
                null,
                null
            ]
        );
    });

    it('removes all data recursively', async function() {
        assert.deepEqual(
            await exec(_ => {
                const nodes = [
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                    document.getElementById('test3'),
                    document.getElementById('test4')
                ];
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
                dom.remove(
                    'div'
                );
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                return [
                    dom.getData('#test1', 'test1'),
                    dom.getData('#test2', 'test2')
                ]
            }),
            [
                null,
                null
            ]
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