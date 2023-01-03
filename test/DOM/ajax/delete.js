import assert from 'node:assert/strict';
import { exec } from './../../setup.js';

describe('#delete', function() {
    it('performs an AJAX DELETE request', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.delete();
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
                    method: 'DELETE',
                    status: 200,
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('performs an AJAX DELETE request with URL', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.delete('/test');
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
                    method: 'DELETE',
                    status: 200,
                    url: '/test',
                },
            },
        );
    });

    it('performs an AJAX DELETE request with content type', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.delete(null, {
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
                    method: 'DELETE',
                    status: 200,
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('performs an AJAX DELETE request with response type', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.delete(null, {
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
                    method: 'DELETE',
                    responseType: 'json',
                    status: 200,
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('performs an AJAX DELETE request with MIME type', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.delete(null, {
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
                    method: 'DELETE',
                    mimeType: 'text/plain',
                    status: 200,
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('performs an AJAX DELETE request with username', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.delete(null, {
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
                    method: 'DELETE',
                    username: 'test',
                    status: 200,
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('performs an AJAX DELETE request with password', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.delete(null, {
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
                    method: 'DELETE',
                    password: 'test',
                    status: 200,
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('performs an AJAX DELETE request with timeout', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.delete(null, {
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
                    method: 'DELETE',
                    status: 200,
                    timeout: 1000,
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('performs an AJAX DELETE request (local)', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.delete(null, {
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
                    method: 'DELETE',
                    status: 200,
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('performs an AJAX DELETE request with custom headers', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                const response = await $.delete(null, {
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
                    method: 'DELETE',
                    status: 200,
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('performs an AJAX DELETE request without cache', async function() {
        const response = await exec(async (_) => {
            const response = await $.delete(null, {
                cache: false,
            });
            response.xhr = response.xhr.data;
            return response;
        });

        const match = response.xhr.url.match(/\/?_=(\d+)/);

        assert.ok(match);
    });

    it('performs an AJAX DELETE request without cache (query string)', async function() {
        const response = await exec(async (_) => {
            const response = await $.delete('/?test=1', {
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
                await $.delete(null, {
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
                method: 'DELETE',
                url: 'http://localhost:3001/',
            },
        );
    });

    it('works with afterSend callback', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                let result;
                await $.delete(null, {
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
                method: 'DELETE',
                url: 'http://localhost:3001/',
            },
        );
    });

    it('works with onProgress callback', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                let result;
                await $.delete(null, {
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
                    method: 'DELETE',
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('works with onUploadProgress callback', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                let result;
                await $.delete(null, {
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
                    method: 'DELETE',
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('can be cancelled', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                try {
                    const ajax = $.delete();
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
                    method: 'DELETE',
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('throws on XHR error', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                try {
                    const ajax = $.delete();
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
                    method: 'DELETE',
                    url: 'http://localhost:3001/',
                },
            },
        );
    });

    it('throws on status error', async function() {
        assert.deepStrictEqual(
            await exec(async (_) => {
                try {
                    const ajax = $.delete();
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
                    method: 'DELETE',
                    status: 404,
                    url: 'http://localhost:3001/',
                },
            },
        );
    });
});
