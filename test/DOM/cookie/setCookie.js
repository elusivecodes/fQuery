import assert from 'node:assert/strict';
import { exec } from './../../setup.js';

describe('#setCookie', function() {
    it('sets a cookie', async function() {
        assert.strictEqual(
            await exec((_) => {
                const myDoc = {
                    cookie: '',
                    nodeType: Node.DOCUMENT_NODE,
                };
                $.setContext(myDoc);
                $.setCookie('test', 'Test');
                return myDoc.cookie;
            }),
            'test=Test',
        );
    });

    it('sets a cookie with expiration', async function() {
        const cookie = await exec((_) => {
            const myDoc = {
                cookie: '',
                nodeType: Node.DOCUMENT_NODE,
            };
            $.setContext(myDoc);
            $.setCookie('test', 'Test', { expires: 3600 });
            return myDoc.cookie;
        });

        const match = cookie.match(/test=Test;expires=(.*)/);

        assert.ok(match);

        const dateString = match[1];
        const timestamp = new Date(dateString).getTime();

        const now = new Date().getTime();
        assert.ok(now + 3540000 < timestamp && now + 3660000 > timestamp);
    });

    it('sets a cookie with path', async function() {
        assert.strictEqual(
            await exec((_) => {
                const myDoc = {
                    cookie: '',
                    nodeType: Node.DOCUMENT_NODE,
                };
                $.setContext(myDoc);
                $.setCookie('test', 'Test', { path: '/test' });
                return myDoc.cookie;
            }),
            'test=Test;path=/test',
        );
    });

    it('sets a cookie with secure', async function() {
        assert.strictEqual(
            await exec((_) => {
                const myDoc = {
                    cookie: '',
                    nodeType: Node.DOCUMENT_NODE,
                };
                $.setContext(myDoc);
                $.setCookie('test', 'Test', { secure: true });
                return myDoc.cookie;
            }),
            'test=Test;secure',
        );
    });
});
