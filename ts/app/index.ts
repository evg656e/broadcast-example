import { default as BroadcastClient } from '../lib/client';

console.log('defining main()');

function parseUrl(url: string) {
    const a = document.createElement('a');
    a.href = url;
    return a;
}

function getWebSocketUrl(url: string) {
    const parsedUrl = parseUrl(url);
    return (parsedUrl.protocol === 'https:' ? 'wss://' : 'ws://') + parsedUrl.host;
}

function main() {
    console.log('main()');

    const statusText  = document.querySelector('.status') as HTMLSpanElement;
    const textField   = document.querySelector('.textfield') as HTMLInputElement;
    const textArea    = document.querySelector('.textarea') as HTMLTextAreaElement;
    const sendButton  = document.querySelector('.send')  as HTMLButtonElement;
    const clearButton = document.querySelector('.clear') as HTMLButtonElement;

    const client = new BroadcastClient(getWebSocketUrl(document.URL));

    function updateStatus(ready: boolean) {
        sendButton.disabled = !ready;
        statusText.textContent = ready ? 'Connected' : 'Not connected';
    }

    function appendLine(line: string) {
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
