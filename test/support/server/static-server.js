import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';

const css = 'text/css; charset=utf-8';
const html = 'text/html; charset=utf-8';
const javaScript = 'text/javascript; charset=utf-8';

const routes = new Map([
    ['/', { contentType: html, file: new URL('../app/index.html', import.meta.url) }],
    ['/assets/fquery.js', { contentType: javaScript, file: new URL('../../../dist/fquery.js', import.meta.url) }],
    ['/assets/mock-xml-http-request.js', { contentType: javaScript, file: new URL('../assets/mock-xml-http-request.js', import.meta.url) }],
    ['/assets/test.js', { contentType: javaScript, file: new URL('../assets/test.js', import.meta.url) }],
    ['/assets/test2.js', { contentType: javaScript, file: new URL('../assets/test2.js', import.meta.url) }],
    ['/assets/test.css', { contentType: css, file: new URL('../assets/test.css', import.meta.url) }],
    ['/assets/test2.css', { contentType: css, file: new URL('../assets/test2.css', import.meta.url) }],
]);

const server = createServer(async (request, response) => {
    const url = new URL(request.url ?? '/', 'http://localhost');
    const route = routes.get(url.pathname);

    if (!route) {
        response.writeHead(404, {
            'Content-Type': 'text/plain; charset=utf-8',
        });
        response.end('Not found');
        return;
    }

    try {
        const data = await readFile(route.file);

        response.writeHead(200, {
            'Content-Type': route.contentType,
        });
        response.end(data);
    } catch {
        response.writeHead(500, {
            'Content-Type': 'text/plain; charset=utf-8',
        });
        response.end('Internal server error');
    }
});

server.listen(Number(process.env.PORT ?? 3001));
