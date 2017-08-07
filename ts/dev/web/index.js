var script = document.createElement('script');
script.onload = function() {
    var ts = require('typescript');
    require.extensions['.ts'] = function(content) {
        return ts.transpileModule(content, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
    };
    require('./ts/app/index');
};
script.onerror = function(e) {
    console.error('The script ' + e.target.src + ' is not accessible.');
};
script.src = './node_modules/@evg656e/requirify/dist/require.js';
document.head.appendChild(script);
