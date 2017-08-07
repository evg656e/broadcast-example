# broadcast-example

ES6 and TypeScript stub project that runs in QML, Browser and Node.js environments.

Can be run on the fly using [requirify](https://www.npmjs.com/package/@evg656e/requirify) or be built using [Webpack](https://webpack.js.org/).

To switch between versions change apps entry points in `static/index.html`, `client/main.qml` and `server/main.js`:
```
es6  -> es6 version
ts   -> typescript version
dev  -> loaded by requirify
dist -> built by webpack
```

In case of using `dist` don't forget to run `npm run build` first.

QML app can be run on the fly with [qmlscene](http://doc.qt.io/qt-5/qtquick-qmlscene.html) or can be built as executable.
