const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #wrapAll', function() {

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

    it('wraps all nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('a')
                    .wrapAll('.outer');
                return document.body.innerHTML;
            }),
            '<div id="wrap">' +
            '<div id="parent1">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="parent2">' +
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
        assert.equal(
            await exec(_ => {
                const query = dom.query('a');
                return query === query.wrapAll('.outer');
            }),
            true
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('a')
                    .wrapAll(
                        document.querySelector('.outer')
                    );
                return document.body.innerHTML;
            }),
            '<div id="wrap">' +
            '<div id="parent1">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="parent2">' +
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
        assert.equal(
            await exec(_ => {
                dom.query('a')
                    .wrapAll(
                        document.querySelectorAll('.outer')
                    );
                return document.body.innerHTML;
            }),
            '<div id="wrap">' +
            '<div id="parent1">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="parent2">' +
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
        assert.equal(
            await exec(_ => {
                dom.query('a')
                    .wrapAll(
                        document.getElementById('wrapper').children
                    );
                return document.body.innerHTML;
            }),
            '<div id="wrap">' +
            '<div id="parent1">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="parent2">' +
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
        assert.equal(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>'
                );
                dom.query('a')
                    .wrapAll(fragment);
                return document.body.innerHTML;
            }),
            '<div id="wrap">' +
            '<div id="parent1">' +
            '<div>' +
            '<span>' +
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '<div id="parent2">' +
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
        assert.equal(
            await exec(_ => {
                dom.query('a')
                    .wrapAll([
                        document.querySelector('.outer')
                    ]);
                return document.body.innerHTML;
            }),
            '<div id="wrap">' +
            '<div id="parent1">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="parent2">' +
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
        assert.equal(
            await exec(_ => {
                dom.query('a')
                    .wrapAll('<div class="div-outer"><span class="span-inner"></span></div>');
                return document.body.innerHTML;
            }),
            '<div id="wrap">' +
            '<div id="parent1">' +
            '<div class="div-outer">' +
            '<span class="span-inner">' +
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '<div id="parent2">' +
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
        assert.equal(
            await exec(_ => {
                const query = dom.query('.outer');
                dom.query('a')
                    .wrapAll(query);
                return document.body.innerHTML;
            }),
            '<div id="wrap">' +
            '<div id="parent1">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="parent2">' +
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