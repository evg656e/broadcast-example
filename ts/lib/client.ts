import signal, { Signal } from './signal';
import WebSocket from './websocket';

console.log('defining Client');

/*!
    \class Client
*/
export default class Client {
    url: string;
    ready: boolean;
    closed: boolean;
    messageReceived: Signal;
    readyChanged: Signal;
    ws: undefined | WebSocket;
    timerId: undefined | number;

    constructor(url) {
        console.log('Client()', url);
        this.url = url;
        this.closed = true;
        this.ready = false;
        this.messageReceived = signal();
        this.readyChanged = signal();
        this.connect();
    }

    connect() {
        console.log('Client.connect()', this.url);
        this.closed = false;
        if (this.ws === undefined) {
            this.ws = new WebSocket(this.url);
            this.ws.onmessage = this.handleMessage.bind(this);
            this.ws.onopen    = this.handleOpen.bind(this);
            this.ws.onclose   = this.handleClose.bind(this);
            this.ws.onerror   = this.handleError.bind(this);
        }
    }

    diconnect() {
        this.closed = true;
        if (this.ws !== undefined)
            this.ws.close();
        if (this.timerId !== undefined) {
            clearTimeout(this.timerId);
            delete this.timerId;
        }
    }

    reconnect() {
        this.timerId = setTimeout(this.connect.bind(this), Client.RECONNECT_INTERVAL);
    }

    handleMessage(e) {
        this.messageReceived(e.data);
    }

    handleOpen(e) {
        console.log('Client.handleOpen()', e);
        if (!this.ready) {
            this.ready = true;
            this.readyChanged(this.ready);
        }
    }

    handleClose(e) {
        console.log('Client.handleClose()', e);
        if (this.ready) {
            this.ready = false;
            this.readyChanged(this.ready);
        }
        if (this.ws != null)
            delete this.ws;
        if (!this.closed)
            this.reconnect();
    }

    handleError(e) {
        console.error('Client.onError()', e);
    }

    send(text) {
        this.ws.send(text);
    }

    static readonly RECONNECT_INTERVAL = 3000;
}
