import { default as BroadcastClient } from '../lib/client';

console.log('defining main()');

function parseUrl(url) {
    const a = document.createElement('a');
    a.href = url;
    return a;
}

function getWebSocketUrl(url) {
    url = parseUrl(url);
    return (url.protocol === 'https:' ? 'wss://' : 'ws://') + url.host;
}

function main() {
    console.log('main()');

    const statusText  = document.querySelector('.status');
    const textField   = document.querySelector('.textfield');
    const textArea    = document.querySelector('.textarea');
    const sendButton  = document.querySelector('.send');
    const clearButton = document.querySelector('.clear');

    const client = new BroadcastClient(getWebSocketUrl(document.URL));

    function updateStatus(ready) {
        sendButton.disabled = !ready;
        statusText.textContent = ready ? 'Connected' : 'Not connected';
    }

    function appendLine(line) {
        textArea.value += line + '\n';
    }

    client.readyChanged.connect(updateStatus);
    client.messageReceived.connect(appendLine);

    sendButton.onclick = function() {
        client.send(textField.value);
    };

    clearButton.onclick = function() {
        textArea.value = '';
    };

    updateStatus(false);
}

if (document.readyState === 'complete'
    || document.readyState === 'interactive') {
    main();
}
else {
    document.addEventListener('DOMContentLoaded', main);
}
