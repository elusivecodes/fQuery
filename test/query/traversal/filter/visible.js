import assert from 'node:assert/strict';
import { exec, setStyle } from './../../../setup.js';

describe('QuerySet #visible', function() {
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
                $('div')
                    .visible()
                    .get()
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
                $('span')
                    .visible()
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span1',
                'span3',
            ],
        );
    });

    it('returns a new QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query1 = $('div');
                const query2 = query1.visible();
                return query2.constructor.name === 'QuerySet' && query1 !== query2;
            }),
            true,
        );
    });

    it('works with Document nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $(document)
                    .visible()
                    .get()
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
                $(window)
                    .visible()
                    .get()
                    .map((node) => node.id),
            ),
            [
                'window',
            ],
        );
    });
});
