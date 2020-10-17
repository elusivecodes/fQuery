const assert = require('assert');
const { exec } = require('../../../setup');

describe('#contents', function() {

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
                dom.contents('.parent')
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

    it('returns an empty array for empty nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.contents('#invalid')
            ),
            []
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.contents(
                    document.getElementById('parent1')
                ).map(node => node.textContent)
            ),
            [
                'Test 1',
                '',
                'Test 2'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.contents(
                    document.querySelectorAll('.parent')
                ).map(node => node.textContent)
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

    it('works with HTMLCollection nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.contents(
                    document.body.children
                ).map(node => node.textContent)
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

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    'Test 1' +
                    '<div id="child1"></div>' +
                    'Test 2'
                );
                return dom.contents(fragment)
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
                return dom.contents(shadow)
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
                dom.contents(document)
                    .map(node => node.id)
            ),
            [
                'html'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.contents([
                    document.getElementById('parent1'),
                    document.getElementById('parent2')
                ]).map(node => node.textContent)
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

});