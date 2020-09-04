const assert = require('assert').strict;
const { exec, setStyle } = require('../../../setup');

describe('QuerySetImmutable #isHidden', function() {

    beforeEach(async function() {
        await setStyle('.test { display: none; }');
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1" class="test">' +
                '<span></span>' +
                '</div>' +
                '<div id="div2">' +
                '<span></span>' +
                '</div>' +
                '<div id="div3" class="test">' +
                '<span></span>' +
                '</div>' +
                '<div id="div4">' +
                '<span></span>' +
                '</div>';
        });
    });

    it('returns true if any node is hidden', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('div')
                    .isHidden()
            ),
            true
        );
    });

    it('returns false if no nodes are hidden', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('div:not(.test)')
                    .isHidden()
            ),
            false
        );
    });

    it('returns true if any node is a descendent of a hidden node', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('span')
                    .isHidden()
            ),
            true
        );
    });

    it('works with Document nodes', async function() {
        assert.equal(
            await exec(_ => {
                const myDoc = new Document();
                return dom.query(myDoc)
                    .isHidden();
            }),
            true
        );
    });

    it('works with Window nodes', async function() {
        assert.equal(
            await exec(_ => {
                const myWindow = {
                    document: {},
                    id: 'window'
                };
                myWindow.document.defaultView = myWindow;
                return dom.query(myWindow)
                    .isHidden();
            }),
            true
        );
    });

});