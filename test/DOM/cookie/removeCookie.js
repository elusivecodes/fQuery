const assert = require('assert');
const { exec } = require('../../setup');

describe('#removeCookie', function() {

    it('removes a cookie', async function() {
        assert.strictEqual(
            await exec(_ => {
                const myDoc = {
                    cookie: 'test=Test',
                    nodeType: Core.DOCUMENT_NODE
                };
                const myDom = new DOM(myDoc);
                myDom.removeCookie('test');
                return myDoc.cookie;
            }),
            'test=;expires=Thu, 01 Jan 1970 00:00:00 UTC'
        );
    });

    it('removes a cookie with path', async function() {
        assert.strictEqual(
            await exec(_ => {
                const myDoc = {
                    cookie: 'test=Test',
                    nodeType: Core.DOCUMENT_NODE
                };
                const myDom = new DOM(myDoc);
                myDom.removeCookie('test', { path: '/test' });
                return myDoc.cookie;
            }),
            'test=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/test'
        );
    });

    it('removes a cookie with secure', async function() {
        assert.strictEqual(
            await exec(_ => {
                const myDoc = {
                    cookie: 'test=Test',
                    nodeType: Core.DOCUMENT_NODE
                };
                const myDom = new DOM(myDoc);
                myDom.removeCookie('test', { secure: true });
                return myDoc.cookie;
            }),
            'test=;expires=Thu, 01 Jan 1970 00:00:00 UTC;secure'
        );
    });

});