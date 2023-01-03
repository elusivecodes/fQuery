import assert from 'node:assert/strict';
import { exec } from './../../setup.js';

describe('#loadStyle', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML = '<div id="test"></div>';
        });
    });

    it('loads a stylesheet', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.loadStyle('assets/test.css');
                return document.head.innerHTML;
            }),
            '<link href="assets/test.css" rel="stylesheet">',
        );
    });

    it('loads a stylesheet with attributes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.loadStyle('assets/test.css', {
                    integrity: 'sha384-92bXn1Q36iY7yWatlPt66wCfjkIltnOTBPgiq2Vf8xM816mhHZfQ1w4JliBw10Fw',
                    crossorigin: 'anonymous',
                });
                return document.head.innerHTML;
            }),
            '<link href="assets/test.css" rel="stylesheet" integrity="sha384-92bXn1Q36iY7yWatlPt66wCfjkIltnOTBPgiq2Vf8xM816mhHZfQ1w4JliBw10Fw" crossorigin="anonymous">',
        );
    });

    it('loads a stylesheet without cache', async function() {
        const link = await exec((_) => {
            $.loadStyle('assets/test.css', null, { cache: false });
            return document.head.innerHTML;
        });

        const match = link.match(/<link href="assets\/test\.css\?_=(\d+)" rel="stylesheet">/);

        assert.ok(match);
    });

    it('loads a stylesheet without cache (query string)', async function() {
        const link = await exec((_) => {
            $.loadStyle('assets/test.css?test=1', null, { cache: false });
            return document.head.innerHTML;
        });

        const match = link.match(/<link href="assets\/test\.css\?test=1&amp;_=(\d+)" rel="stylesheet">/);

        assert.ok(match);
    });

    it('resolves when the stylesheet is loaded', async function() {
        assert.strictEqual(
            await exec(async (_) => {
                await $.loadStyle('assets/test.css');
                return document.getElementById('test').clientWidth;
            }),
            100,
        );
    });

    it('throws on error', async function() {
        assert.strictEqual(
            await exec(async (_) => {
                try {
                    await $.loadStyle('assets/error.css');
                    return false;
                } catch (e) {
                    return true;
                }
            }),
            true,
        );
    });
});
