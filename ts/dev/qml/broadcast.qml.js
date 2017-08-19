.import '../../../node_modules/typescript/lib/typescript.js' as Typescript;
Qt.include('../../../node_modules/@evg656e/requirify/dist/require.js');
require.addPath('../../..');
require('polyfill-qml');
var ts = Typescript.ts;
require.extensions['.ts'] = function(content) {
    return ts.transpileModule(content, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
};
var Client = require('../../lib/client').default;
