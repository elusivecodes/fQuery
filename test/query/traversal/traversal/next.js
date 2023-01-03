import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #next', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="parent">' +
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

    it('returns the next sibling of each node', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .next()
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span3',
                'span7',
            ],
        );
    });

    it('returns the next sibling of each node matching a filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .next('#span7')
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span7',
            ],
        );
    });

    it('returns a new QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query1 = $('.span');
                const query2 = query1.next();
                return query2.constructor.name === 'QuerySet' && query1 !== query2;
            }),
            true,
        );
    });

    it('works with function filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .next((node) => node.id === 'span7')
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span7',
            ],
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .next(
                        document.getElementById('span7'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span7',
            ],
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .next(
                        document.querySelectorAll('#span7'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span7',
            ],
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .next(
                        document.getElementById('parent2').children,
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span7',
            ],
        );
    });

    it('works with array filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .next([
                        document.getElementById('span3'),
                        document.getElementById('span7'),
                    ])
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span3',
                'span7',
            ],
        );
    });

    it('works with QuerySet filter', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const query = $('#span7');
                return $('.span')
                    .next(query)
                    .get()
                    .map((node) => node.id);
            }),
            [
                'span7',
            ],
        );
    });
});
