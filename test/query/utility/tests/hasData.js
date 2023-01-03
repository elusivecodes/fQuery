import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #hasData', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
            $.setData('#div1', 'test1', 'Test 1');
            $.setData('#div3', 'test2', 'Test 2');
        });
    });

    it('returns true if any node has data', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .hasData(),
            ),
            true,
        );
    });

    it('returns false if no nodes have data', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div:not(.test)')
                    .hasData(),
            ),
            false,
        );
    });

    it('returns true if any node has data for a key', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('#div1')
                    .hasData('test1'),
            ),
            true,
        );
    });

    it('returns false if no nodes have data for a key', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('#div1')
                    .hasData('test2'),
            ),
            false,
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                $.setData(fragment, 'test', 'Test');
                return $(fragment)
                    .hasData();
            }),
            true,
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                $.setData(shadow, 'test', 'Test');
                return $(shadow)
                    .hasData();
            }),
            true,
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setData(document, 'test', 'Test');
                return $(document)
                    .hasData();
            }),
            true,
        );
    });

    it('works with Window nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setData(window, 'test', 'Test');
                return $(window)
                    .hasData();
            }),
            true,
        );
    });
});
