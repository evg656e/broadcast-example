const path = require('path');

module.exports = [
    // web config
    {
        context: __dirname,
        entry: './app/index.js',
        output: {
            path: path.resolve(__dirname, 'dist/web'),
            filename: 'index.js',
            libraryTarget: 'umd'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        }
    },
    // qml config
    {
        context: __dirname,
        entry: ['core-js/fn/object/set-prototype-of', 'polyfill-qml', './lib/client.js'],
        output: {
            path: path.resolve(__dirname, 'dist/qml'),
            filename: 'broadcast.qml.js',
            library: 'Client',
            libraryTarget: 'umd',
            libraryExport: 'default'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        },
        resolve: {
            alias: {
                'websocket': 'polyfill-qml/lib/websocket'
            }
        }
    },
    // node server config
    {
        context: __dirname,
        entry: './lib/server.js',
        output: {
            path: path.resolve(__dirname, 'dist/server'),
            filename: 'broadcast.js',
            library: 'Server',
            libraryTarget: 'umd',
            libraryExport: 'default'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        },
        resolve: {
            alias: {
                'websocket': 'ws'
            }
        }
    }
];
