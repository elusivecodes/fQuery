const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySet #wrap', function() {

    beforeEach(async function() {
        await exec(_ => {
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
            await exec(_ => {
                dom.queryMutable('a')
                    .wrap('.outer');
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
            '</div>'
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.queryMutable('a');
                return query === query.wrap('.outer');
            }),
            true
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.queryMutable('a')
                    .wrap(
                        document.querySelector('.outer')
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
            '</div>'
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.queryMutable('a')
                    .wrap(
                        document.querySelectorAll('.outer')
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
            '</div>'
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.queryMutable('a')
                    .wrap(
                        document.getElementById('wrapper').children
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
            '</div>'
        );
    });

    it('works with DocumentFragment other nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>'
                );
                dom.queryMutable('a')
                    .wrap(fragment);
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
            '</div>'
        );
    });

    it('works with array other nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.queryMutable('a')
                    .wrap([
                        document.querySelector('.outer')
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
            '</div>'
        );
    });

    it('works with HTML other nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.queryMutable('a')
                    .wrap('<div class="div-outer"><span class="span-inner"></span></div>');
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
            '</div>'
        );
    });

    it('works with QuerySet other nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.queryMutable('.outer');
                dom.queryMutable('a')
                    .wrap(query);
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
            '</div>'
        );
    });

});