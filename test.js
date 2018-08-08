const net = require('net')
const HOST = '192.168.8.110'
const PORT = 10000
const client = new net.Socket()

client.connect(PORT, HOST, function() {
    
})