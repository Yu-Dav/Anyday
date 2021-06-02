const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');

var gIo = null;
var gSocketBySessionIdMap = {};

function connectSockets(http, session) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: [
                'http://127.0.0.1:8080',
                'http://localhost:8080',
                'http://127.0.0.1:3000',
                'http://localhost:3000',
            ],
            methods: ['GET', 'POST'],
        },
    });
    // var socket = io('http://localhost', {transports: ['websocket', 'polling', 'flashsocket']});

    const sharedSession = require('express-socket.io-session');

    gIo.use(
        sharedSession(session, {
            autoSave: true,
        })
    );
    gIo.on('connection', (socket) => {
        console.log(
            'New socket - socket.handshake.sessionID',
            socket.handshake.sessionID
        );
        gSocketBySessionIdMap[socket.handshake.sessionID] = socket;
        // if (socket.handshake?.session?.user) socket.join(socket.handshake.session.user._id)
        socket.on('disconnect', (socket) => {
            console.log('Someone disconnected');
            if (socket.handshake) {
                gSocketBySessionIdMap[socket.handshake.sessionID] = null;
            }
        });
        socket.on('hello', (msg) => {
            console.log('heard message ', msg);
        });
        socket.on('join board', (boardId) => {
            if (socket.myBoard === boardId) return;
            if (socket.myBoard) {
                socket.leave(socket.myBoard);
            }
            socket.join(boardId);
            logger.debug('Session ID is', socket.handshake.sessionID);
            socket.myBoard = boardId;
        });
        socket.on('board updated', (boardId) => {
            console.log('line 54 in socket service::::: board loading', boardId);
            gIo.emit('board loaded', boardId)
        });

        // socket.on('chat newMsg', msg => {
        //     console.log('Msg', msg);
        //     // emits to all sockets:
        //     // gIo.emit('chat addMsg', msg)
        //     // emits only to sockets in the same room
        //     gIo.to(socket.myTopic).emit('chat addMsg', msg)
        // })
      
    });
}

function emitToAll({ type, data, room = null }) {
    if (room) gIo.to(room).emit(type, data);
    else gIo.emit(type, data);
}

// TODO: Need to test emitToUser feature
function emitToUser({ type, data, userId }) {
    gIo.to(userId).emit(type, data);
}

// Send to all sockets BUT not the current socket
function broadcast({ type, data, room = null }) {
    const store = asyncLocalStorage.getStore();
    const { sessionId } = store;
    if (!sessionId)
        return logger.debug(
            'Shoudnt happen, no sessionId in asyncLocalStorage store'
        );
    const excludedSocket = gSocketBySessionIdMap[sessionId];
    if (!excludedSocket)
        return logger.debug('Shouldnt happen, No socket in map');
    if (room) excludedSocket.broadcast.to(room).emit(type, data);
    else excludedSocket.broadcast.emit(type, data);
}

module.exports = {
    connectSockets,
    emitToAll,
    broadcast,
};
