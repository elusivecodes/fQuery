const assert = require('assert').strict;
const { exec } = require('../../setup');

describe('#setCookie', function() {

    it('sets a cookie', async function() {
        assert.equal(
            await exec(_ => {
                const myDoc = {
                    cookie: '',
                    nodeType: Core.DOCUMENT_NODE
                };
                const myDom = new DOM(myDoc);
                myDom.setCookie('test', 'Test');
                return myDoc.cookie;
            }),
            'test=Test'
        );
    });

    it('sets a cookie with expiration', async function() {
        const cookie = await exec(_ => {
            const myDoc = {
                cookie: '',
                nodeType: Core.DOCUMENT_NODE
            };
            const myDom = new DOM(myDoc);
            myDom.setCookie('test', 'Test', { expires: 3600 });
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
        assert.equal(
            await exec(_ => {
                const myDoc = {
                    cookie: '',
                    nodeType: Core.DOCUMENT_NODE
                };
                const myDom = new DOM(myDoc);
                myDom.setCookie('test', 'Test', { path: '/test' });
                return myDoc.cookie;
            }),
            'test=Test;path=/test'
        );
    });

    it('sets a cookie with secure', async function() {
        assert.equal(
            await exec(_ => {
                const myDoc = {
                    cookie: '',
                    nodeType: Core.DOCUMENT_NODE
                };
                const myDom = new DOM(myDoc);
                myDom.setCookie('test', 'Test', { secure: true });
                return myDoc.cookie;
            }),
            'test=Test;secure'
        );
    });

});