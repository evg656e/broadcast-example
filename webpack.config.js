const path = require('path');
const webpack = require('webpack');

module.exports = [
    // web config
    {
        entry: './app/web/index.js',
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
            ],
            noParse: [
                /websocket\.js$/
            ]
        }
    },
    // qml config
    {
        entry: ['./lib/polyfill.qml.js', './lib/client.js'],
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
        plugins: [
            new webpack.IgnorePlugin(/^ws$/)
        ]
    },
    // node server config
    {
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
            ],
            noParse: [
                /websocket\.js$/
            ]
        }
    }
];
