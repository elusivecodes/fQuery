const assert = require('assert').strict;
const { exec } = require('../../setup');

describe('#removeCookie', function() {

    it('removes a cookie', async function() {
        assert.equal(
            await exec(_ => {
                const myDoc = {};
                myDoc.cookie = 'test=Test';
                const myDom = new DOM(myDoc);
                myDom.removeCookie('test');
                return myDoc.cookie;
            }),
            'test=;expires=Thu, 01 Jan 1970 00:00:00 UTC'
        );
    });

    it('removes a cookie with path', async function() {
        assert.equal(
            await exec(_ => {
                const myDoc = {};
                myDoc.cookie = 'test=Test';
                const myDom = new DOM(myDoc);
                myDom.removeCookie('test', { path: '/test' });
                return myDoc.cookie;
            }),
            'test=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/test'
        );
    });

    it('removes a cookie with secure', async function() {
        assert.equal(
            await exec(_ => {
                const myDoc = {};
                myDoc.cookie = 'test=Test';
                const myDom = new DOM(myDoc);
                myDom.removeCookie('test', { secure: true });
                return myDoc.cookie;
            }),
            'test=;expires=Thu, 01 Jan 1970 00:00:00 UTC;secure'
        );
    });

});