const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #findById', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent1">' +
                '<div id="child1">' +
                '<span id="test" data-id="span1"></span>' +
                '<span data-id="span2"></span>' +
                '</div>' +
                '<div id="child2">' +
                '<span id="test" data-id="span3"></span>' +
                '<span data-id="span4"></span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div id="child3">' +
                '<span id="test" data-id="span5"></span>' +
                '<span data-id="span6"></span>' +
                '</div>' +
                '<div id="child4">' +
                '<span id="test" data-id="span7"></span>' +
                '<span data-id="span8"></span>' +
                '</div>' +
                '</div>';
        });
    });

    it('finds elements by ID', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query(document.body)
                    .findById('test')
                    .get()
                    .map(node => node.dataset.id)
            ),
            [
                'span1',
                'span3',
                'span5',
                'span7'
            ]
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.equal(
            await exec(_ => {
                const query1 = dom.query(document.body);
                const query2 = query1.findById('test');
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="test" data-id="div1"></div>' +
                    '<div data-id="div2"></div>' +
                    '<div id="test" data-id="div3"></div>' +
                    '<div data-id="div4"></div>'
                );
                return dom.query(fragment)
                    .findById('test')
                    .get()
                    .map(node => node.dataset.id);
            }),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="test" data-id="div1"></div>' +
                    '<div data-id="div2"></div>' +
                    '<div id="test" data-id="div3"></div>' +
                    '<div data-id="div4"></div>'
                );
                shadow.appendChild(fragment);
                return dom.query(shadow)
                    .findById('test')
                    .get()
                    .map(node => node.dataset.id);
            }),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with Document nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const parser = new DOMParser();
                const myDoc = parser.parseFromString(
                    '<html>' +
                    '<head>' +
                    '</head>' +
                    '<body>' +
                    '<div id="test" data-id="div1"></div>' +
                    '<div data-id="div2"></div>' +
                    '<div id="test" data-id="div3"></div>' +
                    '<div data-id="div4"></div>' +
                    '</body>' +
                    '</html>',
                    'text/html'
                );
                return dom.query(myDoc)
                    .findById('test')
                    .get()
                    .map(node => node.dataset.id);
            }),
            [
                'div1',
                'div3'
            ]
        );
    });

});