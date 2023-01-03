import assert from 'node:assert/strict';
import { exec } from './../../setup.js';

describe('#parseDocument', function() {
    it('parses a HTML string', async function() {
        assert.strictEqual(
            await exec((_) => {
                const myDoc = $.parseDocument(
                    '<html>' +
                    '<head></head>' +
                    '<body>' +
                    '<div></div>' +
                    '</body>' +
                    '</html>',
                );
                return myDoc.documentElement.outerHTML;
            }),
            '<html>' +
            '<head></head>' +
            '<body>' +
            '<div></div>' +
            '</body>' +
            '</html>',
        );
    });

    it('parses an XML string', async function() {
        assert.strictEqual(
            await exec((_) => {
                const myDoc = $.parseDocument(
                    '<?xml version="1.0" encoding="UTF-8" ?>' +
                    '<container>' +
                    '<content>' +
                    '</content>' +
                    '</container>',
                    { contentType: 'text/xml' },
                );
                return myDoc.documentElement.outerHTML;
            }),
            '<container>' +
            '<content/>' +
            '</container>',
        );
    });
});
