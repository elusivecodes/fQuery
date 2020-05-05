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
                    const response = await dom.ajax();
                    response.xhr = response.xhr.data;
                    return response;
                }),
                {
                    event: {
                        isTrusted: false
                    },
                    response: 'Test',
                    xhr: {
                        async: true,
                        body: null,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        method: 'GET',
                        status: 200,
                        url: 'http://localhost:3001/'
                    }
                }
            );
        });

        it('performs an AJAX request with URL', async function() {
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
                        async: true,
                        body: null,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        method: 'GET',
                        status: 200,
                        url: '/test'
                    }
                }
            );
        });

        it('performs an AJAX request with method', async function() {
            assert.deepEqual(
                await exec(async _ => {
                    const response = await dom.ajax({
                        url: '/test',
                        method: 'POST'
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
                        async: true,
                        body: null,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        method: 'POST',
                        status: 200,
                        url: '/test'
                    }
                }
            );
        });

        it('performs an AJAX request with data', async function() {
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
                        async: true,
                        body: 'test1=Test%201&test2=Test%202',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        method: 'POST',
                        status: 200,
                        url: '/test'
                    }
                }
            );
        });

        it('performs an AJAX request with data (array)', async function() {
            assert.deepEqual(
                await exec(async _ => {
                    const response = await dom.ajax({
                        url: '/test',
                        method: 'POST',
                        data: [
                            {
                                name: 'test1',
                                value: 'Test 1'
                            },
                            {
                                name: 'test2',
                                value: 'Test 2'
                            }
                        ]
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
                        async: true,
                        body: 'test1=Test%201&test2=Test%202',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        method: 'POST',
                        status: 200,
                        url: '/test'
                    }
                }
            );
        });

        it('performs an AJAX request with JSON data', async function() {
            assert.deepEqual(
                await exec(async _ => {
                    const response = await dom.ajax({
                        url: '/test',
                        method: 'POST',
                        data: {
                            test1: 'Test 1',
                            test2: 'Test 2'
                        },
                        contentType: 'application/json'
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
                        async: true,
                        body: '{"test1":"Test 1","test2":"Test 2"}',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        method: 'POST',
                        status: 200,
                        url: '/test'
                    }
                }
            );
        });

        it('performs an AJAX request with FormData', async function() {
            assert.deepEqual(
                await exec(async _ => {
                    const response = await dom.ajax({
                        url: '/test',
                        method: 'POST',
                        data: {
                            test1: 'Test 1',
                            test2: 'Test 2'
                        },
                        contentType: null
                    });
                    response.xhr = response.xhr.data;
                    response.xhr.body = Object.fromEntries(response.xhr.body);
                    return response;
                }),
                {
                    event: {
                        isTrusted: false
                    },
                    response: 'Test',
                    xhr: {
                        async: true,
                        body: {
                            test1: 'Test 1',
                            test2: 'Test 2'
                        },
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        method: 'POST',
                        status: 200,
                        url: '/test'
                    }
                }
            );
        });

        it('performs an AJAX request with response type', async function() {
            assert.deepEqual(
                await exec(async _ => {
                    const response = await dom.ajax({
                        url: '/test',
                        responseType: 'json'
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
                        async: true,
                        body: null,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        method: 'GET',
                        responseType: 'json',
                        status: 200,
                        url: '/test'
                    }
                }
            );
        });

        it('performs an AJAX request with custom headers', async function() {
            assert.deepEqual(
                await exec(async _ => {
                    const response = await dom.ajax({
                        url: '/test',
                        headers: {
                            'Test': 'Test 1'
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
                        async: true,
                        body: null,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Test': 'Test 1',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        method: 'GET',
                        status: 200,
                        url: '/test'
                    }
                }
            );
        });

        it('performs an AJAX request without cache', async function() {
            const response = await exec(async _ => {
                const response = await dom.ajax({
                    url: '/test',
                    cache: false
                });
                response.xhr = response.xhr.data;
                return response;
            });

            const match = response.xhr.url.match(/\/test\?_=(\d+)/);

            assert.ok(match);
        });

        it('works with beforeSend callback', async function() {
            assert.deepEqual(
                await exec(async _ => {
                    let result;
                    await dom.ajax({
                        url: '/test',
                        beforeSend: xhr => {
                            result = {
                                ...xhr.data
                            };
                        }
                    });
                    return result;
                }),
                {
                    async: true,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    method: 'GET',
                    url: '/test'
                }
            );
        });

        it('works with afterSend callback', async function() {
            assert.deepEqual(
                await exec(async _ => {
                    let result;
                    await dom.ajax({
                        url: '/test',
                        afterSend: xhr => {
                            result = {
                                ...xhr.data
                            };
                        }
                    });
                    return result;
                }),
                {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    method: 'GET',
                    url: '/test'
                }
            );
        });

        it('works with onProgress callback', async function() {
            assert.deepEqual(
                await exec(async _ => {
                    let result;
                    await dom.ajax({
                        url: '/test',
                        onProgress: (progress, xhr, event) => {
                            result = {
                                progress,
                                xhr: { ...xhr.data },
                                event
                            };
                        }
                    });
                    return result;
                }),
                {
                    event: {
                        isTrusted: false,
                        loaded: 500,
                        total: 1000
                    },
                    progress: 0.5,
                    xhr: {
                        async: true,
                        body: null,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        method: 'GET',
                        url: '/test'
                    }
                }
            );
        });

        it('works with onUploadProgress callback', async function() {
            assert.deepEqual(
                await exec(async _ => {
                    let result;
                    await dom.ajax({
                        url: '/test',
                        onUploadProgress: (progress, xhr, event) => {
                            result = {
                                progress,
                                xhr: { ...xhr.data },
                                event
                            };
                        }
                    });
                    return result;
                }),
                {
                    event: {
                        isTrusted: false,
                        loaded: 5000,
                        total: 10000
                    },
                    progress: 0.5,
                    xhr: {
                        async: true,
                        body: null,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        method: 'GET',
                        url: '/test'
                    }
                }
            );
        });

        it('throws on XHR error', async function() {
            assert.deepEqual(
                await exec(async _ => {
                    try {
                        const ajax = dom.ajax({
                            url: '/test'
                        });
                        ajax._xhr.forceError = true;
                        ajax._xhr.status = null;
                        await ajax;
                        return false;
                    } catch (e) {
                        e.xhr = e.xhr.data;
                        return e;
                    }
                }),
                {
                    event: {
                        isTrusted: false
                    },
                    status: null,
                    xhr: {
                        async: true,
                        body: null,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        method: 'GET',
                        url: '/test'
                    }
                }
            );
        });

        it('throws on status error', async function() {
            assert.deepEqual(
                await exec(async _ => {
                    try {
                        const ajax = dom.ajax({
                            url: '/test'
                        });
                        ajax._xhr.status = 404;
                        await ajax;
                        return false;
                    } catch (e) {
                        e.xhr = e.xhr.data;
                        return e;
                    }
                }),
                {
                    event: {
                        isTrusted: false
                    },
                    status: 404,
                    xhr: {
                        async: true,
                        body: null,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        method: 'GET',
                        status: 404,
                        url: '/test'
                    }
                }
            );
        });

    });

});