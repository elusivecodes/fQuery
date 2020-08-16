const assert = require('assert').strict;
const { exec } = require('../../setup');

describe('#loadScript', function() {

    it('loads a script', async function() {
        assert.equal(
            await exec(_ => {
                dom.loadScript('assets/test.js');
                return document.head.innerHTML;
            }),
            '<script src="assets/test.js" type="text/javascript"></script>'
        )
    });

    it('loads a script with attributes', async function() {
        assert.equal(
            await exec(_ => {
                dom.loadScript('assets/test.js', {
                    integrity: 'sha384-1AK0oxsmb9+cemh1YwLG4rPfSc3jb81aGOY8CBrD6WNTumSzeeAs3p5iYyXJemZu',
                    crossorigin: 'anonymous'
                });
                return document.head.innerHTML;
            }),
            '<script src="assets/test.js" type="text/javascript" integrity="sha384-1AK0oxsmb9+cemh1YwLG4rPfSc3jb81aGOY8CBrD6WNTumSzeeAs3p5iYyXJemZu" crossorigin="anonymous"></script>'
        )
    });

    it('loads a script without cache', async function() {
        const script = await exec(_ => {
            dom.loadScript('assets/test.js', null, false);
            return document.head.innerHTML;
        });

        const match = script.match(/<script src="assets\/test\.js\?_=(\d+)" type="text\/javascript"><\/script>/);

        assert.ok(match)
    });

    it('loads a script without cache (query string)', async function() {
        const script = await exec(_ => {
            dom.loadScript('assets/test.js?test=1', null, false);
            return Core.unescape(document.head.innerHTML);
        });

        const match = script.match(/<script src="assets\/test\.js\?test=1&_=(\d+)" type="text\/javascript"><\/script>/);

        assert.ok(match)
    });

    it('resolves when the script is loaded', async function() {
        assert.equal(
            await exec(async _ => {
                await dom.loadScript('assets/test.js');
                return window.data;
            }),
            'Test'
        )
    });

    it('throws on error', async function() {
        assert.equal(
            await exec(async _ => {
                try {
                    await dom.loadScript('assets/error.js');
                    return false;
                } catch (e) {
                    return true;
                }
            }),
            true
        )
    });

});