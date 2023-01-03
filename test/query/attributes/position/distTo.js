import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #distTo', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>' +
                '<div id="test2"></div>';
            window.scrollTo(1000, 1000);
        });
    });

    it('returns the distance to the first node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .distTo(580, 128),
            ),
            122,
        );
    });

    it('returns the distance to the first node with offset', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .distTo(1180, 1270, { offset: true }),
            ),
            122,
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('#invalid')
                    .distTo(580, 128),
            ),
            undefined,
        );
    });
});
