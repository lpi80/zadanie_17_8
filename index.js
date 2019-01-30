let http = require('http');
let fs = require('fs');

let server = http.createServer();

server.on('request', function (request, response) {
    function file(file, type) {
        fs.readFile('./' + file, function (err, data) {
            if (!err) {
                response.setHeader("Content-Type", type + '; charset=utf-8');
                response.write(data);
                response.end();
            } else {
                response.statusCode  = 404;
                response.setHeader("Content-Type", type + '; charset=utf-8');
                response.end();
            }
        });
    }
    if (request.method === 'GET') {
        switch (request.url) {
            case '/style.css': file('style.css', 'text/css');
                break;
            case '/': if (request.method === 'GET') file('index.html', 'text/html');
                break;
            default: file('error.jpg', 'image/jpg');
        }
    }
});
server.listen(9000);
