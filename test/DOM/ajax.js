const assert = require('assert').strict;
const exec = require('../setup');

describe('DOM AJAX', function() {

    before(async function() {
        await exec(_ => {
            AjaxRequest.useMock = true;
        });
    });

    describe('#ajax', function() {

        it('performs an AJAX request', async function() {
            assert.deepEqual(
                await exec(async _ => {
                    const response = await dom.ajax({
                        url: '/test'
                    });
                    response.xhr = response.xhr.data;
                    return response;
                }),
                {
                    event: {
                        isTrusted: false
                    },
                    response: 'Test',
                    xhr: {
                        body: null,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        method: 'GET',
                        status: 200,
                        url: '/test',
                        async: true
                    }
                }
            );
        });

        it('performs an AJAX POST request', async function() {
            assert.deepEqual(
                await exec(async _ => {
                    const response = await dom.ajax({
                        url: '/test',
                        method: 'POST',
                        data: {
                            test1: 'Test 1',
                            test2: 'Test 2'
                        }
                    });
                    response.xhr = response.xhr.data;
                    return response;
                }),
                {
                    event: {
                        isTrusted: false
                    },
                    response: 'Test',
                    xhr: {
                        body: 'test1=Test%201&test2=Test%202',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        method: 'POST',
                        status: 200,
                        url: '/test',
                        async: true
                    }
                }
            );
        });

    });

});