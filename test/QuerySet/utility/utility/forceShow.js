const assert = require('assert');
const { exec, setStyle } = require('../../../setup');

describe('QuerySet #forceShow', function() {

    beforeEach(async function() {
        await setStyle('.test { display: none; }');
        await exec(_ => {
            document.body.innerHTML =
                '<div id="outer">' +
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>' +
                '</div>';
        });
    });

    it('forces the first node to be visible', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.queryMutable('.test')
                    .forceShow(_ => document.body.innerHTML)
            ),
            '<div id="outer">' +
            '<div id="div1" class="test" style="display: initial !important;"></div>' +
            '<div id="div2"></div>' +
            '<div id="div3" class="test"></div>' +
            '<div id="div4"></div>' +
            '</div>'
        );
    });

    it('forces hidden parent nodes to be visible', async function() {
        assert.strictEqual(
            await exec(_ => {
                document.getElementById('outer').style.setProperty('display', 'none');
                return dom.queryMutable('.test')
                    .forceShow(_ => document.body.innerHTML);
            }),
            '<div id="outer" style="display: initial !important;">' +
            '<div id="div1" class="test" style="display: initial !important;"></div>' +
            '<div id="div2"></div>' +
            '<div id="div3" class="test"></div>' +
            '<div id="div4"></div>' +
            '</div>'
        );
    });

    it('restores the original markup', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.queryMutable('.test')
                    .forceShow(_ => { });
                return document.body.innerHTML;
            }),
            '<div id="outer">' +
            '<div id="div1" class="test"></div>' +
            '<div id="div2"></div>' +
            '<div id="div3" class="test"></div>' +
            '<div id="div4"></div>' +
            '</div>'
        );
    });

    it('restores the original markup with hidden parent', async function() {
        assert.strictEqual(
            await exec(_ => {
                document.getElementById('outer').style.setProperty('display', 'none');
                dom.queryMutable('.test')
                    .forceShow(_ => { });
                return document.body.innerHTML;
            }),
            '<div id="outer" style="display: none;">' +
            '<div id="div1" class="test"></div>' +
            '<div id="div2"></div>' +
            '<div id="div3" class="test"></div>' +
            '<div id="div4"></div>' +
            '</div>'
        );
    });

    it('executes the callback for visible nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.queryMutable('#div2')
                    .forceShow(_ => document.body.innerHTML)
            ),
            '<div id="outer">' +
            '<div id="div1" class="test"></div>' +
            '<div id="div2"></div>' +
            '<div id="div3" class="test"></div>' +
            '<div id="div4"></div>' +
            '</div>'
        );
    });

    it('sends the node as an argument', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.queryMutable('.test')
                    .forceShow(node => node.id)
            ),
            'div1'
        );
    });

});