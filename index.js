const http = require('http');
const fs = require('fs');
const server = http.createServer();

function file(response, file, type) {
    fs.readFile('./' + file, function (err, data) {
        if (!err) {
            response.setHeader("Content-Type", type + '; charset=utf-8');
            response.write(data);
            response.end();
        } else {
            response.statusCode = 404;
            response.setHeader("Content-Type", type + '; charset=utf-8');
            response.end();
        }
    });
}

server.on('request', function (request, response) {

    if (request.method === 'GET') {
        switch (request.url) {
            case '/style.css': file(response, 'style.css', 'text/css');
                break;
            case '/': file(response, 'index.html', 'text/html');
                break;
            default: file(response, 'error.jpg', 'image/jpg');
        }
    }
});
server.listen(9000);
