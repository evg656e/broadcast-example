var script = document.createElement('script');
script.onload = function() {
    var Babel = require('../node_modules/babel-standalone');
    require.transform = function(content) {
        return Babel.transform(content, { presets: ['es2015'] }).code;
    };
    require('../app/web/index.js');
};
script.onerror = function(e) {
    console.error('The script ' + e.target.src + ' is not accessible.');
};
script.src = '../node_modules/@evg656e/requirify/dist/require.js';
document.head.appendChild(script);
