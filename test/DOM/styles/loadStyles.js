const assert = require('assert').strict;
const { exec } = require('../../setup');

describe('#loadStyles', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML = '<div id="test"></div>';
        });
    });

    it('loads stylesheets', async function() {
        assert.equal(
            await exec(_ => {
                dom.loadStyles([,
                    'assets/test.css',
                    'assets/test2.css'
                ]);
                return document.head.innerHTML;
            }),
            '<link href="assets/test.css" rel="stylesheet">' +
            '<link href="assets/test2.css" rel="stylesheet">'
        )
    });

    it('loads stylesheets with attributes', async function() {
        assert.equal(
            await exec(_ => {
                dom.loadStyles([
                    {
                        href: 'assets/test.css',
                        integrity: 'sha384-92bXn1Q36iY7yWatlPt66wCfjkIltnOTBPgiq2Vf8xM816mhHZfQ1w4JliBw10Fw',
                        crossorigin: 'anonymous'
                    },
                    {
                        href: 'assets/test2.css',
                        integrity: 'sha384-Ak4PzI/+z3i5IL+dTuDlBFZNoErlYYbiKQbx9SSmE9aHzimL26sAU+tEh5bUyzST',
                        crossorigin: 'anonymous'
                    }
                ]);
                return document.head.innerHTML;
            }),
            '<link href="assets/test.css" rel="stylesheet" integrity="sha384-92bXn1Q36iY7yWatlPt66wCfjkIltnOTBPgiq2Vf8xM816mhHZfQ1w4JliBw10Fw" crossorigin="anonymous">' +
            '<link href="assets/test2.css" rel="stylesheet" integrity="sha384-Ak4PzI/+z3i5IL+dTuDlBFZNoErlYYbiKQbx9SSmE9aHzimL26sAU+tEh5bUyzST" crossorigin="anonymous">'
        )
    });

    it('loads a stylesheet without cache', async function() {
        const link = await exec(_ => {
            dom.loadStyles(
                [
                    'assets/test.css',
                    'assets/test2.css'
                ],
                false
            );
            return document.head.innerHTML;
        });

        const match = link.match(/<link href="assets\/test\.css\?_=(\d+)" rel="stylesheet"><link href="assets\/test2\.css\?_=(\d+)" rel="stylesheet">/);

        assert.ok(match)
    });

    it('loads a stylesheet without cache (query string)', async function() {
        const link = await exec(_ => {
            dom.loadStyles(
                [
                    'assets/test.css?test=1',
                    'assets/test2.css?test=2'
                ],
                false
            );
            return Core.unescape(document.head.innerHTML);
        });

        const match = link.match(/<link href="assets\/test\.css\?test=1&_=(\d+)" rel="stylesheet"><link href="assets\/test2\.css\?test=2&_=(\d+)" rel="stylesheet">/);

        assert.ok(match)
    });

    it('resolves when stylesheets are loaded', async function() {
        assert.equal(
            await exec(async _ => {
                await dom.loadStyles([
                    'assets/test.css',
                    'assets/test2.css'
                ]);
                return document.getElementById('test').clientWidth;
            }),
            100
        )
    });

    it('throws on error', async function() {
        assert.equal(
            await exec(async _ => {
                try {
                    await dom.loadStyles([
                        'assets/error.css',
                        'assets/error2.css'
                    ]);
                    return false;
                } catch (e) {
                    return true;
                }
            }),
            true
        )
    });

});