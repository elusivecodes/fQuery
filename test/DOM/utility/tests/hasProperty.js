const assert = require('assert');
const { exec } = require('../../../setup');

describe('#hasProperty', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
            document.getElementById('div1').test = 'Test 1';
            document.getElementById('div3').test = 'Test 2';
        });
    });

    it('returns true if any node has a specified property', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.hasProperty('div', 'test')
            ),
            true
        );
    });

    it('returns false if no nodes have a specified property', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.hasProperty('div:not(.test)', 'test')
            ),
            false
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.hasProperty(
                    document.getElementById('div1'),
                    'test'
                )
            ),
            true
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.hasProperty(
                    document.querySelectorAll('div'),
                    'test'
                )
            ),
            true
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.hasProperty(
                    document.body.children,
                    'test'
                )
            ),
            true
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.hasProperty([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4')
                ], 'test')
            ),
            true
        );
    });

});