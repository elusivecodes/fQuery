const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySet #children', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent1" class="parent">' +
                '<div id="child1">' +
                '<span></span>' +
                '</div>' +
                '<div id="child2">' +
                '<span></span>' +
                '</div>' +
                '<span id="child3">' +
                '<span></span>' +
                '</span>' +
                '<span id="child4">' +
                '<span></span>' +
                '</span>' +
                '</div>' +
                '<div id="parent2" class="parent">' +
                '<div id="child5">' +
                '<span></span>' +
                '</div>' +
                '<div id="child6">' +
                '<span></span>' +
                '</div>' +
                '<span id="child7">' +
                '<span></span>' +
                '</span>' +
                '<span id="child8">' +
                '<span></span>' +
                '</span>' +
                '</div>';
        });
    });

    it('returns all children of each node', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('.parent')
                    .children()
                    .get()
                    .map(node => node.id)
            ),
            [
                'child1',
                'child2',
                'child3',
                'child4',
                'child5',
                'child6',
                'child7',
                'child8'
            ]
        );
    });

    it('returns all children of each node matching a filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('.parent')
                    .children('span')
                    .get()
                    .map(node => node.id)
            ),
            [
                'child3',
                'child4',
                'child7',
                'child8'
            ]
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.queryMutable('.parent');
                return query === query.children();
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>'
                );
                return dom.queryMutable(fragment)
                    .children('div')
                    .get()
                    .map(node => node.id);
            }),
            [
                'div1',
                'div2'
            ]
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>'
                );
                shadow.appendChild(fragment);
                return dom.queryMutable(shadow)
                    .children('div')
                    .get()
                    .map(node => node.id);
            }),
            [
                'div1',
                'div2'
            ]
        );
    });

    it('works with Document nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable(document)
                    .children('html')
                    .get()
                    .map(node => node.id)
            ),
            [
                'html'
            ]
        );
    });

    it('works with function filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('.parent')
                    .children(node => node.tagName === 'SPAN')
                    .get()
                    .map(node => node.id)
            ),
            [
                'child3',
                'child4',
                'child7',
                'child8'
            ]
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('.parent')
                    .children(
                        document.getElementById('child3')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'child3'
            ]
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('.parent')
                    .children(
                        document.querySelectorAll('span')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'child3',
                'child4',
                'child7',
                'child8'
            ]
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('.parent')
                    .children(
                        document.getElementById('parent1').children
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'child1',
                'child2',
                'child3',
                'child4'
            ]
        );
    });

    it('works with array filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('.parent')
                    .children([
                        document.getElementById('child3'),
                        document.getElementById('child4'),
                        document.getElementById('child7'),
                        document.getElementById('child8')
                    ])
                    .get()
                    .map(node => node.id)
            ),
            [
                'child3',
                'child4',
                'child7',
                'child8'
            ]
        );
    });

    it('works with QuerySet filter', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const query = dom.queryMutable('span');
                return dom.queryMutable('.parent')
                    .children(query)
                    .get()
                    .map(node => node.id);
            }),
            [
                'child3',
                'child4',
                'child7',
                'child8'
            ]
        );
    });

});