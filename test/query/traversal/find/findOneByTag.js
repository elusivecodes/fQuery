import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #findOneByTag', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="parent1">' +
                '<div id="child1">' +
                '<span id="span1"></span>' +
                '<span id="span2"></span>' +
                '</div>' +
                '<div id="child2">' +
                '<span id="span3"></span>' +
                '<span id="span4"></span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div id="child3">' +
                '<span id="span5"></span>' +
                '<span id="span6"></span>' +
                '</div>' +
                '<div id="child4">' +
                '<span id="span7"></span>' +
                '<span id="span8"></span>' +
                '</div>' +
                '</div>';
        });
    });

    it('finds elements by tag name', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $(document.body)
                    .findOneByTag('span')
                    .get()
                    .map((node) => node.id),
            ),
            [
                'span1',
            ],
        );
    });

    it('returns a new QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query1 = $(document.body);
                const query2 = query1.findOneByTag('span');
                return query2.constructor.name === 'QuerySet' && query1 !== query2;
            }),
            true,
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>' +
                    '<span id="span1"></span>' +
                    '<span id="span2"></span>',
                );
                return $(fragment)
                    .findOneByTag('span')
                    .get()
                    .map((node) => node.id);
            }),
            [
                'span1',
            ],
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>' +
                    '<span id="span1"></span>' +
                    '<span id="span2"></span>',
                );
                shadow.appendChild(fragment);
                return $(shadow)
                    .findOneByTag('span')
                    .get()
                    .map((node) => node.id);
            }),
            [
                'span1',
            ],
        );
    });

    it('works with Document nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const parser = new DOMParser();
                const myDoc = parser.parseFromString(
                    '<html>' +
                    '<head>' +
                    '</head>' +
                    '<body>' +
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>' +
                    '<span id="span1"></span>' +
                    '<span id="span2"></span>' +
                    '</body>' +
                    '</html>',
                    'text/html',
                );
                return $(myDoc)
                    .findOneByTag('span')
                    .get()
                    .map((node) => node.id);
            }),
            [
                'span1',
            ],
        );
    });
});
