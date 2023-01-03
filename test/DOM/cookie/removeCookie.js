import assert from 'node:assert/strict';
import { exec } from './../../setup.js';

describe('#removeCookie', function() {
    it('removes a cookie', async function() {
        assert.strictEqual(
            await exec((_) => {
                const myDoc = {
                    cookie: 'test=Test',
                    nodeType: Node.DOCUMENT_NODE,
                };
                $.setContext(myDoc);
                $.removeCookie('test');
                return myDoc.cookie;
            }),
            'test=;expires=Thu, 01 Jan 1970 00:00:00 UTC',
        );
    });

    it('removes a cookie with path', async function() {
        assert.strictEqual(
            await exec((_) => {
                const myDoc = {
                    cookie: 'test=Test',
                    nodeType: Node.DOCUMENT_NODE,
                };
                $.setContext(myDoc);
                $.removeCookie('test', { path: '/test' });
                return myDoc.cookie;
            }),
            'test=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/test',
        );
    });

    it('removes a cookie with secure', async function() {
        assert.strictEqual(
            await exec((_) => {
                const myDoc = {
                    cookie: 'test=Test',
                    nodeType: Node.DOCUMENT_NODE,
                };
                $.setContext(myDoc);
                $.removeCookie('test', { secure: true });
                return myDoc.cookie;
            }),
            'test=;expires=Thu, 01 Jan 1970 00:00:00 UTC;secure',
        );
    });
});
