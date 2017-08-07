declare const Qt: any;
declare function require(id: string): any;

export default (function() {
    if (typeof Qt === 'object') {
        return require('polyfill-qml/lib/websocket');
    }

    if (typeof WebSocket !== 'undefined') {
        return WebSocket;
    }

    return require('ws');
}());
