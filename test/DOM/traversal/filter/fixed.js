const assert = require('assert').strict;
const { exec, setStyle } = require('../../../setup');

describe('#fixed', function() {

    beforeEach(async function() {
        await setStyle('.test { position: fixed; }');
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1">' +
                '<span id="span1"></span>' +
                '</div>' +
                '<div id="div2" class="test">' +
                '<span id="span2"></span>' +
                '</div>' +
                '<div id="div3">' +
                '<span id="span3"></span>' +
                '</div>' +
                '<div id="div4" class="test">' +
                '<span id="span4"></span>' +
                '</div>';
        });
    });

    it('returns fixed nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.fixed('div')
                    .map(node => node.id)
            ),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('returns descendents of fixed nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.fixed('span')
                    .map(node => node.id)
            ),
            [
                'span2',
                'span4'
            ]
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.fixed(
                    document.getElementById('div2')
                ).map(node => node.id)
            ),
            [
                'div2'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.fixed(
                    document.querySelectorAll('div')
                ).map(node => node.id)
            ),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.fixed(
                    document.body.children
                ).map(node => node.id)
            ),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.fixed([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4')
                ]).map(node => node.id)
            ),
            [
                'div2',
                'div4'
            ]
        );
    });

});