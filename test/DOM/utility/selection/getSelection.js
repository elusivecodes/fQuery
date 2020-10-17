const assert = require('assert');
const { exec } = require('../../../setup');

describe('#getSelection', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Test 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Test 2</span>' +
                '</div>' +
                '</div>';

            const range = document.createRange();
            const span2 = document.getElementById('span2');
            range.setStartBefore(span2);
            range.setEnd(span2.firstChild, 3);

            const selection = document.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        });
    });

    it('returns the selected nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const selected = dom.getSelection();
                document.body.innerHTML = '';
                for (const node of selected) {
                    document.body.appendChild(node);
                }
                return document.body.innerHTML;
            }),
            '<span id="span2">Test 2</span>'
        );
    });

    it('does not extract the selected nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.getSelection();
                return document.body.innerHTML;
            }),
            '<div id="select">' +
            '<div id="div1">' +
            '<span id="span1">Test 1</span>' +
            '</div>' +
            '<div id="div2">' +
            '<span id="span2">Test 2</span>' +
            '</div>' +
            '</div>'
        );
    });

});