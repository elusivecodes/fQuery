import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #toggle', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" style="display: none;"></div>';
        });
    });

    it('toggles the visibility of all nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .toggle();
                return document.body.innerHTML;
            }),
            '<div id="test1" style="display: none;"></div>' +
            '<div id="test2" style=""></div>',
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('div');
                return query === query.toggle();
            }),
            true,
        );
    });
});
