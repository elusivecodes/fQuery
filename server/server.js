import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';

const server = http.createServer((request, response) => {
    let filePath = request.url;

    let contentType;
    if (filePath == '/') {
        contentType = 'text/html';
        filePath = './public/index.html';
    } else {
        const extname = path.extname(filePath);
        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
        }
        if (filePath === '/assets/fquery.js') {
            filePath = './dist/fquery.js';
        } else {
            filePath = './public/' + filePath;
        }
    }

    fs.readFile(filePath, (error, data) => {
        if (error) {
            response.writeHead(500);
            response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            response.end();
            return;
        }

        response.writeHead(200, { 'Content-Type': contentType });
        response.end(data, 'utf-8');
    });
});

/**
 * Start the server.
 * @param {number} port The port.
 * @return {Promise} The promise.
 */
export function start(port) {
    return new Promise((resolve, reject) => {
        server.listen(port, (error) => {
            if (error) {
                return reject(error);
            }

            resolve();
        });
    });
};

/**
 * Close the server.
 * @return {Promise} The promise.
 */
export function close() {
    return new Promise((resolve) => {
        server.close(resolve);
    });
};
