import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #prevAll', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="parent1">' +
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

    it('returns all previous siblings of each node', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .prevAll()
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span1',
                'span2',
                'span5',
                'span6',
            ],
        );
    });

    it('returns all previous siblings of each node matching a filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .prevAll('#span1, #span5')
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span1',
                'span5',
            ],
        );
    });

    it('returns a new QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query1 = $('.span');
                const query2 = query1.prevAll();
                return query2.constructor.name === 'QuerySet' && query1 !== query2;
            }),
            true,
        );
    });

    it('works with function filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .prevAll((node) => node.id === 'span5')
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span5',
            ],
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .prevAll(
                        document.getElementById('span1'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span1',
            ],
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .prevAll(
                        document.querySelectorAll('#span1, #span5'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span1',
                'span5',
            ],
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .prevAll(
                        document.getElementById('parent2').children,
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span5',
                'span6',
            ],
        );
    });

    it('works with array filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .prevAll([
                        document.getElementById('span1'),
                        document.getElementById('span5'),
                    ])
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span1',
                'span5',
            ],
        );
    });

    it('works with QuerySet filter', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const query = $('#span1, #span5');
                return $('.span')
                    .prevAll(query)
                    .get()
                    .map((node) => node.id);
            }),
            [
                'span1',
                'span5',
            ],
        );
    });

    it('works with function limit', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .prevAll(
                        null,
                        (node) => node.id === 'span6',
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span1',
                'span2',
            ],
        );
    });

    it('works with HTMLElement limit', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .prevAll(
                        null,
                        document.getElementById('span6'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span1',
                'span2',
            ],
        );
    });

    it('works with NodeList limit', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .prevAll(
                        null,
                        document.querySelectorAll('#span1, #span6'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span2',
            ],
        );
    });

    it('works with HTMLCollection limit', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .prevAll(
                        null,
                        document.getElementById('parent2').children,
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span1',
                'span2',
            ],
        );
    });

    it('works with array limit', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .prevAll(null, [,
                        document.getElementById('span1'),
                        document.getElementById('span6'),
                    ])
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span2',
            ],
        );
    });

    it('works with QuerySet limit', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const query = $('#span1, #span6');
                return $('.span')
                    .prevAll(null, query)
                    .get()
                    .map((node) => node.id);
            }),
            [
                'span2',
            ],
        );
    });
});
