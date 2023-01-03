import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#wrap', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="wrap">' +
                '<div id="parent1">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>' +
                '</div>' +
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>';
        });
    });

    it('wraps each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.wrap('a', '.outer');
                return document.body.innerHTML;
            }),
            '<div id="wrap">' +
            '<div id="parent1">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test1">Test</a>' +
            '</div>' +
            '</div>' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test2">Test</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="parent2">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test3">Test</a>' +
            '</div>' +
            '</div>' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test4">Test</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="wrapper">' +
            '<div class="outer">' +
            '<div class="inner"></div>' +
            '</div>' +
            '</div>',
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.wrap(
                    document.getElementById('test1'),
                    '.outer',
                );
                return document.body.innerHTML;
            }),
            '<div id="wrap">' +
            '<div id="parent1">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test1">Test</a>' +
            '</div>' +
            '</div>' +
            '<a href="#" id="test2">Test</a>' +
            '</div>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>' +
            '</div>' +
            '<div id="wrapper">' +
            '<div class="outer">' +
            '<div class="inner"></div>' +
            '</div>' +
            '</div>',
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.wrap(
                    document.querySelectorAll('a'),
                    '.outer',
                );
                return document.body.innerHTML;
            }),
            '<div id="wrap">' +
            '<div id="parent1">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test1">Test</a>' +
            '</div>' +
            '</div>' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test2">Test</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="parent2">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test3">Test</a>' +
            '</div>' +
            '</div>' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test4">Test</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="wrapper">' +
            '<div class="outer">' +
            '<div class="inner"></div>' +
            '</div>' +
            '</div>',
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.wrap(
                    document.getElementById('parent1').children,
                    '.outer',
                );
                return document.body.innerHTML;
            }),
            '<div id="wrap">' +
            '<div id="parent1">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test1">Test</a>' +
            '</div>' +
            '</div>' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test2">Test</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>' +
            '</div>' +
            '<div id="wrapper">' +
            '<div class="outer">' +
            '<div class="inner"></div>' +
            '</div>' +
            '</div>',
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.wrap([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                    document.getElementById('test3'),
                    document.getElementById('test4'),
                ], '.outer');
                return document.body.innerHTML;
            }),
            '<div id="wrap">' +
            '<div id="parent1">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test1">Test</a>' +
            '</div>' +
            '</div>' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test2">Test</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="parent2">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test3">Test</a>' +
            '</div>' +
            '</div>' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test4">Test</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="wrapper">' +
            '<div class="outer">' +
            '<div class="inner"></div>' +
            '</div>' +
            '</div>',
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.wrap(
                    'a',
                    document.querySelector('.outer'),
                );
                return document.body.innerHTML;
            }),
            '<div id="wrap">' +
            '<div id="parent1">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test1">Test</a>' +
            '</div>' +
            '</div>' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test2">Test</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="parent2">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test3">Test</a>' +
            '</div>' +
            '</div>' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test4">Test</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="wrapper">' +
            '<div class="outer">' +
            '<div class="inner"></div>' +
            '</div>' +
            '</div>',
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.wrap(
                    'a',
                    document.querySelectorAll('.outer'),
                );
                return document.body.innerHTML;
            }),
            '<div id="wrap">' +
            '<div id="parent1">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test1">Test</a>' +
            '</div>' +
            '</div>' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test2">Test</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="parent2">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test3">Test</a>' +
            '</div>' +
            '</div>' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test4">Test</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="wrapper">' +
            '<div class="outer">' +
            '<div class="inner"></div>' +
            '</div>' +
            '</div>',
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.wrap(
                    'a',
                    document.getElementById('wrapper').children,
                );
                return document.body.innerHTML;
            }),
            '<div id="wrap">' +
            '<div id="parent1">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test1">Test</a>' +
            '</div>' +
            '</div>' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test2">Test</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="parent2">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test3">Test</a>' +
            '</div>' +
            '</div>' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test4">Test</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="wrapper">' +
            '<div class="outer">' +
            '<div class="inner"></div>' +
            '</div>' +
            '</div>',
        );
    });

    it('works with DocumentFragment other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>',
                );
                $.wrap('a', fragment);
                return document.body.innerHTML;
            }),
            '<div id="wrap">' +
            '<div id="parent1">' +
            '<div>' +
            '<span>' +
            '<a href="#" id="test1">Test</a>' +
            '</span>' +
            '</div>' +
            '<div>' +
            '<span>' +
            '<a href="#" id="test2">Test</a>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '<div id="parent2">' +
            '<div>' +
            '<span>' +
            '<a href="#" id="test3">Test</a>' +
            '</span>' +
            '</div>' +
            '<div>' +
            '<span>' +
            '<a href="#" id="test4">Test</a>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="wrapper">' +
            '<div class="outer">' +
            '<div class="inner"></div>' +
            '</div>' +
            '</div>',
        );
    });

    it('works with array other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.wrap('a', [
                    document.querySelector('.outer'),
                ]);
                return document.body.innerHTML;
            }),
            '<div id="wrap">' +
            '<div id="parent1">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test1">Test</a>' +
            '</div>' +
            '</div>' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test2">Test</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="parent2">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test3">Test</a>' +
            '</div>' +
            '</div>' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test4">Test</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="wrapper">' +
            '<div class="outer">' +
            '<div class="inner"></div>' +
            '</div>' +
            '</div>',
        );
    });

    it('works with HTML other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.wrap('a', '<div class="div-outer"><span class="span-inner"></span></div>');
                return document.body.innerHTML;
            }),
            '<div id="wrap">' +
            '<div id="parent1">' +
            '<div class="div-outer">' +
            '<span class="span-inner">' +
            '<a href="#" id="test1">Test</a>' +
            '</span>' +
            '</div>' +
            '<div class="div-outer">' +
            '<span class="span-inner">' +
            '<a href="#" id="test2">Test</a>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '<div id="parent2">' +
            '<div class="div-outer">' +
            '<span class="span-inner">' +
            '<a href="#" id="test3">Test</a>' +
            '</span>' +
            '</div>' +
            '<div class="div-outer">' +
            '<span class="span-inner">' +
            '<a href="#" id="test4">Test</a>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="wrapper">' +
            '<div class="outer">' +
            '<div class="inner"></div>' +
            '</div>' +
            '</div>',
        );
    });
});
