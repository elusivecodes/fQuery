const assert = require('assert').strict;
const { exec } = require('../setup');

describe('DOM Cookie', function() {

    describe('#getCookie', function() {

        it('returns a cookie value', async function() {
            assert.equal(
                await exec(_ => {
                    const myDoc = {};
                    myDoc.cookie = 'test=Test';
                    const myDom = new DOM(myDoc);
                    return myDom.getCookie('test');
                }),
                'Test'
            )
        });

        it('returns a cookie value from multiple cookie values', async function() {
            assert.deepEqual(
                await exec(_ => {
                    const myDoc = {};
                    myDoc.cookie = 'test1=Test 1;test2=Test 2;test3=Test 3';
                    const myDom = new DOM(myDoc);
                    return [
                        myDom.getCookie('test1'),
                        myDom.getCookie('test2'),
                        myDom.getCookie('test3')
                    ];
                }),
                [
                    'Test 1',
                    'Test 2',
                    'Test 3'
                ]
            )
        });

    });

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

    describe('#setCookie', function() {

        it('sets a cookie', async function() {
            assert.equal(
                await exec(_ => {
                    const myDoc = {};
                    myDoc.cookie = '';
                    const myDom = new DOM(myDoc);
                    myDom.setCookie('test', 'Test');
                    return myDoc.cookie;
                }),
                'test=Test'
            );
        });

        it('sets a cookie with expiration', async function() {
            const cookie = await exec(_ => {
                const myDoc = {};
                myDoc.cookie = '';
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
                    const myDoc = {};
                    myDoc.cookie = '';
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
                    const myDoc = {};
                    myDoc.cookie = '';
                    const myDom = new DOM(myDoc);
                    myDom.setCookie('test', 'Test', { secure: true });
                    return myDoc.cookie;
                }),
                'test=Test;secure'
            );
        });

    });

});