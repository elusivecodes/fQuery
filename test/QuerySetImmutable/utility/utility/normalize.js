const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #normalize', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent1" class="test">' +
                '<div id="child1"></div>' +
                '</div>' +
                '<div id="parent2" class="test">' +
                '<div id="child2"></div>' +
                '</div>';
            const child1 = document.getElementById('child1');
            const child2 = document.getElementById('child2');
            const text1 = document.createTextNode('Test 1');
            const text2 = document.createTextNode('Test 2');
            const text3 = document.createTextNode('Test 3');
            const text4 = document.createTextNode('Test 4');
            const text5 = document.createTextNode('Test 5');
            const text6 = document.createTextNode('Test 6');
            const text7 = document.createTextNode('Test 7');
            const text8 = document.createTextNode('Test 8');
            const span1 = document.createElement('span');
            const span2 = document.createElement('span');

            child1.appendChild(text1);
            child1.appendChild(text2);
            child1.appendChild(span1);
            child1.appendChild(text3);
            child1.appendChild(text4);

            child2.appendChild(text5);
            child2.appendChild(text6);
            child2.appendChild(span2);
            child2.appendChild(text7);
            child2.appendChild(text8);
        });
    });

    it('normalizes all text nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.query('.test')
                    .normalize();
                return [
                    document.getElementById('child1').childNodes.length,
                    document.getElementById('child2').childNodes.length
                ]
            }),
            [
                3,
                3
            ]
        );
    });

    it('retains HTML contents', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('.test')
                    .normalize();
                return document.body.innerHTML;
            }),
            '<div id="parent1" class="test">' +
            '<div id="child1">' +
            'Test 1Test 2<span></span>Test 3Test 4' +
            '</div>' +
            '</div>' +
            '<div id="parent2" class="test">' +
            '<div id="child2">' +
            'Test 5Test 6<span></span>Test 7Test 8' +
            '</div>' +
            '</div>'
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.query('.test');
                return query === query.normalize();
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.equal(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                const text1 = document.createTextNode('Test 1');
                const text2 = document.createTextNode('Test 2');
                const text3 = document.createTextNode('Test 3');
                const text4 = document.createTextNode('Test 4');
                const span1 = document.createElement('span');

                fragment.appendChild(text1);
                fragment.appendChild(text2);
                fragment.appendChild(span1);
                fragment.appendChild(text3);
                fragment.appendChild(text4);

                dom.query(fragment)
                    .normalize();

                return fragment.childNodes.length
            }),
            3
        )
    });

    it('works with ShadowRoot nodes', async function() {
        assert.equal(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const text1 = document.createTextNode('Test 1');
                const text2 = document.createTextNode('Test 2');
                const text3 = document.createTextNode('Test 3');
                const text4 = document.createTextNode('Test 4');
                const span1 = document.createElement('span');

                shadow.appendChild(text1);
                shadow.appendChild(text2);
                shadow.appendChild(span1);
                shadow.appendChild(text3);
                shadow.appendChild(text4);

                dom.query(shadow)
                    .normalize();

                return shadow.childNodes.length
            }),
            3
        )
    });

});