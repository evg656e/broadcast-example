Qt.include('../../node_modules/@evg656e/requirify/dist/require.js');
require.addPath('../..');
require('../../lib/polyfill.qml');
var Babel = require('@evg656e/requirify/dist/babel.qml');
require.extensions['.js'] = function(content) {
   return Babel.transform(content, { presets: ['es2015'] }).code;
};
var Client = require('../../lib/client').default;
