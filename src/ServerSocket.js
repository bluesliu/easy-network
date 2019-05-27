const net = require('net')
const {EventDispatcher, Event} = require('easy-event')
const SocketEvent = require('./SocketEvent')
const ClientProxy = require('./ClientProxy')

class ServerSocket extends EventDispatcher {

    constructor () {
        super()
    }

    /**
     * 开始监听
     * @param {number} port
     * @param {string} hostname
     */
    startListen (port, hostname) {
        this.server = net.createServer()

        this.server.on('listening', ()=>{
            console.log('listening...')
            this.dispatchEvent(Event.create(SocketEvent, SocketEvent.LISTENING))

        })

        this.server.on('connection', (socket)=>{

            // 新的客户端连接
            const proxy = new ClientProxy(socket)
            this.dispatchEvent(Event.create(SocketEvent, SocketEvent.CONNECT, proxy))

        }).listen(port, hostname)
    }


    /**
     * 停止监听
     */
    stopListen (callback) {
        if (this.server) {
            this.server.close((err)=>{
                this.server = null
                callback.call(this)
            })
        }
        else {
            callback.call(this)
        }
    }
}

module.exports = ServerSocket