const http = require('http');
const url  = require('url');
const path = require('path');
const fs   = require('fs');

const BroadcastServer = require('../dev/server/broadcast.js');

const port     = process.argv[2] || 8080;
const basePath = process.argv[3] || '..';

const httpServer = http.createServer(function(req, res) {
    try {
        const requestUrl = url.parse(req.url);
        let pathname = requestUrl.pathname;
        if (pathname === '/')
            pathname = '/static/index.html';
        pathname = path.join(__dirname, basePath, pathname);
        console.log(requestUrl.pathname, '=>', pathname);

        res.writeHead(200);
        const fileStream = fs.createReadStream(pathname);
        fileStream.pipe(res);
        fileStream.on('error', function(err) {
            res.writeHead(404);
            res.end();
        });
    }
    catch (e) {
        res.writeHead(500);
        res.end();
        console.log(e);
    }
});

const broadcastServer = new BroadcastServer(httpServer);

httpServer.listen(port);

console.log(`Server running on port ${port}`);
