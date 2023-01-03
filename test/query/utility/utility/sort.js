import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #sort', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns nodes sorted by the order they appear in the DOM', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const template = document.createElement('template');
                const fragment = template.content;
                fragment.id = 'fragment';
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                document.body.insertBefore(template, document.body.firstChild);
                document.body.insertBefore(div, document.body.firstChild);
                return $([
                    fragment,
                    document.getElementById('div3'),
                    document.getElementById('div4'),
                    document.getElementById('div2'),
                    document.getElementById('div1'),
                    shadow,
                    document,
                    window,
                ]).sort().get().map((node) => node.id);
            }),
            [
                'fragment',
                'shadow',
                'div1',
                'div2',
                'div3',
                'div4',
                'document',
                'window',
            ],
        );
    });

    it('returns a new QuerySet', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const query1 = $('div');
                const query2 = query1.sort();
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
                    .sort()
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
                    .sort()
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
                    .sort()
                    .get()
                    .map((node) => node.id),
            ),
            [
                'document',
            ],
        );
    });

    it('works with Window nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $(window)
                    .sort()
                    .get()
                    .map((node) => node.id),
            ),
            [
                'window',
            ],
        );
    });
});
