const assert = require('assert').strict;
const exec = require('../../../setup');

describe('DOM Attributes (Size)', function() {

    describe('#height', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="test1" style="display: block; height: 1000px; width: 1200px; margin: 50px; padding: 25px; border: 1px solid grey;"></div>' +
                    '<div id="test2"></div>';
            });
        });

        it('returns the height of the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.height(
                        'div'
                    );
                }),
                1050
            );
        });

        it('returns the inner height of the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.height(
                        'div',
                        DOM.INNER
                    );
                }),
                1000
            );
        });

        it('returns the outer height of the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.height(
                        'div',
                        DOM.OUTER
                    );
                }),
                1052
            );
        });

        it('returns the outer height of the first node with margin', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.height(
                        'div',
                        DOM.OUTER_MARGIN
                    );
                }),
                1152
            );
        });

        it('returns undefined for empty nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.height(
                        '#invalid'
                    );
                }),
                undefined
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.height(
                        document.getElementById('test1')
                    );
                }),
                1050
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.height(
                        document.body.children
                    );
                }),
                1050
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.height(
                        document.querySelectorAll('div')
                    );
                }),
                1050
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.height(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ]
                    );
                }),
                1050
            );
        });

        it('works with Document nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.height(
                        document
                    );
                }),
                1152
            );
        });

        it('works with Window nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.height(
                        window
                    );
                }),
                600
            );
        });

    });

    describe('#width', function() {

        beforeEach(async function() {
            await exec(_ => {
                document.body.innerHTML =
                    '<div id="test1" style="display: block; height: 1000px; width: 1200px; margin: 50px; padding: 25px; border: 1px solid grey;"></div>' +
                    '<div id="test2"></div>';
            });
        });

        it('returns the width of the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.width(
                        'div'
                    );
                }),
                1250
            );
        });

        it('returns the inner width of the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.width(
                        'div',
                        DOM.INNER
                    );
                }),
                1200
            );
        });

        it('returns the outer width of the first node', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.width(
                        'div',
                        DOM.OUTER
                    );
                }),
                1252
            );
        });

        it('returns the outer width of the first node with margin', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.width(
                        'div',
                        DOM.OUTER_MARGIN
                    );
                }),
                1352
            );
        });

        it('returns undefined for empty nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.width(
                        '#invalid'
                    );
                }),
                undefined
            );
        });

        it('works with HTMLElement nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.width(
                        document.getElementById('test1')
                    );
                }),
                1250
            );
        });

        it('works with HTMLCollection nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.width(
                        document.body.children
                    );
                }),
                1250
            );
        });

        it('works with NodeList nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.width(
                        document.querySelectorAll('div')
                    );
                }),
                1250
            );
        });

        it('works with array nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.width(
                        [
                            document.getElementById('test1'),
                            document.getElementById('test2')
                        ]
                    );
                }),
                1250
            );
        });

        it('works with Document nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.width(
                        document
                    );
                }),
                1310
            );
        });

        it('works with Window nodes', async function() {
            assert.equal(
                await exec(_ => {
                    return dom.width(
                        window
                    );
                }),
                800
            );
        });

    });

});