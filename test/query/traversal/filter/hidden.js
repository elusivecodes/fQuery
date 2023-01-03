import assert from 'node:assert/strict';
import { exec, setStyle } from './../../../setup.js';

describe('QuerySet #hidden', function() {
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

    it('returns hidden nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .hidden()
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div2',
                'div4',
            ],
        );
    });

    it('returns descendents of hidden nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('span')
                    .hidden()
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span2',
                'span4',
            ],
        );
    });

    it('returns a new QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query1 = $('div');
                const query2 = query1.hidden();
                return query2.constructor.name === 'QuerySet' && query1 !== query2;
            }),
            true,
        );
    });

    it('works with Document nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const myDoc = new Document();
                myDoc.id = 'document';
                return $(myDoc)
                    .hidden()
                    .get()
                    .map((node) => node.id);
            }),
            [
                'document',
            ],
        );
    });

    it('works with Window nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const myWindow = {
                    document: {},
                    id: 'window',
                };
                myWindow.document.defaultView = myWindow;
                return $(myWindow)
                    .hidden()
                    .get()
                    .map((node) => node.id);
            }),
            [
                'window',
            ],
        );
    });
});
