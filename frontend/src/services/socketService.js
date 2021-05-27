import io from 'socket.io-client'
import {httpService} from './httpService'

export const SOCKET_EMIT_USER_WATCH = 'user-watch';
export const SOCKET_EVENT_USER_UPDATED = 'user-updated';
export const SOCKET_EVENT_REVIEW_ADDED = 'review-added';


const baseUrl = (process.env.NODE_ENV === 'production')? '' : '//localhost:3030'
// export const socketService = createSocketService()
export const socketService = createDummySocketService()

window.socketService = socketService

var socketIsReady = false;
// socketService.setup()


function createSocketService() {
  var socket = null;
  const socketService = {
    async setup() {
      if (socket) return
      await httpService.get('setup-session')
      socket = io(baseUrl, { reconnection: false})
      socketIsReady = true;
    },
    async on(eventName, cb) {
      if (!socket) await socketService.setup()
      socket.on(eventName, cb)
    },
    async off(eventName, cb=null) {
      if (!socket) await socketService.setup()
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    async emit(eventName, data) {
      if (!socket) await socketService.setup()
      socket.emit(eventName, data)
    },
    terminate() {
      socket = null
      socketIsReady = false
    }
  }
  return socketService
}

// eslint-disable-next-line
function createDummySocketService() {
  var listenersMap = {}
  const socketService = {
    listenersMap,
    setup() {
      listenersMap = {}
    },
    terminate() {
      this.setup()
    },
    on(eventName, cb) {
      listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
    },
    off(eventName, cb) {
      if (!listenersMap[eventName]) return
      if (!cb) delete listenersMap[eventName]
      else listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
    },
    emit(eventName, data) {
      if (!listenersMap[eventName]) return
      listenersMap[eventName].forEach(listener => {
        listener(data)
      })
    },
    debugMsg() {
      this.emit('chat addMsg', {from: 'Someone', txt: 'Aha it worked!'})
    },
  }
  return socketService
}


// Basic Tests
function cb(x) {console.log(x)}
socketService.on('baba', cb)
socketService.on('mama', cb)
socketService.on('lala', cb)
socketService.emit('baba', 'DATA')
// socketService.off('baba', cb)


