import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #prev', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="parent">' +
                '<span id="span1">' +
                '<a></a>' +
                '</span>' +
                '<span id="span2">' +
                '<a></a>' +
                '</span>' +
                '<span id="span3" class="span">' +
                '<a></a>' +
                '</span>' +
                '<span id="span4">' +
                '<a></a>' +
                '</span>' +
                '</div>' +
                '<div id="parent2">' +
                '<span id="span5">' +
                '<a></a>' +
                '</span>' +
                '<span id="span6">' +
                '<a></a>' +
                '</span>' +
                '<span id="span7" class="span">' +
                '<a></a>' +
                '</span>' +
                '<span id="span8">' +
                '<a></a>' +
                '</span>' +
                '</div>';
        });
    });

    it('returns the previous sibling of each node', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .prev()
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span2',
                'span6',
            ],
        );
    });

    it('returns the previous sibling of each node matching a filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .prev('#span6')
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span6',
            ],
        );
    });

    it('returns a new QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query1 = $('.span');
                const query2 = query1.prev();
                return query2.constructor.name === 'QuerySet' && query1 !== query2;
            }),
            true,
        );
    });

    it('works with function filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .prev((node) => node.id === 'span6')
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span6',
            ],
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .prev(
                        document.getElementById('span6'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span6',
            ],
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .prev(
                        document.querySelectorAll('#span6'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span6',
            ],
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .prev(
                        document.getElementById('parent2').children,
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span6',
            ],
        );
    });

    it('works with array filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .prev([
                        document.getElementById('span2'),
                        document.getElementById('span6'),
                    ])
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span2',
                'span6',
            ],
        );
    });

    it('works with QuerySet filter', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const query = $('#span6');
                return $('.span')
                    .prev(query)
                    .get()
                    .map((node) => node.id);
            }),
            [
                'span6',
            ],
        );
    });
});
