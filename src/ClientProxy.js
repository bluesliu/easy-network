const {EventDispatcher, Event} = require('easy-event')
const {Socket} = require('net')
const SocketEvent = require('./SocketEvent')

class ClientProxy extends EventDispatcher {

    /**
     *
     * @param {Socket} socket
     */
    constructor (socket) {
        super()
        this.socket = socket

        this.socket.on('close', () => {
            const evt = Event.create(SocketEvent, SocketEvent.CLOSE)
            this.dispatchEvent(evt)
            Event.release(evt)
        })

        this.socket.on('data', (buffer) => {
            const evt = Event.create(SocketEvent, SocketEvent.SOCKET_DATA, buffer)
            this.dispatchEvent(evt)
            Event.release(evt)
        })

        this.socket.on('error', (err) => {
            const evt = Event.create(SocketEvent, SocketEvent.ERROR, err)
            this.dispatchEvent(evt)
            Event.release(evt)
        })
    }

    destroy () {
        this.socket.removeAllListeners()
        this.socket.destroy()
        this.socket = null
    }
}

module.exports = ClientProxy