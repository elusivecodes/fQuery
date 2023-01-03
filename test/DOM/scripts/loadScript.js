import assert from 'node:assert/strict';
import { exec } from './../../setup.js';

describe('#loadScript', function() {
    it('loads a script', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.loadScript('assets/test.js');
                return document.head.innerHTML;
            }),
            '<script src="assets/test.js" type="text/javascript" defer=""></script>',
        );
    });

    it('loads a script with attributes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.loadScript('assets/test.js', {
                    integrity: 'sha384-1AK0oxsmb9+cemh1YwLG4rPfSc3jb81aGOY8CBrD6WNTumSzeeAs3p5iYyXJemZu',
                    crossorigin: 'anonymous',
                });
                return document.head.innerHTML;
            }),
            '<script src="assets/test.js" type="text/javascript" integrity="sha384-1AK0oxsmb9+cemh1YwLG4rPfSc3jb81aGOY8CBrD6WNTumSzeeAs3p5iYyXJemZu" crossorigin="anonymous" defer=""></script>',
        );
    });

    it('loads a script without cache', async function() {
        const script = await exec((_) => {
            $.loadScript('assets/test.js', null, { cache: false });
            return document.head.innerHTML;
        });

        const match = script.match(/<script src="assets\/test\.js\?_=(\d+)" type="text\/javascript" defer=""><\/script>/);

        assert.ok(match);
    });

    it('loads a script without cache (query string)', async function() {
        const script = await exec((_) => {
            $.loadScript('assets/test.js?test=1', null, { cache: false });
            return document.head.innerHTML;
        });

        const match = script.match(/<script src="assets\/test\.js\?test=1&amp;_=(\d+)" type="text\/javascript" defer=""><\/script>/);

        assert.ok(match);
    });

    it('resolves when the script is loaded', async function() {
        assert.strictEqual(
            await exec(async (_) => {
                await $.loadScript('assets/test.js');
                return window.data;
            }),
            'Test',
        );
    });

    it('throws on error', async function() {
        assert.strictEqual(
            await exec(async (_) => {
                try {
                    await $.loadScript('assets/error.js');
                    return false;
                } catch (e) {
                    return true;
                }
            }),
            true,
        );
    });
});
