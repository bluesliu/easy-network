const {EventDispatcher} = require('easy-event')
const ServerSocket = require('./ServerSocket')
const SocketEvent = require('./SocketEvent')

class ServerNetwork extends EventDispatcher {

    constructor () {
        super()

        /**
         *
         * @type {Array.<ClientProxy>}
         */
        this.$clientConns = []

        /**
         *
         * @type {ServerSocket}
         */
        this.$serverSocket = new ServerSocket()
        this.$serverSocket.addEventListener(SocketEvent.CONNECT, this.onConnect, this)
    }

    startListen (port, hostname) {
        this.stopListen()

    }

    stopListen () {
        this.removeAllClientSocket()
        this.$serverSocket.stopListen(()=>{
            console.log('[ServerNetwork] 服务器已停止监听')
        })
    }

    /**
     * 移除所有客户端连接
     */
    removeAllClientSocket () {
        while (this.$clientConns.length > 0) {
            const clientProxy = this.$clientConns.pop()
            this.removeClient(clientProxy)
        }
    }

    /**
     * 添加一个客户端连接
     * @param {ClientProxy} client
     */
    addClient (client) {
        client.addEventListener(SocketEvent.CLOSE, this.onClientClose, this)
        client.addEventListener(SocketEvent.SOCKET_DATA, this.onClientSocketData, this)
        client.addEventListener(SocketEvent.ERROR, this.onClientError, this)
    }

    /**
     * 删除一个客户端连接
     * @param {ClientProxy} client
     */
    removeClient (client) {
        for (let i = 0; i < this.$clientConns.length; i++) {
            const clientProxy = this.$clientConns[i]
            if (clientProxy === client) {
                clientProxy.removeAll()
                clientProxy.destroy()
                this.$clientConns.splice(i, 1)
                return
            }
        }
    }

    /**
     * 当客户端连接
     * @param {SocketEvent} event
     */
    onConnect (event) {
        /**
         * @type {ClientProxy}
         */
        const clientProxy = event.data
        console.log(`[ServerNetwork] 有新的客户端连接 ${clientProxy.address()}`);
        this.addClient(clientProxy)
    }



    onClientClose (event) {
        const client = event.target
        this.removeClient(client)
    }

    onClientSocketData (event) {

    }

    onClientError (event) {

    }
}

module.exports = ServerNetwork