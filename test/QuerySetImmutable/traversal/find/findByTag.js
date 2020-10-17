const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #findByTag', function() {

    beforeEach(async function() {
        await exec(_ => {
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
            await exec(_ =>
                dom.query(document.body)
                    .findByTag('span')
                    .get()
                    .map(node => node.id)
            ),
            [
                'span1',
                'span2',
                'span3',
                'span4',
                'span5',
                'span6',
                'span7',
                'span8'
            ]
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query1 = dom.query(document.body);
                const query2 = query1.findByTag('span');
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>' +
                    '<span id="span1"></span>' +
                    '<span id="span2"></span>'
                );
                return dom.query(fragment)
                    .findByTag('span')
                    .get()
                    .map(node => node.id);
            }),
            [
                'span1',
                'span2'
            ]
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>' +
                    '<span id="span1"></span>' +
                    '<span id="span2"></span>'
                );
                shadow.appendChild(fragment);
                return dom.query(shadow)
                    .findByTag('span')
                    .get()
                    .map(node => node.id);
            }),
            [
                'span1',
                'span2'
            ]
        );
    });

    it('works with Document nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
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
                    'text/html'
                );
                return dom.query(myDoc)
                    .findByTag('span')
                    .get()
                    .map(node => node.id);
            }),
            [
                'span1',
                'span2'
            ]
        );
    });

});