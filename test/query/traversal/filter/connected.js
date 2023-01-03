import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #connected', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>';
        });
    });

    it('returns nodes connected to the DOM', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .connected()
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div1',
                'div2',
            ],
        );
    });

    it('filters out nodes not connected to the DOM', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $(
                    document.createElement('div'),
                ).connected().get(),
            ),
            [],
        );
    });

    it('returns a new QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query1 = $('div');
                const query2 = query1.connected();
                return query2.constructor.name === 'QuerySet' && query1 !== query2;
            }),
            true,
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                return $(fragment)
                    .connected()
                    .get();
            }),
            [],
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const div = document.getElementById('div1');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return $(shadow)
                    .connected()
                    .get()
                    .map((node) => node.id);
            }),
            [
                'shadow',
            ],
        );
    });
});
