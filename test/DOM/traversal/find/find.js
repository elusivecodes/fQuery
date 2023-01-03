import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#find', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="parent1">' +
                '<div id="child1">' +
                '<span id="span1" class="span1 group1">' +
                '<a id="a1" class="group1">' +
                '<strong id="strong1" class="group1"></strong>' +
                '</a>' +
                '<a id="a2" class="group1">' +
                '<strong id="strong2" class="group1"></strong>' +
                '</a>' +
                '<a id="a3" class="group1" data-toggle="test">' +
                '<strong id="strong3" class="group1"></strong>' +
                '</a>' +
                '</span>' +
                '<span id="span2" class="span1 group1">' +
                '<a id="a4" class="group1">' +
                '<strong id="strong4" class="group1"></strong>' +
                '</a>' +
                '<a id="a5" class="group1">' +
                '<strong id="strong5" class="group1"></strong>' +
                '</a>' +
                '<a id="a6" class="group1" data-toggle="test">' +
                '<strong id="strong6" class="group1"></strong>' +
                '</a>' +
                '</span>' +
                '</div>' +
                '<div id="child2">' +
                '<span id="span3" class="span1 group1">' +
                '<a id="a7" class="group1">' +
                '<strong id="strong7" class="group1"></strong>' +
                '</a>' +
                '<a id="a8" class="group1">' +
                '<strong id="strong8" class="group1"></strong>' +
                '</a>' +
                '<a id="a9" class="group1" data-toggle="test">' +
                '<strong id="strong9" class="group1"></strong>' +
                '</a>' +
                '</span>' +
                '<span id="span4" class="span1 group1"></span>' +
                '</div>' +
                '<div id="child3">' +
                '<span id="span5" class="span1 group1"></span>' +
                '<span id="span6" class="span1 group1"></span>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div id="child4">' +
                '<span id="span7" class="span2 group2">' +
                '<a id="a10" class="group2">' +
                '<strong id="strong10" class="group2"></strong>' +
                '</a>' +
                '<a id="a11" class="group2">' +
                '<strong id="strong11" class="group2"></strong>' +
                '</a>' +
                '<a id="a12" class="group2" data-toggle="test">' +
                '<strong id="strong12" class="group2"></strong>' +
                '</a>' +
                '</span>' +
                '<span id="span8" class="span2 group2">' +
                '<a id="a13" class="group2">' +
                '<strong id="strong13" class="group2"></strong>' +
                '</a>' +
                '<a id="a14" class="group2">' +
                '<strong id="strong14" class="group2"></strong>' +
                '</a>' +
                '<a id="a15" class="group2" data-toggle="test">' +
                '<strong id="strong15" class="group2"></strong>' +
                '</a>' +
                '</span>' +
                '</div>' +
                '<div id="child5">' +
                '<span id="span9" class="span2 group2">' +
                '<a id="a16" class="group2">' +
                '<strong id="strong16" class="group2"></strong>' +
                '</a>' +
                '<a id="a17" class="group2">' +
                '<strong id="strong17" class="group2"></strong>' +
                '</a>' +
                '<a id="a18" class="group2" data-toggle="test">' +
                '<strong id="strong18" class="group2"></strong>' +
                '</a>' +
                '</span>' +
                '<span id="span10" class="span2 group2"></span>' +
                '</div>' +
                '<div id="child6">' +
                '<span id="span11" class="span2 group2"></span>' +
                '<span id="span12" class="span2 group2"></span>' +
                '</div>' +
                '</div>';
        });
    });

    it('finds elements by query selector', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.find('#parent1 > #child1 > span, #parent1 > #child2 > span')
                    .map((node) => node.id),
            ),
            [
                'span1',
                'span2',
                'span3',
                'span4',
            ],
        );
    });

    it('finds elements by ID', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.find('#parent1')
                    .map((node) => node.id),
            ),
            [
                'parent1',
            ],
        );
    });

    it('finds elements by class name', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.find('.span1')
                    .map((node) => node.id),
            ),
            [
                'span1',
                'span2',
                'span3',
                'span4',
                'span5',
                'span6',
            ],
        );
    });

    it('finds elements by tag name', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.find('span')
                    .map((node) => node.id),
            ),
            [
                'span1',
                'span2',
                'span3',
                'span4',
                'span5',
                'span6',
                'span7',
                'span8',
                'span9',
                'span10',
                'span11',
                'span12',
            ],
        );
    });

    it('returns an empty array for non-matching selector', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.find('#invalid'),
            ),
            [],
        );
    });

    it('returns an empty array for empty nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.find('span', '#invalid'),
            ),
            [],
        );
    });

    it('works with query selector nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.find('span', '#parent1 > #child1')
                    .map((node) => node.id),
            ),
            [
                'span1',
                'span2',
            ],
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.find(
                    'span',
                    document.getElementById('child1'),
                ).map((node) => node.id),
            ),
            [
                'span1',
                'span2',
            ],
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.find(
                    'span',
                    document.querySelectorAll('#parent1 > div'),
                ).map((node) => node.id),
            ),
            [
                'span1',
                'span2',
                'span3',
                'span4',
                'span5',
                'span6',
            ],
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.find(
                    'span',
                    document.getElementById('parent1').children,
                ).map((node) => node.id),
            ),
            [
                'span1',
                'span2',
                'span3',
                'span4',
                'span5',
                'span6',
            ],
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>',
                );
                return $.find('div', fragment)
                    .map((node) => node.id);
            }),
            [
                'div1',
                'div2',
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
                    '<div id="div2"></div>',
                );
                shadow.appendChild(fragment);
                return $.find('div', shadow)
                    .map((node) => node.id);
            }),
            [
                'div1',
                'div2',
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
                    '</body>' +
                    '</html>',
                    'text/html',
                );
                return $.find('div', myDoc)
                    .map((node) => node.id);
            }),
            [
                'div1',
                'div2',
            ],
        );
    });

    it('works with array nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.find('span', [
                    document.getElementById('child1'),
                    document.getElementById('child2'),
                    document.getElementById('child3'),
                ]).map((node) => node.id),
            ),
            [
                'span1',
                'span2',
                'span3',
                'span4',
                'span5',
                'span6',
            ],
        );
    });
});
