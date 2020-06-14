const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#unwrap', function() {

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

    it('unwraps each node', async function() {
        assert.equal(
            await exec(_ => {
                dom.unwrap(
                    'a'
                );
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>'
        );
    });

    it('unwraps each node with filter', async function() {
        assert.equal(
            await exec(_ => {
                dom.unwrap(
                    'a',
                    '#parent1'
                );
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>'
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.unwrap(
                    document.getElementById('test1'),
                    '#parent1'
                );
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.unwrap(
                    document.querySelectorAll('a'),
                    '#parent1'
                );
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.unwrap(
                    document.getElementById('parent1').children,
                    '#parent1'
                );
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>'
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.unwrap(
                    [
                        document.getElementById('test1'),
                        document.getElementById('test2'),
                        document.getElementById('test3'),
                        document.getElementById('test4')
                    ],
                    '#parent1'
                );
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>'
        );
    });

    it('works with function filter', async function() {
        assert.equal(
            await exec(_ => {
                dom.unwrap(
                    'a',
                    node => node.id === 'parent1'
                );
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>'
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.equal(
            await exec(_ => {
                dom.unwrap(
                    'a',
                    document.getElementById('parent1')
                );
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>'
        );
    });

    it('works with NodeList filter', async function() {
        assert.equal(
            await exec(_ => {
                dom.unwrap(
                    'a',
                    document.querySelectorAll('#parent1')
                );
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>'
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.equal(
            await exec(_ => {
                dom.unwrap(
                    'a',
                    document.body.children
                );
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>'
        );
    });

    it('works with array filter', async function() {
        assert.equal(
            await exec(_ => {
                dom.unwrap(
                    'a',
                    [
                        document.getElementById('parent1')
                    ]
                );
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>'
        );
    });

});