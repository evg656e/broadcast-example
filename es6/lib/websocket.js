export default
    typeof WebSocket === 'function' ? WebSocket :
    typeof Qt === 'object'          ? require('polyfill-qml/lib/websocket') :
                                      require('ws');
