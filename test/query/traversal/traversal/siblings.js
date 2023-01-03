import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #siblings', function() {
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
                '<span id="span5">' +
                '<a></a>' +
                '</span>' +
                '</div>' +
                '<div id="parent2">' +
                '<span id="span6">' +
                '<a></a>' +
                '</span>' +
                '<span id="span7">' +
                '<a></a>' +
                '</span>' +
                '<span id="span8" class="span">' +
                '<a></a>' +
                '</span>' +
                '<span id="span9">' +
                '<a></a>' +
                '</span>' +
                '<span id="span10">' +
                '<a></a>' +
                '</span>' +
                '</div>';
        });
    });

    it('returns all siblings of each node', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .siblings()
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span1',
                'span2',
                'span4',
                'span5',
                'span6',
                'span7',
                'span9',
                'span10',
            ],
        );
    });

    it('returns all siblings of each node matching a filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .siblings('#span1, #span10')
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span1',
                'span10',
            ],
        );
    });

    it('returns a new QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query1 = $('.span');
                const query2 = query1.siblings();
                return query2.constructor.name === 'QuerySet' && query1 !== query2;
            }),
            true,
        );
    });

    it('works with function filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .siblings((node) => node.id === 'span5')
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
                    .siblings(
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
                    .siblings(
                        document.querySelectorAll('#span1, #span10'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span1',
                'span10',
            ],
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .siblings(
                        document.getElementById('parent2').children,
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span6',
                'span7',
                'span9',
                'span10',
            ],
        );
    });

    it('works with array filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('.span')
                    .siblings([
                        document.getElementById('span1'),
                        document.getElementById('span10'),
                    ])
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span1',
                'span10',
            ],
        );
    });

    it('works with QuerySet filter', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const query = $('#span1, #span10');
                return $('.span')
                    .siblings(query)
                    .get()
                    .map((node) => node.id);
            }),
            [
                'span1',
                'span10',
            ],
        );
    });
});
