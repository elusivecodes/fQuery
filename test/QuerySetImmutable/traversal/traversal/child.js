const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #child', function() {

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

    it('returns the first child of each node', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('.parent')
                    .child()
                    .get()
                    .map(node => node.id)
            ),
            [
                'child1',
                'child5'
            ]
        );
    });

    it('returns the first child of each node matching a filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('.parent')
                    .child('span')
                    .get()
                    .map(node => node.id)
            ),
            [
                'child3',
                'child7'
            ]
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.equal(
            await exec(_ => {
                const query1 = dom.query('.parent');
                const query2 = query1.child();
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>'
                );
                return dom.query(fragment)
                    .child('div')
                    .get()
                    .map(node => node.id);
            }),
            [
                'div1'
            ]
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>'
                );
                shadow.appendChild(fragment);
                return dom.query(shadow)
                    .child('div')
                    .get()
                    .map(node => node.id);
            }),
            [
                'div1'
            ]
        );
    });

    it('works with Document nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query(document)
                    .child('html')
                    .get()
                    .map(node => node.id)
            ),
            [
                'html'
            ]
        );
    });

    it('works with function filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('.parent')
                    .child(node => node.tagName === 'SPAN')
                    .get()
                    .map(node => node.id)
            ),
            [
                'child3',
                'child7'
            ]
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('.parent')
                    .child(
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
        assert.deepEqual(
            await exec(_ =>
                dom.query('.parent')
                    .child(
                        document.querySelectorAll('span')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'child3',
                'child7'
            ]
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('.parent')
                    .child(
                        document.getElementById('parent1').children
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'child1'
            ]
        );
    });

    it('works with array filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('.parent')
                    .child([
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
                'child7'
            ]
        );
    });

    it('works with QuerySet filter', async function() {
        assert.deepEqual(
            await exec(_ => {
                const query = dom.query('span');
                return dom.query('.parent')
                    .child(query)
                    .get()
                    .map(node => node.id);
            }),
            [
                'child3',
                'child7'
            ]
        );
    });

});