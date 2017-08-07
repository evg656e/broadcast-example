const path = require('path');
const webpack = require('webpack');

module.exports = [
    // web config
    {
        context: __dirname,
        entry: './app/index.ts',
        output: {
            path: path.resolve(__dirname, 'dist/web'),
            filename: 'index.js',
            libraryTarget: 'umd'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader'
                }
            ],
            noParse: [
                /websocket\.ts$/
            ]
        }
    },
    // qml config
    {
        context: __dirname,
        entry: ['core-js/fn/object/set-prototype-of', 'polyfill-qml', './lib/client.ts'],
        output: {
            path: path.resolve(__dirname, 'dist/qml'),
            filename: 'broadcast.qml.js',
            library: 'Client',
            libraryTarget: 'umd',
            libraryExport: 'default'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader'
                }
            ]
        },
        plugins: [
            new webpack.IgnorePlugin(/^ws$/)
        ]
    },
    // node server config
    {
        context: __dirname,
        entry: './lib/server.ts',
        output: {
            path: path.resolve(__dirname, 'dist/server'),
            filename: 'broadcast.js',
            library: 'Server',
            libraryTarget: 'umd',
            libraryExport: 'default'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader'
                }
            ],
            noParse: [
                /websocket\.ts$/
            ]
        }
    }
];
