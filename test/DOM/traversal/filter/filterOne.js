const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#filterOne', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2" data-filter="test"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4" data-filter="test"></div>';
        });
    });

    it('returns the first node matching a filter', async function() {
        assert.equal(
            await exec(_ =>
                dom.filterOne('div', '[data-filter="test"]').id
            ),
            'div2'
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.filterOne(
                    document.getElementById('div2'),
                    '[data-filter="test"]'
                ).id
            ),
            'div2'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.filterOne(
                    document.querySelectorAll('div'),
                    '[data-filter="test"]'
                ).id
            ),
            'div2'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.filterOne(
                    document.body.children,
                    '[data-filter="test"]'
                ).id
            ),
            'div2'
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.equal(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return dom.filterOne(fragment).id;
            }),
            'fragment'
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.equal(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return dom.filterOne(shadow).id;
            }),
            'shadow'
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.filterOne([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4')
                ], '[data-filter="test"]').id
            ),
            'div2'
        );
    });

    it('works with function filter', async function() {
        assert.equal(
            await exec(_ =>
                dom.filterOne(
                    'div',
                    node => node.dataset.filter === 'test'
                ).id
            ),
            'div2'
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.equal(
            await exec(_ =>
                dom.filterOne(
                    'div',
                    document.getElementById('div2')
                ).id
            ),
            'div2'
        );
    });

    it('works with NodeList filter', async function() {
        assert.equal(
            await exec(_ =>
                dom.filterOne(
                    'div',
                    document.querySelectorAll('[data-filter="test"]')
                ).id
            ),
            'div2'
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.equal(
            await exec(_ =>
                dom.filterOne(
                    'div',
                    document.body.children
                ).id
            ),
            'div1'
        );
    });

    it('works with DocumentFragment filter', async function() {
        assert.equal(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return dom.filterOne(
                    [
                        fragment
                    ],
                    fragment,
                ).id;
            }),
            'fragment'
        );
    });

    it('works with ShadowRoot filter', async function() {
        assert.equal(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return dom.filterOne(
                    [
                        shadow
                    ],
                    shadow
                ).id;
            }),
            'shadow'
        );
    });

    it('works with array filter', async function() {
        assert.equal(
            await exec(_ =>
                dom.filterOne('div', [
                    document.getElementById('div2'),
                    document.getElementById('div4')
                ]).id
            ),
            'div2'
        );
    });

});