const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySet #selectAll', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Test 1</span>' +
                '</div>' +
                '<div id="div2" class="select">' +
                '<span id="span2">Test 2</span>' +
                '</div>' +
                '<div id="div3">' +
                '<span id="span3">Test 3</span>' +
                '</div>' +
                '<div id="div4" class="select">' +
                '<span id="span4">Test 4</span>' +
                '</div>' +
                '<div id="div5">' +
                '<span id="span5">Test 5</span>' +
                '</div>' +
                '</div>';
        });
    });

    it('creates a selection on all nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.queryMutable('.select')
                    .selectAll();
                const selection = document.getSelection();
                const range = selection.getRangeAt(0);
                return range.toString();
            }),
            'Test 2Test 3Test 4'
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.queryMutable('.select');
                return query === query.selectAll();
            }),
            true
        );
    });

});