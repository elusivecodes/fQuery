import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #filterOne', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2" data-filter="test"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4" data-filter="test"></div>';
        });
    });

    it('returns filtered nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .filterOne('[data-filter="test"]')
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div2',
            ],
        );
    });

    it('returns a new QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query1 = $('div');
                const query2 = query1.filterOne('[data-filter="test"]');
                return query2.constructor.name === 'QuerySet' && query1 !== query2;
            }),
            true,
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return $(fragment)
                    .filterOne()
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
                shadow.id = 'shadow';
                return $(shadow)
                    .filterOne()
                    .get()
                    .map((node) => node.id);
            }),
            [
                'shadow',
            ],
        );
    });

    it('works with function filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .filterOne((node) => node.dataset.filter === 'test')
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div2',
            ],
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .filterOne(
                        document.getElementById('div2'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div2',
            ],
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .filterOne(
                        document.querySelectorAll('[data-filter="test"]'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div2',
            ],
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .filterOne(
                        document.body.children,
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div1',
            ],
        );
    });

    it('works with DocumentFragment filter', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return $([fragment])
                    .filterOne(fragment)
                    .get()
                    .map((node) => node.id);
            }),
            [
                'fragment',
            ],
        );
    });

    it('works with ShadowRoot filter', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return $([shadow])
                    .filterOne(shadow)
                    .get()
                    .map((node) => node.id);
            }),
            [
                'shadow',
            ],
        );
    });

    it('works with array filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .filterOne([
                        document.getElementById('div2'),
                        document.getElementById('div4'),
                    ])
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div2',
            ],
        );
    });

    it('works with QuerySet filter', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const query = $('[data-filter="test"]');
                return $('div')
                    .filterOne(query)
                    .get()
                    .map((node) => node.id);
            }),
            [
                'div2',
            ],
        );
    });
});
