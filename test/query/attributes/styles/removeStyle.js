import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #removeStyle', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1" style="background-color: blue; color: white;"></div>' +
                '<div id="test2" style="background-color: blue; color: white;"></div>';
        });
    });

    it('sets a style value for all nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div').removeStyle('color');
                return document.body.innerHTML;
            }),
            '<div id="test1" style="background-color: blue;"></div>' +
            '<div id="test2" style="background-color: blue;"></div>',
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('div');
                return query === query.removeStyle('color');
            }),
            true,
        );
    });
});
