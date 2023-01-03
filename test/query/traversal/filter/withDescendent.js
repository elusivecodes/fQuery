import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #withDescendent', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1">' +
                '<span id="span1">' +
                '<a id="a1"></a>' +
                '</span>' +
                '</div>' +
                '<div id="div2"></div>' +
                '<div id="div3">' +
                '<span id="span2">' +
                '<a id="a2"></a>' +
                '</span>' +
                '</div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns nodes with a descendent matching a filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .withDescendent('a')
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div1',
                'div3',
            ],
        );
    });

    it('returns a new QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query1 = $('div');
                const query2 = query1.withDescendent('a');
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
                    '<div></div>',
                );
                fragment.id = 'fragment';
                return $(fragment)
                    .withDescendent('div')
                    .get()
                    .map((node) => node.id);
            }),
            [
                'fragment',
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
                    '<div></div>',
                );
                shadow.appendChild(fragment);
                shadow.id = 'shadow';
                return $(shadow)
                    .withDescendent('div')
                    .get()
                    .map((node) => node.id);
            }),
            [
                'shadow',
            ],
        );
    });

    it('works with Document nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $(document)
                    .withDescendent('div')
                    .get()
                    .map((node) => node.id),
            ),
            [
                'document',
            ],
        );
    });

    it('works with function filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .withDescendent((node) => node.id === 'a1')
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div1',
            ],
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .withDescendent(
                        document.getElementById('a1'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div1',
            ],
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .withDescendent(
                        document.querySelectorAll('a'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div1',
                'div3',
            ],
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .withDescendent(
                        document.getElementById('span1').children,
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div1',
            ],
        );
    });

    it('works with array filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .withDescendent([
                        document.getElementById('a1'),
                        document.getElementById('a2'),
                    ])
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div1',
                'div3',
            ],
        );
    });

    it('works with QuerySet filter', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const query = $('a');
                return $('div')
                    .withDescendent(query)
                    .get()
                    .map((node) => node.id);
            }),
            [
                'div1',
                'div3',
            ],
        );
    });
});
