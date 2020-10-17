const assert = require('assert');
const { exec } = require('../../../setup');

describe('#getStyle', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; width: 100px; height: 100px;"></div>' +
                '<div id="test2"></div>';
        });
    });

    it('returns an object with all style values for the first node', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.getStyle('div')
            ),
            {
                display: 'block',
                width: '100px',
                height: '100px'
            }
        );
    });

    it('returns a style value for the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getStyle('div', 'display')
            ),
            'block'
        );
    });

    it('returns an empty string for an undefined style', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getStyle('div', 'visibility')
            ),
            ''
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getStyle('#invalid', 'display')
            ),
            undefined
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getStyle(
                    document.getElementById('test1'),
                    'display'
                )
            ),
            'block'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getStyle(
                    document.querySelectorAll('div'),
                    'display'
                )
            ),
            'block'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getStyle(
                    document.body.children,
                    'display'
                )
            ),
            'block'
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getStyle([
                    document.getElementById('test1'),
                    document.getElementById('test2')
                ], 'display')
            ),
            'block'
        );
    });

});