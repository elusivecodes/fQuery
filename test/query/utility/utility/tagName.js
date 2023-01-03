import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #tagName', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<span id="span1"></span>' +
                '<span id="span2"></span>';
        });
    });

    it('returns the tag name of the first node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .tagName(),
            ),
            'div',
        );
    });
});
