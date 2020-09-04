const assert = require('assert').strict;
const { exec, setStyle } = require('../../../setup');

describe('QuerySet #hidden', function() {

    beforeEach(async function() {
        await setStyle('.test { display: none; }');
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

    it('returns hidden nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .hidden()
                    .get()
                    .map(node => node.id)
            ),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('returns descendents of hidden nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('span')
                    .hidden()
                    .get()
                    .map(node => node.id)
            ),
            [
                'span2',
                'span4'
            ]
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return query === query.hidden();
            }),
            true
        );
    });

    it('works with Document nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const myDoc = new Document();
                myDoc.id = 'document';
                return dom.queryMutable(myDoc)
                    .hidden()
                    .get()
                    .map(node => node.id);
            }),
            [
                'document'
            ]
        );
    });

    it('works with Window nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const myWindow = {
                    document: {},
                    id: 'window'
                };
                myWindow.document.defaultView = myWindow;
                return dom.queryMutable(myWindow)
                    .hidden()
                    .get()
                    .map(node => node.id);
            }),
            [
                'window'
            ]
        );
    });

});