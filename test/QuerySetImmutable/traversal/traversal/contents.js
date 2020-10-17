const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #contents', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent1" class="parent">' +
                'Test 1' +
                '<div id="child1"></div>' +
                'Test 2' +
                '</div>' +
                '<div id="parent2" class="parent">' +
                'Test 3' +
                '<div id="child2"></div>' +
                'Test 4' +
                '</div>';
        });
    });

    it('returns all children of each node', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('.parent')
                    .contents()
                    .get()
                    .map(node => node.textContent)
            ),
            [
                'Test 1',
                '',
                'Test 2',
                'Test 3',
                '',
                'Test 4'
            ]
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query1 = dom.query('.parent');
                const query2 = query1.contents();
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
                    'Test 1' +
                    '<div id="child1"></div>' +
                    'Test 2'
                );
                return dom.query(fragment)
                    .contents()
                    .get()
                    .map(node => node.textContent);
            }),
            [
                'Test 1',
                '',
                'Test 2'
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
                    'Test 1' +
                    '<div id="child1"></div>' +
                    'Test 2'
                );
                shadow.appendChild(fragment);
                return dom.query(shadow)
                    .contents()
                    .get()
                    .map(node => node.textContent);
            }),
            [
                'Test 1',
                '',
                'Test 2'
            ]
        );
    });

    it('works with Document nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query(document)
                    .contents()
                    .get()
                    .map(node => node.id)
            ),
            [
                'html'
            ]
        );
    });

});