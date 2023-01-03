import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #children', function() {
    beforeEach(async function() {
        await exec((_) => {
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
            await exec((_) =>
                $('.parent')
                    .children()
                    .get()
                    .map((node) => node.id),
            ),
            [
                'child1',
                'child2',
                'child3',
                'child4',
                'child5',
                'child6',
                'child7',
                'child8',
            ],
        );
    });

    it('returns all children of each node matching a filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.parent')
                    .children('span')
                    .get()
                    .map((node) => node.id),
            ),
            [
                'child3',
                'child4',
                'child7',
                'child8',
            ],
        );
    });

    it('returns a new QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query1 = $('.parent');
                const query2 = query1.children();
                return query2.constructor.name === 'QuerySet' && query1 !== query2;
            }),
            true,
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>',
                );
                return $(fragment)
                    .children('div')
                    .get()
                    .map((node) => node.id);
            }),
            [
                'div1',
                'div2',
            ],
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>',
                );
                shadow.appendChild(fragment);
                return $(shadow)
                    .children('div')
                    .get()
                    .map((node) => node.id);
            }),
            [
                'div1',
                'div2',
            ],
        );
    });

    it('works with Document nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $(document)
                    .children('html')
                    .get()
                    .map((node) => node.id),
            ),
            [
                'html',
            ],
        );
    });

    it('works with function filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.parent')
                    .children((node) => node.tagName === 'SPAN')
                    .get()
                    .map((node) => node.id),
            ),
            [
                'child3',
                'child4',
                'child7',
                'child8',
            ],
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.parent')
                    .children(
                        document.getElementById('child3'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'child3',
            ],
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.parent')
                    .children(
                        document.querySelectorAll('span'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'child3',
                'child4',
                'child7',
                'child8',
            ],
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.parent')
                    .children(
                        document.getElementById('parent1').children,
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'child1',
                'child2',
                'child3',
                'child4',
            ],
        );
    });

    it('works with array filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.parent')
                    .children([
                        document.getElementById('child3'),
                        document.getElementById('child4'),
                        document.getElementById('child7'),
                        document.getElementById('child8'),
                    ])
                    .get()
                    .map((node) => node.id),
            ),
            [
                'child3',
                'child4',
                'child7',
                'child8',
            ],
        );
    });

    it('works with QuerySet filter', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const query = $('span');
                return $('.parent')
                    .children(query)
                    .get()
                    .map((node) => node.id);
            }),
            [
                'child3',
                'child4',
                'child7',
                'child8',
            ],
        );
    });
});
