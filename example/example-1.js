const {ServerSocket, SocketEvent} = require('../src/index')

class test {

    constructor () {
        // 服务端监听
        this.server = new ServerSocket()
        this.server.addEventListener(SocketEvent.CONNECT, this.onConnect, this)
        this.server.startListen(11000, '127.0.0.1')
    }

    // 有新的客户端连接
    onConnect (event) {
        const client = event.data
        console.log('onConnect')
        console.log(client.socket.address())

        client.addEventListener(SocketEvent.CLOSE, this.onClientClose, this)
        client.addEventListener(SocketEvent.SOCKET_DATA, this.onSocketData, this)
    }

    // 客户端关闭
    onClientClose (event) {
        console.log('onClientClose')
    }

    // 客户端发送数据
    onSocketData (event) {
        console.log('onSocketData')
        console.log(event.data)
    }
}

new test()

