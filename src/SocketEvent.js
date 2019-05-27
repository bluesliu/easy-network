const {Event} = require('easy-event')

class SocketEvent extends Event{

    constructor (type, data) {
        super(type, data)
    }
}

SocketEvent.CONNECT = Symbol('connect')
SocketEvent.CLOSE = Symbol('close')
SocketEvent.LISTENING = Symbol('listening')
SocketEvent.SOCKET_DATA = Symbol('socket_data')
SocketEvent.ERROR = Symbol('error')

module.exports = SocketEvent