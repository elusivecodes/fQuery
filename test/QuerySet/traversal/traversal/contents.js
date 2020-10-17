const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySet #contents', function() {

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
                dom.queryMutable('.parent')
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

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.queryMutable('.parent');
                return query === query.contents();
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
                return dom.queryMutable(fragment)
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
                return dom.queryMutable(shadow)
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
                dom.queryMutable(document)
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