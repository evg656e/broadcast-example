var script = document.createElement('script');
script.onload = function() {
    var Babel = require('babel-standalone');
    require.extensions['.js'] = function(content) {
        return Babel.transform(content, { presets: ['es2015'] }).code;
    };
    require('./es6/app/index');
};
script.onerror = function(e) {
    console.error('The script ' + e.target.src + ' is not accessible.');
};
script.src = './node_modules/@evg656e/requirify/dist/require.js';
document.head.appendChild(script);
