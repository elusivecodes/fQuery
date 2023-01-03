import assert from 'node:assert/strict';
import { exec } from './../../setup.js';

describe('#get', function() {
    it('performs an AJAX GET request', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.get();
                response.xhr = response.xhr.data;
                return response;
            }),
            {
                event: {
                    isTrusted: false,
                },
                response: 'Test',
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    status: 200,
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('performs an AJAX GET request with URL', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.get('/test');
                response.xhr = response.xhr.data;
                return response;
            }),
            {
                event: {
                    isTrusted: false,
                },
                response: 'Test',
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    status: 200,
                    url: '/test',
                },
            },
        );
    });

    it('performs an AJAX GET request with data (object)', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.get(null, {
                    test1: 'Test 1',
                    test2: 'Test 2',
                });
                response.xhr = response.xhr.data;
                return response;
            }),
            {
                event: {
                    isTrusted: false,
                },
                response: 'Test',
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    status: 200,
                    url: 'http://localhost:3001/?test1=Test+1&test2=Test+2',
                },
            },
        );
    });

    it('performs an AJAX GET request with data (deep object)', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.get(null, {
                    test1: 'Test 1',
                    test2: {
                        a: '1',
                        b: '2',
                    },
                });
                response.xhr = response.xhr.data;
                return response;
            }),
            {
                event: {
                    isTrusted: false,
                },
                response: 'Test',
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    status: 200,
                    url: 'http://localhost:3001/?test1=Test+1&test2%5Ba%5D=1&test2%5Bb%5D=2',
                },
            },
        );
    });

    it('performs an AJAX GET request with data (implicit deep object)', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.get(null, {
                    'test1': 'Test 1',
                    'test2[a]': '1',
                    'test2[b]': '2',
                });
                response.xhr = response.xhr.data;
                return response;
            }),
            {
                event: {
                    isTrusted: false,
                },
                response: 'Test',
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    status: 200,
                    url: 'http://localhost:3001/?test1=Test+1&test2%5Ba%5D=1&test2%5Bb%5D=2',
                },
            },
        );
    });

    it('performs an AJAX GET request with data (object with array)', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.get(null, {
                    test1: 'Test 1',
                    test2: ['1', '2'],
                });
                response.xhr = response.xhr.data;
                return response;
            }),
            {
                event: {
                    isTrusted: false,
                },
                response: 'Test',
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    status: 200,
                    url: 'http://localhost:3001/?test1=Test+1&test2%5B%5D=1&test2%5B%5D=2',
                },
            },
        );
    });

    it('performs an AJAX GET request with data (object with implicit array)', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.get(null, {
                    'test1': 'Test 1',
                    'test2[]': ['1', '2'],
                });
                response.xhr = response.xhr.data;
                return response;
            }),
            {
                event: {
                    isTrusted: false,
                },
                response: 'Test',
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    status: 200,
                    url: 'http://localhost:3001/?test1=Test+1&test2%5B%5D=1&test2%5B%5D=2',
                },
            },
        );
    });

    it('performs an AJAX GET request with data (array)', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.get(null, [
                    {
                        name: 'test1',
                        value: 'Test 1',
                    },
                    {
                        name: 'test2',
                        value: 'Test 2',
                    },
                ]);
                response.xhr = response.xhr.data;
                return response;
            }),
            {
                event: {
                    isTrusted: false,
                },
                response: 'Test',
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    status: 200,
                    url: 'http://localhost:3001/?test1=Test+1&test2=Test+2',
                },
            },
        );
    });

    it('performs an AJAX GET request with data (deep array)', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.get(null, [
                    {
                        name: 'test1',
                        value: 'Test 1',
                    },
                    {
                        name: 'test2',
                        value: ['1', '2'],
                    },
                ]);
                response.xhr = response.xhr.data;
                return response;
            }),
            {
                event: {
                    isTrusted: false,
                },
                response: 'Test',
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    status: 200,
                    url: 'http://localhost:3001/?test1=Test+1&test2%5B%5D=1&test2%5B%5D=2',
                },
            },
        );
    });

    it('performs an AJAX GET request with data (implicit deep array)', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.get(null, [
                    {
                        name: 'test1',
                        value: 'Test 1',
                    },
                    {
                        name: 'test2[]',
                        value: ['1', '2'],
                    },
                ]);
                response.xhr = response.xhr.data;
                return response;
            }),
            {
                event: {
                    isTrusted: false,
                },
                response: 'Test',
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    status: 200,
                    url: 'http://localhost:3001/?test1=Test+1&test2%5B%5D=1&test2%5B%5D=2',
                },
            },
        );
    });

    it('performs an AJAX GET request with data (string)', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.get(null, 'test1=Test%201&test2=Test%202');
                response.xhr = response.xhr.data;
                return response;
            }),
            {
                event: {
                    isTrusted: false,
                },
                response: 'Test',
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    status: 200,
                    url: 'http://localhost:3001/?test1=Test+1&test2=Test+2',
                },
            },
        );
    });

    it('performs an AJAX GET request with content type', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.get(null, null, {
                    contentType: 'text/plain',
                });
                response.xhr = response.xhr.data;
                return response;
            }),
            {
                event: {
                    isTrusted: false,
                },
                response: 'Test',
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'text/plain',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    status: 200,
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('performs an AJAX GET request with response type', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.get(null, null, {
                    responseType: 'json',
                });
                response.xhr = response.xhr.data;
                return response;
            }),
            {
                event: {
                    isTrusted: false,
                },
                response: 'Test',
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    responseType: 'json',
                    status: 200,
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('performs an AJAX GET request with MIME type', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.get(null, null, {
                    mimeType: 'text/plain',
                });
                response.xhr = response.xhr.data;
                return response;
            }),
            {
                event: {
                    isTrusted: false,
                },
                response: 'Test',
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    mimeType: 'text/plain',
                    status: 200,
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('performs an AJAX GET request with username', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.get(null, null, {
                    username: 'test',
                });
                response.xhr = response.xhr.data;
                return response;
            }),
            {
                event: {
                    isTrusted: false,
                },
                response: 'Test',
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    username: 'test',
                    status: 200,
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('performs an AJAX GET request with password', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.get(null, null, {
                    password: 'test',
                });
                response.xhr = response.xhr.data;
                return response;
            }),
            {
                event: {
                    isTrusted: false,
                },
                response: 'Test',
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    password: 'test',
                    status: 200,
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('performs an AJAX GET request with timeout', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.get(null, null, {
                    timeout: 1000,
                });
                response.xhr = response.xhr.data;
                return response;
            }),
            {
                event: {
                    isTrusted: false,
                },
                response: 'Test',
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    status: 200,
                    timeout: 1000,
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('performs an AJAX GET request (local)', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.get(null, null, {
                    isLocal: true,
                });
                response.xhr = response.xhr.data;
                return response;
            }),
            {
                event: {
                    isTrusted: false,
                },
                response: 'Test',
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    method: 'GET',
                    status: 200,
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('performs an AJAX GET request with custom headers', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.get(null, null, {
                    headers: {
                        'Test': 'Test 1',
                    },
                });
                response.xhr = response.xhr.data;
                return response;
            }),
            {
                event: {
                    isTrusted: false,
                },
                response: 'Test',
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Test': 'Test 1',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    status: 200,
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('performs an AJAX GET request without cache', async function() {
        const response = await exec(async (_) => {
            const response = await $.get(null, null, {
                cache: false,
            });
            response.xhr = response.xhr.data;
            return response;
        });

        const match = response.xhr.url.match(/\/?_=(\d+)/);

        assert.ok(match);
    });

    it('performs an AJAX GET request without cache (query string)', async function() {
        const response = await exec(async (_) => {
            const response = await $.get('/?test=1', null, {
                cache: false,
            });
            response.xhr = response.xhr.data;
            return response;
        });

        const match = response.xhr.url.match(/\/?test=1&_=(\d+)/);

        assert.ok(match);
    });

    it('works with beforeSend callback', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                let result;
                await $.get(null, null, {
                    beforeSend: (xhr) => {
                        result = {
                            ...xhr.data,
                        };
                    },
                });
                return result;
            }),
            {
                async: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                method: 'GET',
                url: 'http://localhost:3001/',
            },
        );
    });

    it('works with afterSend callback', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                let result;
                await $.get(null, null, {
                    afterSend: (xhr) => {
                        result = {
                            ...xhr.data,
                        };
                    },
                });
                return result;
            }),
            {
                async: true,
                body: null,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                method: 'GET',
                url: 'http://localhost:3001/',
            },
        );
    });

    it('works with onProgress callback', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                let result;
                await $.get(null, null, {
                    onProgress: (progress, xhr, event) => {
                        result = {
                            progress,
                            xhr: { ...xhr.data },
                            event,
                        };
                    },
                });
                return result;
            }),
            {
                event: {
                    isTrusted: false,
                    loaded: 500,
                    total: 1000,
                },
                progress: 0.5,
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('works with onUploadProgress callback', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                let result;
                await $.get(null, null, {
                    onUploadProgress: (progress, xhr, event) => {
                        result = {
                            progress,
                            xhr: { ...xhr.data },
                            event,
                        };
                    },
                });
                return result;
            }),
            {
                event: {
                    isTrusted: false,
                    loaded: 5000,
                    total: 10000,
                },
                progress: 0.5,
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('can be cancelled', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                try {
                    const ajax = $.get();
                    ajax.cancel();
                    await ajax;
                    return false;
                } catch (e) {
                    e.xhr = e.xhr.data;
                    return e;
                }
            }),
            {
                reason: 'Request was cancelled',
                status: 200,
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('throws on XHR error', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                try {
                    const ajax = $.get();
                    ajax.xhr.forceError = true;
                    ajax.xhr.status = null;
                    await ajax;
                    return false;
                } catch (e) {
                    e.xhr = e.xhr.data;
                    return e;
                }
            }),
            {
                event: {
                    isTrusted: false,
                },
                status: null,
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('throws on status error', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                try {
                    const ajax = $.get();
                    ajax.xhr.status = 404;
                    await ajax;
                    return false;
                } catch (e) {
                    e.xhr = e.xhr.data;
                    return e;
                }
            }),
            {
                event: {
                    isTrusted: false,
                },
                status: 404,
                xhr: {
                    async: true,
                    body: null,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    method: 'GET',
                    status: 404,
                    url: 'http://localhost:3001/',
                },
            },
        );
    });
});
