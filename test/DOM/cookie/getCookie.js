const assert = require('assert').strict;
const { exec } = require('../../setup');
const { _isPuppeteerCore } = require('puppeteer');

describe('#getCookie', function() {

    it('returns a cookie value', async function() {
        assert.equal(
            await exec(_ => {
                const myDoc = {
                    cookie: 'test=Test',
                    nodeType: Core.DOCUMENT_NODE
                };
                const myDom = new DOM(myDoc);
                return myDom.getCookie('test');
            }),
            'Test'
        )
    });

    it('returns a cookie value from multiple cookie values', async function() {
        assert.deepEqual(
            await exec(_ => {
                const myDoc = {
                    cookie: 'test1=Test 1;test2=Test 2;test3=Test 3',
                    nodeType: Core.DOCUMENT_NODE
                };
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