import assert from 'node:assert/strict';
import { exec } from './../../setup.js';

describe('#loadScripts', function() {
    it('loads scripts', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.loadScripts([
                    'assets/test.js',
                    'assets/test2.js',
                ]);
                return document.head.innerHTML;
            }),
            '<script src="assets/test.js" type="text/javascript" defer=""></script>' +
            '<script src="assets/test2.js" type="text/javascript" defer=""></script>',
        );
    });

    it('loads scripts with attributes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.loadScripts([
                    {
                        src: 'assets/test.js',
                        integrity: 'sha384-1AK0oxsmb9+cemh1YwLG4rPfSc3jb81aGOY8CBrD6WNTumSzeeAs3p5iYyXJemZu',
                        crossorigin: 'anonymous',
                    },
                    {
                        src: 'assets/test2.js',
                        integrity: 'sha384-AhCcweXLV7j7q8PDvpl7r+bbPJICrsLyt6X2uQMwKva75GGIX3GZdxYhTVwgIcWT',
                        crossorigin: 'anonymous',
                    },
                ]);
                return document.head.innerHTML;
            }),
            '<script src="assets/test.js" type="text/javascript" integrity="sha384-1AK0oxsmb9+cemh1YwLG4rPfSc3jb81aGOY8CBrD6WNTumSzeeAs3p5iYyXJemZu" crossorigin="anonymous" defer=""></script>' +
            '<script src="assets/test2.js" type="text/javascript" integrity="sha384-AhCcweXLV7j7q8PDvpl7r+bbPJICrsLyt6X2uQMwKva75GGIX3GZdxYhTVwgIcWT" crossorigin="anonymous" defer=""></script>',
        );
    });

    it('loads scripts without cache', async function() {
        const script = await exec((_) => {
            $.loadScripts([
                'assets/test.js',
                'assets/test2.js',
            ], { cache: false });
            return document.head.innerHTML;
        });

        const match = script.match(/<script src="assets\/test\.js\?_=(\d+)" type="text\/javascript" defer=""><\/script><script src="assets\/test2\.js\?_=(\d+)" type="text\/javascript" defer=""><\/script>/);

        assert.ok(match);
    });

    it('loads scripts without cache (query string)', async function() {
        const script = await exec((_) => {
            $.loadScripts([
                'assets/test.js?test=1',
                'assets/test2.js?test=2',
            ], { cache: false });
            return document.head.innerHTML;
        });

        const match = script.match(/<script src="assets\/test\.js\?test=1&amp;_=(\d+)" type="text\/javascript" defer=""><\/script><script src="assets\/test2\.js\?test=2&amp;_=(\d+)" type="text\/javascript" defer=""><\/script>/);

        assert.ok(match);
    });

    it('resolves when the scripts are loaded', async function() {
        assert.strictEqual(
            await exec(async (_) => {
                await $.loadScripts([
                    'assets/test.js',
                    'assets/test2.js',
                ]);
                return window.data;
            }),
            'Test 2',
        );
    });

    it('throws on error', async function() {
        assert.strictEqual(
            await exec(async (_) => {
                try {
                    await $.loadScripts([
                        'assets/error.js',
                        'assets/error2.js',
                    ]);
                    return false;
                } catch (e) {
                    return true;
                }
            }),
            true,
        );
    });
});
