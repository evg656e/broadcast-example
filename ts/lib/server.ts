import WebSocket from './websocket';

console.log('defining Server');

/*!
    \class Server
*/
export default class Server {
    wss: any;

    constructor(httpServer) {
        this.wss = new WebSocket.Server({ server: httpServer });
        this.wss.on('connection', this.handleConnection.bind(this));
    }

    handleConnection(ws, req) {
        // console.log('Server.handleConnection():', req.connection.remoteAddress);
        ws.on('message', this.handleMessage.bind(this));
    }

    handleMessage(data) {
        // console.log('Server.handleMessage():', data);
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN)
                client.send(data);
        });
    }
}
