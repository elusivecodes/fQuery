import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #nextAll', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="parent1">' +
                '<span id="span1">' +
                '<a></a>' +
                '</span>' +
                '<span id="span2" class="span">' +
                '<a></a>' +
                '</span>' +
                '<span id="span3">' +
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
                '<span id="span6" class="span">' +
                '<a></a>' +
                '</span>' +
                '<span id="span7">' +
                '<a></a>' +
                '</span>' +
                '<span id="span8">' +
                '<a></a>' +
                '</span>' +
                '</div>';
        });
    });

    it('returns all next siblings of each node', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .nextAll()
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span3',
                'span4',
                'span7',
                'span8',
            ],
        );
    });

    it('returns all next siblings of each node matching a filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .nextAll('#span4, #span8')
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span4',
                'span8',
            ],
        );
    });

    it('returns all next siblings of each node before a limit', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .nextAll(null, '#span4, #span7')
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span3',
            ],
        );
    });

    it('returns a new QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query1 = $('.span');
                const query2 = query1.nextAll();
                return query2.constructor.name === 'QuerySet' && query1 !== query2;
            }),
            true,
        );
    });

    it('works with function filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .nextAll((node) => node.id === 'span8')
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span8',
            ],
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .nextAll(
                        document.getElementById('span4'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span4',
            ],
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .nextAll(
                        document.querySelectorAll('#span4, #span8'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span4',
                'span8',
            ],
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .nextAll(
                        document.getElementById('parent2').children,
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span7',
                'span8',
            ],
        );
    });

    it('works with array filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .nextAll([
                        document.getElementById('span4'),
                        document.getElementById('span8'),
                    ])
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span4',
                'span8',
            ],
        );
    });

    it('works with QuerySet filter', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const query = $('#span4, #span8');
                return $('.span')
                    .nextAll(query)
                    .get()
                    .map((node) => node.id);
            }),
            [
                'span4',
                'span8',
            ],
        );
    });

    it('works with function limit', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .nextAll(
                        null,
                        (node) => node.id === 'span7',
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span3',
                'span4',
            ],
        );
    });

    it('works with HTMLElement limit', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .nextAll(
                        null,
                        document.getElementById('span7'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span3',
                'span4',
            ],
        );
    });

    it('works with NodeList limit', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .nextAll(
                        null,
                        document.querySelectorAll('#span4, #span7'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span3',
            ],
        );
    });

    it('works with HTMLCollection limit', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .nextAll(
                        null,
                        document.getElementById('parent2').children,
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span3',
                'span4',
            ],
        );
    });

    it('works with array limit', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .nextAll(null, [
                        document.getElementById('span4'),
                        document.getElementById('span7'),
                    ])
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span3',
            ],
        );
    });

    it('works with QuerySet limit', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const query = $('#span4, #span7');
                return $('.span')
                    .nextAll(null, query)
                    .get()
                    .map((node) => node.id);
            }),
            [
                'span3',
            ],
        );
    });
});
