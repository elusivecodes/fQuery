import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #attachShadow', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML = '<div id="test"></div>';
        });
    });

    it('attaches a shadow root to the first node', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const shadow = $('#test')
                    .attachShadow()
                    .get(0);
                return [
                    shadow instanceof ShadowRoot,
                    document.getElementById('test').shadowRoot instanceof ShadowRoot,
                ];
            }),
            [
                true,
                true,
            ],
        );
    });

    it('attaches a closed shadow root to the first node', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const shadow = $('#test')
                    .attachShadow({ open: false })
                    .get(0);
                return [
                    shadow instanceof ShadowRoot,
                    document.getElementById('test').shadowRoot,
                ];
            }),
            [
                true,
                null,
            ],
        );
    });

    it('returns a new QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query1 = $('#test');
                const query2 = query1.attachShadow();
                return query2.constructor.name === 'QuerySet' && query1 !== query2;
            }),
            true,
        );
    });
});
