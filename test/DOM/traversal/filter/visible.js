import assert from 'node:assert/strict';
import { exec, setStyle } from './../../../setup.js';

describe('#visible', function() {
    beforeEach(async function() {
        await setStyle('.test { display: none; }');
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1">' +
                '<span id="span1"></span>' +
                '</div>' +
                '<div id="div2" class="test">' +
                '<span id="span2"></span>' +
                '</div>' +
                '<div id="div3">' +
                '<span id="span3"></span>' +
                '</div>' +
                '<div id="div4" class="test">' +
                '<span id="span4"></span>' +
                '</div>';
        });
    });

    it('returns visible nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.visible('div')
                    .map((node) => node.id),
            ),
            [
                'div1',
                'div3',
            ],
        );
    });

    it('returns descendents of visible nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.visible('span')
                    .map((node) => node.id),
            ),
            [
                'span1',
                'span3',
            ],
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.visible(
                    document.getElementById('div1'),
                ).map((node) => node.id),
            ),
            [
                'div1',
            ],
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.visible(
                    document.querySelectorAll('div'),
                ).map((node) => node.id),
            ),
            [
                'div1',
                'div3',
            ],
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.visible(
                    document.body.children,
                ).map((node) => node.id),
            ),
            [
                'div1',
                'div3',
            ],
        );
    });

    it('works with Document nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.visible(document)
                    .map((node) => node.id),
            ),
            [
                'document',
            ],
        );
    });

    it('works with Window nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.visible(window)
                    .map((node) => node.id),
            ),
            [
                'window',
            ],
        );
    });

    it('works with array nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.visible([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4'),
                ]).map((node) => node.id),
            ),
            [
                'div1',
                'div3',
            ],
        );
    });
});
