const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #findOneByClass', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent1">' +
                '<div id="child1">' +
                '<span id="span1" class="test"></span>' +
                '<span id="span2"></span>' +
                '</div>' +
                '<div id="child2">' +
                '<span id="span3" class="test"></span>' +
                '<span id="span4"></span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div id="child3">' +
                '<span id="span5" class="test"></span>' +
                '<span id="span6"></span>' +
                '</div>' +
                '<div id="child4">' +
                '<span id="span7" class="test"></span>' +
                '<span id="span8"></span>' +
                '</div>' +
                '</div>';
        });
    });

    it('finds elements by class name', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query(document.body)
                    .findOneByClass('test')
                    .get()
                    .map(node => node.id)
            ),
            [
                'span1'
            ]
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.equal(
            await exec(_ => {
                const query1 = dom.query(document.body);
                const query2 = query1.findOneByClass('test');
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
                    '<div id="div1" class="test"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3" class="test"></div>' +
                    '<div id="div4"></div>'
                );
                return dom.query(fragment)
                    .findOneByClass('test')
                    .get()
                    .map(node => node.id);
            }),
            [
                'div1'
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
                    '<div id="div1" class="test"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3" class="test"></div>' +
                    '<div id="div4"></div>'
                );
                shadow.appendChild(fragment);
                return dom.query(shadow)
                    .findOneByClass('test')
                    .get()
                    .map(node => node.id);
            }),
            [
                'div1'
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
                    '<div id="div1" class="test"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3" class="test"></div>' +
                    '<div id="div4"></div>' +
                    '</body>' +
                    '</html>',
                    'text/html'
                );
                return dom.query(myDoc)
                    .findOneByClass('test')
                    .get()
                    .map(node => node.id);
            }),
            [
                'div1'
            ]
        );
    });

});