const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#extractSelection', function() {

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
            const div1 = document.getElementById('div1');
            const span2 = document.getElementById('span2');
            range.setStartBefore(div1);
            range.setEnd(span2.firstChild, 3);

            const selection = document.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        });
    });

    it('returns the extracted nodes', async function() {
        assert.equal(
            await exec(_ => {
                const extracted = dom.extractSelection();
                document.body.innerHTML = '';
                for (const node of extracted) {
                    document.body.appendChild(node);
                }
                return document.body.innerHTML;
            }),
            '<div id="div1"><span id="span1">Test 1</span></div><div id="div2"><span id="span2">Tes</span></div>'
        );
    });

    it('extracts the selected nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.extractSelection();
                return document.body.innerHTML;
            }),
            '<div id="select">' +
            '<div id="div2">' +
            '<span id="span2">t 2</span>' +
            '</div>' +
            '</div>'
        );
    });

});