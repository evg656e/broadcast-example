const http = require('http');
const url  = require('url');
const path = require('path');
const fs   = require('fs');

// const BroadcastServer = require('../es6/dev/server/broadcast');
// const BroadcastServer = require('../es6/dist/server/broadcast');
const BroadcastServer = require('../ts/dev/server/broadcast');
// const BroadcastServer = require('../ts/dist/server/broadcast');

const port     = process.argv[2] || 8080;
const basePath = path.resolve(__dirname, process.argv[3] || '..');

const httpServer = http.createServer(function(req, res) {
    try {
        let pathname;
        if (req.headers['require-path']) {
            pathname = req.headers['require-path'];
        }
        else {
            const requestUrl = url.parse(req.url);
            pathname = requestUrl.pathname;
            if (pathname === '/')
                pathname = '/static/index.html';
            pathname = path.join(basePath, pathname);
        }

        console.log(pathname);

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
