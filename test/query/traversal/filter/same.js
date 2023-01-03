import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #same', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns nodes identical to other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .same('#div2, #div4')
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div2',
                'div4',
            ],
        );
    });

    it('returns a new QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query1 = $('div');
                const query2 = query1.same('#div2, #div4');
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
                    .same([fragment])
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
                    .same([shadow])
                    .get()
                    .map((node) => node.id);
            }),
            [
                'shadow',
            ],
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .equal(
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

    it('works with NodeList other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .equal(
                        document.querySelectorAll('#div2, #div4'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div2',
                'div4',
            ],
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .equal(
                        document.body.children,
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div1',
                'div2',
                'div3',
                'div4',
            ],
        );
    });

    it('works with DocumentFragment other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return $([fragment])
                    .equal(fragment)
                    .get()
                    .map((node) => node.id);
            }),
            [
                'fragment',
            ],
        );
    });

    it('works with ShadowRoot other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return $([shadow])
                    .equal(shadow)
                    .get()
                    .map((node) => node.id);
            }),
            [
                'shadow',
            ],
        );
    });

    it('works with array other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .equal([
                        document.querySelector('#div2'),
                        document.querySelector('#div4'),
                    ])
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div2',
                'div4',
            ],
        );
    });

    it('works with QuerySet other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const query = $('#div2, #div4');
                return $('div')
                    .same(query)
                    .get()
                    .map((node) => node.id);
            }),
            [
                'div2',
                'div4',
            ],
        );
    });
});
