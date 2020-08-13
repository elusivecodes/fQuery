const fs = require('fs');
const http = require('http');
const path = require('path');

const server = http.createServer((request, response) => {
    let filePath = request.url;

    if (filePath == '/') {
        filePath = '/index.html';
    }

    const extname = path.extname(filePath);
    let contentType;
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        default:
            contentType = 'text/html';
            break;
    }

    fs.readFile('./public/' + filePath, (error, data) => {
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

const startServer = port => {
    return new Promise((resolve, reject) => {
        server.listen(port, (error) => {
            if (error) {
                return reject(error);
            }

            resolve();
        });
    });
};

const closeServer = _ => {
    return new Promise(resolve => {
        server.close(resolve);
    });
};

module.exports = {
    start: startServer,
    close: closeServer
};