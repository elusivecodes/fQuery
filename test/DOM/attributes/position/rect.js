const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#rect', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>' +
                '<div id="test2"></div>';
            window.scrollTo(1000, 1000);
        });
    });

    it('returns the bounding rectangle of the first node', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.rect(
                    'div'
                ).toJSON();
            }),
            {
                x: 600,
                y: 50,
                width: 200,
                height: 200,
                top: 50,
                right: 800,
                bottom: 250,
                left: 600
            }
        );
    });

    it('returns the bounding rectangle of the first node with offset', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.rect(
                    'div',
                    true
                ).toJSON();
            }),
            {
                x: 1058,
                y: 1050,
                width: 200,
                height: 200,
                top: 1050,
                right: 1258,
                bottom: 1250,
                left: 1058
            }
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.rect(
                    '#invalid'
                );
            }),
            undefined
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.rect(
                    document.getElementById('test1')
                ).toJSON();
            }),
            {
                x: 600,
                y: 50,
                width: 200,
                height: 200,
                top: 50,
                right: 800,
                bottom: 250,
                left: 600
            }
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.rect(
                    document.querySelectorAll('div')
                ).toJSON();
            }),
            {
                x: 600,
                y: 50,
                width: 200,
                height: 200,
                top: 50,
                right: 800,
                bottom: 250,
                left: 600
            }
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.rect(
                    document.body.children
                ).toJSON();
            }),
            {
                x: 600,
                y: 50,
                width: 200,
                height: 200,
                top: 50,
                right: 800,
                bottom: 250,
                left: 600
            }
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.rect(
                    [
                        document.getElementById('test1'),
                        document.getElementById('test2')
                    ]
                ).toJSON();
            }),
            {
                x: 600,
                y: 50,
                width: 200,
                height: 200,
                top: 50,
                right: 800,
                bottom: 250,
                left: 600
            }
        );
    });

});