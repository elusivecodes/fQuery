import assert from 'node:assert/strict';
import { exec } from './../../setup.js';

describe('#getCookie', function() {
    it('returns a cookie value', async function() {
        assert.strictEqual(
            await exec((_) => {
                const myDoc = {
                    cookie: 'test=Test',
                    nodeType: Node.DOCUMENT_NODE,
                };
                $.setContext(myDoc);
                return $.getCookie('test');
            }),
            'Test',
        );
    });

    it('returns a cookie value from multiple cookie values', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const myDoc = {
                    cookie: 'test1=Test 1;test2=Test 2;test3=Test 3',
                    nodeType: Node.DOCUMENT_NODE,
                };
                $.setContext(myDoc);
                return [
                    $.getCookie('test1'),
                    $.getCookie('test2'),
                    $.getCookie('test3'),
                ];
            }),
            [
                'Test 1',
                'Test 2',
                'Test 3',
            ],
        );
    });
});
